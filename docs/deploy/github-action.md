# GitHub Action 自动化部署 (开发者推荐)

如果您希望拥有更高的控制权、版本追溯能力，或者需要更精确地管理 Cloudflare D1 数据库，GitHub Action 是最稳健的选择。

---

## 🛠️ 部署流程

### 1. 准备工作 (D1 数据库)
在 Cloudflare 后台创建一个名为 `nodeauth-db` 的数据库，并记录其 **Database ID**。
*   进入 `存储和数据库` -> `D1` -> `创建数据库`。

<details>
<summary>点击查看：创建 D1 SQL 数据库的具体步骤</summary>
<img height="500" alt="image" src="/deploy/80824e1b-73f8-4d13-992c-a51dc4e53308.png" /><br />
<img height="350" alt="image" src="/deploy/560c9977-2f89-4135-839d-bdf37208bfdc.png" /><br />
<img height="350" alt="image" src="/deploy/25261345-8da6-40de-86b6-a23e910e737d.png" />
</details>

### 2. 获取 API 令牌

1. 登录 Cloudflare Dashboard
2. [前往获取](https://dash.cloudflare.com/profile/api-tokens)  https://dash.cloudflare.com/profile/api-tokens
3. 点击“创建令牌” 
4. 选择使用模版 “编辑 Cloudflare Workers”  
5. 配置“帐户资源”和“区域资源”
6. 依次点击“继续以显示摘要”，点击“创建令牌”
7. 复制生成的令牌

<details>
<summary>点击查看：获取 Cloudflare Worker 部署令牌的具体步骤</summary>
<img width="500"  alt="image" src="/deploy/6487aa6e-e505-4980-aef4-e08172116746.png" /><br />
<img width="800"  alt="image" src="/deploy/d4c737f7-2d9f-4cfb-a712-b1af416c8ef6.png" />
</details>

### 3. 配置仓库机密 (Secrets)
这是最关键的一步，绝不要把您的核心密钥写在代码里。
1.  进入您的 GitHub 项目，点击 **"Settings"** -> **"Secrets and variables"** -> **"Actions"**。
2.  点击 **"New repository secret"**，依次添加以下内容：

| 机密名 | 获取来源 / 建议值 |
| :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | 您刚刚在 Cloudflare 生成的 API 令牌 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Workers 后台右侧显示的账户 ID |
| `CLOUDFLARE_D1_DATABASE_ID` | 您刚刚创建的 `nodeauth-db` 的 ID |
| `CLOUDFLARE_D1_DATABASE_NAME` | `nodeauth-db` |
| `ENCRYPTION_KEY` | 32 位以上随机密钥 |
| `JWT_SECRET` | 32 位以上随机密钥 |
| `OAUTH_ALLOWED_USERS` | 您的登录白名单邮箱 |
| **三方登录机密 (示例)** | **详细获取请参考 [登录平台配置](./env)** |
| `OAUTH_GITHUB_CLIENT_ID` | 您申请的 GitHub Client ID |
| `OAUTH_GITHUB_CLIENT_SECRET`| 您申请的 GitHub Client Secret |
| `OAUTH_GITHUB_REDIRECT_URI` | `https://您的域名/oauth/callback` |

<details>
<summary>点击查看：Secrets 配置示例图</summary>  
<img width="600" alt="Secrets 配置示例" src="/deploy/ef907021-303d-4fd5-ba3e-913e8b0014a5.png" />
</details>

### 4. 触发部署
*   **初次部署**：点击项目顶部的 **"Actions"**，选择 `Deploy to Cloudflare Workers` 工作流，点击 **"Run workflow"**。
*   **后续更新**：每当您向 `main` 分支推送代码，GitHub 都会自动帮您完成部署并同步数据库。

<details>
<summary>点击查看：手动触发部署示例图</summary>  
<img width="600" alt="手动触发部署" src="/deploy/b2891365-5c1a-4a46-83c6-5cd53dd4b895.png" />
</details>

---

## 💡 为什么选择 GitHub Action？
*   **部署全透明**：每一次部署都有日志记录，出错时一目了然。
*   **机密更安全**：所有密钥由 GitHub 高强度加密存储，即便仓库被公开，密钥也依然处于保护状态。
*   **持续集成**：自动化测试与预览机制能确保您推送的代码始终是可用的。

<!-- [📸 UI截图提示：此处展示 GitHub Secrets 的配置页面截图及 Actions 运行状态截图] -->
