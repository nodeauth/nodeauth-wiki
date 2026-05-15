---
description: "腾讯云 EdgeOne 边缘函数部署 NodeAuth 教程。详细介绍如何利用腾讯云边缘计算平台托管 2FA 系统，涵盖边缘函数创建、代码注入、环境变量配置及路由绑定等关键步骤，为您提供 Cloudflare 之外的又一高性能 Serverless 部署选项。"
---
# Tencent Cloud EdgeOne 部署教程

Tencent Cloud EdgeOne 是腾讯云提供的边缘计算平台。由于 NodeAuth 遵循标准的 Serverless Worker 规范，它可以轻松部署到 EdgeOne 边缘函数中。

## 🛠️ 部署步骤

### 1. 创建边缘函数
1. 登录 [腾讯云 EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)。
2. 进入 `边缘函数` 模块，点击“新建函数”。
3. 选择“空白模板”或从本地上传代码。

### 2. 配置代码
将项目打包后的 `dist/index.js` 代码内容粘贴到 EdgeOne 的在线编辑器中。

### 3. 设置环境变量
在函数的“配置建议”或“环境变量”选项卡中，添加必备参数（同 [环境变量配置手册](./env)）：
*   `ENCRYPTION_KEY`
*   `JWT_SECRET`
*   `OAUTH_ALLOWED_USERS`

### 4. 绑定路由
在 EdgeOne 域名管理中，为函数配置对应的触发路径（通常是 `/*`）。

---

## 📝 注意事项
*   **数据库兼容性**：EdgeOne 环境下的 D1 数据库绑定方式与 Cloudflare 略有不同，请参考腾讯云官方 D1 适配文档。
*   **请求限制**：确保您的 EdgeOne 套餐额度足以支撑应用的并发请求。
