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

NodeAuth refuses public registration; you must preset the users allowed to enter.

| Variable | Required | Examples & Description |
| :--- | :--- | :--- |
| `OAUTH_ALLOWED_USERS` | ✅ | Emails, Telegram IDs, or Web3 wallet addresses allowed to login. Separate multiple users with **commas** `,`. E.g.: `admin@example.com,12345678,0xe0a156ce36****6a98` |

---

## ☁️ Login Platform Configuration (At least one, multiple supported)

You must configure at least one third-party login method; otherwise, you will not be able to log into the system.

### 1. GitHub (Recommended, Easiest)
1. Visit GitHub [Developer Settings](https://github.com/settings/developers) -> **OAuth Apps** -> **New OAuth App**.
2. **Homepage URL**: `https://your-domain.com`
3. **Authorization callback URL**: `https://your-domain.com/oauth/callback`
4. Record the `Client ID` and `Client Secret` after registration.
5. **Fill in Environment Variables**:
   *   `OAUTH_GITHUB_CLIENT_ID`
   *   `OAUTH_GITHUB_CLIENT_SECRET`
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
   *   `OAUTH_CLOUDFLARE_CLIENT_ID`
   *   `OAUTH_CLOUDFLARE_CLIENT_SECRET`
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
   *   `OAUTH_GOOGLE_CLIENT_ID`
   *   `OAUTH_GOOGLE_CLIENT_SECRET`
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
   *   `OAUTH_TELEGRAM_BOT_NAME`
   *   `OAUTH_TELEGRAM_BOT_TOKEN`
   *   `OAUTH_TELEGRAM_WEBHOOK_SECRET`: The `<Secret>` string you set above. [Get a high-strength random string](https://tools.nodeauth.io)

### 5. Gitee
1. Visit Gitee [Third-party Application Settings](https://gitee.com/oauth/applications) -> **Create Application**.
2. **Application Callback Address**: `https://your-domain.com/oauth/callback`
3. Check permission: `user_info`.
4. **Fill in Environment Variables**:
   *   `OAUTH_GITEE_CLIENT_ID`
   *   `OAUTH_GITEE_CLIENT_SECRET`
   *   `OAUTH_GITEE_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

### 6. NodeLoc Community
1. Visit [NodeLoc OAuth Settings](https://nodeloc.com/account/oauth-apps) and create an application.
2. **Redirect URI**: `https://your-domain.com/oauth/callback`
3. **Fill in Environment Variables**:
   *   `OAUTH_NODELOC_CLIENT_ID`
   *   `OAUTH_NODELOC_CLIENT_SECRET`
   *   `OAUTH_NODELOC_REDIRECT_URI`: `https://your-domain.com/oauth/callback`

### 7. Web3 Wallet Login (WalletConnect)
1. Register and create a new project at [WalletConnect Cloud](https://cloud.walletconnect.com/).
2. Fill in: `OAUTH_WALLETCONNECT_PROJECT_ID`.
3. (Optional) `OAUTH_WALLETCONNECT_SELF_PROXY=true` to enable built-in proxy.

---

## 📦 Automatic Cloud Backup Configuration (Optional)
For detailed configuration steps, please refer to the [Cloud Backup Guide](../data/backup).

If you have already configured Google login, some variables can be reused, but the **Redirect URI** must use a backup-specific path.

| Cloud Drive | Client ID Variable | Client Secret Variable | Backup Redirect URI Variable |
| :--- | :--- | :--- | :--- |
| **Google** | `OAUTH_GOOGLE_CLIENT_ID` | `OAUTH_GOOGLE_CLIENT_SECRET` | `OAUTH_GOOGLE_BACKUP_REDIRECT_URI` |
| **OneDrive** | `OAUTH_MICROSOFT_CLIENT_ID` | `OAUTH_MICROSOFT_CLIENT_SECRET` | `OAUTH_MICROSOFT_BACKUP_REDIRECT_URI` |
| **Dropbox** | `OAUTH_DROPBOX_CLIENT_ID` | `OAUTH_DROPBOX_CLIENT_SECRET` | `OAUTH_DROPBOX_BACKUP_REDIRECT_URI` |
| **Baidu** | `OAUTH_BAIDU_CLIENT_ID` | `OAUTH_BAIDU_CLIENT_SECRET` | `OAUTH_BAIDU_BACKUP_REDIRECT_URI` |

*Note: Backup Redirect URIs follow the format `https://your-domain.com/api/backups/oauth/[platform]/callback`*

---

## 🗄️ Database Engine Configuration (Only for Docker Deployment)

If you use Cloudflare Workers deployment, the system will automatically use the D1 database, and **no configuration** of the following variables is necessary.

If you are deploying on Docker or your own server:
*   **Default using SQLite**: Simply mount the `/app/data` directory; no configuration of the following variables is needed.
*   **Using MySQL / PostgreSQL**: You **must** fully complete all the following connection information (`DB_HOST` to `DB_NAME`).

| Variable | Required (non-SQLite) | Default | Description |
| :--- | :--- | :--- | :--- |
| `DB_ENGINE` | ✅ | `sqlite` | Database Type: supports `sqlite`, `mysql`, `postgresql`. |
| `DB_HOST` | ✅ | - | Database Server Address. Supports local `localhost`, Docker service name `mysql-db`, as well as **remote domains** (e.g.: `aws-1.pooler.supabase.com`) or **public IPs**. |
| `DB_PORT` | ✅ | - | Database Port. MySQL default is `3306`, PostgreSQL default is `5432`. |
| `DB_USER` | ✅ | - | Database username. |
| `DB_PASSWORD` | ✅ | - | Database password. |
| `DB_NAME` | ✅ | - | Specific database name. |
| `DB_SSL` | ❌ | `false` | Whether to enable SSL connection (recommended as `true` when connecting to remote cloud databases like Supabase). |

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
| **⭐ Obfuscation** | `NODEAUTH_LICENSE`, `JWT_SECRET` | `base64:`, `hex:` | Root anchor for session signing. Supports basic encoding-level obfuscation. |
| **🛡️ Encryption** | All other variables | `base64:`, `hex:`, `aes:` | All sensitive variables are protected with high-strength encryption. **`aes:`** is highly recommended. |

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
