# 项目结构设计

## 整体目录结构

```
chat-hub-electron/
├── docs/                    # 项目文档
│   ├── 01-project-overview.md
│   ├── 02-development-environment.md
│   └── 03-project-structure.md
├── src/                     # 源代码目录
│   ├── main/                # Electron 主进程
│   └── renderer/            # Electron 渲染进程
├── package.json             # 项目配置文件
├── README.md                # 项目说明文件
└── .gitignore               # Git 忽略文件配置
```

## 主要组件说明

### 主进程 (Main Process)
- 负责创建和管理应用窗口
- 处理原生操作系统交互
- 管理渲染进程

文件位置：[src/main/main.js](../src/main/main.js)

### 渲染进程 (Renderer Process)
- 实现分屏显示多个网页
- 处理用户输入并同步到各网页
- 实现平台选择功能

文件位置：
- [src/renderer/index.html](../src/renderer/index.html) - 主页面布局
- [src/renderer/renderer.js](../src/renderer/renderer.js) - 前端逻辑处理

## 界面设计

### 平台选择区域
应用顶部有一个平台选择区域，用户可以通过复选框选择要显示的AI平台：
- Grok (默认选中)
- Qwen (默认选中)
- Kimi (默认选中)

### 分屏设计
应用窗口根据用户选择动态显示选中的平台，各平台网页等分布局。

### 统一输入区域
底部有一个统一的输入框，用于向所有显示的平台发送消息。

## Webview 集成

使用 Electron 的 `<webview>` 标签嵌入外部网页：
- Grok: https://grok.com
- Qwen: https://chat.qwen.ai/
- Kimi: https://www.kimi.com/