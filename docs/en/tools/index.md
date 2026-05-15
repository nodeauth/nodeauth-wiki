---
description: "NodeAuth TOTP Core Toolkit Overview. Integrates a variety of practical security tools, including a high-strength random password generator, OTPAuth protocol parsing, QR code parsing and generation, etc. Provides a one-stop 2FA technical support environment, fully assisting your digital security management."
---
# TOTP Core Toolbox

NodeAuth provides a powerful geek toolbox for TOTP algorithm simulation, secret format conversion, and time offset debugging.

---

## 🛠️ Core Features

### 1. Four-Format Symmetric Conversion Engine
Enter a secret in the toolbox, and the system will recalculate and synchronize the conversion into the following four formats in milliseconds:
*   **Base32**: The most common 2FA secret format.
*   **Hex (Hexadecimal)**: Common in some database exports.
*   **ASCII (Plaintext)**: Visually displays the original secret.
*   **Base64**: Standard network transmission format.

### 2. Algorithm Simulation Sandbox
Supports real-time simulation of different algorithms:
*   **Standard TOTP**: Supports SHA1 / SHA256 / SHA512 switching.
*   **Steam Specific**: Automatically switches to Digits=5 and uses Steam's unique Alphanumeric character set.
*   **Dynamic URI Construction**: Real-time generation of `otpauth://` protocol text and the corresponding QR code.

### 3. Time Travel
For cases where verification codes fail due to clock synchronization issues between the server and the phone:
*   **Time Offset**: Supports manual injection of millisecond-level offsets.
*   **Cycle Jump**: Supports viewing verification codes 30 seconds ahead or behind, used for extreme server time difference debugging.

## 💡 Why Need These Tools?
*   **Reverse Analysis**: Analyze URIs exported from third-party apps that do not support exporting the Secret directly.
*   **Bulk Management**: Verify the validity of secrets before importing a large number of accounts.
*   **Developer Benchmarking**: If you are developing your own 2FA client, you can use this tool for benchmarking.

<!-- [📸 UI Mockup Tip: Full view of the toolbox: input box on the left, four format cards changing in real-time on the right, and the simulation countdown bar below] -->
