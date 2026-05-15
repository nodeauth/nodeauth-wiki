---
description: "NodeAuth Multi-Platform Data Migration Guide. Powered by a built-in universal import engine, it supports automatic recognition and one-stop parsing of export formats from over 20 mainstream 2FA tools (Google Authenticator, Microsoft Authenticator, 2FAS, Aegis) and password managers (Bitwarden, 1Password). Details the GA multi-page QR code merge and Steam Guard (.maFile) import processes, ensuring a migration that is zero-knowledge, localized, and painlessly deduplicated."
---
# Data Import (Migration Guide)

NodeAuth features a powerful **Universal Import Engine** capable of automatically identifying and parsing export formats from over 20 mainstream 2FA apps and password managers. Simply drag and drop your file for a painless migration.

---

## 📂 Supported Import Sources & Formats

### 1. 2FA Mobile Apps
| Source Platform | Supported Formats | Notes |
| :--- | :--- | :--- |
| **Google Authenticator** | QR Codes (.png / .jpg) | Supports multi-page batch scanning |
| **Microsoft Authenticator** | PhoneFactor | Requires root to export internal DB files |
| **2FAS** | .2fas | Supports encrypted formats (password required) |
| **Aegis** | .json / .txt | Supports AES encrypted formats |
| **Bitwarden Auth** | .json / .csv | Aligned with official Bitwarden specs |
| **Proton Auth** | .json | Bulk account import |
| **Ente Auth** | .txt | Plaintext export recognition |
| **LastPass Auth** | .json | Full account metadata migration |

### 2. Password Managers (Desktop/Cloud)
| Source Platform | Supported Formats |
| :--- | :--- |
| **Bitwarden** | .json / .csv (Supports encrypted JSON) |
| **1Password** | .1pux / .csv |
| **Proton Pass** | .pgp / .csv |
| **iCloud Keychain** | .csv |
| **KeePassXC / Enpass** | .csv |
| **NordPass / Keeper / Roboform** | .csv |
| **Dashlane** | .csv |

### 3. Universal & Special Formats
*   **Steam Guard**: Supports **.maFile** (JSON exported by SDA), Steam URI (`steam://`), and OTPAuth URIs.
*   **Generic JSON/CSV**: Follows standard `otpauth://` protocols or tables with a `secret` field.
*   **OTPAuth URI Lists**: Supports `.txt` files with one `otpauth://` link per line.

---

## 📖 Key Migration Guides

### 🗺️ Google Authenticator (GA) Migration
Since GA does not support direct file export, follow these steps:
1.  In the GA app on your phone, tap "Transfer accounts" -> "**Export accounts**".
2.  In the NodeAuth import interface, scan the generated QR codes.
3.  **Multi-page Handling**: If you have many accounts, GA will show multiple pages (1/3, 2/3...). NodeAuth supports **continuous scan caching**; simply scan all pages and merge with one click.

### 🗺️ Microsoft Authenticator Migration
For Android users with root access, you can export and upload the database files from:
*   `/data/data/com.azure.authenticator/databases/PhoneFactor`
*   It is recommended to also upload the accompanying `-wal` and `-shm` files.

### 🗺️ Steam Guard Migration
If you use **Steam Desktop Authenticator (SDA)**:
1.  Locate your `.maFile` files (found in SDA's `maFiles` directory).
2.  Drag these files directly into the NodeAuth import area. The system will automatically extract the Steam shared secrets and generate codes.

---

## ⚠️ Important Migration Notes
*   **Automated Deduplication**: The system identifies duplicates based on secrets and account names. Existing accounts will be skipped to keep your vault clean.
*   **Zero-Knowledge Decryption**: For encrypted backups (like 2FAS or Aegis), all decryption happens **locally in your browser**. Your password never leaves your device.
*   **Emergency Recovery Pack**: If you export a PDF or backup containing encryption keys, keep it safe. This file is essential for disaster recovery.
*   **Import Report**: After the operation, the system displays a real-time report of "Success", "Skipped", and "Failed" items for easy troubleshooting.
*   **Further Help**: For complex format issues, refer to the [Disaster Recovery Guide](../recovery/index.md).

<!-- [📸 UI Mockup Tip: "Brand Grid" area showing icons of Bitwarden, 1Password, GA, etc.] -->
