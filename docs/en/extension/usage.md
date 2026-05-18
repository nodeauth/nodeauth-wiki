---
description: "NodeAuth Browser Extension Installation and Usage Guide. Deeply integrates with Chrome and Edge browsers, supports zero-knowledge encrypted handshake protocols, and achieves physically isolated communication with PWA applications. Introduces how to use the extension for one-click autofill of dynamic codes, greatly enhancing the secure login experience on the desktop."
---
# 🧩 Installation & Usage

This guide will walk you through the installation, pairing, and daily use of the NodeAuth browser extension.

## 1. Installation

You can install the NodeAuth extension via the following methods:

### Recommended: Official Stores

This is the most convenient way to install, supporting automatic updates and cloud verification.

*   👉 **[Chrome Web Store](https://chromewebstore.google.com/detail/nodeauth/ejknfokfdojopelcbidgchnopeapnjgd)** (for Chrome browser)
*   👉 **[Edge Add-ons Store](https://microsoftedge.microsoft.com/addons/detail/bclpbakllopgjhelikbhccpjkgbmfpgd)** (for Edge browser)
*   👉 **[Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/nodeauth/)** (for Firefox browser)

### Alternative: Manual Installation (GitHub)

If you cannot access the official extension stores, you can load it manually from the source repository:

#### Chrome / Edge:

1.  Go to the [NodeAuth Extension Releases](https://github.com/nodeauth/nodeauth-browser-extension/releases) and download the latest `.zip` file and extract it.
2.  Open `chrome://extensions/` in your browser.
3.  Enable **"Developer mode"** in the top right corner.
4.  Click **"Load unpacked"** and select the extracted directory.

#### Firefox:

1.  Download the latest `.zip` file from the [NodeAuth Extension Releases](https://github.com/nodeauth/nodeauth-browser-extension/releases) page.
2.  Open `about:debugging` in your browser.
3.  Click **"This Firefox"** on the left sidebar.
4.  Click **"Load Temporary Add-on..."** and select the downloaded `.zip` file.

> [!NOTE]
> Due to signature requirements in Firefox stable, manually loaded extensions will expire when the browser restarts. For permanent use, please install from the official store.

## 2. Authorization & Pairing

After installation, you must establish a secure connection between the extension and your NodeAuth PWA instance:

1.  **Open PWA**: Log in to your NodeAuth PWA (e.g., `https://auth.example.com`).
2.  **Go to Settings**: Navigate to **"Settings"** -> **"Device Management"**.
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
*   **Device Management**: If you lose a computer where the extension is installed, you can revoke its access remotely from the "Device Management" section in the PWA.

---

> [!TIP]
> Pin the NodeAuth extension to your toolbar for the most efficient experience.
