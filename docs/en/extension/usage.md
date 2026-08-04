---
description: "NodeAuth browser extension installation and usage guide. A visual demonstration of how to add new accounts, use the unique 'Scan Current Webpage' feature, and how to achieve seamless one-click captcha autofill to greatly enhance the secure login experience on desktop."
---
# 🧩 Usage Guide

This guide will help you complete the installation and authorization pairing of the NodeAuth browser extension, and master its convenient daily features.

## 1. Install the Extension

You can install the NodeAuth extension in the following ways:

### Recommended: Official Store Installation

This is the most convenient installation method, supporting automatic updates and cloud verification.

*   👉 **[Chrome Web Store](https://chromewebstore.google.com/detail/nodeauth/ejknfokfdojopelcbidgchnopeapnjgd)** (For Chrome)
*   👉 **[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/bclpbakllopgjhelikbhccpjkgbmfpgd)** (For Edge)
*   👉 **[Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/nodeauth/)** (For Firefox)

### Alternative: Manual Installation (GitHub)

If you cannot access the browser extension stores, you can manually load it from the source repository:

#### Chrome / Edge:

1.  Go to the [NodeAuth Extension Release Page](https://github.com/nodeauth/nodeauth-browser-extension/releases), download the latest `.zip` file, and extract it.
2.  Type `chrome://extensions/` in the address bar and press Enter.
3.  Turn on **"Developer mode"** in the top right corner.
4.  Click "Load unpacked" and select the extracted directory.

#### Firefox:

1.  Go to the [NodeAuth Extension Release Page](https://github.com/nodeauth/nodeauth-browser-extension/releases) and download the latest `.zip` file.
2.  Type `about:debugging` in the address bar and press Enter.
3.  Click **"This Firefox"** on the left.
4.  Click **"Load Temporary Add-on..."** and select the downloaded `.zip` file.

> [!NOTE]
> Due to Firefox's stable release enforcing mandatory signing, manually loaded extensions will be disabled after restarting the browser. For permanent use, please prioritize official store installation.

## 2. Authorization and Pairing

After installation, you need to establish a secure connection between the extension and your self-deployed NodeAuth instance. This entire process is initiated from the extension:

1.  **Open the Extension**: Click the NodeAuth icon in the top right corner of the browser.
2.  **Enter Instance URL**: On the "Connect your NodeAuth instance" screen, enter your NodeAuth PWA URL (e.g., `https://auth.example.com`).
3.  **Start Pairing**: Click the **"Start Pairing"** button. The browser will automatically open your instance webpage for authentication.
4.  **Authorization Success**: After passing authentication, a green toast will pop up at the top of the webpage: "Browser extension authorized successfully. Please click the extension icon in the top right corner of the browser to continue setting the password." (This means the encrypted tunnel is established, and the extension has securely obtained your data).

## 3. Set Local PIN Code

For security reasons, the extension has an independent local locking mechanism and will not save your Master Key in plaintext on the hard drive:

1.  **Click Extension**: After successful authorization, click the NodeAuth icon in the top right corner of the browser again.
2.  **Set Password**: The interface will enter the "Set unlock password" screen. Please enter a **6-digit** PIN code.
3.  **Local Encryption**: Click **"Lock"**. This PIN will serve as the secondary encryption key for the local vault. **The NodeAuth server will absolutely never know or store this password**.
4.  **Daily Unlock**: In your subsequent daily use, you only need to enter this PIN to quickly unlock the extension for OTP autofill.

## 4. How to Add New Accounts

In daily use, when you enable two-factor authentication (2FA) on any website and see a QR code, you don't need to take out your phone; you can complete the addition directly within the browser.

1. **Open Extension**: Click the NodeAuth icon in the top right corner.
2. **Click Add**: Click the **`+`** icon on the top navigation bar to enter the add account page.
3. **Scan Current Webpage (Recommended!)**:
   - Click the **[ Scan Current Webpage ]** button.
   - The extension will automatically capture the QR code on your current webpage, instantly extract the secret and account information, saving you all the tedious manual operations.
4. **Other Adding Methods**:
   - If the webpage has no QR code, you can manually input the "Service Name", "Account ID", and "Secret".
   - Alternatively, you can use the **[ Upload Image ]** feature to recognize a QR code screenshot saved locally.

## 5. Experience Seamless One-Click Autofill

This is NodeAuth's most loved feature, and it will completely change your login experience.

1. **Enter Login Page**: On any webpage that requires a 6-digit 2FA code (e.g., GitHub, Google login pages).
2. **Auto-Detect**: When you click or focus on the verification code input box, a **NodeAuth shield icon 🛡️** will automatically hover to the right or near the input box.
3. **One-Click Autofill**:
   - Click the icon to expand a floating menu showing the list of accounts matching the current website (with a real-time countdown for the code).
   - Click the account you need, and the verification code will be instantly and **automatically filled** into the input box.

> [!TIP]
> If the hover icon says "🔒 Please click the extension icon to unlock NodeAuth first", it means your extension is currently auto-locked. Just click the extension icon in the top right corner and enter your PIN to unlock it.

## 6. Personalize Your Extension Settings

At the bottom bar of the extension's main interface, click **"Settings"** to deeply customize how the extension operates:

- **General & Appearance**:
  - Freely switch the interface language (Simplified Chinese/English).
  - Choose whether to enable "Service Icons", "Suggestions Badge", and the "One-Click Autofill" feature.
  - Change list layout (Standard/Compact) and color theme (System/Dark/Light).
- **Security**:
  - Set the auto-lock delay. If you're worried about data leaks when leaving your desk, you can set it to lock after 3 minutes.
  - Enable automatic clipboard clearing to prevent copied verification codes from being intercepted by malware.

## 7. Data and Instance Management

At the very bottom of the settings page, you can see the "Data Management" area:

- **Current Instance URL**: Displays your currently bound NodeAuth PWA address (e.g., `https://auth.yourdomain.com`).
- **Log Out**: Clears the current session state.
- **Reset Extension**: If you change servers or encounter sync issues, click here to completely erase all local authorization states, restoring the extension to its initial state upon installation.

---

## 8. Best Practices and Scenario Configurations

To maximize the efficiency of the NodeAuth browser extension and ensure your data security, we have prepared two common optimal configuration recommendations. You can adjust them based on your environment.

### Scenario 1: Ultimate Convenience for Personal Computers

If you are using NodeAuth at home or on a completely personal computer, **convenience** is usually the primary demand. You can configure it like this:

**Recommended Settings Path**: Click `Settings` at the bottom bar
- ✅ **Enable [One-Click Autofill]**: Enjoy the blazing-fast experience of directly clicking the shield icon in web input boxes to fill in codes.
- ✅ **Enable [Suggestions Badge]**: Let the top right corner of the browser constantly remind you of the number of available accounts for the current website.
- ✅ **Enable [Service Icons]**: Make the list more beautiful and intuitive.
- ⏳ **Set [Auto-Lock Delay] to "Until browser is closed"**: This way, you don't have to repeatedly enter your password to unlock during your browsing session.
- 📋 **Set [Auto-Clear Clipboard] to "Do not clear" or "2 minutes"**: In a private environment, clipboard retention time can be appropriately extended.

### Scenario 2: Security First for Office or Public Environments

If you are using NodeAuth on a company computer, an internet cafe, or any device that others might access, **security** must be the top priority to prevent data theft when you leave your desk.

**Recommended Settings Path**: Click `Settings` at the bottom bar
- 🔒 **Set [Auto-Lock Delay] to "3 minutes" or "5 minutes"**: This is the most crucial step. This way, when you go get water or attend a short meeting, the extension will automatically lock, protecting your verification codes from being peeked at.
- 📋 **Set [Auto-Clear Clipboard] to "30 seconds"**: Strongly recommended! Company computers might run unknown software or monitoring programs. With this enabled, the clipboard will clear 30 seconds after copying a verification code, preventing credentials from being intercepted by background malware.
- 🛑 **Good Habit Before Leaving/Getting Off Work**: If you are using an unfixed public computer, please scroll to the bottom of the settings and click **"Log Out"** or **"Reset Extension"** after use to thoroughly clean up local authorization.

### Appearance and Layout Optimization Tips

- **When you have more than 10 accounts**:
  It is recommended to go to `Settings` -> `Appearance` and change the **List Layout** to **"Compact"**. This allows you to see more accounts on a single screen, reducing scrolling.
- **Regarding Theme Switching**:
  The default "System" theme blends perfectly with macOS/Windows. If you prefer a geeky style, you can force it to "Dark Theme".
