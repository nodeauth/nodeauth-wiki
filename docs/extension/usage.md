---
description: "NodeAuth 浏览器扩展安装与使用指南。深度集成 Chrome 与 Edge 浏览器，支持零知识加密握手协议，实现与 PWA 应用的物理隔离级通信。介绍如何通过扩展实现一键自动填充动态码，大幅提升桌面端的安全登录体验。"
---
# 🧩 安装使用

本指南将帮助您完成 NodeAuth 浏览器扩展的安装、授权配对以及日常使用。

## 1. 安装扩展程序

您可以通过以下方式安装 NodeAuth 扩展：

### 推荐方式：官方商店安装

这是最便捷的安装方式，支持自动更新与云端验证。

*   👉 **[Chrome 应用商店](https://chromewebstore.google.com/detail/nodeauth/ejknfokfdojopelcbidgchnopeapnjgd)** (适用于 Chrome 浏览器)
*   👉 **[Edge 扩展商店](https://microsoftedge.microsoft.com/addons/detail/bclpbakllopgjhelikbhccpjkgbmfpgd)** (适用于 Edge 浏览器)
*   👉 **[Firefox 扩展商店](https://addons.mozilla.org/zh-CN/firefox/addon/nodeauth/)** (适用于 Firefox 浏览器)

### 备选方式：手动安装（GitHub）

如果您无法访问浏览器扩展商店，可以从源代码仓库手动加载：

#### Chrome / Edge：

1.  前往 [NodeAuth 扩展仓库 Release 页面](https://github.com/nodeauth/nodeauth-browser-extension/releases) 下载最新的 `.zip` 文件并解压。
2.  在地址栏输入 `chrome://extensions/` 并回车。
3.  打开右上角的 **“开发者模式”**。
4.  点击“加载已解压的扩展程序”，选择解压后的目录。

#### Firefox：

1.  前往 [NodeAuth 扩展仓库 Release 页面](https://github.com/nodeauth/nodeauth-browser-extension/releases) 下载最新的 `.zip` 文件。
2.  在地址栏输入 `about:debugging` 并回车。
3.  点击左侧的 **“此 Firefox”** (This Firefox)。
4.  点击 **“临时载入附加组件...”**，选择下载的 `.zip` 文件。

> [!NOTE]
> 由于 Firefox 稳定版要求强制签名，手动加载的扩展在浏览器重启后会失效。如需永久使用，请优先使用官方商店安装。

## 2. 授权与配对

安装完成后，您需要将插件与您的 NodeAuth PWA 实例建立安全连接：

1.  **打开 PWA**：在浏览器中登录您的 NodeAuth PWA（例如 `https://auth.example.com`）。
2.  **进入设置**：点击左侧导航栏的 **“设置”** -> **“设备管理”**。
3.  **发起授权**：点击 **“授权新插件”** 按钮。
4.  **完成握手**：系统会自动弹出授权确认页面。点击“确认授权”后，插件将通过加密隧道自动获取您的加密保险库种子。

## 3. 设置本地 PIN 码

出于安全考虑，扩展程序拥有独立的本地锁定机制：

*   **初次设置**：配对成功后，插件会要求您设置一个 6 位数字的 PIN 码。
*   **本地加密**：该 PIN 码将作为本地保险库的二次加密钥匙，**NodeAuth 服务器不会存储该密码**。
*   **自动锁定**：您可以在插件设置中配置“关闭浏览器后自动锁定”或“闲置 X 分钟后锁定”。

## 4. 日常使用

*   **查看令牌**：点击浏览器右上角的 NodeAuth 图标，输入 PIN 码解锁后即可查看您的 2FA 令牌。
*   **快速搜索**：支持通过关键字快速过滤您的账号。
*   **管理设备**：如果您不慎丢失了安装插件的电脑，可以随时在 PWA 的“设备管理”中远程注销该插件。

---

> [!TIP]
> 为了获得最佳体验，建议将 NodeAuth 插件固定 (Pin) 在浏览器工具栏。
