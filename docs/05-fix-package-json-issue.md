# 修复 package.json 版本号问题

## 问题描述

在运行 `npm install` 命令时遇到以下错误：

```
npm error code EINVALIDTAGNAME
npm error Invalid tag name "^3.latest" of package "vue@^3.latest": Tags may not have any characters that encodeURIComponent encodes.
```

## 问题原因

package.json 文件中的 Vue 依赖版本号格式不正确，使用了无效的标签名 "^3.latest"。

## 解决方案

将 Vue 依赖的版本号从 "^3.latest" 修改为标准的语义化版本号 "^3.0.0"。

## 修改内容

在 package.json 文件中：

```json
// 修改前
"dependencies": {
  "vue": "^3.latest"
}

// 修改后
"dependencies": {
  "vue": "^3.0.0"
}
```

## 验证方法

修改完成后，重新运行以下命令验证问题是否解决：

```bash
npm install
```

如果不再出现 EINVALIDTAGNAME 错误，则说明问题已解决。