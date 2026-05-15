---
description: "NodeAuth Offline Mode Feature Guide. An Air-Gap physically isolated environment designed for high-security needs. Introduces how to achieve pure local sandbox operation through mandatory API blocking and network state spoofing, ensuring 2FA dynamic codes remain robustly available in completely disconnected environments to fundamentally eliminate data leakage risks."
---
# Offline Mode

Offline Mode is a "physical isolation" feature designed for geeks with extreme security requirements.

---

## 🔒 What is Offline Mode?
Once this mode is enabled, NodeAuth enters an **Air-Gap environment**:
*   **Mandatory Interception**: All API requests sent to the server (including synchronization and backup) are physically intercepted by the application layer.
*   **Pure local operation**: The application relies entirely on cold decrypted data in the local IndexedDB to work.
*   **Network Spoofing**: The system fakes a "network disconnected" status for the application logic, ensuring that no data packets flow out.

## 🚜 Use Cases
*   **Business / Flying**: Access and use verification codes via PWA in environments without internet access.
*   **High-Pressure Cold Backup**: Access in public networks where the environment is not entirely certain, avoiding the risk of token leakage.
*   **Privacy Audit**: Safely manage sensitive accounts in this mode.

## 🛠️ How to Enable & Manage
1. Go to "System Settings" -> "**Offline Mode**".
2. The system will perform an **"Offline Readiness Diagnosis"** to confirm that the WASM core and static resources are fully preloaded (to prevent operation failure due to missing resources after activation).
3. Once the diagnosis passes, click the blue "Enable" switch.
4. A prominent green "**Entered Offline Isolation State**" notification will appear at the top of the homepage.

> [!TIP]
> **Note**: Cloud backup cannot be initiated in offline mode. After performing critical operations, it is recommended to briefly disable this mode in a secure network environment to complete synchronization.
