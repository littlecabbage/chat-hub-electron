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
        // This is a simplified implementation
        // In a real application, you would need to inject JavaScript into each webview
        // to interact with their specific input fields and submit buttons
        
        // For now, we'll just log the message
        console.log('Sending message to all webviews:', message);
        
        // Example of how to execute JavaScript in a webview:
        // grokWebview.executeJavaScript(`
        //     // Code to find input field and enter message
        //     document.querySelector('input-selector').value = '${message}';
        //     // Code to submit the form
        //     document.querySelector('submit-button-selector').click();
        // `);
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
});