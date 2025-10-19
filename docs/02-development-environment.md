# 开发环境搭建

## 环境要求

在开始开发之前，需要确保系统中已安装以下软件：

1. Node.js (推荐版本 16.x 或更高)
2. npm (通常随 Node.js 一起安装)

## 安装 Node.js 和 npm

由于系统中尚未安装 Node.js 和 npm，需要先进行安装：

### Windows 系统安装命令：

在 Windows 系统上推荐使用 winget 包管理器安装 Node.js 和 npm：

```powershell
# 在 PowerShell 中运行
winget install OpenJS.NodeJS
```

或者从 Node.js 官网下载安装包：
- 访问 https://nodejs.org/
- 下载 Windows 版本的安装包 (.msi 文件)
- 运行安装包并按照提示完成安装

### Ubuntu/Debian 系统安装命令：

```bash
# 使用 apt 安装
sudo apt update
sudo apt install nodejs npm

# 或者使用 NodeSource 仓库安装最新版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### macOS 系统安装命令：

在 macOS 系统上推荐使用 Homebrew 包管理器安装：

```bash
brew install node
```

或者从 Node.js 官网下载安装包：
- 访问 https://nodejs.org/
- 下载 macOS 版本的安装包 (.pkg 文件)
- 运行安装包并按照提示完成安装

### 验证安装：

```bash
node --version
npm --version
```

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