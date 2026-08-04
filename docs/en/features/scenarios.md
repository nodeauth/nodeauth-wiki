---
description: "NodeAuth Cross-Platform Best Practices. Provides the most concise and efficient setup steps for PC and mobile devices to create a secure and elegant 2FA experience."
---

# 🎯 Advanced Usage

After successfully deploying NodeAuth, we highly recommend following these practical configuration steps on your PC and mobile devices to achieve the smoothest and most secure experience.

## 💻 PC: Blazing-Fast Autofill

On a computer, your goal is to achieve automatic detection and one-click autofill of verification codes via the browser extension. Follow these steps on the Web App (Main Site):

1. **Set Up Passkey**
   * Go to `Settings` -> `Account & Security` -> `Passkeys`.
   * Bind your Windows Hello or macOS Touch ID. This allows you to skip the master password and achieve one-second biometric login.
2. **Set Up App Lock (PIN)**
   * Go to `Settings` -> `Account & Security` -> `App Lock`.
   * Set a memorable, short PIN code as a secondary protective barrier for your local vault.
3. **Install and Configure Browser Extension**
   * Install the NodeAuth extension from your browser's store and complete the secure pairing with your main site address.
   * **Crucial Step**: To maximize the extension's efficiency, be sure to refer to the [Extension Best Practices](/en/extension/usage#_8-best-practices-and-scenario-configurations). Adjust the auto-lock and clipboard clearing strategies based on your environment (Personal Computer vs. Office Environment).

## 📱 Mobile: Native App-Level Operating Experience

On a mobile phone, your goal is to break free from the browser's address bar and turn NodeAuth into an independent, full-screen App with system-level permissions.

1. **Add to Home Screen (PWA)**
   * Open your NodeAuth main site in a mobile browser (Safari for iOS, Chrome for Android).
   * Tap the browser's "Share" or "Menu" button and select **"Add to Home Screen"**.
   * From now on, **always launch NodeAuth from this standalone desktop icon**.
2. **Set Up Passkey**
   * Launch the App from the desktop icon and go to `Settings` -> `Account & Security` -> `Passkeys`.
   * Bind your FaceID (iOS) or Fingerprint unlock (Android) for instant access.
3. **Set Up App Lock (PIN)**
   * Go to `Settings` -> `Account & Security` -> `App Lock`.
   * It is highly recommended to enable this to ensure that biometric or PIN verification is triggered every time you switch back to the App from the background, guarding against peeking when you lend out your phone.
4. **Enable Offline Mode (Optional)**
   * Go to `Settings` -> `Security Controls` -> `Offline Mode`.
   * Once enabled, you can still smoothly retrieve 2FA codes even in extreme scenarios without network signals (e.g., server rooms, airplanes).
