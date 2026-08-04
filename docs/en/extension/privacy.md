---
description: "NodeAuth browser extension privacy policy. A solemn commitment to 'Zero Logs, Zero Collection, Zero Upload'. Details the permissions required by the extension and explains how we protect your digital footprint through local processing and end-to-end encryption to build a true privacy defense."
---
# NodeAuth Browser Extension Privacy Policy
**Last Updated: August 4, 2026**

### 1. Introduction
The NodeAuth browser extension is designed to provide you with secure and convenient 2FA/TOTP token management. Your privacy and data security are at the core of our product design. This privacy policy details how we handle your data and the system permissions required when providing our services.

### 2. Information We Do Not Collect
NodeAuth strictly adheres to **Zero-Knowledge** and **Local-First** architectural principles. We solemnly promise you (and the app store review teams):
*   **No Personal Identifiable Information (PII)**: We absolutely do not collect, store, or transmit any of your personal identity data, such as your name, email address, or phone number.
*   **No User Tracking**: This extension does not contain any analytics SDKs, tracking pixels, or third-party monitoring code. We have no way of knowing your browsing history or specific click behaviors.
*   **No Cloud Backups**: Your Master Key, TOTP seeds, and vault data will never be sent or backed up to NodeAuth's remote servers.

### 3. Data Processing on Local Devices
To fulfill 2FA management features, this extension only processes necessary data locally on your device:
*   **Encrypted Vault**: Your credential data is strongly encrypted using the AES-GCM algorithm and stored securely only in your browser's Local Storage environment.
*   **Volatile Memory Data**: Temporary key pairs generated when establishing the encrypted communication tunnel reside briefly only in the browser's working memory. Once the browser is closed or the session times out, this data is completely destroyed and never written to disk.

### 4. Permissions Request and Compliance Usage
To ensure the proper functioning of the extension and provide a secure, seamless service experience, we need to request the following permissions from your browser. The scope of these permissions is strictly limited to specific features:

*   **`storage`**: Used to persistently save your extension settings and your encrypted 2FA credential vault locally on the device.
*   **`tabs` & `activeTab`**: Used to read the URL of the currently active tab. This permission is dedicated exclusively to locally matching credentials and dynamically updating the badge count on the extension icon to indicate available accounts.
*   **`scripting`**: Used to dynamically inject the security public key early in the webpage lifecycle to establish the end-to-end encrypted tunnel; also used to dynamically mount an isolated autofill floating icon layer next to matching 2FA input fields without being affected by external styles.
*   **`alarms`**: Used to register reliable background timing tasks. This is a crucial dependency for implementing the "auto-lock" and memory clearing mechanisms when the extension is idle for a specified time.
*   **`notifications`**: Used to send system-level notifications to guide you to set a local unlock password after successfully completing the encrypted handshake pairing with the PWA.
*   **`Host Permissions: <all_urls>`**: This is an **optional permission**. The extension will only request content script registration across all web pages to detect OTP input fields if the user actively enables the "One-Click Autofill" advanced feature in the settings. If the user does not enable this feature, the extension will not request any global host permissions.

### 5. Third-Party Interactions and Data Sharing
We promise never to sell, trade, or indiscriminately share your data with any third parties. The only exception is the following optional feature actively controlled by the user:

*   **Service Icon Fetching (Optional Feature)**: If you actively enable the "Show Service Icons" feature in settings, the extension will request icon resources for the corresponding account domains from public icon libraries (like Google, Bitwarden, etc.).
    *   **Privacy Disclosure**: Enabling this feature means your account domain (e.g., `github.com`) will be sent to the aforementioned third-party service providers during the request.
    *   **Default Configuration**: To ensure maximum privacy, **this feature is turned off by default**. Under the default configuration, your account list remains physically isolated from any third parties.

### 6. Contact Us
If you have any questions regarding this privacy policy, permission declarations, or data security handling mechanisms, please feel free to contact our compliance and security team at: **support@nodeauth.io**
