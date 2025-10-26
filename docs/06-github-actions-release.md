# GitHub Actions 自动发布

本文档介绍了如何使用 GitHub Actions 为 ChatHub Electron 应用程序设置自动发布流程，以便在多个平台上构建和发布安装程序。

## 工作流程概述

GitHub Actions 是一个强大的自动化工具，可以帮助开发者在 GitHub 仓库中自动化构建、测试和部署工作流程。我们的自动发布流程会在创建新的 Git 标签时触发，自动为 Windows、macOS 和 Linux 构建应用程序安装包，并创建 GitHub Release。

## 配置文件

自动发布流程的配置文件位于 `.github/workflows/release.yml`。

### 触发条件

工作流程会在向仓库推送 Git 标签时触发：

```yaml
on:
  push:
    tags:
      - 'v*'
```

这意味着只有当您推送类似 `v1.0.0` 的标签时，才会触发自动发布流程。

### 构建矩阵

工作流程使用构建矩阵同时在多个操作系统上构建应用程序：

```yaml
strategy:
  matrix:
    os: [windows-latest, ubuntu-latest, macos-13]
```

这将为以下平台生成安装程序：
- Windows (使用 Squirrel)
- macOS (使用 ZIP)
- Linux (使用 DEB 和 RPM)

### 构建步骤

1. 检出代码
2. 安装 Node.js 环境
3. 安装项目依赖
4. 使用 Electron Forge 构建和打包应用程序
5. 上传构建产物作为 artifacts
6. 创建 GitHub Release 并上传安装包

## 如何发布新版本

### 1. 更新版本号

首先，更新 `package.json` 中的版本号：

```json
{
  "version": "1.0.1"
}
```

### 2. 提交更改

```bash
git add package.json
git commit -m "Bump version to 1.0.1"
```

### 3. 创建并推送标签

```bash
git tag v1.0.1
git push origin main --tags
```

推送标签后，GitHub Actions 工作流程将自动开始构建和发布过程。

## 访问构建结果

构建完成后，您可以在以下位置找到结果：

1. **GitHub Release**: 在仓库的 "Releases" 部分，会创建一个草稿版本，其中包含所有平台的安装包
2. **Actions Artifacts**: 在 Actions 运行的 "Artifacts" 部分，可以下载各平台的构建产物

## 自定义配置

### 修改构建目标

如果您需要修改特定平台的构建目标，可以在 `forge.config.js` 中调整 makers 配置：

```javascript
makers: [
  {
    name: '@electron-forge/maker-squirrel',
    config: {},
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
  {
    name: '@electron-forge/maker-deb',
    config: {},
  },
  {
    name: '@electron-forge/maker-rpm',
    config: {},
  },
]
```

### 添加代码签名

为了提高应用程序的安全性和用户信任度，建议添加代码签名。您可以在工作流程中添加相关步骤：

```yaml
- name: Code Sign
  # 添加代码签名步骤
  run: |
    # Windows 代码签名命令
    # macOS 代码签名命令
```

## 故障排除

如果构建失败，请检查以下几点：

1. 确保 `package.json` 中的版本号格式正确
2. 检查依赖项是否正确安装
3. 确认 Electron Forge 配置正确
4. 查看 Actions 日志以获取详细错误信息

## 相关文档

- [项目概述](01-project-overview.md)
- [打包指南](05-packaging-guide.md)
- [Electron Forge 文档](https://www.electronforge.io/)