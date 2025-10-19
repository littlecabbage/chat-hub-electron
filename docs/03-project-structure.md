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
│   ├── renderer/            # Electron 渲染进程 (Vue.js)
│   └── assets/              # 静态资源文件
├── package.json             # 项目配置文件
├── README.md                # 项目说明文件
└── .gitignore               # Git 忽略文件配置
```

## 主要组件说明

### 主进程 (Main Process)
- 负责创建和管理应用窗口
- 处理原生操作系统交互
- 管理渲染进程

### 渲染进程 (Renderer Process)
- 使用 Vue.js 构建用户界面
- 实现分屏显示多个网页
- 处理用户输入并同步到各网页

## 分屏设计

应用窗口将被划分为三个相等的部分：
1. 左侧：Grok (grok.com)
2. 中间：Qwen (https://chat.qwen.ai/)
3. 右侧：Kimi (https://www.kimi.com/)

底部将有一个统一的输入框，用于向所有平台发送消息。

## Webview 集成

使用 Electron 的 webview 标签或 BrowserView 来嵌入外部网页：
- Grok: https://grok.com
- Qwen: https://chat.qwen.ai/
- Kimi: https://www.kimi.com/