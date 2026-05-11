# 🧩 Installation & Usage

This guide will walk you through the installation, pairing, and daily use of the NodeAuth browser extension.

## 1. Installation

You can install the NodeAuth extension via two methods:

### Recommended: Chrome Web Store (Official)

This is the most secure and convenient way to install, supporting automatic updates and cloud verification.

*   👉 **[Install from Chrome Web Store](https://chromewebstore.google.com/detail/nodeauth/ejknfokfdojopelcbidgchnopeapnjgd)**

### Alternative: Manual Installation (GitHub)

If you cannot access the Chrome Web Store, you can load it manually from the source repository:

1.  Go to the [NodeAuth Extension Releases](https://github.com/nodeauth/nodeauth-browser-extension/releases) and download the latest `.zip` file.
2.  Open `chrome://extensions/` in your browser.
3.  Enable **"Developer mode"** in the top right corner.
4.  Extract the downloaded `.zip` file, click "Load unpacked," and select the extracted directory.

## 2. Authorization & Pairing

After installation, you must establish a secure connection between the extension and your NodeAuth PWA instance:

1.  **Open PWA**: Log in to your NodeAuth PWA (e.g., `https://auth.example.com`).
2.  **Go to Settings**: Navigate to **"Settings"** -> **"Devices"**.
3.  **Authorize**: Click the **"Authorize Extension"** button.
4.  **Complete Handshake**: A confirmation page will appear. Once confirmed, the extension will automatically receive your encrypted vault seeds via a secure tunnel.

## 3. Local PIN Setup

For security, the extension features an independent local locking mechanism:

*   **Setup**: After successful pairing, you will be prompted to set a 6-digit PIN.
*   **Local Encryption**: This PIN acts as a secondary encryption key for your local vault. **NodeAuth servers do not store this PIN.**
*   **Auto-Lock**: You can configure auto-lock settings (e.g., "Lock when browser closed" or "Lock after X minutes of inactivity") in the extension settings.

## 4. Daily Use

*   **View Tokens**: Click the NodeAuth icon in your toolbar and enter your PIN to view your 2FA tokens.
*   **Quick Search**: Filter your accounts instantly by typing keywords.
*   **Device Management**: If you lose a computer where the extension is installed, you can revoke its access remotely from the "Devices" section in the PWA.

---

> [!TIP]
> Pin the NodeAuth extension to your toolbar for the most efficient experience.
