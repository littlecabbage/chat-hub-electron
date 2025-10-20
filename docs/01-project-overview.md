# 项目概述

## 项目名称
ChatHub - 多平台AI对话工具

## 项目目标
实现一个能够在多个AI在线平台同时进行对话的桌面工具，通过网页嵌入方式，在分屏界面中展示多个AI对话网站，支持同步输入功能。

## 技术栈
- Electron (桌面应用框架)
- HTML/CSS/JavaScript

## 功能需求
1. 分屏显示多个AI对话网站：
   - Grok (grok.com)
   - Qwen (https://chat.qwen.ai/)
   - Kimi (https://www.kimi.com/)
   
2. 统一输入框：用户在工具的对话框输入指令时能同步输入到每个网页的对话框内

3. 自动加载：打开工具时自动以分屏的方式打开指定的AI对话网页

4. 平台选择功能：用户可以选择显示哪些AI平台

## 最新特性
- 美化平台选择界面，提供更好的用户体验
- 隐藏顶部菜单栏，界面更加简洁
- 实现统一输入框功能，支持跨平台消息同步发送

## 文档列表
- [项目概述](./01-project-overview.md)
- [开发环境搭建](./02-development-environment.md)
- [项目结构说明](./03-project-structure.md)
- [统一输入框实现方案](./04-unified-input-implementation.md)