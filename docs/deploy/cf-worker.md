# Cloudflare Worker 部署教程 (推荐)

这是最省心、最快捷的部署方式。您完全不需要购买服务器，由 Cloudflare 全球加速网络免费为您托管，真正实现**零成本、零维护**。

---

## 🛠️ 部署步骤

### 1. 准备工作
1.  **Fork** [`nodeauth/nodeauth-worker`](https://github.com/nodeauth/nodeauth-worker) 仓库到您的 GitHub 账号。
2.  给该项目点一个 **Star** ⭐（这能帮您更方便地接收到后续更新提示）。

### 2. 一键自动化部署
1.  [点击部署按钮](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)：
    [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)
2.  在弹出的页面中点击 **"Continue with GitHub"**。
3.  授权 Cloudflare 读取您的仓库，并选择您刚刚 Fork 的 `nodeauth-worker` 项目。

<details>
<summary>点击查看：授权指引示意图</summary>  
<img height="200" src="/deploy/cb64bc2f-6dcc-40cb-a781-3bc2c7bc5b28.png" /><br/>
<img height="400" src="/deploy/3f186ea6-80f5-4d78-b90f-724af33a73ae.png" />
</details>

4.  点击 **"部署"**，等待进度条完成后点击 **"继续处理项目"**。

<details>
<summary>点击查看：详细部署步骤示意图</summary>
<img height="400" src="/deploy/6a933580-98d5-4b09-ac1f-e2aa33380807.png" /><br />
<img height="400" src="/deploy/14e57427-0eac-4d20-8d9c-f8957803f247.png" /><br />
<img height="400" src="/deploy/b123a063-4671-4fc2-94fc-94b7a2d71235.png" /><br />
<img height="600" src="/deploy/3b0062e4-fab3-4f33-8e7f-92f2078bb80e.png" />
</details>

### 3. 配置核心变量
部署成功后，应用暂时还无法运行，您需要注入安全密钥：
1.  进入项目控制面板，点击 **"设置" (Settings)** -> **"变量与机密" (Variables & Secrets)**。
2.  点击 **"添加"**，依次填入以下必需项（建议参考 [环境变量指南](./env.md)）：
  *   `NODEAUTH_LICENSE`：系统授权码，从[license.nodeauth.io](https://license.nodeauth.io)获取。
  *   `ENCRYPTION_KEY`：32位以上随机密钥。
  *   `JWT_SECRET`：32位以上随机JWT密钥。
  *   `OAUTH_ALLOWED_USERS`：你的邮箱@example.com


3.  **别忘了登录渠道**：如果您想用 GitHub 登录，还需添加
  *   `OAUTH_GITHUB_CLIENT_ID`：你的CLIENT_ID
  *   `OAUTH_GITHUB_CLIENT_SECRET`：你的CLIENT_SECRET
  *   `OAUTH_GITHUB_REDIRECT_URI`：你的回调地址

<details>
<summary>点击查看：添加变量和机密示意图</summary>
<img height="600" src="/deploy/51d6e702-142e-4f58-8f02-c4a0bbcf009c.png" />
</details>

4.  完成后点击 **"部署"** 保存更改。

---

## 🌐 定制您的域名
默认情况下，Cloudflare 会分配一个 `xxx.workers.dev` 的二级域名。如果您有自己的域名：
1.  在项目设置中点击 **"设置"**。
2.  找到 **"自定义域" (Custom Domains)** -> **"添加自定义域"**。
3.  输入您想绑定的域名（如 `2fa.example.com`），Cloudflare 会自动为您配置 DNS。

<details>
<summary>点击查看：添加自定义域</summary>
<img height="250" src="/deploy/1315e3e3-5bcc-4d9f-a6b3-023de851cf9e.png" />
</details>

<!-- [📸 UI截图提示：此处展示 Cloudflare Workers 控制面板的变量添加界面截图] -->
