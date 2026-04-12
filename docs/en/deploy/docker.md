# Docker On-premise Deployment

Docker deployment is a solution tailored for geeks, NAS users, and corporate environments seeking **absolute control over their data**. It allows you to store all 2FA data on your own physical hard drives, ensuring normal use via PWA even in offline or local network environments.

---

## 🛡️ Core Security Features (Must Read)

To provide an ultimate security experience, NodeAuth's Docker image follows these standards:
*   **Rootless Strategy**: The image is forced to run as the `node` user (UID 1000) internally, completely eliminating the risk of container escape.
*   **Permission Locking**: Before starting, you **must** pre-configure folder permissions on the host; otherwise, the app will fail to start as it won't be able to write to the database.

### Prepare Directory
In the directory where you plan to run the container, execute the following command:
```bash
mkdir -p data && sudo chown -R 1000:1000 data
```

---

## 🏗️ Deployment Matrix (Choose One)

Choose one of the following three options based on your hardware and performance needs:

### Option A: Minimalist (SQLite)
**Best for**: Individual users, NAS users, and those who want a portable "all-in-one" solution.
*   **Advantages**: No need to deploy an extra database container; all data is stored in a single `data/nodeauth.db` file.
*   **Configuration**: Simply mount the `/app/data` directory; no `DB_HOST` variables are needed.

### Option B: Classic (MySQL)
**Best for**: Users with an existing MySQL environment who prefer structured data management.
*   **Support**: Works with a local MySQL container or connects to remote RDS/Cloud databases.
*   **Requirement**: You **must** provide full connection details: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc.

### Option C: Advanced (PostgreSQL)
**Best for**: Users seeking ultimate performance or using external services like Supabase.
*   **Support**: Perfectly fits Supabase remote connections (recommended with `DB_SSL=true`).
*   **Requirement**: Full PostgreSQL connection info is **required**.

---

## 🚀 Quick Start

### 1. Get the Template
We have prepared several typical `docker-compose.yml` templates. Download your preferred one and rename it to `docker-compose.yml`:

*   [SQLite Minimalist (Recommended)](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose.yml): One-click start, no separate database needed.
*   [MySQL Local Container](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-local.yml)
*   [MySQL Remote Connection](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-remote.yml)
*   [PostgreSQL Local Container](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-local.yml)
*   [PostgreSQL Remote Connection](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-remote.yml)

### 2. Configure Environment Variables
Please refer to the detailed [Environment Variables Guide](./env) to correctly modify the variables in your `docker-compose.yml`.

### 3. Start the Application
```bash
docker compose up -d
```
Once started, access `http://server-ip:3000` (or your custom port) to enter.

---

## 🛡️ Advanced Security Practice (Recommended)

Storing plaintext secrets directly in `docker-compose.yml` increases the risk of physical exposure. We recommend the following hardening strategy:

```yaml
# Example: Configuration fragment with multi-layer hardening
environment:
  # L1 Obfuscation (Anchor)
  - NODEAUTH_LICENSE=base64:MjAyNjA0MJfTm9kZUF1dGhf...
  
  - JWT_SECRET=base64:MjAyNjA0MDJfTm9kZUF1dGhf...

  # L2 Application Layer Encryption
  - ENCRYPTION_KEY=aes:iv:tag:cipher...
  - OAUTH_GOOGLE_CLIENT_ID=aes:iv:tag:cipher...
  - OAUTH_GOOGLE_CLIENT_SECRET=aes:iv:tag:cipher...
```

> **Tip**: These entries can be generated in bulk using the **[Deploy Helper](https://tools.nodeauth.io)**.

> [!NOTE]
> **Recovery Guarantee**: Regardless of how your environment variables are encrypted, the **Recovery Packet (PDF)** generated during installation will always display the final decrypted secrets (plaintext) for your emergency use.

---

## 🛠️ Operations & Troubleshooting

*   **Permission Denied**: 99% of startup failures are caused by missing the `chown 1000:1000` command.
*   **Reverse Proxy (Recommended)**: For PWA security, **HTTPS must be enabled**. We recommend using [Nginx Proxy Manager](https://nginxproxymanager.com/).
*   **Update Application**:
    ```bash
    docker compose pull
    docker compose up -d
    ```

<!-- [📸 UI Mockup Tip: Topology diagram for different database engines or container list in Docker Dashboard] -->
