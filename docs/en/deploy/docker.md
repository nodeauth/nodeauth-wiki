---
description: "NodeAuth Docker Private Deployment Guide. Designed specifically for users pursuing absolute data control, supporting SQLite, MySQL, and PostgreSQL database engines. Covers advanced security practices from permission locking and directory preparation to docker-compose template configuration, environment variable encryption hardening, and reverse proxies, helping you build a physically isolated 2FA center on a NAS or private server."
---
# Docker On-premise Deployment

Docker private deployment is designed specifically for users who need to host the service on their own infrastructure (such as VPS, NAS, or corporate intranet). Thanks to the excellent scalability and environmental isolation features of containerization technology, it natively supports seamless integration with SQLite, MySQL, and PostgreSQL relational databases, and perfectly integrates with your existing reverse proxy network, achieving 100% environment control and data physical isolation.

---

## 📋 Deployment Prerequisites
- **License Code**: Required to start the system, obtain it from the [License Center](https://license.nodeauth.io).
- **VPS or NAS**: A host with file system read/write permissions.
- **Docker Environment**: Docker and Docker Compose engines installed.
- **Custom Domain (Optional)**: If external access is required, you can resolve it yourself; LAN IP direct connection is also supported.

---

## 🏗️ Deployment Matrix (Choose One)

Choose one of the following three options based on your hardware and performance needs:

#### Option A: Minimalist (SQLite)
**Best for**: Individual users, NAS users, and those who want a portable "all-in-one" solution.
*   **Advantages**: No need to deploy an extra database container; all data is stored in a single `data/nodeauth.db` file.
*   **Configuration**: Simply mount the `/app/data` directory; no `DB_HOST` variables are needed.

#### Option B: Classic (MySQL)
**Best for**: Users with an existing MySQL environment who prefer structured data management.
*   **Support**: Works with a local MySQL container or connects to remote RDS/Cloud databases.
*   **Requirement**: You **must** provide full connection details: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc.

#### Option C: Advanced (PostgreSQL)
**Best for**: Users seeking ultimate performance or using external services like Supabase.
*   **Support**: Perfectly fits Supabase remote connections (recommended with `DB_SSL=true`).
*   **Requirement**: Full PostgreSQL connection info is **required**.

---

## 🛠️ Standard Deployment Process

### 1. Create Working Directory
First, create a root directory to store your project configuration and data, and grant the correct write permissions to the `data` volume inside it:
```bash
mkdir -p nodeauth/data
cd nodeauth
sudo chown -R 1000:1000 data
```

> [!TIP]
> To protect your server and data security, NodeAuth adopts stricter security mechanisms:
> *   **Prevent "Root" Execution**: Many Docker apps run as root (highest system privilege) by default, meaning any vulnerability could compromise your entire server. NodeAuth forces execution under a downgraded "standard privilege", completely locking risks inside the container.
> *   **Why Manual Permission Assignment?** Precisely because we abandoned root privileges, NodeAuth by default has no right to write files arbitrarily to your hard drive. This is why in the step above, you **must execute the permission assignment command** to allow the app to store things in the data folder. Otherwise, it will fail to start because it cannot save data.

### 2. Get and Place the Template
**Inside the newly created `nodeauth` directory**, download the corresponding template based on your preference and rename it to `docker-compose.yml` (it should be alongside the `data` folder):

*   [SQLite Minimalist (Recommended)](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose.yml): One-click start, no separate database needed.
*   [MySQL Local Container](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-local.yml)
*   [MySQL Remote Connection](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-mysql-remote.yml)
*   [PostgreSQL Local Container](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-local.yml)
*   [PostgreSQL Remote Connection](https://github.com/nodeauth/nodeauth-worker/blob/main/docker-compose-postgresql-remote.yml)

<details>
<summary>Click to view: Detailed Storage Options</summary>

#### Option A: Minimalist (SQLite)
**Target Audience**: Individual users, NAS users, seeking an "all-in-one" solution.
*   **Advantages**: No separate database container required. All data is stored in a single `data/nodeauth.db` file.
*   **Configuration**: Simply mount the `/app/data` directory; no `DB_HOST` variables needed.
*   **Edge & Distributed Support**: By setting `DB_ENGINE` to `libsql` (e.g., Turso) or `d1` (Cloudflare D1 Proxy) alongside `DB_URL` and `DB_TOKEN`, you can seamlessly connect to cloud-distributed SQLite derivatives.

#### Option B: Classic (MySQL)
**Target Audience**: Users with existing MySQL environments or requiring structured database management.
*   **Support**: Supports linking with local MySQL containers or connecting to remote RDS/cloud databases.
*   **Configuration Requirements** (Choose one):
    *   **Method 1 [Preferred]**: Use the full `DB_URL` connection string (e.g., `mysql://user:password@host:port/dbname`).
    *   **Method 2 [Alternative]**: When `DB_URL` is omitted, configure `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` individually.

#### Option C: Advanced (PostgreSQL)
**Target Audience**: Users seeking top performance or using external Postgres services like Supabase.
*   **Support**: Perfectly adapts to Supabase remote connections (setting `DB_SSL=true` is recommended).
*   **Configuration Requirements** (Choose one):
    *   **Method 1 [Preferred]**: Use the full `DB_URL` connection string (e.g., `postgresql://user:password@host:port/dbname`).
    *   **Method 2 [Alternative]**: When `DB_URL` is omitted, configure PG-specific `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` individually.

</details>

### 2. Configure Environment Variables
Please refer to the detailed [Environment Variables Guide](./env) to correctly modify the variables in your `docker-compose.yml`.

### 3. Start the Application
```bash
docker compose up -d
```
Once started, access `http://server-ip:3000` (or your custom port) to enter.

---

## 🌐 Reverse Proxy & HTTPS (Highly Recommended)

> [!IMPORTANT]
> **Highly recommended to use a reverse proxy for HTTPS access**: NodeAuth's license code is validated against the **bound domain**. This means you should access the service via a fixed domain (e.g., `2fa.yourdomain.com`) rather than using `IP:3000` directly. Also, the PWA Service Worker strictly requires an HTTPS environment.

Below are two mainstream reverse proxy solutions. Choose one:

---

### Option 1: Cloudflare Tunnel Built-in Zero-Port Tunnel (Highly Recommended)

Cloudflare Tunnel securely exposes your local service to the internet via outbound connections (without opening any inbound firewall ports), making it perfect for dynamic IPs or users who don't want to expose their server's true IP.

> [!TIP]
> **Native Cloud-Native Experience**: The NodeAuth container natively integrates the `cloudflared` client! You no longer need to maintain an extra external tunnel container or expose host ports. Simply configure an environment variable to launch the tunnel automatically in the background!

**Prerequisite**: Your domain's DNS is managed by Cloudflare.

**Step 1: Create a Tunnel**

1. Log in to [Cloudflare Zero Trust Dashboard](https://dash.cloudflare.com/?to=/:account/one/) → **Networks** → **Tunnels** → **Create a tunnel**.
2. Select **Cloudflared** type.
3. Give your tunnel a name, e.g., `nodeauth-worker`.
4. Copy the generated token (e.g., `eyJhIjoiN****WbVl6ayJ9`).

<details>
<summary>Click to view: Detailed visual guide</summary>
<img height="400" src="/deploy/e6506636-10d8-4f4f-b24a-1d0d52ce64a1.png" /><br />
<img height="250" src="/deploy/343e5742-3671-45a9-b8d5-e306b5ee6af8.png" /><br />
<img height="300" src="/deploy/9b0d3ab7-cacd-40f2-8461-18ae2ff34b81.png" /><br />
<img height="600" src="/deploy/bd6ce005-6d93-4ef7-9499-9a4aa1e35e83.png" />
</details>

**Step 2: Configure Public Hostname**

Go back to the Cloudflare Zero Trust Dashboard, under the **Public Hostname** tab of your Tunnel details, add a record:

| Field | Value |
|---|---|
| **Subdomain** | `2fa` (i.e., `2fa.yourdomain.com`) |
| **Domain** | Your domain |
| **Type** | `HTTP` |
| **URL** | `localhost:3000` |

<details>
<summary>Click to view: Detailed visual guide</summary>
<img height="400" src="/deploy/58771d96-5ad0-4e2d-9089-08ee513c42a7.png" />
</details>

**Step 3: Configure and Run**

*   Simply add your `CLOUDFLARE_TUNNEL_TOKEN` directly into the app container's environment variables. The container will automatically launch and maintain the encrypted tunnel in the background without exposing any host ports:
    ```yaml
    services:
      nodeauth:
        image: nodeauth/nodeauth-worker:latest
        # Note: When using Tunnel, no ports need to be exposed. Comment out or delete the ports block.
        # ports:
        #   - "3000:3000"
        volumes:
          - ./data:/app/data
        environment:
          - NODEAUTH_LICENSE=your_license
          - JWT_SECRET=your_jwt_secret
          - ENCRYPTION_KEY=your_encryption_key
          - OAUTH_ALLOWED_USERS=your_email@example.com
          
          # [One-Click Tunnel] Paste your Token copied from Cloudflare
          - CLOUDFLARE_TUNNEL_TOKEN=eyJhIjoiN****WbVl6ayJ9
    ```

Save and run `docker compose up -d`. Cloudflare will automatically issue an SSL certificate and establish an encrypted tunnel. You can now access `https://2fa.yourdomain.com` without opening any firewall inbound ports!

---

### Option 2: Nginx Proxy Manager (GUI, for servers with public IPs)

[Nginx Proxy Manager](https://nginxproxymanager.com/) offers a web UI, requires no manual Nginx config, and supports one-click Let's Encrypt certificates.

**Deploy NPM:**
```yaml
# Create this file in a separate directory, do not mix with NodeAuth
services:
  npm:
    image: jc21/nginx-proxy-manager:latest
    ports:
      - "80:80"
      - "443:443"
      - "81:81"   # NPM Admin Panel
    volumes:
      - ./npm-data:/data
      - ./npm-letsencrypt:/etc/letsencrypt
```
```bash
docker compose up -d
```

**Configure Proxy Host:**
1. Access `http://server-ip:81`, log in with default `admin@example.com` / `changeme`, and change the password immediately.
2. Go to **Proxy Hosts** → **Add Proxy Host**.
3. Fill in your bound domain, e.g., `2fa.yourdomain.com`.
4. **Forward Hostname/IP**: Enter your host's internal IP (or `host.docker.internal`). **Port**: Enter NodeAuth's port (default `3000`).
5. Switch to the **SSL** tab, select **Request a new SSL Certificate**, and check **Force SSL**.
6. Save. NPM will automatically request a Let's Encrypt certificate and apply it.

> [!NOTE]
> When using NPM, the NodeAuth container **does not need** to expose ports to the host. You can remove the `ports` config from NodeAuth's `docker-compose.yml` to let the two containers communicate purely over the Docker internal network for better security.

---

## 🛡️ Advanced Security Practice (Recommended)

In production environments, exposing plaintext secrets directly in `docker-compose.yml` increases the risk of physical leakage. We recommend adopting a prefix-based encryption strategy: providing basic obfuscation for system-level underlying credentials, and supporting high-strength AES encryption for application-level sensitive keys.

```yaml
# Example: Configuration fragment with multi-layer hardening
environment:
  # L1 Obfuscation: Supports base64: / hex: prefixes
  - NODEAUTH_LICENSE=base64:MjAyNjA0MJfTm9kZUF1dGhf...
  - JWT_SECRET=base64:MjAyNjA0MDJfTm9kZUF1dGhf...

  # L2 Strong Encryption: Highly recommend using aes: prefix for robust encryption
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
*   **License Validation Failed**: Ensure that the domain you are accessing exactly matches the domain bound in the License Center.
*   **Update Application**:
    ```bash
    docker compose pull
    docker compose up -d
    ```

<!-- [📸 UI Mockup Tip: Topology diagram for different database engines or container list in Docker Dashboard] -->
