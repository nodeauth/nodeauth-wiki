# 云端自动备份设置

实现异地冗余备份是防止极端风险的最后一道防线。NodeAuth 支持多通道自动同步，确保您的 2FA 资产在任何情况下都能“一键回血”。

---

## 📧 配置 SMTP 邮件自发 (最全能)
这是最通用的异地备份方式，您可以将加密后的备份包自动发送到您的工作或私人邮箱。
1. **SMTP服务器**: 如 `smtp.gmail.com` 或 `smtp.qq.com`。
2. **端口**: 通常为 `465` (SSL) 或 `587` (TLS)。
3. **账号与授权码**: 输入您的邮箱地址和第三方应用授权码（注意不是登录密码）。
4. **收件人**: 建议设置为您最常用的备用邮箱。

## 🤖 配置 Telegram 自动备份 (最方便)
基于 Telegram Bot 的备份方式不仅实时，而且查看非常直观：
1. 向 **[@BotFather](https://t.me/BotFather)** 申请一个机器人并获得 `Bot Token`。
2. 用您准备接收备份的 Telegram 账号，向新申请的机器人打个招呼（重要）
3. 通过 **[@userinfobot](https://t.me/userinfobot)** 获得您的个人 `Chat ID`。
4. 在 NodeAuth 设置中填入这两项。
5. **优势**：您可以随时通过机器人向 Telegram 发送加密备份包，相当于拥有一个触手可及的异地私有备份库。

## 🪣 配置 S3 / R2 云存储 (极客首选)
1. **Endpoint**: 您的 S3 终结点 (如 `https://xxx.r2.cloudflarestorage.com`)。
2. **Bucket**: 存储桶名称。
3. **Access Key / Secret Key**: API 访问凭证。
4. **Region**: 填写对应的区域（如 `auto`）。

## 🐙 配置 GitHub (代码托管控)
利用 GitHub 的私有仓库来保存加密备份数据，支持完整的历史版本控制（基于 Git）。
1. 在 GitHub 上创建一个**私有仓库** (Private Repository，如 `nodeauth-backup`)。
2. 前往 **Settings** -> **Developer settings** -> **Personal access tokens** -> **Tokens (classic)**。
3. 点击 Generate new token (classic)，设置适宜的过期时间，并在权限下**严格勾选 `repo`**（拥有完整控制私有仓库的权限）。
4. 保存并复制生成的 **Personal Access Token**。

<details>
<summary>点击查看：获取 Personal Access Token 步骤</summary> 
<img height="200" src="/data/794ac8c0-9915-4bcd-9e52-eb39d368652a.png" /><br />
<img height="50" src="/data/8b4d5391-8e46-4af7-b5e3-42de5abc8f64.png" /><br />
<img height="50" src="/data/ceefe88f-9520-45f4-a0a4-acc9ebd10728.png" />
</details>

5. 在 NodeAuth 中分别填入：
   * **Personal Access Token** (刚刚复制的密钥)
   * **仓库所有者** (您的 GitHub 用户名)
   * **仓库名称** (新建的私有仓库名)
   * **分支名** (如 `main` 或 `master`)
   * **保存目录** (指定云端存放的路径，如 `/`)

## ☁️ 配置 WebDAV (私有云用户)
适用于群晖、威联通、坚果云或 Alist 用户：
1. **URL**: 您的 WebDAV 挂载点地址。
2. **目录**: 指定存放文件夹（如 `/backup/nodeauth/`）。
3. **认证**: 输入 WebDAV 账号及密码。

---

## 🔼 配置 Google Drive
*   **私密存储**：默认使用 `appDataFolder` 隔离存储。
*   **低延迟**：得益于 Cloudflare 全球骨干网络，同步极快。
*   **🛠️ 配置指南**：
    1. 访问 [Google Cloud Console](https://console.cloud.google.com/) 创建项目并启用 `Google Drive API`。
    2. 创建“品牌信息”，按要求输入信息
    3. 创建“OAuth 2.0 客户端 ID” (Web 应用程序)，设置重定向 URI：`https://您的域名/api/backups/oauth/google/callback`。
    4. 获取 `客户端ID`、`客户端密钥`
    5. 在 “目标对象”  -> "发布应用"
    6. **配置环境变量**：填入您部署平台的“环境变量”或“机密变量”配置项中（详见 [环境变量指南](/deploy/env)）：
        *   `OAUTH_GOOGLE_CLIENT_ID`
        *   `OAUTH_GOOGLE_CLIENT_SECRET`
        *   `OAUTH_GOOGLE_BACKUP_REDIRECT_URI` : `https://您的域名/api/backups/oauth/google/callback`

    <details>
    <summary>点击查看：详细配置步骤示例图</summary> 
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


## 🔼 配置 Microsoft OneDrive
*   **极高稳定性**：利用 Microsoft Graph API 分片上传，支持大容量备份。
*   **🛠️ 配置指南**：
    1. 访问 [Azure 应用注册](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) 注册应用（不支持个人账户，需要加入M365开发人员计划或Azure）。
    2. “重定向 URI” 选 Web 并填入：`https://您的域名/api/backups/oauth/microsoft/callback`。
    3. 获取 `客户端密码`
    4. 添加“API 权限” `Files.ReadWrite.AppFolder` 和 `offline_access` 并授予确认。
    5. **配置环境变量**：填入您部署平台的“环境变量”或“机密变量”配置项中（详见 [环境变量指南](/deploy/env)）：
        *   `OAUTH_MICROSOFT_CLIENT_ID`
        *   `OAUTH_MICROSOFT_CLIENT_SECRET`
        *   `OAUTH_MICROSOFT_BACKUP_REDIRECT_URI` : `https://您的域名/api/backups/oauth/microsoft/callback`

    <details>
    <summary>点击查看：详细配置步骤示例图</summary>  
        <img height="180" src="/data/8dcf2c03-986c-4099-b674-3ae8849ec00e.png"/><br />
        <img height="250" src="/data/ae1e7dde-171b-4628-a122-3c6b27a4711b.png"/><br />
        <img height="200" src="/data/2995430f-9fc3-47da-b7a4-6e25a2c42f48.png"/><br />
        <img height="250" src="/data/a90f68bb-87ac-4e62-acbb-f747c7078867.png"/><br />
        <img height="150" src="/data/7e0ddaf3-be3c-4480-97fa-d48162650a1d.png"/><br />
        <img height="200" src="/data/c992b29b-ed71-4100-a575-abb39bd56d32.png"/><br />
        <img height="180" src="/data/d12e0e7c-6414-4ca1-95b4-e3cf824a681e.png"/><br />
        <img height="150" src="/data/47810c9e-c469-48d4-8d3a-b98a34111010.png"/>
    </details>

## 🔼 配置 Dropbox
*   **极简体验**：API 响应快，适合追求极致速度的用户。
*   **🛠️ 配置指南**：
    1. 访问 [Dropbox App Console](https://www.dropbox.com/developers/apps) 选择 `Scoped access` -> `App folder`。
    2. 在 `Redirect URIs` 填入：`https://您的域名/api/backups/oauth/dropbox/callback`。
    3. `Permissions` 勾选 `files.content.write`, `files.content.read`, `files.metadata.read`。
    4. **配置环境变量**：填入您部署平台的“环境变量”或“机密变量”配置项中（详见 [环境变量指南](/deploy/env)）：
        *   `OAUTH_DROPBOX_CLIENT_ID`
        *   `OAUTH_DROPBOX_CLIENT_SECRET`
        *   `OAUTH_DROPBOX_BACKUP_REDIRECT_URI` : `https://您的域名/api/backups/oauth/dropbox/callback`

    <details>
    <summary>点击查看：详细配置步骤示例图</summary>  
        <img height="100" src="/data/417d4f8e-b518-42d1-81d6-ba13746848df.png" /><br />
        <img height="250" src="/data/8d3f19bd-111f-4e08-b3ec-de0a72373c9e.png" /><br />
        <img height="180" src="/data/8afae046-7061-46cd-8d84-5181b69b85a0.png" /><br />
        <img height="250" src="/data/145e461e-bbd8-4942-9aaf-d23101ef9585.png" />
    </details>

## 🔼 配置 百度网盘
*   **国内友好**：特别为中国大陆用户适配，通过官方认证保障。
*   **🛠️ 配置指南**：
    1. 访问 [百度开放平台控制台](https://pan.baidu.com/union/console/applist) 创建“软硬一体”应用。
    2. “安全设置”中填入回调地址：`https://您的域名/api/backups/oauth/baidu/callback`。
    3. 开通“网盘基础服务”权限。
    4. **配置环境变量**：填入您部署平台的“环境变量”或“机密变量”配置项中（详见 [环境变量指南](/deploy/env)）：
        *   `OAUTH_BAIDU_CLIENT_ID`
        *   `OAUTH_BAIDU_CLIENT_SECRET`
        *   `OAUTH_BAIDU_BACKUP_REDIRECT_URI` : `https://您的域名/api/backups/oauth/baidu/callback`

---

## 🔑 OAuth 安全授权方式操作流
1. 前往“数据管理” -> “**云端备份设置**”。
2. 选择您拥有的网盘图标，点击“**连接 xx 授权**”。
3. 在弹出的官方授权页面，完成授权流程。
4. **令牌自动刷新**：只要未撤销权限，系统将通过 `Refresh Token` 自动同步，无需重复操作授权。

---

## 🛡️ 备份策略与安全自检
*   **二重加密**：所有备份包通过“备份解密密码”二次打包，即便网盘被盗也无法解密。
*   **冗余冲突解决**：采用 `version_timestamp` 逻辑，保障多设备写入时不被覆盖。
*   **保留份数控制**：可设置保留最近 N 份备份，系统会自动清理物理过期旧副本。

> [!TIP]
> **异地容灾提取**：如果您从云端（如 Telegram 或 S3）下载了加密备份文件，但由于某种原因无法访问 NodeAuth 实例，请参考 [离线解密指南](../recovery/index.md) 使用脚本进行脱机数据提取。

<!-- [📸 UI截图提示：此处展示包含多维度备份源（S3/Email/TG/网盘）的配置列表全景图] -->
