---
description: "NodeAuth Offline Function Boundaries and Physical Isolation Instructions. Clarifies the availability of core app features in a completely disconnected environment (Airplane Mode) and explores which operations (such as syncing, OAuth login) require network support. Provides clear behavioral guidance for using 2FA tokens in extreme environments."
---
# Offline Feature Boundaries

NodeAuth's offline-first architecture is powerful, but as a web application, some functions cannot be performed in a completely disconnected environment. Please be aware of these limitations.

---

## ❌ Restricted Offline Features
When "Offline Mode" is enabled or when there is no network connection, the following operations will be temporarily unavailable:

1.  **Third-party OAuth Login**: Initial login verification via GitHub, Google, or Telegram cannot be completed.
2.  **Cloud Sync & Distribution**: Local modifications cannot be synchronized to other devices in real-time.
3.  **Off-site Backup Upload**: New backup packages cannot be sent to S3, WebDAV, or Telegram bots.
4.  **Remote Session Logout**: Other online devices cannot be forcefully kicked out.
5.  **Real-time Icon Fetching**: If a newly added account requires real-time icon searching from the cloud, the preview will not be available while offline.

## ✅ Available Offline Features
*   **Viewing Verification Codes**: The most core function, 100% offline calculation.
*   **Add/Edit/Delete Accounts**: Operations are stored in a synchronization queue and will automatically replay after the network is restored.
*   **Local JSON Import/Export**: Executed entirely locally.
*   **Search & Categories**: All-memory operations, extremely fast response.
*   **App Lock Unlock**: Both PIN and biometric verification are performed locally.

---

> [!TIP]
> **Best Practice**: In uncertain environments (such as before traveling abroad), please ensure you complete a full synchronization and run an "Offline Readiness Diagnosis" while connected to the internet.
