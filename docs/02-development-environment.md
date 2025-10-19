# 开发环境搭建

## 环境要求

在开始开发之前，需要确保系统中已安装以下软件：

1. Node.js (推荐版本 16.x 或更高)
2. npm (通常随 Node.js 一起安装)
3. Electron
4. Vue CLI

## 安装 Node.js 和 npm

由于系统中尚未安装 Node.js 和 npm，需要先进行安装：

### Ubuntu/Debian 系统安装命令：

```bash
# 使用 apt 安装
sudo apt update
sudo apt install nodejs npm

# 或者使用 NodeSource 仓库安装最新版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 验证安装：

```bash
node --version
npm --version
```

## Electron 环境

Electron 将作为项目依赖安装，无需单独安装全局 Electron。

## Vue CLI 安装

Vue CLI 将在项目初始化时作为开发依赖安装。

## 项目依赖安装

在项目根目录执行以下命令安装所有依赖：

```bash
npm install
```

## 开发服务器启动

```bash
npm run dev
```

## 构建应用

```bash
npm run build
```