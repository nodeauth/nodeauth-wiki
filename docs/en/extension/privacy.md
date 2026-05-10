# NodeAuth Extension Privacy Policy
**Last Updated: May 10, 2026**

### 1. Introduction
NodeAuth provides a browser extension designed to help users securely manage 2FA/TOTP tokens. Your privacy and data security are our top priorities.

### 2. Information We DO NOT Collect
NodeAuth is built on the principle of **Zero-Knowledge** and **Local-First**.
*   **No Personal Data**: We do not collect, store, or transmit any personally identifiable information (PII).
*   **No Tracking**: We do not use any analytics, tracking pixels, or third-party monitoring tools.
*   **No Remote Backup**: Your master keys, TOTP seeds, and vault data are never sent to our servers.

### 3. Information We Process Locally
*   **Encrypted Vault**: Your security data is encrypted using AES-GCM and stored in the extension's local storage.
*   **Temporary Session Data**: Sensitive keys used for handshakes are kept only in the browser's volatile memory and are destroyed when the session is closed.

### 4. Permission Justification
*   **`storage`**: To save your encrypted vault locally.
*   **`scripting` & `activeTab`**: To facilitate secure handshakes with your authorized NodeAuth PWA instance and provide auto-fill services.
*   **`alarms`**: To implement the "Auto-Lock" security feature.

### 5. Optional Third-Party Services
*   **Service Icons**: If you explicitly enable the "Icons" feature in settings, the extension will fetch favicons from public services (such as Google or Bitwarden).
    *   **Privacy Note**: Enabling this feature means your account domain names (e.g., `github.com`) will be shared with these service providers to retrieve the icons.
    *   **Default State**: **This feature is disabled by default** to ensure your account list remains completely invisible to third parties by default.

### 6. Data Sharing
Except for the optional features mentioned above that you choose to enable, we do not sell, trade, or share your data with any third parties.

### 7. Contact Us
If you have any questions, please contact us at: **support@nodeauth.io**
