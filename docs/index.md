---
layout: home

hero:
  name: NodeAuth
  tagline: 支持 Cloudflare Serverless 与 Docker 私有化部署的高安全、轻量级、跨平台的二步验证 (2FA/TOTP) 管理工具
  actions:
    - theme: brand
      text: 在线体验
      link: https://demo.nodeauth.io
    - theme: alt
      text: 开始部署
      link: /deploy/index
    - theme: alt
      text: 源码仓库
      link: https://github.com/nodeauth/nodeauth-worker

features:
  - icon: 🛡️
    title: 极致安全
    details: 采用 AES-GCM-256 全库冷加密，解密密钥仅存于本地内存，确保数据主权。
  - icon: ⚡
    title: 极速启动
    details: 基于 PWA 预载技术实现 0.1s 瞬时响应，弱网甚至离线环境下依然稳如泰山。
  - icon: 🌍
    title: 灵活部署
    details: 支持 Cloudflare Workers 零成本高可用部署及 Docker 私有化部署。
  - icon: 📦
    title: 20+ App 搬家
    details: 万能导入引擎，自动识别 Bitwarden, 1Password, GA, Aegis 等导出格式。
  - icon: 🪣
    title: 多维备份
    details: 支持 S3、WebDAV、Telegram Bot 及 Email 定期发送二次加密备份包。
  - icon: 📱
    title: 全平台 PWA
    details: 原生 App 交互手感，完美适配 iOS、Android 及各大桌面操作系统。
  - icon: ❄️
    title: 离线模式
    details: 真正的 Air-Gap 架构，支持在不确定的网络环境下实现物理级的本地解密。 
  - icon: 🛡️
    title: Smart Shield
    details: 自动嗅探运行环境安全性，环境不健康绝不开锁，从源头阻断篡改风险。 
  - icon: 🎟️
    title: 准入白名单制
    details: 支持环境变量级用户准入规则，轻松构建受邀制的私有安全实例。
  - icon: 🔐
    title: 生物识别
    details: 深度集成 FaceID 与指纹识别 (WebAuthn)，实现安全与效率的完美平衡。
  - icon: 🔄
    title: 智能同步
    details: 离线动作抵消优化与多端冲突自动判定，确保全球设备数据毫秒级对齐。
  - icon: 🚑
    title: 应急恢复包
    details: 提供 PDF 版 Master Key 备份，确保在极端灾难下也能 100% 找回资产。

---

<style>
.VPHome {
  margin-bottom: 50px !important;
}

.VPFeature {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  height: 100% !important;
  padding: 0 !important;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  transition: border-color 0.25s;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand);
  padding: 0 !important;
}

.VPFeature .box {
  display: grid !important;
  grid-template-columns: auto 1fr !important;
  grid-template-rows: auto auto !important;
  grid-template-areas: 
    "icon title"
    "details details" !important;
  column-gap: 0.5rem !important;
  align-items: center !important;
  width: 100% !important;
  padding: 12px 20px !important;
}

/** 首页 Feature 区域：响应式 4 列左对齐布局 **/
.VPFeatures .items {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-start !important; /* 强制左对齐 */
  gap: 16px !important;
  max-width: none !important;
}

.VPFeatures .item {
  flex: 0 0 calc(25% - 12px) !important; /* 默认 4 列 (100%/4 - gap) */
  max-width: none !important;
  box-sizing: border-box !important;
  padding: 0px !important;
}

@media (max-width: 1200px) {
  .VPFeatures .item {
    flex: 0 0 calc(33.333% - 11px) !important; /* 3 列 */
  }
}

@media (max-width: 960px) {
  .VPFeatures .item {
    flex: 0 0 calc(50% - 8px) !important; /* 2 列 */
  }
}

@media (max-width: 640px) {
  .VPFeatures .item {
    flex: 0 0 100% !important; /* 1 列 */
  }
}

.VPFeature .icon {
  grid-area: icon;
  margin: 0 !important;
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: none !important;
  font-size: 18px;
}

.VPFeature .title {
  grid-area: title;
  margin: 0 !important;
  line-height: 1.4 !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: var(--vp-c-text-1) !important;
}

.VPFeature .details {
  grid-area: details;
  margin-top: 2px !important;
  line-height: 1.5 !important;
  font-size: 0.88rem !important;
  color: var(--vp-c-text-2) !important;
}
</style>