---
description: "NodeAuth Docker 私有化部署指南。专为追求数据绝对控制权的用户设计，支持 SQLite、MySQL 及 PostgreSQL 三大数据库引擎。涵盖从权限锁定、目录准备到 docker-compose 模板配置、环境变量加密加固以及反向代理等高级安全实践，助您在 NAS 或私有服务器中构建物理隔离的 2FA 中心。"
---
# Docker 私有化部署教程

Docker 私有化部署专为需要将服务托管在自有基础设施（如 VPS、NAS 或企业内网）的用户打造。得益于容器化技术的极佳扩展性与环境隔离特性，它不仅原生支持无缝接入 SQLite、MySQL 及 PostgreSQL 三大关系型数据库，还能与您现有的反向代理网络完美融合，实现 100% 的环境掌控与数据物理隔离。

---

## 📋 部署前置条件
- **授权码**：启动系统必须，请前往 [授权中心](https://license.nodeauth.io) 获取。
- **物理服务器或 VPS**：拥有文件系统读写权限的主机或 NAS。
- **Docker 环境**：已安装 Docker 及 Docker Compose 引擎。
- **自定义域名 (可选)**：如果需要外网访问可自行解析，同样支持局域网 IP 直连。

---

## 🛠️ 标准部署流程

### 1. 创建工作目录
首先，创建一个用于存放项目配置和数据的根目录，并为其内部的 `data` 数据卷赋予正确的写入权限：
```bash
mkdir -p nodeauth/data
cd nodeauth
sudo chown -R 1000:1000 data
```

> [!TIP]
> 为了保护您的服务器和数据安全，NodeAuth 采用了更严格的安全机制：
> *   **杜绝“最高权限”运行**：许多 Docker 应用默认使用 root（系统最高权限）运行，一旦出现漏洞可能波及您整个服务器。NodeAuth 强制以被降级的“普通权限”运行，将风险彻底死锁在容器内部。
> *   **为什么需要手动赋权？** 正因为放弃了最高权限，NodeAuth 默认是没有资格在您的硬盘上乱写文件的。这就是为什么在下方的步骤中，您**必须先执行一行赋权命令**，允许应用往数据文件夹里存东西。否则它会因为没法保存数据而罢工。

### 2. 获取并放置模板
**在刚刚进入的 `nodeauth` 目录下**，根据您的偏好下载对应的模板，并将其重命名为 `docker-compose.yml`（与 `data` 文件夹同级）：

*   [SQLite 极简版 (推荐)](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose.yml)：无需安装数据库，一键启动。
*   [MySQL 本地容器版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-local.yml)
*   [MySQL 远程连接版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-remote.yml)
*   [PostgreSQL 本地版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-local.yml)
*   [PostgreSQL 远程版](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-remote.yml)

<details>
<summary>点击查看：存储方案详细说明</summary>

#### 方案 A：极简型 (SQLite)
**适用人群**：个人用户、NAS 用户、希望“一包带走”的用户。
*   **优点**：无需额外部署数据库容器，数据全部存在 `data/nodeauth.db` 一个文件里。
*   **配置**：仅需挂载 `/app/data` 目录，无需填写任何 `DB_HOST` 变量。

#### 方案 B：经典型 (MySQL)
**适用人群**：已有 MySQL 环境、追求数据结构化管理的用户。
*   **支持方式**：支持与本地 MySQL 容器联动，或连接远程 RDS/云数据库。
*   **要求**：**必须**填写 `DB_HOST`, `DB_USER`, `DB_PASSWORD` 等完整连接变量。

#### 方案 C：进阶型 (PostgreSQL)
**适用人群**：追求极致性能或使用 Supabase 等外部 Postgres 服务。
*   **支持方案**：完美适配 Supabase 远程连接（建议开启 `DB_SSL=true`）。
*   **要求**：**必须**填写完整的 PG 连接信息。

</details>

### 3. 配置环境变量
请参考另一篇详细的 [环境变量配置指南](./env.md) 来正确修改 `docker-compose.yml` 文件里预留的环境变量。

### 4. 启动应用
```bash
docker compose up -d
```
启动后，访问 `http://服务器IP:3000` (或您在模板中自定义的端口) 即可进入。

---

## 🌐 反向代理与 HTTPS（强烈推荐）

> [!IMPORTANT]
> **强烈推荐使用反向代理配置HTTPS访问**：NodeAuth 的授权码与**绑定域名**关联验证。这意味着您可以通过一个固定的域名（如 `2fa.yourdomain.com`）来访问服务，而不直接使用 `IP:3000`。同时，PWA 的 Service Worker 也强制要求 HTTPS 环境。

以下提供两种主流的反代方案，任选其一。

---

### 方案一：Cloudflare Tunnel（零端口暴露，推荐）

Cloudflare Tunnel 通过出站连接（无需开放任何入站端口）将您的本地服务安全暴露到公网，非常适合没有公网 IP 或不想暴露服务器真实 IP 的场景。

**前置条件**：您的域名已托管在 Cloudflare（DNS 由 Cloudflare 管理）。

**步骤一：创建 Tunnel**

1. 登录 [Cloudflare Zero Trust 控制台](https://dash.cloudflare.com/?to=/:account/one/) → **网络** → **连接器** → **创建隧道**
2. 选择 **Cloudflared** 类型
3. 为 Tunnel 起一个名字，如  `nodeauth-worker`
4. 然后复制生成的 Token，格式如 `eyJhIjoiN****WbVl6ayJ9`

<details>
<summary>点击查看：详细步骤示意图</summary>
<img height="400" src="/deploy/e6506636-10d8-4f4f-b24a-1d0d52ce64a1.png" /><br />
<img height="250" src="/deploy/343e5742-3671-45a9-b8d5-e306b5ee6af8.png" /><br />
<img height="300" src="/deploy/9b0d3ab7-cacd-40f2-8461-18ae2ff34b81.png" /><br />
<img height="600" src="/deploy/bd6ce005-6d93-4ef7-9499-9a4aa1e35e83.png" />
</details>

**步骤二：配置公共主机名**

回到 Cloudflare Zero Trust 控制台，在 Tunnel 详情页的 **Public Hostname** 标签下，添加一条记录：

| 字段 | 值 |
|---|---|
| **Subdomain** | `2fa`（即 `2fa.yourdomain.com`）|
| **Domain** | 您的域名 |
| **Type** | `HTTP` |
| **URL** | `nodeauth:3000`（Docker 服务名 + 端口）|

<details>
<summary>点击查看：详细步骤示意图</summary>
<img height="400" src="/deploy/58771d96-5ad0-4e2d-9089-08ee513c42a7.png" />
</details>

**步骤三：在服务器上运行 cloudflared**

最简单的方式是将 `cloudflared` 作为一个 Docker 容器部署，与 NodeAuth 放在同一个 `docker-compose.yml` 中：

```yaml
services:
  nodeauth:
    image: nodeauth/nodeauth-worker:latest
    # 注意：使用 Tunnel 时，无需对外暴露端口，删除 ports 配置
    environment:
      - NODEAUTH_LICENSE=your_license
      # ... 其他环境变量
    volumes:
      - ./data:/app/data

  # 以下为新增 Cloudflare Tunnel 配置
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run
    environment:
      # 将上一步复制的 Token 粘贴在这里
      - TUNNEL_TOKEN=your_cloudflare_tunnel_token
    depends_on:
      - nodeauth
    restart: always
```

保存后，执行

```bash
docker compose up -d
```

Cloudflare 会自动签发证书并建立隧道。访问 `https://2fa.yourdomain.com` 即可，全程无需开放任何防火墙端口。

> [!TIP]
> 使用 Cloudflare Tunnel 时，HTTPS 由 Cloudflare 自动处理，容器与 Cloudflare 之间的流量也是加密的。这是目前**安全性最高**的反代方案，强烈推荐家庭宽带或 NAS 用户使用。

---

### 方案二：Nginx Proxy Manager（图形化，适合有公网 IP 的服务器）

[Nginx Proxy Manager](https://nginxproxymanager.com/) 提供 Web 界面，无需手写 Nginx 配置文件，支持一键申请 Let's Encrypt 证书。

**部署 NPM：**
```yaml
# 在单独的目录创建此文件，不要和 NodeAuth 混在一起
services:
  npm:
    image: jc21/nginx-proxy-manager:latest
    ports:
      - "80:80"
      - "443:443"
      - "81:81"   # NPM 管理面板
    volumes:
      - ./npm-data:/data
      - ./npm-letsencrypt:/etc/letsencrypt
```
```bash
docker compose up -d
```

**配置代理主机：**
1. 访问 `http://服务器IP:81`，使用默认账号 `admin@example.com` / `changeme` 登录并立即修改密码
2. 进入 **Proxy Hosts** → **Add Proxy Host**
3. 填写您的授权绑定域名，例如 `2fa.yourdomain.com`
4. **Forward Hostname/IP** 填写宿主机的内网 IP（或 `host.docker.internal`），**Port** 填写 NodeAuth 的端口（默认 `3000`）
5. 切换到 **SSL** 标签页，选择 **Request a new SSL Certificate**，勾选 **Force SSL**
6. 保存后，NPM 会自动从 Let's Encrypt 申请证书并完成配置

> [!NOTE]
> 使用 NPM 反代时，NodeAuth 容器**不需要**对外暴露端口。可以去掉 `docker-compose.yml` 中的 `ports` 配置，让两个容器通过 Docker 内网通信，更安全。

---

## 🛡️ 高级安全实践 (推荐)

在生产环境中，直接在 `docker-compose.yml` 暴露明文 Secret 会增加物理泄露的风险。我们建议采用前缀加密的加固策略：对于系统底层的关键凭据提供基础混淆支持，对于应用层的敏感密钥则支持高强度的 AES 加密。

```yaml
# 示例：加密后的环境变量片段

environment:
  # 一阶混淆：支持 base64: / hex: 前缀
  - NODEAUTH_LICENSE=base64:MjAyNjA0MJfTm9kZUF1dGhf...
  - JWT_SECRET=base64:MjAyNjA0MDJfTm9kZUF1dGhf...

  # 二阶强加密：除基础混淆外，强烈推荐使用 aes: 前缀进行高强度加密
  - ENCRYPTION_KEY=aes:iv:tag:cipher...
  - OAUTH_GOOGLE_CLIENT_ID=aes:iv:tag:cipher...
  - OAUTH_GOOGLE_CLIENT_SECRET=aes:iv:tag:cipher...
```

> **提示**：此类格式的配置条目可以通过 **[部署助手](https://tools.nodeauth.io)** 一键批量生成。

> [!NOTE]
> **关于应急恢复**：无论您在 `docker-compose.yml` 中如何加密，NodeAuth 在成功启动后为您生成的「应急恢复包 (PDF)」中始终会显示**解密后的明文密钥**。请务必妥善保存该 PDF 物理副本。

---

## 🛠️ 运维与排查

*   **Permission Denied**：99% 的启动失败都是因为没有执行上述 `chown 1000:1000` 命令。
*   **授权码验证失败**：请确认访问域名与在授权中心绑定的域名完全一致。
*   **更新应用**：
    ```bash
    docker compose pull
    docker compose up -d
    ```

<!-- [📸 UI截图提示：此处展示不同数据库引擎下的运行拓扑图或 Docker Dashboard 中的容器列表] -->
