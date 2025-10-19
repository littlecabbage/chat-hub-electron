# 添加 .gitignore 文件

## 概述

为项目添加了 [.gitignore](file:///home/zihui/playground/chat-hub-electron/.gitignore) 文件，以忽略不需要版本控制的文件和目录。

## 包含的忽略规则

1. **日志文件** - 各种日志文件和调试日志
2. **运行时数据** - PID 文件、种子文件等
3. **依赖目录** - node_modules/, jspm_packages/ 等
4. **构建输出** - dist/, .next, .nuxt 等
5. **缓存目录** - .cache/, .parcel-cache 等
6. **编辑器配置** - .vscode/, .idea/ 等 IDE 特定文件
7. **操作系统文件** - .DS_Store, Thumbs.db 等
8. **环境变量文件** - .env, .env.test 等
9. **Electron 特定** - dist/, dist-electron/ 构建目录

## 项目特定忽略规则

根据项目需求，添加了以下特定忽略规则：
- dist/ 和 dist-electron/ 目录 - Electron 应用构建输出
- tmp/ 和 temp/ 临时目录
- logs/ 日志目录

## 使用说明

.gitignore 文件已经配置好，Git 将自动忽略这些文件和目录，它们不会被提交到版本控制系统中。