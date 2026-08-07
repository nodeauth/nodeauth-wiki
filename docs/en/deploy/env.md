---
description: "NodeAuth Environment Variables Configuration In-depth Guide. Details the specific configuration workflows for core security keys essential for system operation (License, Encryption Key, JWT), user admission allowlists (OIDC/OAuth), and 7 major login platforms (GitHub, Google, Telegram, etc.). Includes database engine setups and advanced security hardening (AES encryption desensitization) solutions to ensure your deployment is robust and compliant."
---
# Environment Variables Guide

Regardless of the deployment method you choose, you need to configure the following core environment variables. These variables directly determine the system's security and functional availability.

## 🔐 Core Security Keys (Must Configure)

These variables are the foundation of the system's operation and **must** be set to complex random strings of **at least 32 characters**.

| Variable | Required | Description & Recommendation |
| :--- | :--- | :--- |
| `NODEAUTH_LICENSE` | ✅ | **License:** System license code. Apply at [license.nodeauth.io](https://license.nodeauth.io). |
| `ENCRYPTION_KEY` | ✅ | **Core:** Secret for database encryption. All 2FA seeds are encrypted before storage. **Do not change once set**. Minimum 32-bit random string required. Obtain at [tools.nodeauth.io](https://tools.nodeauth.io). |
| `JWT_SECRET` | ✅ | **Login:** Used for JWT token signing. High-strength 64-bit random string recommended. Obtain at [tools.nodeauth.io](https://tools.nodeauth.io). |

> [!CAUTION]
> **Warning**: Modifying `ENCRYPTION_KEY` will render all existing 2FA data unreadable. Ensure a full backup is completed before making any changes.

---

## 🛡️ Admission Allowlist (Must Configure)

> [!IMPORTANT]
> **🚀 Security Architecture Upgrade (Breaking Change)**
> To prevent cross-platform numeric ID collision attacks (e.g., a Twitter ID spoofing a DingTalk mobile number), NodeAuth now enforces **Strict Namespace Isolation**.
> **For platforms verified by `id` (Telegram and Twitter):**
> Your whitelist entries must be prefixed with the platform name, such as `telegram:12345678` or `twitter:87654321`. Raw numbers are no longer allowed and will be rejected! Logins based on `email` and `mobile` are unaffected.

NodeAuth refuses public registration; you must preset the users allowed to enter.

| Variable | Required | Examples & Description |
| :--- | :--- | :--- |
| `OAUTH_ALLOWED_USERS` | ✅ | Emails, prefixed Telegram/X (Twitter) IDs, or Web3 wallet addresses allowed to login. Separate multiple users with **commas** `,`. E.g.: `admin@example.com,telegram:12345678,twitter:1729837492,0xe0a156ce36****6a98` |

---

## ☁️ Login Platform Configuration (At least one, multiple supported)

You must configure at least one third-party login method; otherwise, you will not be able to log into the system.

### 1. GitHub (Recommended, Easiest)
1. Visit GitHub [Developer Settings](https://github.com/settings/developers) -> **OAuth Apps** -> **New OAuth App**.
2. **Homepage URL**: `https://your-domain.com`
3. **Authorization callback URL**: `https://your-domain.com/oauth/callback`
4. Record the `Client ID` and `Client Secret` after registration.
5. **Fill in Environment Variables**:
   *   `OAUTH_GITHUB_CLIENT_ID` (Corresponds to GitHub's Client ID)
   *   `OAUTH_GITHUB_CLIENT_SECRET` (Corresponds to GitHub's Client Secret)
   *   `OAUTH_GITHUB_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

<details>
<summary>Click to view: GitHub OAuth Configuration Mockup</summary>
<img width="600" alt="GitHub OAuth Configuration Mockup" src="/deploy/aa03b15f-deb2-4e48-bf4b-e57be342adbb.png" />
</details>

### 2. Cloudflare Access (Zero Trust)
1. Go to **Cloudflare Zero Trust Dashboard** -> **Access** -> **Applications**.
2. Click **Add an Application** -> select **SaaS**.
3. **Application name**: `nodeauth`
4. **Authentication protocol**: `OIDC`
5. **Redirect URL**: `https://your-domain.com/oauth/callback`
6. Get the `Client ID` and `Client Secret` from the configuration page.
7. **Fill in Environment Variables**:
   *   `OAUTH_CLOUDFLARE_CLIENT_ID` (Corresponds to Cloudflare's Client ID)
   *   `OAUTH_CLOUDFLARE_CLIENT_SECRET` (Corresponds to Cloudflare's Client Secret)
   *   `OAUTH_CLOUDFLARE_REDIRECT_URI`: `https://your-domain.com/oauth/callback`
   *   `OAUTH_CLOUDFLARE_ORG_DOMAIN`: Your team domain (e.g., `example.cloudflareaccess.com`)

<details>
<summary>Click to view: Cloudflare Access OAuth Configuration Mockup</summary>
<img height="250" src="/deploy/c6101ee8-f3c3-44f6-9286-f17865f8fb10.png" /><br />
<img height="300" src="/deploy/5ad539ec-1f0a-4141-be31-88f676c8011a.png" /><br />
<img height="300" src="/deploy/e4b00a92-9eb6-44a3-8819-b34e4dff2107.png" /><br />
<img height="500" src="/deploy/1e315f8f-1932-4c90-a2d7-0edf8049529f.png" /><br />
<img height="200" src="/deploy/c35b3083-96f1-46de-aa98-ae1b5bda0c78.png" />
</details>

### 3. Google
1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. Navigate to **API & Services** -> **OAuth consent screen** and complete the basic setup.
3. Navigate to **Credentials** -> **Create Credentials** -> **OAuth client ID**.
4. Choose application type: **Web application**.
5. **Authorized redirect URIs**: `https://your-domain.com/oauth/callback`
6. **Fill in Environment Variables**:
   *   `OAUTH_GOOGLE_CLIENT_ID` (Corresponds to Google's Client ID)
   *   `OAUTH_GOOGLE_CLIENT_SECRET` (Corresponds to Google's Client Secret)
   *   `OAUTH_GOOGLE_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

### 4. Telegram
While Telegram doesn't require a `REDIRECT_URI` variable, you need to bind the domain via BotFather:
1. Search for and add the official bot **[@BotFather](https://t.me/BotFather)** on Telegram, send `/newbot` to create a bot.
2. Record the generated **Token** (`OAUTH_TELEGRAM_BOT_TOKEN`) and **Username** (`OAUTH_TELEGRAM_BOT_NAME`).
3. Send the `/setdomain` command to @BotFather, select your bot, and enter your **application domain** (e.g., `nodeauth.pages.dev`, without https).
4. **Critical Step (Register Webhook)**:
   Replace `<Token>`, `<domain>`, and `<Secret>` (at least 32 characters) in the following link and visit it once in your browser:
   `https://api.telegram.org/bot<Token>/setWebhook?url=https://<domain>/api/telegram/webhook&secret_token=<Secret>`
5. **Fill in Environment Variables**:
   *   `OAUTH_TELEGRAM_BOT_NAME` (Corresponds to Telegram Bot's Username)
   *   `OAUTH_TELEGRAM_BOT_TOKEN` (Corresponds to Telegram Bot's Token)
   *   `OAUTH_TELEGRAM_WEBHOOK_SECRET`: The `<Secret>` string you set above. [Get a high-strength random string](https://tools.nodeauth.io)

### 5. Gitee
1. Visit Gitee [Third-party Application Settings](https://gitee.com/oauth/applications) -> **Create Application**.
2. **Application Callback Address**: `https://your-domain.com/oauth/callback`
3. Check permission: `user_info`.
4. **Fill in Environment Variables**:
   *   `OAUTH_GITEE_CLIENT_ID` (Corresponds to Gitee's Client ID)
   *   `OAUTH_GITEE_CLIENT_SECRET` (Corresponds to Gitee's Client Secret)
   *   `OAUTH_GITEE_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

### 6. NodeLoc Community
1. Visit [NodeLoc OAuth Settings](https://www.nodeloc.com/oauth-provider/applications) and create an application.
2. **Redirect URI**: `https://your-domain.com/oauth/callback`
3. **Fill in Environment Variables**:
   *   `OAUTH_NODELOC_CLIENT_ID` (Corresponds to NodeLoc's Client ID)
   *   `OAUTH_NODELOC_CLIENT_SECRET` (Corresponds to NodeLoc's Client Secret)
   *   `OAUTH_NODELOC_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

### 7. Web3 Wallet Login (WalletConnect)
1. Register and create a new project at [WalletConnect Cloud](https://cloud.walletconnect.com/).
2. **Fill in Environment Variables**:
   *   `OAUTH_WALLETCONNECT_PROJECT_ID` (Corresponds to WalletConnect's Project ID)
3. (Optional) `OAUTH_WALLETCONNECT_SELF_PROXY=true` to enable built-in proxy.

### 8. X (Twitter)
Provides the smoothest login experience specifically for Crypto / Web3 users:
1. Visit and log into the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).
2. Create or select your app under **Projects & Apps**.
3. Navigate to **User authentication set up** and click `Set up`.
4. **App permissions**: Check `Read`.
5. **Type of App**: Select `Web App, Automated App or Bot`.
6. **Callback URI / Redirect URL**: `https://your-domain.com/oauth/callback`
7. **Website URL**: `https://www.nodeauth.io` or `https://your-domain.com`
8. Save and record the generated **Client ID** and **Client Secret** (only shown once).
9. **Fill in Environment Variables**:
   *   `OAUTH_TWITTER_CLIENT_ID` (Corresponds to Twitter's Client ID)
   *   `OAUTH_TWITTER_CLIENT_SECRET` (Corresponds to Twitter's Client Secret)
   *   `OAUTH_TWITTER_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

::: tip How to get your X account's numeric ID (for whitelisting)?
X (Twitter) login does not support email whitelisting; you must use your unique numeric ID. After logging into the X Developer Console, you can find it directly in your browser's address bar. 

For example, if the current URL is `https://console.x.com/accounts/2085375101801844736`, then **`2085375101801844736`** is your numeric ID.

Simply enter `twitter:2085375101801844736` into your `OAUTH_ALLOWED_USERS` environment variable to allow access for this account.
:::

### 9. Lark (Global) / Feishu (China)
The configuration process for both is identical, differing only in the portal domains and environment variable prefixes.
1. Visit and log into the open platform: [open.larksuite.com](https://open.larksuite.com/) for Lark Global, or [open.feishu.cn](https://open.feishu.cn/) for Feishu China.
2. Enter the "Developer Console" and click **Create Custom App**.
3. In the left navigation bar, find **Security Settings**, and add to "Redirect URLs": `https://your-domain.com/oauth/callback`.
4. In the left navigation bar, find **Permissions & Scopes**, search at the top and check **Obtain user email information** (Permission ID is `contact:user.email:readonly`). Be sure to check this to ensure NodeAuth can obtain the email for whitelist verification.
5. In the left navigation bar, find **Version Management & Release**, create a new version, configure the availability (e.g., "Specific Members" or "All Members"), and then **Submit for Release**. Otherwise, the permission and availability changes will not take effect.
6. In the left navigation bar, find **Credentials & Basic Info**, and obtain the App ID and App Secret.
7. **Fill in Environment Variables**:
   Depending on the version you are integrating, fill in the corresponding variables (you can configure both sets if your team uses both; two buttons will appear):
   
   **For Lark (Global):**
   *   `OAUTH_LARK_CLIENT_ID` (Corresponds to Lark's App ID)
   *   `OAUTH_LARK_CLIENT_SECRET` (Corresponds to Lark's App Secret)
   *   `OAUTH_LARK_REDIRECT_URI`: `https://your-domain.com/oauth/callback`
   
   **For Feishu (China):**
   *   `OAUTH_FEISHU_CLIENT_ID` (Corresponds to Feishu's App ID)
   *   `OAUTH_FEISHU_CLIENT_SECRET` (Corresponds to Feishu's App Secret)
   *   `OAUTH_FEISHU_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

### 10. DingTalk
Supports SSO via DingTalk QR code or password. Since enterprise emails are often not enforced, NodeAuth supports using **email** or **mobile number** for whitelist verification.
1. Visit and log into the [DingTalk Open Platform](https://open-dev.dingtalk.com/).
2. Go to "App Development - Custom App", and click **Create App**.
3. In the left navigation bar, find **Share Settings**, and add to "Redirect URI": `https://your-domain.com/oauth/callback`.
4. In the left navigation bar, find **Permissions**, and apply for:
   - **Personal mobile phone information** (used for whitelist verification)
   - **Contact personal information read permission** (used to obtain email and basic info)
5. In the left navigation bar, find **Version Management & Release**, create a new version, set the availability range (e.g., "Some Members" or "All Members"), and **Submit for Release**, otherwise permission changes will not take effect.
6. In the left navigation bar, find **Basic Info**, and obtain the AppKey and AppSecret.
7. **Fill in Environment Variables**:
   *   `OAUTH_DINGTALK_CLIENT_ID` (corresponds to DingTalk AppKey)
   *   `OAUTH_DINGTALK_CLIENT_SECRET` (corresponds to DingTalk AppSecret)
   *   `OAUTH_DINGTALK_REDIRECT_URI`: `https://your-domain.com/oauth/callback`
   *   `OAUTH_DINGTALK_CORP_ID` (Optional, skips organization selection during login if specified)

### 11. Microsoft (Azure AD)
Supports Microsoft Personal accounts and Work or School accounts.
1. Visit and log into [Azure Portal - App registrations](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).
2. Click **New registration**.
3. **Name**: `NodeAuth`
4. **Supported account types**: Recommended to choose `Accounts in any organizational directory and personal Microsoft accounts (e.g. Skype, Xbox)` (Multi-tenant mode).
5. **Redirect URI**: Select `Web`, and fill in `https://your-domain.com/oauth/callback`.
6. After registration, record the `Application (client) ID` on the **Overview** page.
7. In the left navigation bar, find **Certificates & secrets**, create a `New client secret`, and record its Value.
8. **Fill in Environment Variables**:
   *   `OAUTH_MICROSOFT_CLIENT_ID` (Corresponds to Microsoft's Application (client) ID)
   *   `OAUTH_MICROSOFT_CLIENT_SECRET` (Corresponds to Microsoft's Client Secret Value)
   *   `OAUTH_MICROSOFT_REDIRECT_URI`: `https://your-domain.com/oauth/callback`
   *   *(Optional)* `OAUTH_MICROSOFT_TENANT_ID`: Defaults to `common` (Multi-tenant). If you chose single tenant in step 4, fill in your Tenant ID here for stricter isolation.

---

## 📦 Automatic Cloud Backup Configuration (Optional)
For detailed configuration steps, please refer to the [Cloud Backup Guide](../data/backup).

> [!WARNING]
> For security isolation and to avoid triggering the "Unverified App" warning, **backup configurations are now completely decoupled from login configurations**. Please create a dedicated OAuth application for the cloud drive you intend to use (do not share it with the login app).

| Cloud Drive | Client ID Variable | Client Secret Variable | Backup Redirect URI Variable | Other Specific Variables |
| :--- | :--- | :--- | :--- | :--- |
| **Google** | `OAUTH_GOOGLE_BACKUP_CLIENT_ID` | `OAUTH_GOOGLE_BACKUP_CLIENT_SECRET` | `OAUTH_GOOGLE_BACKUP_REDIRECT_URI` | - |
| **OneDrive** | `OAUTH_MICROSOFT_BACKUP_CLIENT_ID` | `OAUTH_MICROSOFT_BACKUP_CLIENT_SECRET` | `OAUTH_MICROSOFT_BACKUP_REDIRECT_URI` | `OAUTH_MICROSOFT_BACKUP_TENANT_ID` |
| **Dropbox** | `OAUTH_DROPBOX_BACKUP_CLIENT_ID` | `OAUTH_DROPBOX_BACKUP_CLIENT_SECRET` | `OAUTH_DROPBOX_BACKUP_REDIRECT_URI` | - |
| **Baidu** | `OAUTH_BAIDU_BACKUP_CLIENT_ID` | `OAUTH_BAIDU_BACKUP_CLIENT_SECRET` | `OAUTH_BAIDU_BACKUP_REDIRECT_URI` | - |

*Note: Backup Redirect URIs follow the format `https://your-domain.com/api/backups/oauth/[platform]/callback`*

---

## 🗄️ Database Engine Configuration (Only for Docker Deployment)

If you use Cloudflare Workers deployment, the system will automatically use the D1 database, and **no configuration** of the following variables is necessary.

If you are deploying on Docker or your own server:
*   **Default using SQLite**: Simply mount the `/app/data` directory; no database connection configuration is needed.
*   **Using MySQL / PostgreSQL / LibSQL / D1**: Please configure `DB_ENGINE`, followed by either **Method 1** or **Method 2** below.

| Basic Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `DB_ENGINE` | ✅ | `sqlite` | Database Type: supports `sqlite`, `mysql`, `postgresql`, `libsql`, `d1`. |

#### Method 1: Full Connection String (⭐ Highly Recommended)
The simplest modern configuration method. Just one line of standard connection URL connects your database, ideal for Turso, Supabase, or external cloud databases.

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `DB_URL` | ✅ | - | **Standard connection string**. e.g., `mysql://user:pass@host:3306/dbname` or `postgresql://...`. |
| `DB_TOKEN` | On-demand | - | **Cloud database auth token**. Required only when connecting to `libsql` (e.g., Turso) or `d1` (Cloudflare D1 Proxy) which require token authentication. |
| `DB_SSL` | ❌ | `false` | Whether to enable SSL connection (recommended as `true` when connecting to remote cloud databases). |

#### Method 2: Traditional Separate Parameters (Alternative)
If you prefer traditional separate parameter configuration (e.g., connecting to a database within Docker internal networks), fill in the fields below (if `DB_URL` above is provided, all parameters in this section are automatically ignored).

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `DB_HOST` | ✅ | - | Database server address. Supports local `localhost`, Docker service name (e.g., `mysql-db`), remote domain, or IP. |
| `DB_PORT` | ✅ | - | Database port. MySQL default is `3306`, PostgreSQL default is `5432`. |
| `DB_USER` | ✅ | - | Database username. |
| `DB_PASSWORD` | ✅ | - | Database password. |
| `DB_NAME` | ✅ | - | Specific database name. |
| `DB_SSL` | ❌ | `false` | Whether to enable SSL connection. |

---

## 🌐 Tunnel Configuration (Optional)

When deploying via Docker and wishing to securely expose services via Cloudflare Tunnel without opening inbound ports, we recommend configuring this variable:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `CLOUDFLARE_TUNNEL_TOKEN` | - | Official Cloudflare Tunnel Token. Once configured, the container will automatically launch the built-in `cloudflared` daemon upon startup without exposing any host inbound ports. We recommend encrypting it with `aes:`, `base64:`, or `hex:` prefixes. |

---

## ⚙️ Other Optional Configurations

| Variable | Default | Description |
| :--- | :--- | :--- |
| `LOG_LEVEL` | `info` | Log level: `debug`, `info`, `warn`, `error` |
| `PORT` | `3000` | (Docker only) Backend listening port |

## 🛡️ Config Hardening (Optional)

For ultimate security, NodeAuth supports **Prefix Transformation**, allowing sensitive information (such as API keys and database passwords) to be stored as **encrypted ciphertext** in configuration files.

### Why use this?
Even if your `docker-compose.yml` or environment variable file is accidentally leaked, third parties cannot directly read the actual plaintext credentials, building a solid defense-in-depth line.

### 🔐 Security Tiers

Depending on the nature of the variables, the system provides two levels of security logic:

| Security Tier | Variables | Handling (Prefix) | Description |
| :--- | :--- | :--- | :--- |
| **⭐ Obfuscation** | `NODEAUTH_LICENSE`, `JWT_SECRET` | `base64:`, `hex:` | Root anchor for session signing. Supports basic encoding and hex obfuscation. |
| **🛡️ Encryption** | All other sensitive variables | `base64:`, `hex:`, `aes:` | Includes database passwords (`DB_PASSWORD`, `DB_TOKEN`, `DB_URL`), access allowlists (`OAUTH_ALLOWED_USERS`), tunnel credentials (`CLOUDFLARE_TUNNEL_TOKEN`), and third-party OAuth credentials (`OAUTH_*`). Highly recommend using **`aes:`** for robust encryption. |

### 🛠️ Quick Start (3 Steps)

1. **Open Tool**: Visit the official **[NodeAuth Deploy Helper (tools.nodeauth.io)](https://tools.nodeauth.io)**.
2. **Generate & Encrypt**:
   *   Generate a 64-bit random string for your `JWT_SECRET`.
   *   Obtain your `NODEAUTH_LICENSE` from [license.nodeauth.io](https://license.nodeauth.io).
   *   Paste your secrets into the "AES Encryptor" box, provide your `Root Key (plaintext JWT_SECRET)` and `License (plaintext NODEAUTH_LICENSE)`, and execute encryption.
3. **Apply to File**: Copy the entire generated lines (**including the `aes:` or `base64:` prefix**) and replace the values in your config file.

**Example:**
```yaml
# Example snippet
JWT_SECRET=base64:MjAyNjA0MDJfTm9kZUF1dGhfUm9...
OAUTH_GOOGLE_CLIENT_ID=aes:iv:tag:cipher_text_here...
ENCRYPTION_KEY=aes:iv:tag:cipher_text_here...
```

> [!CAUTION]
> **Warning**: Modifying `ENCRYPTION_KEY` will cause verification code calculation errors or decryption failures for all stored accounts. Do not change it arbitrarily until backups are completed.
