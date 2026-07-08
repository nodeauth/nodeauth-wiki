---
description: "NodeAuth 环境变量配置深度指南。详细解析系统运行必需的核心安全密钥（License、加密密钥、JWT）、用户准入白名单（OIDC/OAuth）以及 7 大登录平台（GitHub、Google、Telegram 等）的具体配置流程。包含数据库引擎设置及高级安全加固（AES 加密脱敏）方案，确保您的部署稳健且合规。"
---
# 环境变量配置指南

不论您使用哪种部署方式，都需要配置以下核心环境变量。这些变量直接决定了系统的安全性与功能可用性。

## 🔐 核心安全密钥 (必须配置)

这些变量是系统运行的基石，**必须**设为 **32 位以上**的复杂随机字符串。[获取高强度随机字符串](https://tools.nodeauth.io)

| 变量名 | 必填 | 作用与建议 |
| :--- | :--- | :--- |
| `NODEAUTH_LICENSE` | ✅ | **授权：** 系统授权码。可在 [license.nodeauth.io](https://license.nodeauth.io) 获取。 |
| `ENCRYPTION_KEY` | ✅ | **核心：** 数据库加密密钥。所有的 2FA 种子在入库前都会用这个密钥加密。**设定后请勿更改**。要求 32 位以上随机码。可在 [tools.nodeauth.io](https://tools.nodeauth.io) 获取。 |
| `JWT_SECRET` | ✅ | **登录：** 用于签发登录令牌。要求 32 位以上随机码。可在 [tools.nodeauth.io](https://tools.nodeauth.io) 获取。 |

> [!CAUTION]
> **警告**：修改 `ENCRYPTION_KEY` 会导致所有已存账号的验证码计算错误。在备份完成前，请勿随意变动。

---

## 🛡️ 准入白名单 (必须配置)

NodeAuth 拒绝公开注册，必须预设允许进入的用户。

| 变量名 | 必填 | 示例与说明 |
| :--- | :--- | :--- |
| `OAUTH_ALLOWED_USERS` | ✅ | 允许登录的邮箱、Telegram ID、Web3 钱包地址。多个用户请用**半角逗号** `,` 分开。如：`admin@example.com,12345678,0xe0a156ce36****6a98` |

---

## ☁️ 登录平台配置 (至少配置一个,支持多个)

您必须至少配置一种三方登录方式，否则将无法登录系统。

### 1. GitHub (推荐，最简单)
1. 访问 GitHub [Developer Settings](https://github.com/settings/developers) -> **OAuth Apps** -> **New OAuth App**。
2. **Homepage URL**: `https://您的域名`
3. **Authorization callback URL**: `https://您的域名/oauth/callback`
4. 注册后记录 `Client ID` 和 `Client Secret`。
5. **填入环境变量**：
   *   `OAUTH_GITHUB_CLIENT_ID`
   *   `OAUTH_GITHUB_CLIENT_SECRET`
   *   `OAUTH_GITHUB_REDIRECT_URI`: `https://您的域名/oauth/callback`

<details>
<summary>点击查看：Github OAuth 配置示意图</summary>
<img width="600" alt="Github OAuth 配置示意" src="/deploy/aa03b15f-deb2-4e48-bf4b-e57be342adbb.png" />
</details>

### 2. Cloudflare Access (Zero Trust)
1. 进入 **Cloudflare Zero Trust Dashboard** -> **Access** -> **Applications**。
2. 点击 **Add an Application** -> 选择 **SaaS**。
3. **Application name**: `nodeauth`
4. **Authentication protocol**: `OIDC`
5. **Redirect URL**: `https://您的域名/oauth/callback`
6. 在配置页获取 `Client ID` 和 `Client Secret`。
7. **填入环境变量**：
   *   `OAUTH_CLOUDFLARE_CLIENT_ID`
   *   `OAUTH_CLOUDFLARE_CLIENT_SECRET`
   *   `OAUTH_CLOUDFLARE_REDIRECT_URI`: `https://您的域名/oauth/callback`
   *   `OAUTH_CLOUDFLARE_ORG_DOMAIN`: 您的团队域名（如 `example.cloudflareaccess.com`）

<details>
<summary>点击查看：Cloudflare Access OAuth 配置示意图</summary>
<img height="250" src="/deploy/c6101ee8-f3c3-44f6-9286-f17865f8fb10.png" /><br />
<img height="300" src="/deploy/5ad539ec-1f0a-4141-be31-88f676c8011a.png" /><br />
<img height="300" src="/deploy/e4b00a92-9eb6-44a3-8819-b34e4dff2107.png" /><br />
<img height="500" src="/deploy/1e315f8f-1932-4c90-a2d7-0edf8049529f.png" /><br />
<img height="200" src="/deploy/c35b3083-96f1-46de-aa98-ae1b5bda0c78.png" />
</details>

### 3. Google
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)，创建一个新项目。
2. 导航至 **API & Services** -> **OAuth consent screen**，完成基础设置。
3. 导航至 **Credentials** -> **Create Credentials** -> **OAuth client ID**。
4. 应用类型选择：**Web application**。
5. **Authorized redirect URIs**: `https://您的域名/oauth/callback`
6. **填入环境变量**：
   *   `OAUTH_GOOGLE_CLIENT_ID`
   *   `OAUTH_GOOGLE_CLIENT_SECRET`
   *   `OAUTH_GOOGLE_REDIRECT_URI`: `https://您的域名/oauth/callback`

### 4. Telegram
虽然 Telegram 无需 `REDIRECT_URI` 变量，但需要通过 BotFather 绑定域名：
1. 在 Telegram 搜索并添加官方机器人 **[@BotFather](https://t.me/BotFather)**，发送 `/newbot` 创建机器人。
2. 记录生成的 **Token** (`OAUTH_TELEGRAM_BOT_TOKEN`) 和 **用户名** (`OAUTH_TELEGRAM_BOT_NAME`)。
3. 对着 @BotFather 发送 `/setdomain` 指令，选择您的机器人，输入您的**应用域名**（如 `nodeauth.pages.dev`，不含 https）。
4. **关键步骤 (注册 Webhook)**：
   将下方链接中的 `<Token>`、`<域名>` 和 `<Secret>`（32位以上随机字符串）替换后，在浏览器中访问一次：
   `https://api.telegram.org/bot<Token>/setWebhook?url=https://<域名>/api/telegram/webhook&secret_token=<Secret>`
5. **填入环境变量**：
   *   `OAUTH_TELEGRAM_BOT_NAME`
   *   `OAUTH_TELEGRAM_BOT_TOKEN`
   *   `OAUTH_TELEGRAM_WEBHOOK_SECRET`: 您在上面设置的 `<Secret>` 字符串。[获取高强度随机字符串](https://tools.nodeauth.io)

### 5. Gitee
1. 访问 Gitee [第三方应用设置](https://gitee.com/oauth/applications) -> **创建应用**。
2. **应用回调地址**: `https://您的域名/oauth/callback`
3. 勾选权限：`user_info`。
4. **填入环境变量**：
   *   `OAUTH_GITEE_CLIENT_ID`
   *   `OAUTH_GITEE_CLIENT_SECRET`
   *   `OAUTH_GITEE_REDIRECT_URI`: `https://您的域名/oauth/callback`

### 6. NodeLoc 社区
1. 访问 [NodeLoc OAuth 设置](https://www.nodeloc.com/oauth-provider/applications) 创建应用。
2. **Redirect URI**: `https://您的域名/oauth/callback`
3. **填入环境变量**：
   *   `OAUTH_NODELOC_CLIENT_ID`
   *   `OAUTH_NODELOC_CLIENT_SECRET`
   *   `OAUTH_NODELOC_REDIRECT_URI`: `https://您的域名/oauth/callback`

### 7. Web3 钱包登录 (WalletConnect)
1. 在 [WalletConnect Cloud](https://cloud.walletconnect.com/) 注册并创建一个新项目。
2. 填入：`OAUTH_WALLETCONNECT_PROJECT_ID`。
3. (可选) `OAUTH_WALLETCONNECT_SELF_PROXY=true` 可开启内置代理。

---

## 🗄️ 数据库引擎配置 (仅限 Docker 方式部署)

如果您使用 Cloudflare Workers 部署，系统会自动使用 D1 数据库，**无需配置**以下变量。

如果您在 Docker 或自己的服务器上部署：
*   **默认使用 SQLite**：仅需挂载 `/app/data` 目录，无需配置以下数据库连接变量。
*   **使用 MySQL / PostgreSQL / LibSQL / D1**：请配置 `DB_ENGINE`，并在其后选择**方式一**或**方式二**进行连接。

| 基础变量名 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `DB_ENGINE` | ✅ | `sqlite` | 数据库类型：支持 `sqlite`, `mysql`, `postgresql`, `libsql`, `d1`。 |

#### 方式一：完整连接串配置（⭐ 强烈推荐首选）
最简便的现代化配置方式，仅需一行标准连接 URL 即可打通，尤其适用于 Turso、Supabase 或各类云端数据库。

| 变量名 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `DB_URL` | ✅ | - | **标准连接字符串**。例如 `mysql://user:pass@host:3306/dbname` 或 `postgresql://...`。 |
| `DB_TOKEN` | 按需 | - | **云数据库鉴权令牌**。仅在连接 `libsql` (如 Turso) 或 `d1` (Cloudflare D1 Proxy) 等需要 Token 鉴定时填写。 |
| `DB_SSL` | ❌ | `false` | 是否启用 SSL 连接（连接远程云数据库时建议设为 `true`）。 |

#### 方式二：传统分立参数配置（备选）
如果您偏好传统的独立字段配置（如连接 Docker 容器内部网络的数据库），也可使用以下参数分立填写（如已填写上方 `DB_URL`，则本小节参数全部自动忽略）。

| 变量名 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `DB_HOST` | ✅ | - | 数据库服务器地址。支持本地 `localhost`、Docker 服务名（如 `mysql-db`）、远程域名或 IP。 |
| `DB_PORT` | ✅ | - | 数据库端口。MySQL 默认为 `3306`，PostgreSQL 默认为 `5432`。 |
| `DB_USER` | ✅ | - | 数据库用户名。 |
| `DB_PASSWORD` | ✅ | - | 数据库密码。 |
| `DB_NAME` | ✅ | - | 具体的数据库名称。 |
| `DB_SSL` | ❌ | `false` | 是否启用 SSL 连接。 |


---

## 📦 云端自动备份配置 (可选)
详细配置流程请参考 [云端备份设置指南](../data/backup)。

如果您已配置了 Google 登录，部分变量可以通用，但**回调地址 (Redirect URI)** 必须使用备份专用路径。

| 网盘平台 | 客户端 ID 变量 | 客户端密钥 变量 | 备份专用回调地址变量 |
| :--- | :--- | :--- | :--- |
| **Google** | `OAUTH_GOOGLE_CLIENT_ID` | `OAUTH_GOOGLE_CLIENT_SECRET` | `OAUTH_GOOGLE_BACKUP_REDIRECT_URI` |
| **OneDrive** | `OAUTH_MICROSOFT_CLIENT_ID` | `OAUTH_MICROSOFT_CLIENT_SECRET` | `OAUTH_MICROSOFT_BACKUP_REDIRECT_URI` |
| **Dropbox** | `OAUTH_DROPBOX_CLIENT_ID` | `OAUTH_DROPBOX_CLIENT_SECRET` | `OAUTH_DROPBOX_BACKUP_REDIRECT_URI` |
| **Baidu** | `OAUTH_BAIDU_CLIENT_ID` | `OAUTH_BAIDU_CLIENT_SECRET` | `OAUTH_BAIDU_BACKUP_REDIRECT_URI` |

*注：回调地址统一格式为 `https://您的域名/api/backups/oauth/[平台名]/callback`*

---

## 🌐 内网穿透配置 (可选)

当通过 Docker 方式部署并希望利用内网穿透安全开放服务时，推荐配置此变量：

| 变量名 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `CLOUDFLARE_TUNNEL_TOKEN` | - | Cloudflare Tunnel 的官方安全连接 Token。填入后容器会在启动时自动唤起内置的 `cloudflared` 守护进程，无需对外暴露任何宿主机入站端口。建议通过 `aes:`, `base64:` 或 `hex:` 格式加密脱敏。 |

---

## ⚙️ 其他配置（可选）

| 变量名 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `LOG_LEVEL` | `info` | 日志级别：`debug`, `info`, `warn`, `error` |
| `PORT` | `3000` | (仅 Docker) 后端监听端口 |

## 🛡️ 配置安全加固（可选）

为了极致的安全，NodeAuth 允许你通过**前缀转换**，让原本明文存储的敏感信息（如 API 密钥、数据库密码）在配置文件中以**加密密文**的形式存在。

### 为什么要这么做？
即使您的 `docker-compose.yml` 或环境变量文件意外泄露，第三方也无法直接读取到真实的明文凭证，从而构建了一道坚实的纵深防御防线。

### 🔐 保护等级方案

根据变量的不同性质，系统提供两套安全加固逻辑：

| 安全等级 | 支持变量 | 处理方式 (前缀) | 说明 |
| :--- | :--- | :--- | :--- |
| **⭐ 编码脱敏** | `NODEAUTH_LICENSE`, `JWT_SECRET` | `base64:`, `hex:` | 用于会话签名的核心锚点，支持基础的编码与十六进制脱敏。 |
| **🛡️ 加密保护** | 其余所有敏感变量 | `base64:`, `hex:`, `aes:` | 包含数据库密码 (`DB_PASSWORD`, `DB_TOKEN`, `DB_URL`)、准入白名单 (`OAUTH_ALLOWED_USERS`)、穿透凭证 (`CLOUDFLARE_TUNNEL_TOKEN`) 以及各类第三方应用凭证 (`OAUTH_*`)，均可使用 **`aes:`** 进行高强度加密。 |

### 🛠️ 快速上手 (三步搞定)

1. **打开工具站**：访问 **[NodeAuth 部署助手 (tools.nodeauth.io)](https://tools.nodeauth.io)**。
2. **生成与转换**：
   *   生成 64 位随机码作为 `JWT_SECRET`。
   *   通过[license.nodeauth.io](https://license.nodeauth.io)获取 `NODEAUTH_LICENSE`，
   *   将你的其他环境变量信息粘贴进“AES 加密”框，填入`根密钥 (明文 JWT_SECRET)` 与 `授权码 (明文 NODEAUTH_LICENSE)`，点击执行加密。
3. **粘贴回配置文件**：**关键点**：直接复制生成出的整行结果（必须包含 `aes:`、`base64:` 或 `hex:` 前缀），原地替换回您的部署文件中即可。

**示例展示：**
```yaml
# 示例片段
JWT_SECRET=base64:MjAyNjA0MDJfTm9kZUF1dGhfUm9...
OAUTH_GOOGLE_CLIENT_ID=aes:iv:tag:cipher_text_here...
ENCRYPTION_KEY=aes:iv:tag:cipher_text_here...
```
