// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    
    // Get webview elements
    const grokWebview = document.getElementById('grok-webview');
    const qwenWebview = document.getElementById('qwen-webview');
    const kimiWebview = document.getElementById('kimi-webview');
    
    // Get wrapper elements
    const grokWrapper = document.getElementById('grok-wrapper');
    const qwenWrapper = document.getElementById('qwen-wrapper');
    const kimiWrapper = document.getElementById('kimi-wrapper');
    
    // Get selector elements
    const grokSelector = document.getElementById('grok-selector');
    const qwenSelector = document.getElementById('qwen-selector');
    const kimiSelector = document.getElementById('kimi-selector');
    
    // Add event listeners to selectors
    grokSelector.addEventListener('change', () => {
        updateWebviewVisibility();
    });
    
    qwenSelector.addEventListener('change', () => {
        updateWebviewVisibility();
    });
    
    kimiSelector.addEventListener('change', () => {
        updateWebviewVisibility();
    });
    
    // Update webview visibility based on selectors
    function updateWebviewVisibility() {
        grokWrapper.style.display = grokSelector.checked ? 'block' : 'none';
        qwenWrapper.style.display = qwenSelector.checked ? 'block' : 'none';
        kimiWrapper.style.display = kimiSelector.checked ? 'block' : 'none';
        
        // Adjust flex properties based on visible webviews
        adjustWebviewLayout();
    }
    
    // Adjust the layout of webviews based on how many are visible
    function adjustWebviewLayout() {
        const wrappers = [grokWrapper, qwenWrapper, kimiWrapper];
        const visibleWrappers = wrappers.filter(wrapper => wrapper.style.display !== 'none');
        
        // Reset all widths
        wrappers.forEach(wrapper => {
            if (wrapper.style.display !== 'none') {
                wrapper.style.flex = '1';
            }
        });
        
        // Remove borders from last visible element
        wrappers.forEach(wrapper => {
            wrapper.style.borderRight = '1px solid #ccc';
        });
        
        if (visibleWrappers.length > 0) {
            const lastVisible = visibleWrappers[visibleWrappers.length - 1];
            lastVisible.style.borderRight = 'none';
        }
    }
    
    // Send message to all webviews when button is clicked
    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim() !== '') {
            sendMessageToAllWebviews(message);
            messageInput.value = '';
        }
    });
    
    // Send message when Enter key is pressed
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const message = messageInput.value;
            if (message.trim() !== '') {
                sendMessageToAllWebviews(message);
                messageInput.value = '';
            }
        }
    });
    
    // Function to send message to all webviews
    function sendMessageToAllWebviews(message) {
        const webviews = [];
        if (grokSelector.checked) {
            webviews.push({webview: grokWebview, message: message, platform: 'grok'});
        }
        
        if (qwenSelector.checked) {
            webviews.push({webview: qwenWebview, message: message, platform: 'qwen'});
        }
        
        if (kimiSelector.checked) {
            webviews.push({webview: kimiWebview, message: message, platform: 'kimi'});
        }
        
        // Send messages sequentially with focus
        sendMessagesWithFocus(webviews, 0);
    }
    
    // Send messages to webviews one by one with focus
    function sendMessagesWithFocus(webviews, index) {
        if (index >= webviews.length) {
            return;
        }
        
        const {webview, message, platform} = webviews[index];
        
        // Focus the webview
        webview.focus();
        
        // Small delay to ensure focus is set
        setTimeout(() => {
            sendMessageToWebview(webview, message, platform);
            
            // Move to next webview after a delay
            setTimeout(() => {
                sendMessagesWithFocus(webviews, index + 1);
            }, 500); // 500ms delay between each webview
        }, 100); // 100ms delay to ensure focus is set
    }
    
    // Send message to a specific webview
    function sendMessageToWebview(webview, message, platform) {
        let script = '';
        
        switch(platform) {
            case 'grok':
                script = createGrokScript(message);
                break;
                
            case 'qwen':
                script = createQwenScript(message);
                break;
                
            case 'kimi':
                script = createKimiScript(message);
                break;
        }
        
        // Execute the script in the webview
        webview.executeJavaScript(script);
    }
    
    // Create script for Grok platform
    function createGrokScript(message) {
        return `
            (function() {
                try {
                    // 查找输入框（Grok 使用 textarea）
                    const inputArea = document.getElementsByTagName('textarea')[0];
                    if (!inputArea) {
                        console.error('未找到 Grok 的输入框');
                        return;
                    }

                    // 查找发送按钮
                    const sendBtn = document.querySelector('button[type="submit"]');
                    if (!sendBtn) {
                        console.error('未找到 Grok 的发送按钮');
                        return;
                    }

                    // 填入提示词（模拟用户输入）
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLTextAreaElement.prototype,
                        'value'
                    ).set;
                    nativeInputValueSetter.call(inputArea, ${JSON.stringify(message)});
                    inputArea.dispatchEvent(new Event('input', { bubbles: true }));

                    // 点击发送（稍作延迟确保内容已加载）
                    setTimeout(() => {
                        // 先点击页面空白处（防止候选词干扰）
                        document.body.click();
                        setTimeout(() => {
                            sendBtn.click();
                            console.log('✅ 已向 Grok 发送问题：', ${JSON.stringify(message)});
                        }, 300);
                    }, 200);
                } catch (e) {
                    console.log('Error sending message to Grok: ' + e.message);
                }
            })();
        `;
    }
    
    // Create script for Qwen platform
    function createQwenScript(message) {
        return `
            (function() {
                try {
                    // Try multiple selectors for input field
                    var inputSelectors = [
                        'textarea[placeholder*="提问"]',
                        'textarea[placeholder*="prompt"]',
                        'textarea[class*="chat"]',
                        'textarea'
                    ];
                    
                    var inputField = null;
                    for (var i = 0; i < inputSelectors.length; i++) {
                        inputField = document.querySelector(inputSelectors[i]);
                        if (inputField) break;
                    }
                    
                    if (inputField) {
                        var lastValue = inputField.value;
                        inputField.value = ${JSON.stringify(message)};
                        
                        // Trigger events to simulate user input
                        var inputEvent = new Event('input', { bubbles: true });
                        var changeEvent = new Event('change', { bubbles: true });
                        inputField.dispatchEvent(inputEvent);
                        inputField.dispatchEvent(changeEvent);
                        
                        // Try to find and click send button
                        setTimeout(function() {
                            try {
                                var buttonSelectors = [
                                    'button[aria-label*="发送"]',
                                    'button[type="submit"]',
                                    '[class*="send"]',
                                    '[class*="submit"]'
                                ];
                                
                                var sendButton = null;
                                for (var i = 0; i < buttonSelectors.length; i++) {
                                    sendButton = document.querySelector(buttonSelectors[i]);
                                    if (sendButton) break;
                                }
                                
                                if (sendButton) {
                                    sendButton.click();
                                } else {
                                    // If no button found, try pressing Enter in the input field
                                    var enterEvent = new KeyboardEvent('keydown', {
                                        key: 'Enter',
                                        code: 'Enter',
                                        keyCode: 13,
                                        which: 13,
                                        bubbles: true
                                    });
                                    inputField.dispatchEvent(enterEvent);
                                }
                            } catch (e) {
                                console.log('Error clicking send button or pressing enter in Qwen: ' + e.message);
                            }
                        }, 300);
                    } else {
                        console.log('Qwen input field not found');
                    }
                } catch (e) {
                    console.log('Error sending message to Qwen: ' + e.message);
                }
            })();
        `;
    }
    
    // Create script for Kimi platform
    function createKimiScript(message) {
        return `
            (function() {
                try {
                    // Use the selectors that worked in the user's debugging
                    var chatInput = document.querySelector('.chat-input-editor');
                    
                    if (!chatInput) {
                        // Try alternative selectors for the contenteditable div
                        var inputSelectors = [
                            'div[contenteditable="true"][class*="chat-input-editor"]',
                            'div[contenteditable="true"][role="textbox"]',
                            'div[contenteditable="true"]'
                        ];
                        
                        for (var i = 0; i < inputSelectors.length; i++) {
                            chatInput = document.querySelector(inputSelectors[i]);
                            if (chatInput) break;
                        }
                    }
                    
                    if (chatInput) {
                        // Click on the input field to ensure it's focused
                        chatInput.click();
                        
                        // Small delay to ensure click is processed
                        setTimeout(function() {
                            // Use the setInputText function that worked in debugging
                            function setInputText(element, text) {
                                element.focus();
                                document.execCommand('selectAll', false, null);
                                document.execCommand('delete', false, null);
                                document.execCommand('insertText', false, text);
                            }
                            
                            setInputText(chatInput, ${JSON.stringify(message)});
                            
                            // Try to find and click send button after a delay
                            setTimeout(function() {
                                try {
                                    var sendButton = document.querySelector('.send-button');
                                    
                                    if (!sendButton) {
                                        // Try alternative selectors for the send button
                                        var buttonSelectors = [
                                            'button[aria-label*="发送"]',
                                            'button[type="submit"]:not([disabled])',
                                            '[class*="send"]',
                                            '[class*="submit"]',
                                            'button:not([disabled])'
                                        ];
                                        
                                        for (var i = 0; i < buttonSelectors.length; i++) {
                                            sendButton = document.querySelector(buttonSelectors[i]);
                                            if (sendButton && !sendButton.disabled) break;
                                        }
                                    }
                                    
                                    if (sendButton && !sendButton.disabled) {
                                        sendButton.click();
                                    } else {
                                        // If no button found, try pressing Enter in the input field
                                        var enterEvent = new KeyboardEvent('keydown', {
                                            key: 'Enter',
                                            code: 'Enter',
                                            keyCode: 13,
                                            which: 13,
                                            bubbles: true
                                        });
                                        chatInput.dispatchEvent(enterEvent);
                                        
                                        // Also try keyup event
                                        var enterUpEvent = new KeyboardEvent('keyup', {
                                            key: 'Enter',
                                            code: 'Enter',
                                            keyCode: 13,
                                            which: 13,
                                            bubbles: true
                                        });
                                        chatInput.dispatchEvent(enterUpEvent);
                                    }
                                } catch (e) {
                                    console.log('Error clicking send button or pressing enter in Kimi: ' + e.message);
                                }
                            }, 300);
                        }, 50);
                    } else {
                        console.log('Kimi input field not found');
                        // Log all contenteditable elements for debugging
                        var editableElements = document.querySelectorAll('[contenteditable]');
                        for (var j = 0; j < editableElements.length; j++) {
                            console.log('Contenteditable element:', editableElements[j].outerHTML.substring(0, 200) + '...');
                        }
                    }
                } catch (e) {
                    console.log('Error sending message to Kimi: ' + e.message);
                }
            })();
        `;
    }
    
    // Webview load event listeners
    grokWebview.addEventListener('did-finish-load', () => {
        console.log('Grok webview loaded');
    });
    
    qwenWebview.addEventListener('did-finish-load', () => {
        console.log('Qwen webview loaded');
    });
    
    kimiWebview.addEventListener('did-finish-load', () => {
        console.log('Kimi webview loaded');
    });
    
    // Initial layout adjustment
    updateWebviewVisibility();
});