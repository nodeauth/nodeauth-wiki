---
description: "NodeAuth Passkey Configuration Guide. Provides hardware-level identity authentication based on FIDO2 and WebAuthn standards. Details how to register physical Security Keys or biometric credentials, and explores how PRF extension technology enables encryption keys to be derived within the secure enclave without ever landing on disk, defending against phishing and XSS attacks at the root for true seamless security."
---
# Passkeys

Passkeys provide hardware-level authentication based on the FIDO2 standard. They allow you to unlock your NodeAuth account using biometrics (fingerprint, face recognition) or physical Security Keys.

---

## 🛠️ Registering a New Passkey
1. Go to "System Settings" -> "**Passkey Management**".
2. Click "**Add Device**".
3. Follow the system prompts to complete authentication (e.g., press your YubiKey or verify via Touch ID).
4. The system will physically bind this hardware credential to your account backend.

## 🔑 Technical Details: PRF Extension
NodeAuth supports the advanced **PRF (Pseudorandom Function)** extension:
*   **Derived Encryption**: When enabled, the local database decryption key is derived directly from within the security chip.
*   **Non-Persisted Features**: Since the key never touches JS memory, it greatly enhances protection against Cross-Site Scripting (XSS) attacks.

## 🗑️ Revocation & Management
*   **Inline Renaming**: To distinguish between your iPhone, Mac, or Windows devices, you can click the edit icon on the right side of the Passkey list to rename them.
*   **Physical Revocation**: If a device is lost, click "**Delete**" immediately. The physical credential for that device will be permanently invalidated.
*   **Audit Metadata**: You can view the creation time and the last time each Passkey was used.

<!-- [📸 UI Mockup Tip: Passkey list interface showing icons, names, and last use times for various registered devices] -->
