---
description: "NodeAuth 部署方案全攻略。涵盖 Cloudflare Worker 零成本托管、Docker 私有化部署以及 GitHub Action 自动化部署三大主流方案。为您提供从环境变量配置、授权码获取到系统初始化与版本维护的一站式操作手册。"
---
# 部署方案（三选一） 

NodeAuth 采用前后端分离的现代化架构，支持极其灵活的部署方案。您可以选择白嫖 Cloudflare 的免费额度实现零成本托管，也可以在私有云（NAS/自有服务器）中通过 Docker 实现完全的数据主权。

---

> [!CAUTION]
> **全平台通用前置条件**
> `授权码` 是启动 NodeAuth 系统的必要凭证，**缺少授权码将无法完成任何形式的部署**。请在继续操作之前，前往 [授权中心](https://license.nodeauth.io) 获取您的专属授权码。

## 🛠️ 部署方案选择

| 场景 | 推荐方案 | 优势 | 所需前置资源 | 难度 |
| :--- | :--- | :--- | :--- | :--- |
| **新手/零成本** | [Cloudflare Worker](./cf-worker) | 0 成本、全球边缘加速、免维护 | • GitHub 账号<br>• Cloudflare 账号<br>• CF 托管域名 (可选，若无则分配 `*.workers.dev`) | ⭐ |
| **自动化/持续集成** | [GitHub Action](./github-action) | 推送即部署、支持更高级的自定义路由参数 | • GitHub 账号<br>• Cloudflare 账号<br>• CF 托管域名 (可选，若无则分配 `*.workers.dev`) | ⭐⭐ |
| **数据主权/内网** | [Docker 私有化部署](./docker) | 数据物理隔离、支持离线内网、支持三大传统数据库 | • 物理服务器或 VPS<br>• Docker 环境<br>• 自定义域名 (可选，支持局域网 IP 直连) | ⭐⭐⭐ |

---

## 📖 详细指南

以下是分章节的详细操作手册，建议按照顺序阅读。

### 1. 核心前置准备
无论选择哪种部署方式，这都是必须完成的第一步。
*   **[获取授权码](https://license.nodeauth.io)**：前往授权中心获取您的授权码。
*   **[环境变量配置指南](./env)**：包含授权码、7 大 OAuth 登录平台及数据库核心密钥的详细说明。

### 2. 托管部署 (Cloudflare 生态)
*   **[Cloudflare Worker (推荐)](./cf-worker)**：通过 Wrangler 或网页版一键部署，利用 D1 数据库实现高性能存储。
*   **[GitHub Action 自动化](./github-action)**：开发者推荐。推送代码即自动触发部署，支持通过 Secrets 灵活配置 Worker 名称、自定义域名路由等高级参数。

### 3. 私有化部署 (Docker 容器)
适用于 NAS、小主机、VPS 或 K8s 环境。
*   **[Docker 部署手册](./docker)**：支持 MySQL、PostgreSQL 及 SQLite 三大数据库引擎。

### 4. 初始化与维护
*   **[初始安装与系统自检](./setup)**：部署完成后如何通过 Smart Shield 逻辑验证系统安全性。
*   **[系统更新指南](./update)**：如何在保留数据的情况下无缝升级到 NodeAuth 的最新版本。

---

> [!TIP]
> **首次部署建议**：如果您是个人使用，最推荐 **Cloudflare Worker**。它不仅完全免费，且得益于 Cloudflare 的全球边缘节点，能够为您提供极致的动态码生成速度。

<!-- [📸 UI截图提示：此处展示包含不同部署方案（Cloudflare/Docker）的精美标志及对比图] -->
