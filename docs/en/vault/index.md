---
description: "NodeAuth Account Management Basic Manual. Covers core operations of adding, deleting, modifying, and querying 2FA tokens, and introduces how to add accounts by scanning QR codes or manually entering keys. It details account metadata editing, classification management, and automatic icon association features, helping you build an orderly digital identity vault."
---
# Vault Management (Basic Operations)

The core of NodeAuth is managing your Two-Factor Authentication (2FA) accounts. All operations are executed in a **fully encrypted** environment.

---

## ➕ Adding an Account
Click the **"+"** or **"Add"** button on the main interface. The system supports three minimalist ways to add accounts:

### 1. Camera Scan (Recommended)
Directly scan the 2FA QR code provided by the third-party platform (e.g., GitHub, Google) using your camera.

### 2. Image Recognition
If the QR code is saved in your phone's photo album or is a screenshot sent by someone else, you can use the "Image Recognition" feature to extract the key directly.

### 3. Manual Entry
If you cannot scan the code (e.g., screen damage or the key is provided in text format), choose this option. You will need to fill in the following fields:
*   **Service Name**: e.g., `Google` or `GitHub`.
*   **Account Identity**: Usually your email address or username.
*   **Secret Key**: Enter the key in Base32 format.
*   **Advanced Parameters (Default settings usually sufficient)**:
    *   **Algorithm**: Supports SHA1 (default), SHA256, and SHA512.
    *   **Digits**: Supports 6 digits (default) or 8 digits.
    *   **Updating Period**: Supports 30 seconds (default) or 60 seconds.
*   **Category**: Optional. Classify the account into folders like "Work" or "Personal".

> [!TIP]
> **Steam Specific**: When you manually enter a key that contains `steam://` or is identified as Steam format, NodeAuth will automatically adjust the **Digits** to 5 and adapt the Steam-exclusive algorithm without manual configuration.

<!-- [📸 UI Mockup Tip: Tabs for adding accounts, highlighting form details for "Manual Entry"] -->

## 📝 Modifying an Account
Click the **"Edit"** icon on the right side of the account list:
*   You can modify the account label, category, or notes.
*   For security reasons, the original Secret is hidden by default.

## 🗑️ Deleting an Account
In the edit interface, or if you decide it's no longer needed after exporting, click **"Delete"**:
1. To prevent accidental deletion, a secondary confirmation box will pop up.
2. **Note**: Deletion is **irreversible**. Please ensure you have backups on other devices or have disabled 2FA on the respective platform.

## 📤 Exporting a Single Account
If you only need to share a specific account with someone else:
1. Click the **"Share"** icon on the right side of the account.
2. The system will generate a temporary QR code with the `otpauth://` protocol.

<!-- [📸 UI Mockup Tip: Popup window for adding accounts, including the scan button and manual entry fields] -->
