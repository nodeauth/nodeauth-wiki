# Initial Setup Guide

After successful deployment, you need to follow these simple steps to activate and protect your NodeAuth instance.

## 🚶 Step 1: Environment Self-Check

When you first access your deployed domain, NodeAuth will automatically activate the **Smart Shield** environment check system. To protect your data, if the environment configuration is risky, the system will **block access** and display the following check interface:

### 1. Core Security Check Items
*   **System License (NODEAUTH_LICENSE)**: Detects if the license code is configured. You can obtain it from [license.nodeauth.io](https://license.nodeauth.io).
*   **Core Encryption Key (ENCRYPTION_KEY)**: Detects if the key is empty or less than 32 characters. This is the "lifeblood" of the encrypted database; failure to meet the standard will block access.
*   **Session Signing Key (JWT_SECRET)**: Detects the strength of the signing key. A weak key could allow attackers to forge identities.
*   **Admission Allowlist (OAUTH_ALLOWED_USERS)**: Detects if allowed login emails, Telegram IDs, or Web3 wallet addresses are configured. Separate multiple values with commas.
*   **Login Channel configuration**: Detects if at least one OAuth2 login method (e.g., GitHub, Google) is configured.

### 2. How to Fix?
If you see a red warning banner, follow the **"How to fix?"** instructions provided in the Smart Shield interface:
1.  **Refer to generated keys**: Smart Shield generates high-strength random keys in real-time for you. Click to copy.
2.  **Update environment variables**: Depending on your deployment method (Cloudflare dashboard, GitHub Secrets, or Docker Compose), fill the new keys into the corresponding variables.
3.  **Redeploy/Restart**: Save the configuration and redeploy the app until the Smart Shield interface shows **"Checks Passed"**.

<!-- [📸 UI Mockup Tip: Show Smart Shield "Security Not Met" red warning UI interface] -->

---

## 🚶 Step 2: First Login
1. Visit your application domain.
2. The page will display your preset login method (e.g., GitHub).
3. Ensure your current login account email for that platform is in the `OAUTH_ALLOWED_USERS` allowlist.
4. Click Login to complete identity verification.

## 🚶 Step 3: Save "Emergency Recovery Pack" (Most Important)
1. Click Generate and Download PDF.
2. **Save Offline**: Store this PDF on a secure USB drive or print it out.
3. **Usage**: Recommended reading [How to use the Recovery Pack?](../recovery/index.md) to understand its critical role in disaster recovery.
4. **Verify Activation**: Enter the **last 4 digits of the ENCRYPTION_KEY** shown in the PDF. This is to force you to record and confirm that you have saved the core key. Only after verification will the system be officially activated and enter secure operation mode.

> [!IMPORTANT]
> **Survival Key Tip**: The `ENCRYPTION_KEY` included in the Emergency Recovery Pack is the only lifeline for decrypting your database. If you lose this key after a server failure and have never exported any backup files, your encrypted data will be permanently unrecoverable (even if you have the database files).

## 🚶 Step 4: Security Protection (Must Do)
To prevent data from being snooped on on this device, it is recommended to go to "System Settings" immediately to enable:
1. **PIN Security Lock**: Set a 6-digit number to verify every time you enter the app.
2. **Ghost Mode**: Enable background blurring.
