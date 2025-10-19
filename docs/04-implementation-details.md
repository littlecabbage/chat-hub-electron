# 实现细节

## 项目初始化

本项目基于 Electron 和 Vue.js 构建，实现一个可以同时在多个 AI 平台上进行对话的工具。

## 核心功能实现

### 1. 主进程 (Main Process)

主进程文件位于 [src/main/main.js](../src/main/main.js)，负责：

- 创建应用程序窗口
- 设置窗口属性（大小、Web偏好设置等）
- 管理应用生命周期事件
- 启用 webview 标签支持

关键配置：
```javascript
const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    webviewTag: true
  }
});
```

### 2. 渲染进程 (Renderer Process)

渲染进程由以下文件组成：
- [src/renderer/index.html](../src/renderer/index.html) - 主页面布局
- [src/renderer/renderer.js](../src/renderer/renderer.js) - 前端逻辑处理

#### 页面布局

采用 Flexbox 布局实现三栏等分布局：
```css
.webviews-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.webview-wrapper {
  flex: 1;
  height: 100%;
  border-right: 1px solid #ccc;
}
```

#### WebView 集成

使用 Electron 的 `<webview>` 标签嵌入外部网站：
```html
<webview id="grok-webview" src="https://grok.com" autosize="on"></webview>
<webview id="qwen-webview" src="https://chat.qwen.ai/" autosize="on"></webview>
<webview id="kimi-webview" src="https://www.kimi.com/" autosize="on"></webview>
```

### 3. 消息同步机制

目前实现了基础的消息输入和发送按钮功能。用户在底部输入框输入消息后，可以通过点击发送按钮或按回车键触发消息发送操作。

```javascript
function sendMessageToAllWebviews(message) {
    // TODO: 实现向各个平台注入 JavaScript 代码来实际发送消息
    console.log('Sending message to all webviews:', message);
}
```

## 待办事项

1. 实现向不同平台注入特定的 JavaScript 代码来完成消息发送
2. 添加错误处理机制
3. 优化用户界面
4. 添加配置选项以自定义平台
5. 实现消息历史记录功能

## 平台特定实现注意事项

### Grok (grok.com)
- 需要分析网站 DOM 结构找到输入框和发送按钮
- 实现相应的注入脚本

### Qwen (https://chat.qwen.ai/)
- 需要分析网站 DOM 结构找到输入框和发送按钮
- 实现相应的注入脚本

### Kimi (https://www.kimi.com/)
- 需要分析网站 DOM 结构找到输入框和发送按钮
- 实现相应的注入脚本

## 安全考虑

由于禁用了上下文隔离 (`contextIsolation: false`) 并启用了节点集成 (`nodeIntegration: true`)，这可能会带来安全风险。在生产环境中应考虑更安全的替代方案，如使用预加载脚本。