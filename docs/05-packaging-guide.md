# 打包指南

本指南将介绍如何为 ChatHub 应用程序创建可分发的安装包。

## 使用 Electron Forge 打包

该项目使用 Electron Forge 进行打包和分发。Electron Forge 是一个一体化的工具，可以处理 Electron 应用程序的打包、签名和分发。

### 可用的打包命令

1. `npm run package` - 仅打包应用程序，不创建安装程序
2. `npm run make` - 打包应用程序并创建平台特定的安装程序
3. `npm run build` - 与 `make` 相同，打包应用程序并创建安装程序

### 打包配置

项目的打包配置在 [forge.config.js](file:///D:/playground/chat-hub-electron/forge.config.js) 文件中定义：

```javascript
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
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
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
```

### 输出目录

打包后的文件将输出到以下目录：
- `out/` - 包含可分发的安装程序
- `out/make/` - 包含平台特定的安装程序文件

## 平台特定说明

### Windows

在 Windows 上，将创建 Squirrel.Windows 安装程序（.exe 文件）。

### macOS

在 macOS 上，将创建 ZIP 格式的应用程序包。

### Linux

在 Linux 上，将创建 deb 和 rpm 格式的安装包。

## 自定义应用程序图标

要为应用程序设置自定义图标，您需要：

1. 准备适当格式的图标文件：
   - Windows: .ico 文件
   - macOS: .icns 文件
   - Linux: .png 文件

2. 在 [forge.config.js](file:///D:/playground/chat-hub-electron/forge.config.js) 中添加图标配置：

```javascript
module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'path/to/icon' // 不包含文件扩展名
  },
  // ... 其他配置
};
```

## 代码签名

为了确保应用程序在用户系统上被信任，建议对应用程序进行代码签名。

### Windows 代码签名

在 Windows 上，可以在配置中指定证书文件：

```javascript
{
  name: '@electron-forge/maker-squirrel',
  config: {
    certificateFile: './path/to/certificate.pfx',
    certificatePassword: process.env.CERTIFICATE_PASSWORD
  }
}
```

### macOS 代码签名

在 macOS 上，需要配置代码签名和公证：

```javascript
module.exports = {
  packagerConfig: {
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  }
}
```

## 故障排除

### 打包失败

如果打包过程中遇到错误，请尝试以下步骤：

1. 清理 node_modules 并重新安装：
   ```bash
   rm -rf node_modules
   npm install
   ```

2. 确保所有依赖项都是最新版本：
   ```bash
   npm update
   ```

3. 检查是否有任何平台特定的问题。

### 应用程序运行不正常

如果打包后的应用程序运行不正常，请检查：

1. 确保所有必需的文件都已包含在打包中
2. 检查控制台输出以获取错误信息
3. 验证所有路径是否正确处理