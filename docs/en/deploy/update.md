---
description: "NodeAuth System Update and Maintenance Guide. Details how Cloudflare Worker users can achieve automatic updates by syncing code via GitHub Actions, and how Docker users can complete seamless upgrades by pulling images. Provides data backup advice and log monitoring methods to ensure your 2FA system operates stably and securely over the long term."
---
# Update & Maintenance Guide

Regularly updating NodeAuth ensures you receive the latest security patches and functional improvements.

---

## ☁️ Cloudflare Worker Update
1. **Automatic Update**: If you have configured GitHub Action, simply execute `Sync Fork` in your forked repository. GitHub will automatically trigger the deployment.
2. **Manual Update**:
    *   Execute `git pull` locally to synchronize the latest code.
    *   Run `npm run deploy` to republish.

## 🐳 Docker Update
If you use Docker for deployment, updating is very simple:

```bash
# 1. Enter your deployment directory
cd /path/to/nodeauth

# 2. Pull the latest image
docker compose pull

# 3. Restart the service
docker compose up -d

# 4. Clean up old images (Optional)
docker image prune -f
```

---

## 🛠️ Maintenance Suggestions
1. **Regular Backups**: Although the system supports automatic backups, it is recommended to manually export a `JSON` file to an offline drive monthly.
2. **Monitor Logs**:
    *   Docker: `docker logs -f nodeauth`
    *   Worker: View `Real-time Logs` in the Cloudflare dashboard.
3. **Check Token Expiration**: If you use WebDAV or S3, periodically check if the cloud storage Access Key/Secret Key are still valid.

> [!WARNING]
> **Pre-update Advice**: Before performing any major version updates, please ensure you perform a "Data Export" to ensure your assets are absolutely safe.
