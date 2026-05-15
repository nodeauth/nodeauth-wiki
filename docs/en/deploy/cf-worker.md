---
description: "Cloudflare Worker Deployment NodeAuth Detailed Tutorial. A step-by-step guide on how to achieve a zero-cost, zero-maintenance 2FA/TOTP management system by forking the repository, using one-click automated deployment, and configuring core environment variables (License, Encryption Key, OAuth Login, etc.). Includes advanced setup guides like custom domain binding."
---
# Cloudflare Worker Deployment (Recommended)

This is the most convenient and fastest way to deploy. You don't need to purchase a server, as Cloudflare's global acceleration network will host it for free, truly achieving **zero cost and zero maintenance**.

---

## 🛠️ Deployment Steps

### 1. Preparation
1.  **Fork** the [`nodeauth/nodeauth-worker`](https://github.com/nodeauth/nodeauth-worker) repository to your GitHub account.
2.  Give the project a **Star** ⭐ (this will help you stay notified about future updates).

### 2. One-click Automated Deployment
1.  [Click the Deploy Button](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create):
    [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)
2.  On the page that opens, click **"Continue with GitHub"**.
3.  Authorize Cloudflare to read your repositories and select the `nodeauth-worker` project you just forked.

<details>
<summary>Click to view: Authorization Guide Screenshot</summary>  
<img height="200" src="/deploy/cb64bc2f-6dcc-40cb-a781-3bc2c7bc5b28.png" /><br/>
<img height="400" src="/deploy/3f186ea6-80f5-4d78-b90f-724af33a73ae.png" />
</details>

4.  Click **"Deploy"**, wait for the progress bar to complete, and then click **"Continue to project"**.

<details>
<summary>Click to view: Detailed Deployment Steps Screenshot</summary>
<img height="400" src="/deploy/6a933580-98d5-4b09-ac1f-e2aa33380807.png" /><br />
<img height="400" src="/deploy/14e57427-0eac-4d20-8d9c-f8957803f247.png" /><br />
<img height="400" src="/deploy/b123a063-4671-4fc2-94fc-94b7a2d71235.png" /><br />
<img height="600" src="/deploy/3b0062e4-fab3-4f33-8e7f-92f2078bb80e.png" />
</details>

### 3. Configure Core Variables
After a successful deployment, the app won't run yet. You need to inject security keys:
1.  Enter the project dashboard, click **"Settings"** -> **"Variables & Secrets"**.
2.  Click **"Add"**, select the type as **"Secret"**, and enter the following required items ([Environment Variables Guide](./env.md)):

> [!CAUTION]
> **Warning**: Be sure to select the `Secret` type. Otherwise, your configured environment variables may be lost when the project is updated.

  *   `NODEAUTH_LICENSE`: System license code, obtain from [license.nodeauth.io](https://license.nodeauth.io).
  *   `ENCRYPTION_KEY`: A random key of at least 32 characters.
  *   `JWT_SECRET`: A random JWT secret of at least 32 characters.
  *   `OAUTH_ALLOWED_USERS`: your-email@example.com

3.  **Don't forget the login channels**: If you want to use GitHub login, you also need to add:
  *   `OAUTH_GITHUB_CLIENT_ID`: Your CLIENT_ID
  *   `OAUTH_GITHUB_CLIENT_SECRET`: Your CLIENT_SECRET
  *   `OAUTH_GITHUB_REDIRECT_URI`: Your callback URI (e.g., `https://your-domain.com/oauth/callback`)

<details>
<summary>Click to view: Adding Variables & Secrets Screenshot</summary>
<img height="600" src="/deploy/51d6e702-142e-4f58-8f02-c4a0bbcf009c.png" />
</details>

4.  Finally, click **"Deploy"** to save your changes.

---

## 🌐 Custom Domain
By default, Cloudflare assigns a `xxx.workers.dev` subdomain. If you have your own domain:
1.  In the project dashboard, click **"Settings"**.
2.  Find **"Custom Domains"** -> **"Add Custom Domain"**.
3.  Enter the domain you want to bind (e.g., `2fa.example.com`). Cloudflare will automatically configure the DNS for you.

<details>
<summary>Click to view: Adding a Custom Domain</summary>
<img height="250" src="/deploy/1315e3e3-5bcc-4d9f-a6b3-023de851cf9e.png" />
</details>

<!-- [📸 UI Mockup Tip: Screenshot of Cloudflare Workers dashboard's variable configuration interface] -->
