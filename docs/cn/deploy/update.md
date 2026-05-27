---
description: "NodeAuth 系统更新与维护指南。详细介绍 Cloudflare Worker 用户如何通过 GitHub Action 同步代码实现自动更新，以及 Docker 用户如何通过镜像拉取完成无缝升级。提供数据备份建议与日志监控方法，确保您的 2FA 系统长期稳定、安全运行。"
---
# 更新与维护指南

定期更新 NodeAuth 可以让您获得最新的安全补丁和功能改进。

## ☁️ Cloudflare Worker 用户更新
直接在您的 Fork 仓库执行 `Sync Fork`，GitHub 会自动触发部署。

## 🐳 Docker 用户更新
如果您使用 Docker 部署，更新非常简单：

```bash
# 1. 进入您的部署目录
cd /path/to/nodeauth

# 2. 拉取最新镜像
docker compose pull

# 3. 重新启动服务
docker compose up -d

# 4. 清理旧镜像 (可选)
docker image prune -f
```


---

## 🛠️ 维护建议
1. **定期备份**：虽然系统支持自动备份，但建议每月手动导出一份 `JSON` 文件存在离线硬盘。
2. **监控日志**：
    *   Docker：`docker logs -f nodeauth`
    *   Worker：在 CF 控制面板查看 `实时日志`。
3. **检查令牌过期**：如果您使用了 WebDAV 或 S3，定期检查云存储的 AK/SK 是否依然有效。

> [!WARNING]
> **更新前建议**：在执行任何大版本更新前，请务必执行一次“数据导出”，确保资产绝对安全。
