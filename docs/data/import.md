---
description: "NodeAuth 全平台数据搬家指南。凭借内置的万用导入引擎，支持自动识别并一站式解析超过 20 种主流 2FA 工具（Google Authenticator, Microsoft Authenticator, 2FAS, Aegis）及密码管理器（Bitwarden, 1Password）的导出格式。详细讲解 GA 分页扫码合并与 Steam 令牌 (.maFile) 导入流程，确保迁移过程零知识、本地化且无痛去重。"
---
# 全平台数据导入（搬家指南）

NodeAuth 拥有强大的 **万用导入引擎**，能够自动识别并解析超过 20 种主流 2FA 应用和密码管理器的导出格式。只需将文件轻轻一拖，即可完成无痛迁移。

---

## 📂 支持的导入来源与格式

### 1. 2FA 移动端 App
| 来源平台 | 支持格式 | 备注 |
| :--- | :--- | :--- |
| **Google Authenticator** | 二维码 (.png / .jpg) | 支持分页扫码合并导入 |
| **Microsoft Authenticator** | PhoneFactor | 需 root 导出内部数据库文件 |
| **2FAS** | .2fas | 支持加密格式（需输入密码） |
| **Aegis** | .json / .txt | 支持 AES 加密格式 |
| **Bitwarden Auth** | .json / .csv | 对齐 Bitwarden 官方导出规范 |
| **Proton Auth** | .json | 多账户批量导入 |
| **Ente Auth** | .txt | 文本导出识别 |
| **LastPass Auth** | .json | 完整账户元数据迁移 |

### 2. 密码管理器 (Desktop/Cloud)
| 来源平台 | 支持格式 |
| :--- | :--- |
| **Bitwarden** | .json / .csv (支持加密 JSON) |
| **1Password** | .1pux / .csv |
| **Proton Pass** | .pgp / .csv |
| **iCloud 钥匙串** | .csv |
| **KeePassXC / Enpass** | .csv |
| **NordPass / Keeper / Roboform** | .csv |
| **Dashlane** | .csv |

### 3. 通用与特殊格式
*   **Steam 令牌**：支持 **.maFile** (SDA 导出的 JSON)、Steam URI (`steam://`) 以及 OTPAuth URI。
*   **通用 JSON/CSV**：遵循标准 `otpauth://` 协议或带有 `secret` 字段的表格。
*   **OTPAuth URI 列表**：支持 `.txt` 文件，每行一个 `otpauth://` 链接。

---

## 📖 重点平台搬家指引

### 🗺️ Google Authenticator (GA) 迁移
GA 不支持直接文件导出，请执行以下操作：
1.  在手机 GA 中点击“转移账号” -> “**导出账号**”。
2.  在 NodeAuth 导入界面，直接扫描弹出的二维码。
3.  **多页处理**：如果账号较多，GA 会展示 1/3, 2/3... 多页二维码。NodeAuth 支持**连续扫码缓存**，全部扫完后一键合并。

### 🗺️ Microsoft Authenticator 迁移
对于安卓用户，如果已 root，可以从以下路径导出数据库文件并直接上传：
*   `/data/data/com.azure.authenticator/databases/PhoneFactor`
*   同时建议上传对应的 `-wal` 和 `-shm` 辅助文件。

### 🗺️ Steam Guard 迁移
如果您使用 **Steam Desktop Authenticator (SDA)**：
1.  找到您的 `.maFile` 文件（位于 SDA 的 `maFiles` 目录下）。
2.  直接将该文件拖入 NodeAuth 导入区。系统将自动提取 Steam 共享密钥并生成动态码。

---

## ⚠️ 迁移注意事项
*   **重复项自动去重**：系统会根据密钥（Secret）和账户名自动判断。已存在的账号将自动跳过，确保库不杂乱。
*   **零知识解密**：对于 2FAS、Aegis 等加密备份，所有解密操作均在您的**浏览器本地运行**。密码不会离开您的设备。
*   **应急恢复包**：若您导出了包含加密密钥的 PDF 或备份文件，请妥善保管。该文件包含解密核心，丢失将无法找回数据。
*   **导入报告**：操作完成后，系统会实时展示“成功”、“跳过”和“失败”的详细报告，方便您排查数据。
*   **更多帮助**：如遇复杂格式问题，请参考 [应急恢复指南](../recovery/index.md)。

<!-- [📸 UI截图提示：此处展示万能导入界面的“品牌网格”区域，展示对 Bitwarden, 1Password, GA 等图标的支持] -->
