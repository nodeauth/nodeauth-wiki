---
description: "NodeAuth Secure Lock Feature Guide. Introduces how to build application-level access control through a 6-digit PIN code and biometric (fingerprint, face) recognition. Covers high-strength 100,000-iteration PBKDF2 hash validation, auto-lock delay strategies, and a \"Nuclear Self-Destruct\" local cache wiping mechanism for forgotten PINs, comprehensively protecting your 2FA data from physical prying."
---
# Security Lock

Security Lock is NodeAuth's "app-level gatekeeper," preventing others from snooping on your data if your phone is left unlocked.

---

## 🔢 6-Digit PIN
This is the most common locking method:
1. Enable it in "Security Center" -> "**Security Lock**".
2. Set a 6-digit numeric password.
3. **Hashing Strategy**: The system performs **100,000 PBKDF2** iterations locally to hash the PIN, providing physical defense against brute-force attacks.
4. **Haptic Feedback**: If the input is incorrect, your phone will notify you with a 0.4s shake animation and a physical vibration.

## 👆 Biometric Unlock (Local)
If your device supports fingerprint, face recognition, or under-display fingerprinting:
*   Once the PIN is enabled, you can check "**Biometric Quick Entry**".
*   **Instant Access**: 300ms after entering the app, the system biometric recognition will be triggered automatically, eliminating the need for manual numeric entry.

## ⏲️ Auto-Lock Delay
You can customize when the lock is triggered:
*   **Immediate**: Lock as soon as you switch browser tabs or move the app to the background.
*   **Idle Lock**: e.g., Set to "Lock after 5 minutes".

## ☢️ Nuclear Logout (Reset)
If you forget your PIN, there is a hidden option on the lock screen: tap 5 times to trigger a **"Nuclear Logout"**.
*   **Consequences**: This will physically erase all local cached data on the device, including the `enc_device_salt` (core encryption salt), `bio_cred_id` (biometric credential), and all `LocalStorage` records. You will need to log in again and resync your data online.

<!-- [📸 UI Mockup Tip: Numeric keypad unlock interface and the auto-lock delay dropdown] -->
