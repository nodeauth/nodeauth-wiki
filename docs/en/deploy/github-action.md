---
description: "NodeAuth GitHub Actions Automated Deployment Tutorial. An advanced deployment solution for developers, supporting secure management of API tokens and database IDs via GitHub Secrets. Achieves automatic synchronization to Cloudflare Workers and the D1 database upon code commit, providing fully transparent deployment logs and version traceability."
---
# GitHub Action Automated Deployment (Recommended for Developers)

If you want higher control, version traceability, or need to manage the Cloudflare Worker configuration more precisely, GitHub Action is the most robust choice.

---

## 📋 Deployment Prerequisites
- **License Code**: Required to start the system, obtain it from the [License Center](https://license.nodeauth.io).
- **GitHub Account**: Used for hosting source code and running Action CI.
- **Cloudflare Account**: Provides the Worker runtime environment and generates API tokens.
- **CF Hosted Domain (Optional)**: If you want to bind a custom domain, it must be hosted on CF (otherwise, `*.workers.dev` is assigned).

---

## 🛠️ Deployment Steps

### 1. Preparation (D1 Database)
Create a database named `nodeauth-db` in the Cloudflare dashboard and record its **Database ID**.
*   Go to `Storage & Databases` -> `D1` -> `Create Database`.

<details>
<summary>Click to view: Detailed steps to create D1 SQL Database</summary>
<img height="500" alt="image" src="/deploy/80824e1b-73f8-4d13-992c-a51dc4e53308.png" /><br />
<img height="350" alt="image" src="/deploy/560c9977-2f89-4135-839d-bdf37208bfdc.png" /><br />
<img height="350" alt="image" src="/deploy/25261345-8da6-40de-86b6-a23e910e737d.png" />
</details>

### 2. Obtain API Token

1. Log in to the Cloudflare Dashboard.
2. [Go here to get your token](https://dash.cloudflare.com/profile/api-tokens).
3. Click "Create Token". 
4. Select the "Edit Cloudflare Workers" template.  
5. Configure "Account Resources" and "Zone Resources".
6. Click "Continue to summary," then click "Create Token".
7. Copy the generated token.

<details>
<summary>Click to view: Detailed steps to obtain a Cloudflare Worker deployment token</summary>
<img width="500" alt="image" src="/deploy/6487aa6e-e505-4980-aef4-e08172116746.png" /><br />
<img width="800" alt="image" src="/deploy/d4c737f7-2d9f-4cfb-a712-b1af416c8ef6.png" />
</details>

### 3. Configure Repository Secrets
This is the most critical step; never write your core keys directly into your code.
1.  Go to your GitHub project, click **"Settings"** -> **"Secrets and variables"** -> **"Actions"**.
2.  Click **"New repository secret"** and add the following sequentially:

| Secret Name | Source / Recommended Value |
| :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | The API token you just generated in Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | The Account ID displayed on the right side of the Cloudflare Workers dashboard |
| `CLOUDFLARE_D1_DATABASE_ID` | The ID of the `nodeauth-db` you just created |
| `CLOUDFLARE_D1_DATABASE_NAME` | `nodeauth-db` |
| `NODEAUTH_LICENSE` | System license code, obtain from [license.nodeauth.io](https://license.nodeauth.io). |
| `ENCRYPTION_KEY` | A random key of at least 32 characters, obtain from [tools.nodeauth.io](https://tools.nodeauth.io). |
| `JWT_SECRET` | A random key of at least 32 characters, obtain from [tools.nodeauth.io](https://tools.nodeauth.io). |
| `OAUTH_ALLOWED_USERS` | Allowed login list, e.g., your@example.com |
| **OAuth Secrets (Example)** | **Refer to [Login Platform Configuration](./env) for details** |
| `OAUTH_GITHUB_CLIENT_ID` | Your GitHub Client ID |
| `OAUTH_GITHUB_CLIENT_SECRET` | Your GitHub Client Secret |
| `OAUTH_GITHUB_REDIRECT_URI` | `https://your-domain.com/oauth/callback` |

<details>
<summary>Click to view: Secrets Configuration Example</summary>  
<img width="600" alt="Secrets Configuration Example" src="/deploy/ef907021-303d-4fd5-ba3e-913e8b0014a5.png" />
</details>

---

## ⚙️ Advanced Custom Parameters (Optional)

Through the built-in AST auto-modification mechanism, in addition to the required credentials, you can further customize your Cloudflare Worker deployment by adding the following optional Secrets:

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `CLOUDFLARE_WORKERS_NAME` | Custom name for the Worker deployed on Cloudflare (default is `nodeauth-worker`). | `my-2fa-server` |
| `CLOUDFLARE_WORKERS_ROUTES` | Bind a custom domain. Format: `request_path,domain_suffix` (use semicolon `;` to separate multiple routes). This requires your domain DNS to be managed by Cloudflare. | `2fa.example.com/*,example.com` |
| `CLOUDFLARE_WORKERS_DEV` | Whether to enable Cloudflare's default `*.workers.dev` domain. If you bind a custom domain and want to completely block access via the original domain, set this to `false`. | `false` |
| `CLOUDFLARE_WORKERS_PREVIEW_URLS` | Whether to enable URLs generated for preview branches, typically used for secondary development. | `true` |

### 4. Trigger Deployment
*   **Initial Deployment**: Click **"Actions"** at the top of the project, select the `Deploy to Cloudflare Workers` workflow, and click **"Run workflow"**.
*   **Subsequent Updates**: Every time you push code to the `main` branch, GitHub will automatically complete the deployment and sync the database for you.

<details>
<summary>Click to view: Manual Deployment Trigger Example</summary>  
<img width="600" alt="Manual Deployment Trigger" src="/deploy/b2891365-5c1a-4a46-83c6-5cd53dd4b895.png" />
</details>

---

## 💡 Why Choose GitHub Action?
*   **Transparent Deployment**: Every deployment has log records, making errors clear at a glance.
*   **Secure Secrets**: All keys are stored with high-strength encryption by GitHub. Even if the repository is made public, the keys remain protected.
*   **Continuous Integration**: Automated testing and preview mechanisms ensure that the code you push is always functional.

<!-- [📸 UI Mockup Tip: Screenshot of the GitHub Secrets configuration page and the Actions run status] -->
