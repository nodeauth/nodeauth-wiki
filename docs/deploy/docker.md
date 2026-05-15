---
description: "NodeAuth Docker 私有化部署指南。专为追求数据绝对控制权的用户设计，支持 SQLite、MySQL 及 PostgreSQL 三大数据库引擎。涵盖从权限锁定、目录准备到 docker-compose 模板配置、环境变量加密加固以及反向代理等高级安全实践，助您在 NAS 或私有服务器中构建物理隔离的 2FA 中心。"
---
# Docker 私有化部署教程

Docker 部署是为追求**数据绝对控制权**的极客、NAS 用户及企业环境量身定制的方案。它允许您将所有 2FA 数据锁死在自有的物理硬盘中，即使断开互联网（局域网环境）也能通过 PWA 正常使用。

---

## 🛡️ 核心安全特性 (必读)

为了极致的安全体验，NodeAuth 的 Docker 镜像遵循以下规范：
*   **非特权用户 (Rootless)**：镜像内部强制以 `node` 用户 (UID 1000) 运行，彻底杜绝容器逃逸风险。
*   **权限锁定**：启动前，您**必须**预先在宿主机配置文件夹权限，否则应用将因无法写入数据库而启动失败。

### 准备目录
在您打算运行容器的目录下，执行以下命令：
```bash
mkdir -p data && sudo chown -R 1000:1000 data
```

---

## 🏗️ 部署方案矩阵 (三选一)

根据您的硬件条件和对性能的需求，请从以下三个方案中任选其一：

### 方案 A：极简型 (SQLite)
**适用人群**：个人用户、NAS 用户、希望“一包带走”的用户。
*   **优点**：无需额外部署数据库容器，数据全部存在 `data/nodeauth.db` 一个文件里。
*   **配置**：仅需挂载 `/app/data` 目录，无需填写任何 `DB_HOST` 变量。

### 方案 B：经典型 (MySQL)
**适用人群**：已有 MySQL 环境、追求数据结构化管理的用户。
*   **支持方式**：支持与本地 MySQL 容器联动，或连接远程 RDS/云数据库。
*   **要求**：**必须**填写 `DB_HOST`, `DB_USER`, `DB_PASSWORD` 等完整变量。

### 方案 C：进阶型 (PostgreSQL)
**适用人群**：追求极致性能或使用 Supabase 等外部 Postgres 服务。
*   **支持方案**：完美适配 Supabase 远程连接（建议开启 `DB_SSL=true`）。
*   **要求**：**必须**填写完整的 PG 连接信息。

---

## 🚀 快速开始

### 1. 获取模板
我们已为您准备好了五种典型的 `docker-compose.yml` 模板。请根据您的选择下载，并将其重命名为 `docker-compose.yml`：

*   [SQLite 极简版 (推荐)](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose.yml)：无需安装数据库，一键启动。
*   [MySQL 本地容器版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-local.yml)
*   [MySQL 远程连接版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-remote.yml)
*   [PostgreSQL 本地版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-local.yml)
*   [PostgreSQL 远程版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-remote.yml)

### 2. 配置环境变量
请参考另一篇详细的 [环境变量配置指南](./env.md) 来正确修改 `docker-compose.yml` 文件里预留的环境变量。

### 3. 启动应用
```bash
docker compose up -d
```
启动后，访问 `http://服务器IP:3000` (或您在模板中自定义的端口) 即可进入。

---

## 🛡️ 高级安全实践 (推荐)

在生产环境中，直接在 `docker-compose.yml` 暴露明文 Secret 会增加物理泄露的风险。除 `JWT_SECRET` 外，其他变量建议采用如下 `aes` 加密加固策略：

```yaml
# 示例：加密后的环境变量片段

environment:
  # 支持 base64: hex: 前缀
  - NODEAUTH_LICENSE=base64:MjAyNjA0MJfTm9kZUF1dGhf...
  
  # 支持 base64: hex: 前缀
  - JWT_SECRET=base64:MjAyNjA0MDJfTm9kZUF1dGhf...

  # 支持 aes: base64: hex: 前缀, 推荐使用 aes: 前缀
  - ENCRYPTION_KEY=aes:iv:tag:cipher...
  - OAUTH_GOOGLE_CLIENT_ID=aes:iv:tag:cipher...
  - OAUTH_GOOGLE_CLIENT_SECRET=aes:iv:tag:cipher...

```

> **提示**：此类格式的配置条目可以通过 **[部署助手](https://tools.nodeauth.io)** 一键批量生成。

> [!NOTE]
> **关于应急恢复**：无论您在 `docker-compose.yml` 中如何加密，NodeAuth 在成功启动后为您生成的「应急恢复包 (PDF)」中始终会显示**解密后的明文密钥**。请务必妥善保存该 PDF 物理副本。

---

## 🛠️ 运维与排查

*   **Permission Denied**: 99% 的启动失败都是因为没有执行上述 `chown 1000:1000` 命令。
*   **反向代理 (推荐)**：为了 PWA 的安全性，**必须开启 HTTPS**。建议配合 [Nginx Proxy Manager](https://nginxproxymanager.com/) 使用。
*   **更新应用**：
    ```bash
    docker compose pull
    docker compose up -d
    ```

<!-- [📸 UI截图提示：此处展示不同数据库引擎下的运行拓扑图或 Docker Dashboard 中的容器列表] -->
