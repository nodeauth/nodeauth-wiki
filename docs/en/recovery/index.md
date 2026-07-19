---
description: "NodeAuth Emergency Recovery and Disaster Salvation Guide. Through a disaster recovery decision matrix, it guides you on how to use the Recovery Kit PDF, encrypted backup files, and offline decryption scripts to achieve 100% asset retrieval in extreme scenarios such as server damage or database leaks. It focuses on the three major recovery paths, including environment-level perfect resurrection and offline manual reading, providing you with the ultimate digital survival guarantee."
---
# Emergency Recovery & Disaster Survival

In extreme disaster scenarios (such as complete server failure, accidental database leaks, or deployment platform bans), NodeAuth provides you with a multi-layered asset protection umbrella. Please choose the most appropriate recovery path based on your current "survival resources."

---

## 🚑 Disaster Recovery Decision Matrix

| Available Resources | Recommended Path | Core Principle | Success Rate |
| :--- | :--- | :--- | :--- |
| **PDF (Recovery Kit) + License + Database File** | **Path A: Perfect Environment Revival** | Restore original key and license to resurrect all data | 100% |
| **Any Backup File (Manual Export / Auto Backup)** | **Path B: Business-Level Data Import** | Deploy a new instance and import backup data in bulk | 100% |
| **Manually Exported Encrypted Backup + Offline Script** | **Path C: Manual Offline Read** | Use Node.js script to view plaintext JSON directly | 100% |

---

## 📄 Path A: Environment Revival (Using Recovery Kit)
**Scenario**: You have the original database (e.g., Cloudflare D1 or Docker `data/` directory), but you cannot remember the original `ENCRYPTION_KEY` environment variable.

1.  **Prepare Environment**: Redeploy a new NodeAuth instance on any platform.
2.  **Retrieve Key & License**: Open your **Recovery Kit PDF** to find the `ENCRYPTION_KEY`; also retrieve your `NODEAUTH_LICENSE`.
3.  **Rebuild Variables**: Manually enter these two critical variables into the environment of the new deployment.
4.  **Connect Data**: Ensure the new deployment is connected to your previous database.
5.  **Instant Revival**: Log into the new instance. Since the keys and authorization logic lock match, the system can immediately decrypt and read the original accounts in the database.

> [!TIP]
> **Generation & Verification**: To ensure you properly save this "lifeline," the system requires you to manually enter the **last 4 characters** of the key after downloading the PDF during initialization. Only after successful verification is the instance officially activated.

---

## 📂 Path B: Business-Level Recovery (Using Data Import)
**Scenario**: You do not have the old database, but you have a manually exported backup file or have enabled "Scheduled Auto Backups."

1.  **Prepare Environment**: Setup a completely new NodeAuth instance with new environment variables.
2.  **Get Files**: Download the latest backup package from your USB drive, email, or Telegram/S3/Cloud Drive.
3.  **Perform Import**:
    *   Go to "Data Management" -> "**Data Import**".
    *   Upload your `.json` backup package (whether it's an auto-backup or manually exported).
    *   If it's an encrypted file, enter your **backup password** / export password.
4.  **Merge Success**: Your assets will be imported in bulk into the new instance, and the system will automatically align the keys to restore code generation.

---

## 🛠️ Path C: Manual Offline Decryption (Using Script)
**Scenario**: Extreme survival environment, unable to set up the NodeAuth service immediately, but urgent need to view a specific account's plaintext secret offline.

*   **Prerequisite**: **Manually exported frontend** encrypted `.json` backup file + Export password + [scripts/decrypt_backup.js](https://github.com/nodeauth/nodeauth-worker/blob/main/scripts/decrypt_backup.js).
*   **Requirements**: [Node.js](https://nodejs.org/) installed.
*   **Command**:
    ```bash
    node decrypt_backup.js <backup_file.json> <backup_password>
    ```
*   **Result**: Decrypted data will be displayed directly in the console and saved as a JSON file. Since you are using a manually exported package, you will see the plaintext secret in pure uppercase letters (e.g., `JBSWY3D...`) directly in the `secret` field, ready to be copied to other authenticator apps for emergency use.

> [!NOTE] 
> **What if you only have an "Auto Backup" file?**
> Although the auto-backup file can also be decrypted with this script, the underlying security protection ensures the secrets inside remain in the encrypted `nodeauth:` format, which cannot be read visually. In this case, please proceed directly to **[Path B]** to import the file into the system, and it will be instantly unlocked.

---

> [!CAUTION]
> **Ultimate Warning**: If you lose your Recovery Kit (resulting in the loss of your `ENCRYPTION_KEY`) and fail to record your `NODEAUTH_LICENSE` (especially if you used `aes:` hardening), or have never exported any backup files, **no one in the world (including the developers) can help you recover your data**. Please print your Recovery Kit and keep it safe with your important documents.
