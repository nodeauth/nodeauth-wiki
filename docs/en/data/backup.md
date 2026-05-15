---
description: "NodeAuth Cloud Automatic Backup Setup Guide. Details how to configure diversified backup channels such as automated SMTP emails, Telegram Bot real-time backups, S3/R2 cloud storage, and GitHub private repositories. Deeply covers the OAuth secure authorization workflows for Google Drive, OneDrive, Dropbox, and Baidu Netdisk. Paired with AES-GCM double encryption and version_timestamp conflict resolution strategies, it builds an indestructible offsite disaster recovery defense."
---
# Automatic Cloud Backup

Off-site redundant backup is the last line of defense against extreme risks. NodeAuth supports multi-channel automatic synchronization, ensuring your 2FA assets can be recovered with one click in any situation.

---

## 📧 Configure SMTP Email (Most Universal)
This is the most common off-site backup method. You can automatically send encrypted backup packages to your work or private email.
1. **SMTP Server**: e.g., `smtp.gmail.com` or `smtp.qq.com`.
2. **Port**: Usually `465` (SSL) or `587` (TLS).
3. **Account & App Password**: Enter your email address and third-party app authorization code (note: this is not your login password).
4. **Recipient**: It is recommended to set this to your most commonly used backup email.

## 🤖 Configure Telegram Backup (Most Convenient)
The Telegram Bot-based backup method is both real-time and visually intuitive:
1. Contact **[@BotFather](https://t.me/BotFather)** to create a bot and get a `Bot Token`.
2. Send a message to your new bot from the Telegram account you want to receive backups on (Important).
3. Get your personal `Chat ID` via **[@userinfobot](https://t.me/userinfobot)**.
4. Enter these two items in the NodeAuth settings.
5. **Advantages**: You can send encrypted backup packages to Telegram at any time via the bot, essentially having a private off-site backup library at your fingertips.

## 🪣 Configure S3 / R2 Cloud Storage (Geek's Choice)
1. **Endpoint**: Your S3 endpoint (e.g., `https://xxx.r2.cloudflarestorage.com`).
2. **Bucket**: Storage bucket name.
3. **Access Key / Secret Key**: API access credentials.
4. **Region**: Enter the corresponding region (e.g., `auto`).

## 🐙 Configure GitHub (Version Control Aficionados)
Utilize a private GitHub repository to save encrypted backup data, supporting full version control history (Git-based).
1. Create a **Private Repository** to store backups on GitHub (e.g., `nodeauth-backup`).
2. Go to **Settings** -> **Developer settings** -> **Personal access tokens** -> **Tokens (classic)**.
3. Click "Generate new token (classic)", set an appropriate expiration, and strictly **check the `repo` scope** (gives full control of private repositories).
4. Save and copy the generated **Personal Access Token**.

<details>
<summary>Click to view: Steps to get Personal Access Token</summary> 
<img height="200" src="/data/794ac8c0-9915-4bcd-9e52-eb39d368652a.png" /><br />
<img height="50" src="/data/8b4d5391-8e46-4af7-b5e3-42de5abc8f64.png" /><br />
<img height="50" src="/data/ceefe88f-9520-45f4-a0a4-acc9ebd10728.png" />
</details>

5. In NodeAuth, fill in respectively:
   * **Personal Access Token** (the key you just copied)
   * **Repository Owner** (your GitHub username)
   * **Repository Name** (the newly created private repo name)
   * **Branch Name** (e.g., `main` or `master`)
   * **Save Directory** (the path to store in the cloud, e.g., `/`)

## ☁️ Configure WebDAV (Private Cloud Users)
Suitable for Synology, QNAP, Nutstore, or Alist users:
1. **URL**: Your WebDAV mount point address.
2. **Directory**: Specify the storage folder (e.g., `/backup/nodeauth/`).
3. **Authentication**: Enter your WebDAV account and password.

---

## 🔼 Configure Google Drive
*   **Private Storage**: Uses `appDataFolder` isolation by default.
*   **Low Latency**: Synchronizes extremely fast thanks to Cloudflare's global backbone network.
*   **🛠️ Configuration Guide**:
    1. Visit [Google Cloud Console](https://console.cloud.google.com/) to create a project and enable the `Google Drive API`.
    2. Create "OAuth consent screen" (Brand information) and enter information as required.
    3. Create "OAuth 2.0 Client ID" (Web application) and set the redirect URI: `https://your-domain.com/api/backups/oauth/google/callback`.
    4. Get your `Client ID` and `Client Secret`.
    5. In "OAuth consent screen" -> "Publish App".
    6. **Configure Environment Variables**: Fill them into your deployment platform's "Environment Variables" or "Secrets" (refer to the [Env Guide](/deploy/env) for details):
        *   `OAUTH_GOOGLE_CLIENT_ID`
        *   `OAUTH_GOOGLE_CLIENT_SECRET`
        *   `OAUTH_GOOGLE_BACKUP_REDIRECT_URI` : `https://your-domain.com/api/backups/oauth/google/callback`

    <details>
    <summary>Click to view: Detailed configuration steps with screenshots</summary> 
        <img height="200" src="/data/1f56b474-3184-499e-9f96-efa7aa356c84.png" /><br />
        <img height="200" src="/data/37617025-e2cb-43ee-8aea-6c2d45384866.png" /><br />
        <img height="200" src="/data/81d364c0-d8a3-41d4-8f26-b82f076399ed.png" /><br />
        <img height="200" src="/data/ea5c9b3f-e774-4fa9-af21-f2a0215ae856.png" /><br />
        <img height="200" src="/data/4a462b9a-e5d0-4429-9f6a-7dbcc9c5e58f.png" /><br />
        <img height="200" src="/data/6049ef0f-4875-4cc2-9272-55aecb1d63d0.png" /><br />
        <img height="300" src="/data/15e3d212-526c-4d29-8a81-31ae214011c4.png" /><br />
        <img height="150" src="/data/09529da2-4ad0-4407-a884-935ad0ef55df.png" /><br />
        <img height="150" src="/data/f83e8bca-ebf3-41f2-9ac7-efd76b2a307b.png" /><br />
        <img height="150" src="/data/f6c2c63c-fcd7-480d-b808-8ffc789ecbfa.png" /><br />
        <img height="200" src="/data/f779e997-2777-46f8-8d1a-0847193cc5e2.png" /><br />
        <img height="200" src="/data/a7380f05-b583-4e94-a255-2e2cb5750c09.png" /><br />
        <img height="350" src="/data/cbe1c532-fecb-4cc5-a47b-7024bb0439e9.png" /><br />
        <img height="250" src="/data/b04ec959-e7d8-4da5-a87c-9b91c48db7b1.png" /><br />
        <img height="200" src="/data/f3cef0d2-b9fc-4932-92ea-f7c22c311afd.png" />
    </details>


## 🔼 Configure Microsoft OneDrive
*   **High Stability**: Uses Microsoft Graph API chunked uploading, supporting large capacity backups.
*   **🛠️ Configuration Guide**:
    1. Visit [Azure App Registration](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) to register an app (Note: Personal accounts are not supported; requires M365 Developer Program or Azure).
    2. Select Web for "Redirect URI" and enter: `https://your-domain.com/api/backups/oauth/microsoft/callback`.
    3. Get your `Client Secret`.
    4. Add "API Permissions" `Files.ReadWrite.AppFolder` and `offline_access` and grant consent.
    5. **Configure Environment Variables**: Fill them into your deployment platform's "Environment Variables" or "Secrets" (refer to the [Env Guide](/deploy/env) for details):
        *   `OAUTH_MICROSOFT_CLIENT_ID`
        *   `OAUTH_MICROSOFT_CLIENT_SECRET`
        *   `OAUTH_MICROSOFT_BACKUP_REDIRECT_URI` : `https://your-domain.com/api/backups/oauth/microsoft/callback`

    <details>
    <summary>Click to view: Detailed configuration steps with screenshots</summary>  
        <img height="180" src="/data/8dcf2c03-986c-4099-b674-3ae8849ec00e.png"/><br />
        <img height="250" src="/data/ae1e7dde-171b-4628-a122-3c6b27a4711b.png"/><br />
        <img height="200" src="/data/2995430f-9fc3-47da-b7a4-6e25a2c42f48.png"/><br />
        <img height="250" src="/data/a90f68bb-87ac-4e62-acbb-f747c7078867.png"/><br />
        <img height="150" src="/data/7e0ddaf3-be3c-4480-97fa-d48162650a1d.png"/><br />
        <img height="200" src="/data/c992b29b-ed71-4100-a575-abb39bd56d32.png"/><br />
        <img height="180" src="/data/d12e0e7c-6414-4ca1-95b4-e3cf824a681e.png"/><br />
        <img height="150" src="/data/47810c9e-c469-48d4-8d3a-b98a34111010.png"/>
    </details>

## 🔼 Configure Dropbox
*   **Minimalist Experience**: Fast API response, suitable for users seeking maximum speed.
*   **🛠️ Configuration Guide**:
    1. Visit [Dropbox App Console](https://www.dropbox.com/developers/apps) and select `Scoped access` -> `App folder`.
    2. Enter in `Redirect URIs`: `https://your-domain.com/api/backups/oauth/dropbox/callback`.
    3. Under `Permissions`, check `files.content.write`, `files.content.read`, and `files.metadata.read`.
    4. **Configure Environment Variables**: Fill them into your deployment platform's "Environment Variables" or "Secrets" (refer to the [Env Guide](/deploy/env) for details):
        *   `OAUTH_DROPBOX_CLIENT_ID`
        *   `OAUTH_DROPBOX_CLIENT_SECRET`
        *   `OAUTH_DROPBOX_BACKUP_REDIRECT_URI` : `https://your-domain.com/api/backups/oauth/dropbox/callback`

    <details>
    <summary>Click to view: Detailed configuration steps with screenshots</summary>  
        <img height="100" src="/data/417d4f8e-b518-42d1-81d6-ba13746848df.png" /><br />
        <img height="250" src="/data/8d3f19bd-111f-4e08-b3ec-de0a72373c9e.png" /><br />
        <img height="180" src="/data/8afae046-7061-46cd-8d84-5181b69b85a0.png" /><br />
        <img height="250" src="/data/145e461e-bbd8-4942-9aaf-d23101ef9585.png" />
    </details>

## 🔼 Configure Baidu Netdisk
*   **Domestic Friendly**: Specially adapted for users in mainland China, guaranteed by official certification.
*   **🛠️ Configuration Guide**:
    1. Visit [Baidu Open Platform Console](https://pan.baidu.com/union/console/applist) and create a "Hardware/Software Integrated" application.
    2. Enter the callback address in "Security Settings": `https://your-domain.com/api/backups/oauth/baidu/callback`.
    3. Enable "Netdisk Basic Service" permissions.
    4. **Configure Environment Variables**: Fill them into your deployment platform's "Environment Variables" or "Secrets" (refer to the [Env Guide](/deploy/env) for details):
        *   `OAUTH_BAIDU_CLIENT_ID`
        *   `OAUTH_BAIDU_CLIENT_SECRET`
        *   `OAUTH_BAIDU_BACKUP_REDIRECT_URI` : `https://your-domain.com/api/backups/oauth/baidu/callback`

---

## 🔑 Secure OAuth Authorization Flow
1. Go to "Data Management" -> "**Cloud Backup Settings**".
2. Select your cloud drive icon and click "**Connect XX to Authorize**".
3. In the official authorization page that pops up, complete the authorization process.
4. **Token Auto-refresh**: As long as the permission is not revoked, the system will automatically sync via the `Refresh Token` without repeating authorization.

---

## 🛡️ Backup Strategy & Security Check
*   **Double Encryption**: All backup packages are secondary-encrypted with a "backup decryption password". Even if the cloud drive is compromised, the data remains unreadable.
*   **Redundancy & Conflict Resolution**: Uses `version_timestamp` logic to ensure data is not overwritten when multiple devices are writing.
*   **Retention Control**: Set the number of recent backups to keep (N); the system will automatically clean up expired copies.

---

> [!TIP]
> **Off-site Disaster Retrieval**: If you download an encrypted backup file from the cloud (like Telegram or S3) but cannot access your NodeAuth instance, refer to the [Offline Decryption Guide](../recovery/index.md) for instructions on using scripts for offline data extraction.
