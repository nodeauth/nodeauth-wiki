---
description: "NodeAuth Auxiliary Security Tools Collection. Provides features including high-entropy random character generation, Base32 encoding conversion, and QR code compliance detection. Designed to provide clean, track-free localized algorithmic support for security experts and geek users, preventing sensitive information leakage on untrusted websites."
---
# Utility Tools

In addition to the core TOTP functionality, NodeAuth also features built-in utility tools to improve geek efficiency.

---

## 🔐 Password Generator
If you need a high-strength password when registering for a website:
*   **Features**: Supports custom length (up to 128 characters), inclusion of special characters, numbers, and both uppercase and lowercase letters.
*   **Offline Generation**: Uses `crypto.getRandomValues` as an entropy source, ensuring high-security.
*   **One-Click Copy**: Clicking the generated password automatically copies it to your clipboard.

## 🔍 QR Code Parser
Processes non-standard 2FA images or screenshots:
*   **Local Parsing**: Directly drag and drop an image containing a QR code.
*   **Protocol Recognition**: Automatically parses the `otpauth://` protocol and jumps to the "Add Account" interface.
*   **Privacy Protection**: Images are parsed in local memory and are never uploaded to any cloud.

## ⏰ High-Precision Time Calibration
*   **Offset Alignment**: The system automatically captures the timestamp from server response headers and calculates any local clock error.
*   **Automatic Compensation**: When calculating dynamic codes, the system automatically applies this compensation without any manual user intervention.

<!-- [📸 UI Mockup Tip: Password generator parameter slider interface and the QR code parsing success layer] -->
