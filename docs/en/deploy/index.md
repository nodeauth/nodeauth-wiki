---
description: "NodeAuth Deployment Solutions Comprehensive Guide. Covers three mainstream solutions: zero-cost hosting on Cloudflare Workers, private Docker deployment, and automated deployment via GitHub Actions. Provides a one-stop operation manual from environment variable configuration and license code acquisition to system initialization and version maintenance."
---
# Deployment Options

NodeAuth uses a modern architecture that supports highly flexible deployment solutions. You can choose Cloudflare's free tier for zero-cost hosting or use Docker in your private cloud (NAS/Home Server) for complete data sovereignty.

---

> [!CAUTION]
> **Universal Prerequisites**
> A `License Code` is required to deploy the NodeAuth system. **Deployment cannot be completed without a valid license code.** Please visit the [License Center](https://license.nodeauth.io) to obtain your license code before proceeding.

## 🛠️ Choose Your Path

| Scenario | Recommended | Advantages | Required Resources | Difficulty |
| :--- | :--- | :--- | :--- | :--- |
| **Beginners / Zero-Cost** | [Cloudflare Worker](./cf-worker) | 0 cost, global edge acceleration, maintenance-free | • GitHub Account<br>• Cloudflare Account<br>• CF Hosted Domain (Optional, defaults to `*.workers.dev`) | ⭐ |
| **Automation / CI** | [GitHub Action](./github-action) | Push-to-deploy, supports advanced routing params | • GitHub Account<br>• Cloudflare Account<br>• CF Hosted Domain (Optional, defaults to `*.workers.dev`) | ⭐⭐ |
| **Data Sovereignty / LAN** | [Docker Deployment](./docker) | Physical isolation, offline LAN support, supports 3 major SQL DBs | • VPS or NAS<br>• Docker Environment<br>• Custom Domain (Optional, LAN IP supported) | ⭐⭐⭐ |

---

## 📖 Detailed Guides

It is recommended to follow these guides in order.

### 1. Essential Preparation
This is the first step regardless of the deployment method chosen.
*   **[Get License Code](https://license.nodeauth.io)**: Go to the licensing center to get your license code.
*   **[Environment Variables Guide](./env)**: Detailed explanation of License, 7 major OAuth platforms (including Telegram and Web3) and core database keys.

### 2. Managed Hosting (Cloudflare)
*   **[Cloudflare Worker (Recommended)](./cf-worker)**: One-click deployment via Wrangler or web interface, using D1 database for high-performance storage.
*   **[GitHub Action Automation](./github-action)**: Recommended for developers. Push to deploy automatically, with flexible configuration of Worker name, custom domain routing, and other advanced parameters via Secrets.

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
