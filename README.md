# chat-hub-electron

ChatHub 是一个多平台 AI 对话工具，能够在分屏界面中同时与多个 AI 平台进行对话。

## 项目概述

请查看 [docs/01-project-overview.md](docs/01-project-overview.md) 了解项目详细信息。

## 技术栈

- Electron
- HTML/CSS/JavaScript

## 快速开始

请查看 [docs/02-development-environment.md](docs/02-development-environment.md) 了解开发环境搭建详情。

## v0.1 版本特性

- 分屏显示多个 AI 对话平台：Grok、Qwen、Kimi
- 统一输入框功能，支持同时向多个平台发送消息
- 平台选择功能，用户可以选择显示哪些 AI 平台
- 美化平台选择界面，提供更好的用户体验
- 隐藏顶部菜单栏，界面更加简洁

### 统一输入框实现

通过在渲染进程中监听用户输入，然后使用 `executeJavaScript` 方法向各个平台的 webview 注入 JavaScript 代码实现消息同步发送。

针对不同平台采用不同的选择器策略和输入模拟机制：
- Grok 平台：使用 `Object.getOwnPropertyDescriptor` 设置输入值，通过点击页面空白处和发送按钮发送消息
- Qwen 平台：使用传统 value 设置方式，支持发送按钮点击和回车键发送
- Kimi 平台：使用 `document.execCommand` 模拟真实输入行为，支持多种选择器
