---
description: "NodeAuth Manual Data Export Guide. Provides a highly secure, fully localized data export solution supporting NodeAuth Encrypted JSON, 2FAS, Aegis, and other third-party compatible formats. Specially highlights the \"HTML Offline Interactive Page\" feature, helping you view all dynamic codes offline through a single file without a network connection in extreme disconnect or server unreachable scenarios, ensuring data sovereignty and access continuity."
---
# Manual Data Export

Your data sovereignty belongs entirely to you. NodeAuth provides multiple flexible and secure export methods, ensuring you can perform physically isolated cold backups locally or migrate seamlessly to other platforms. All encryption processes are completed locally in your browser; your core Secrets never leave your device in plaintext.

---

## 📂 Supported Export Types & Formats

### 1. Native System Backups
| Export Type | Format | Description |
| :--- | :--- | :--- |
| **NodeAuth Encrypted JSON** | .json | **Highly Recommended**. Contains all metadata and icons, secured with PBKDF2 strong encryption. Can be imported directly into other NodeAuth instances. |
| **NodeAuth Plaintext JSON** | .json | Contains all account secrets in plaintext. Only recommended for offline archiving in highly secure, physically isolated environments. |

### 2. Third-Party App Compatibility
| Target Platform | Export Format | Use Case |
| :--- | :--- | :--- |
| **2FAS** | .2fas | Directly import into the 2FAS mobile app. |
| **Aegis** | .json | Compatible with the import specifications of Aegis Authenticator for Android. |
| **Bitwarden Auth** | .json | Compatible with the recently launched Bitwarden Authenticator app. |
| **Google Auth QR Code** | QR Code | **Migration Special**. Generates standard GA migration QR codes for selected accounts, allowing another phone to easily scan and take over. |

### 3. Universal & Portable Formats
*   **OTPAuth URI (Text)**: Exported as a `.txt` file, with each line containing an `otpauth://` link. Highly universal.
*   **Table CSV**: Standard Excel-compatible format, convenient for manual editing or storage in offline spreadsheets.
*   **HTML Offline Interactive Page**: **Star Feature**. Exported as a single-file `.html`. It features built-in verification code calculation logic. Even if the server is down, you only need to double-click this file (no internet required) to view all current dynamic codes offline.

---

## 🛠️ Export Security
*   **Zero Server Interaction**: All `.json` encryption, HTML page generation, and QR code conversion are completed within your browser process. The NodeAuth server acts only as a "messenger" for the file and cannot peek at its contents.
*   **Strong Decoupling Protection**: The "encryption password" used during export is set independently. Even if the application's core encryption key (`ENCRYPTION_KEY`) is changed in the future, the validity of your previously exported manual backup files will not be affected.

---

## 💡 Best Practice Advice
*   **Dual Backup**: It is recommended to save both a **NodeAuth Encrypted JSON** (for secondary imports) and an **HTML Offline Page** (for viewing verification codes in extreme offline/no-server scenarios).
*   **Regular Export**: Whenever you add important 2FA accounts (especially those linked to high-value assets), be sure to manually perform an export and save it to a private external storage device.

> [!TIP]
> **Emergency Recovery**: If you have exported a JSON file but temporarily cannot access NodeAuth, you can use the project's built-in [Offline Decryption Script](../recovery/index.md) for offline extraction.

<!-- [📸 UI Mockup Tip: Display export interface icons and the professional, secure look of the encryption password entry field] -->
