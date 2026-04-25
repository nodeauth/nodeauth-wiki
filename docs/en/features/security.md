# Ultimate Security: All-around Privacy Defense

Security is the bottom line and the soul of NodeAuth's design. Through a comprehensive "end-to-end encryption" and "all-scenario protection" system, we build an unshakable fortress for your digital identity.

---

## 🔒 1. Zero-Knowledge Architecture (Zero-Knowledge)
NodeAuth follows the core principle of "no touching, no prying, and no holding." By transforming the browser environment into a "Master Password," it ensures that core secrets remain physically inaccessible even to server administrators.

---

## 🔐 2. End-to-End Encryption (E2EE)
Core assets are encrypted into `nodeauth:` ciphertext before leaving the browser. Throughout the entire network transmission and storage lifecycle, data can only be decrypted on your device, achieving protection standards on par with commercial-grade managers.

---

## ❄️ 3. Full Database Cold Encryption (Cold Encryption)
Unlike traditional applications that store secrets in plaintext, NodeAuth implements **full-database cold processing**:
*   **Local AES-GCM Encapsulation**: All sensitive data exists in the local IndexedDB solely as encrypted BLOBs.
*   **Core Logic Lock**: The system uses `NODEAUTH_LICENSE` to implement algorithmic "logic injection," ensuring the decryption chain is physically bound to your authorization identity, preventing decryption even if environment variables are leaked.
*   **Hardware Salt Injection**: Uses device fingerprints derived from WebAuthn as encryption anchors (Device Salt). Even if the database file is stolen, it cannot be easily decrypted on a different device.
*   **Non-Persisted Keys**: Core decryption keys only live in RAM and are immediately erased once the system logs out or the page is refreshed, preventing physical forensics.

---

## 🔒 4. Real-time Access Control & Physical Gatekeeper (AppLock)
Ultimate security requires "gatekeeper-level" admission control:
*   **High-Performance Hash Verification**: PIN codes are locally hashed using **100,000 PBKDF2** iterations, completely defending against brute-force attacks.
*   **Direct Biometric Connection**: Deeply integrated native system fingerprint and face recognition for near-instant (sub-300ms) access.
*   **Nuclear Self-Destruction**: If consecutive malicious attempts are detected or if triggered by the user, the system physically erases the local IndexedDB cache—choosing self-destruction over leakage.

---

## 🔄 5. Self-Healing Synchronization with Integrity Checks
Synchronization is more than just data transmission; it is the ultimate pursuit of consistency:
*   **Action Offset Optimization**: Multi-step operations performed while offline (e.g., adding and then deleting an item) are automatically offset in the local logic layer, ensuring the resulting command set sent to the server is as minimal and pure as possible.
*   **Version-Timestamp Conflict Resolution**: Uses a `version_timestamp` mechanism. When modifications occur across multiple devices, the system automatically detects conflicts and guides the user through resolution, preventing old data from overwriting new data.

---

## 👻 6. Scenario-Level Privacy Shield (Ghost Mode)
Targeting physical social scenarios such as "screen peeping" and "preview" hijacking:
*   **Anti-Snooping Mode (Ghost Mode)**: Monitors the browser's visibility state in real-time. When backgrounding or switching windows, a **15px Gaussian blur** instantly covers the interface, preventing leaks in task manager snapshots.
*   **Privacy Long-Press Trigger**: Account codes are masked as `••••` by default. They are only revealed for 250ms after a long-press, greatly reducing the chance of leakage in public places like subways or elevators.

---

## 🪣 7. Multi-Channel Disaster Recovery System
Data security lies not only in encryption but also in **redundancy**:
*   **Double-Encrypted Packages**: All backup files sent to S3, Email, or Telegram are secondary-packaged using an independent "Backup Password" with AES-GCM.
*   **Full Platform Coverage**: Supports Email (SMTP), S3 protocol, WebDAV, Telegram Bot, and OAuth backups for major cloud drives (Google/OneDrive/Dropbox).

---

## 🔑 8. Modern Identity Protection (Passkey / WebAuthn)
We abandon fragile traditional passwords in favor of hardware-based security standards:
*   **Passkey Hardware Protection**: Supports physical keys (e.g., YubiKey) or biometric authentication to defend against phishing at the source.
*   **Modern OAuth2 Login**: Pre-configured for major platforms like GitHub, Google, Microsoft, Telegram, Cloudflare Access, Gitee, and NodeLoc. Beyond convenience, it ensures only invited users can gain access via the `OAUTH_ALLOWED_USERS` allowlist.
*   **Web3 Wallet Login**: Supports interactive signature verification with mainstream blockchain wallets like Ethereum for 100% self-hosted authentication.

---

## 🔒 9. Offline Isolation & Pure Sandbox (Air-Gap)
Even in uncertain network environments, NodeAuth provides a physically isolated "safe harbor":
*   **Mandatory Interception**: All API requests to the server (including sync and backup) are intercepted by the application layer.
*   **Network Spoofing**: The system fakes a "network disconnected" status for the application logic, ensuring no data packets flow out—achieving a true Air-Gap environment.

---

## 📡 10. Intelligent Health Check & Sniffing (Health Shield)
Before unlocking, the system performs a deep environment audit:
*   **Environment Sniffing**: Automatically scans the WASM core, code chunks, and critical anchor points at startup.
*   **Blocked Unlock**: If environment detection is incomplete or risks of abnormal tampering are found, the system refuses to unlock and provides repair instructions—ensuring "no unlock if the environment is unhealthy."

<!-- [📸 UI Mockup Tip: Show Security dashboard, AppLock screen, and the blur effect after enabling Ghost Mode] -->
