# Deployment Options

NodeAuth uses a modern architecture that supports highly flexible deployment solutions. You can choose Cloudflare's free tier for zero-cost hosting or use Docker in your private cloud (NAS/Home Server) for complete data sovereignty.

---

## 🛠️ Choose Your Path

| Scenario | Recommended | Advantages | Difficulty |
| :--- | :--- | :--- | :--- |
| **Beginners / Zero-Cost** | [Cloudflare Worker](./cf-worker) | 0 cost, global acceleration, maintenance-free | ⭐ |
| **Data Sovereignty / LAN** | [Docker Deployment](./docker) | Physical isolation, works offline | ⭐⭐ |
| **Automation / CI** | [GitHub Action](./github-action) | Auto-sync, version tracking | ⭐⭐⭐ |

---

## 📖 Detailed Guides

It is recommended to follow these guides in order.

### 1. Essential Preparation
This is the first step regardless of the deployment method chosen.
*   **[Environment Variables Guide](./env)**: Detailed explanation of License, 7 major OAuth platforms (including Telegram and Web3) and core database keys.
*   **[Get License Code](https://license.nodeauth.io)**: Go to the licensing center to get your license code.

### 2. Managed Hosting (Cloudflare)
*   **[Cloudflare Worker (Recommended)](./cf-worker)**: One-click deployment via Wrangler or web interface, using D1 database for high-performance storage.
*   **[GitHub Action Automation](./github-action)**: Recommended for developers. Every time you commit code, GitHub will automatically complete the deployment and sync the database.

### 3. Private Hosting (Docker)
Suitable for NAS, small servers, VPS, or K8s environments.
*   **[Docker Deployment Guide](./docker)**: Supports MySQL, PostgreSQL, and SQLite database engines.

### 4. Initialization & Maintenance
*   **[Initial Setup & Self-Check](./setup)**: How to verify system security using Smart Shield after deployment.
*   **[System Update Guide](./update)**: How to seamlessly upgrade to the latest version of NodeAuth while preserving your data.

---

> [!TIP]
> **First-time Deployment Recommendation**: If you are using it for personal use, **Cloudflare Worker** is highly recommended. It is completely free and provides extreme dynamic code generation speed thanks to Cloudflare's global edge nodes.

<!-- [📸 UI Mockup Tip: Show logos of different deployment options (Cloudflare/Docker) for visual comparison] -->
