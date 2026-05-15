---
description: "NodeAuth Device and Session Management Guide. Provides transparent real-time session auditing with automatic multi-platform device recognition and IP privacy desensitization display. Introduces how to execute remote secure logout to physically invalidate abnormal tokens, and how the unique Device Salt achieves hardware-level isolation for decryption environments on each endpoint, ensuring your account access is always controlled."
---
# Device Management

NodeAuth provides transparent session auditing, allowing you to stay in control of who logged into your system, at what time, and on which device.

---

## 📱 Real-time Session Auditing
In "Security Center" -> "**Devices & Sessions**", you can view all currently logged-in sessions:
*   **Platform Recognition**: Automatically maps over 10 brand icons (e.g., MacOS, Windows, iOS, Android).
*   **Location & IP**: Displays the public IP at the time of login.
*   **Privacy Masking**: The system performs **subnet mask dynamic masking** on IP addresses to indicate the general region while protecting the precise physical location.

## 🚫 Remote Security Logout
If you discover an unusual login or forget to log out on someone else's computer:
1. Find the corresponding device entry.
2. Click the red "**Force Logout**" icon on the right.
3. The system will physically delete the backend session token. The frontend device will automatically jump back to the login page and clear its cache within 5 seconds.

## 🔐 Unique Device Salt
*   After each device binds a Passkey or logs in, the system injects a unique `sys:sec:device_salt` into the local IDB.
*   This ensures that even when the same account is logged in on different devices, the decryption environment for each end is hardware-isolated.

<!-- [📸 UI Mockup Tip: Session management list showing icons for multiple logged-in devices, OS names, masked IPs, and a "Current Device" tag] -->
