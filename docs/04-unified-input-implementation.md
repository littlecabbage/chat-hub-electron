# 统一输入框实现方案

## 需求背景

在 ChatHub 应用中，用户希望能够在一个地方输入消息，并将其同时发送到所有已选择的 AI 平台，而不需要分别在每个平台上重复输入。这就需要实现一个统一输入框功能，使用户输入能够同步到每个网页的对话框内。

## 实现思路

为了实现该功能，我们需要：

1. 获取每个网页中的文本输入框和发送按钮元素
2. 向每个 webview 注入 JavaScript 代码来操作对应的输入框和发送按钮
3. 使用 Electron 提供的 `executeJavaScript` 方法执行注入的代码

## 技术实现

### 1. 主要实现逻辑

我们在 [renderer.js](file:///d:/playground/chat-hub-electron/src/renderer/renderer.js) 文件中实现了主要逻辑，当用户点击发送按钮或按回车键时，会调用 `sendMessageToAllWebviews` 函数，该函数再根据用户选择的平台，逐一调用 `sendMessageToWebview` 函数。

### 2. sendMessageToWebview 函数详解

此函数接收三个参数：
- `webview`: 对应平台的 webview 元素
- `message`: 要发送的消息内容
- `platform`: 平台标识符 ('grok', 'qwen', 'kimi')

根据不同平台，函数会构造不同的 JavaScript 脚本并注入到对应 webview 中执行。

### 3. 各平台选择器策略

由于不同 AI 平台网站的界面结构可能不同，我们需要为每个平台单独适配：

#### Grok 平台
- 输入框选择器尝试顺序：
  1. `textarea[placeholder*="message"]`
  2. `textarea[placeholder*="Message"]`
  3. `textarea[class*="input"]`
  4. `textarea` (兜底选择器)

- 发送按钮选择器尝试顺序：
  1. `button[type="submit"]`
  2. `button[aria-label*="send"]`
  3. `button[aria-label*="Send"]`
  4. `[class*="send"]`
  5. `[class*="submit"]`

#### Qwen 平台
- 输入框选择器尝试顺序：
  1. `textarea[placeholder*="提问"]`
  2. `textarea[placeholder*="prompt"]`
  3. `textarea[class*="chat"]`
  4. `textarea` (兜底选择器)

- 发送按钮选择器尝试顺序：
  1. `button[aria-label*="发送"]`
  2. `button[type="submit"]`
  3. `[class*="send"]`
  4. `[class*="submit"]`

#### Kimi 平台
- 输入框选择器尝试顺序：
  1. `textarea[placeholder*="请输入"]`
  2. `textarea[placeholder*="问题"]`
  3. `textarea[class*="chat"]`
  4. `textarea` (兜底选择器)

- 发送按钮选择器尝试顺序：
  1. `button[aria-label*="发送"]`
  2. `button[type="submit"]`
  3. `[class*="send"]`
  4. `[class*="submit"]`

### 4. 消息输入模拟机制

为了确保各平台网站能正确识别我们的输入，我们不仅设置了输入框的值，还模拟了一系列事件：

```javascript
// 设置输入框的值
inputField.value = message;

// 触发事件以模拟用户输入
var event = new Event('input', { bubbles: true });
var changeEvent = new Event('change', { bubbles: true });
inputField.dispatchEvent(event);
inputField.dispatchEvent(changeEvent);
```

### 5. 消息发送机制

在设置好输入框的值之后，我们会尝试两种方式来发送消息：

1. 查找并点击发送按钮
2. 如果找不到发送按钮，则在输入框中模拟按下回车键

```javascript
// 方式1: 点击发送按钮
sendButton.click();

// 方式2: 模拟按下回车键
var enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true
});
inputField.dispatchEvent(enterEvent);
```

## 错误处理和容错机制

1. **多选择器适配**：为每个元素准备多个可能的选择器，按优先级逐一尝试，提高兼容性。

2. **超时机制**：使用 `setTimeout` 来延迟执行发送操作，确保 DOM 已经更新完毕。

3. **空值检查**：在执行任何 DOM 操作之前，都会检查元素是否存在。

## 测试建议

1. 验证在各平台页面完全加载后能否正常发送消息
2. 测试在某个平台选择器失效时，其他平台是否还能正常工作
3. 验证输入特殊字符时各平台的处理情况
4. 测试在网络较慢情况下消息发送的可靠性

## 后续优化方向

1. **动态选择器学习**：可以增加一个机器学习模块，自动识别各平台的有效选择器
2. **失败重试机制**：对于发送失败的消息，可以加入重试队列
3. **平台扩展性**：设计更通用的平台适配接口，便于后续添加新的 AI 平台