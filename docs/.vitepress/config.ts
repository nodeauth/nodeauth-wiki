import { defineConfig } from 'vitepress'

// 简体中文配置 (路径前置 /cn/)
const zhThemeConfig = {
    logo: '/logo.svg',
    nav: [
        { text: '🏠 首页', link: '/cn/' },
        { text: '🛠️ 部署教程', link: '/cn/deploy' },
        { text: '📱 PWA指南', link: '/cn/pwa' },
        { text: '📥 数据迁移', link: '/cn/data/import' },
        { text: '☁️ 云端备份', link: '/cn/data/backup' },
        { text: '🧩 浏览器扩展', link: '/cn/extension/usage' }
    ],

    sidebar: [
        {
            text: '🚀 项目特色',
            items: [
                { text: '项目介绍', link: '/cn/features' },
                { text: '极致安全', link: '/cn/features/security' },
                { text: '极致体验', link: '/cn/features/experience' }
            ]
        },
        {
            text: '🛠️ 部署教程',
            items: [
                { text: '部署方案（三选一）', link: '/cn/deploy' },
                { text: 'Cloudflare Worker 部署', link: '/cn/deploy/cf-worker' },
                { text: 'Docker 私有化部署', link: '/cn/deploy/docker' },
                { text: 'GitHub Action 自动化部署', link: '/cn/deploy/github-action' },
                { text: '环境变量配置指南', link: '/cn/deploy/env' },
                { text: '项目初始化教程', link: '/cn/deploy/setup' },
                { text: '更新与维护指南', link: '/cn/deploy/update' }
            ]
        },
        {
            text: '📱 PWA 安装指南',
            link: '/cn/pwa'
        },
        {
            text: '🧩 浏览器扩展',
            items: [
                { text: '安装使用', link: '/cn/extension/usage' },
                { text: '安全架构', link: '/cn/extension/architecture' },
                { text: '隐私政策', link: '/cn/extension/privacy' }
            ]
        },
        {
            text: '📥 数据迁移',
            items: [
                { text: '全平台数据导入', link: '/cn/data/import' }
            ]
        },
        {
            text: '📂 备份设置与管理',
            items: [
                { text: '云端自动备份', link: '/cn/data/backup' },
                { text: '数据手动导出', link: '/cn/data/export' }
            ]
        },
        {
            text: '🚑 容灾自救中心',
            items: [
                { text: '灾难恢复决策矩阵', link: '/cn/recovery' }
            ]
        },
        {
            text: '👤 账号管理',
            items: [
                { text: '基础操作 (增删改查)', link: '/cn/vault' },
                { text: '进阶管理 (排序搜索)', link: '/cn/vault/efficiency' }
            ]
        },
        {
            text: '🛡️ 安全访问控制',
            items: [
                { text: '通行密钥', link: '/cn/security/passkey' },
                { text: '安全锁定', link: '/cn/security/lock' },
                { text: '离线模式', link: '/cn/security/offline-mode' },
                { text: '防窥模式', link: '/cn/security/ghost-mode' },
                { text: '设备管理', link: '/cn/security/session' }
            ]
        },
        {
            text: '🧰 实用工具',
            items: [
                { text: 'TOTP 核心工具箱', link: '/cn/tools' },
                { text: '2FA APP 生态排行榜', link: '/cn/tools/ranking' },
                { text: '辅助小工具 (密码/QR)', link: '/cn/tools/utils' }
            ]
        },
        {
            text: '🎨 个性化设置',
            link: '/cn/settings/appearance'
        },
        {
            text: '💡 其他说明',
            items: [
                { text: '零知识架构', link: '/cn/misc/zero-knowledge' },
                { text: '端对端加密', link: '/cn/misc/e2ee' },
                { text: '离线功能边界说明', link: '/cn/misc/offline-limits' },
                { text: '联系作者与路线图', link: '/cn/misc/contacts' }
            ]
        }
    ],

    socialLinks: [
        { icon: 'github', link: 'https://github.com/nodeauth/nodeauth-worker' }
    ]
}

// 英文配置 (主语言，根路径 /)
const enThemeConfig = {
    logo: '/logo.svg',
    nav: [
        { text: '🏠 Home', link: '/' },
        { text: '🛠️ Deployment', link: '/deploy' },
        { text: '📱 PWA', link: '/pwa' },
        { text: '📥 Migration', link: '/data/import' },
        { text: '☁️ Backup', link: '/data/backup' },
        { text: '🧩 Extension', link: '/extension/usage' }
    ],
    sidebar: [
        {
            text: '🚀 Getting Started',
            items: [
                { text: 'Introduction', link: '/features' },
                { text: 'Security First', link: '/features/security' },
                { text: 'Smooth Experience', link: '/features/experience' }
            ]
        },
        {
            text: '🛠️ Deployment',
            items: [
                { text: 'Choose your path', link: '/deploy' },
                { text: 'Cloudflare Worker', link: '/deploy/cf-worker' },
                { text: 'Docker On-premise', link: '/deploy/docker' },
                { text: 'GitHub Action', link: '/deploy/github-action' },
                { text: 'Environment Variables', link: '/deploy/env' },
                { text: 'Initial Setup', link: '/deploy/setup' },
                { text: 'Update Guide', link: '/deploy/update' }
            ]
        },
        {
            text: '📱 PWA Installation',
            link: '/pwa'
        },
        {
            text: '🧩 Browser Extension',
            items: [
                { text: 'Installation & Usage', link: '/extension/usage' },
                { text: 'Security Architecture', link: '/extension/architecture' },
                { text: 'Privacy Policy', link: '/extension/privacy' }
            ]
        },
        {
            text: '📥 Migration',
            items: [
                { text: 'Data Import Guide', link: '/data/import' }
            ]
        },
        {
            text: '📂 Backup & Export',
            items: [
                { text: 'Cloud Auto Backup', link: '/data/backup' },
                { text: 'Manual Export', link: '/data/export' }
            ]
        },
        {
            text: '🚑 Disaster Recovery',
            items: [
                { text: 'Recovery Matrix', link: '/recovery' }
            ]
        },
        {
            text: '👤 Vault Management',
            items: [
                { text: 'Basic Operations', link: '/vault' },
                { text: 'Sorting & Search', link: '/vault/efficiency' }
            ]
        },
        {
            text: '🛡️ Security Controls',
            items: [
                { text: 'Passkeys', link: '/security/passkey' },
                { text: 'App Lock', link: '/security/lock' },
                { text: 'Offline Mode', link: '/security/offline-mode' },
                { text: 'Ghost Mode', link: '/security/ghost-mode' },
                { text: 'Device Management', link: '/security/session' }
            ]
        },
        {
            text: '🧰 Utility Toolbox',
            items: [
                { text: 'TOTP Tools', link: '/tools' },
                { text: '2FA App Ranking', link: '/tools/ranking' },
                { text: 'Password & QR Tools', link: '/tools/utils' }
            ]
        },
        {
            text: '🎨 Customization',
            link: '/settings/appearance'
        },
        {
            text: '💡 Others',
            items: [
                { text: 'Zero-Knowledge', link: '/misc/zero-knowledge' },
                { text: 'End-to-End Encryption', link: '/misc/e2ee' },
                { text: 'Offline Limits', link: '/misc/offline-limits' },
                { text: 'Roadmap & Contact', link: '/misc/contacts' }
            ]
        }
    ],
    socialLinks: [
        { icon: 'github', link: 'https://github.com/nodeauth/nodeauth-worker' }
    ]
}

export default defineConfig({
    title: "NodeAuth Wiki",
    description: "NodeAuth Official Wiki - Open-source, cross-platform 2FA/TOTP authenticator. Supports Cloudflare Worker deployment, encrypted backups, and multi-device sync.",
    rewrites: {
        'en/(.*)': '(.*)'
    },
    lastUpdated: true,
    cleanUrls: true,
    sitemap: {
        hostname: 'https://wiki.nodeauth.io'
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.svg' }],
        ['style', {}, `:root { --vp-c-brand-1: #3451B2; --vp-c-brand-2: #254099; --vp-c-brand-3: #3b82f6; --vp-c-brand-next: #3451B2; } .policy-links { font-size: 0.86rem; margin-bottom: 10px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 4px 18px; } .policy-links a { color: var(--vp-c-text-2); text-decoration: none !important; white-space: nowrap; transition: color 0.2s ease; position: relative; } .policy-links a:not(:last-child)::after { content: "|"; position: absolute; right: -11px; top: 50%; transform: translateY(-55%); font-size: 0.72rem; color: var(--vp-c-text-3); opacity: 0.45; pointer-events: none; } .policy-links a:hover { color: var(--vp-c-brand-1, #3451B2); } .VPDoc .content { padding-bottom: 0 !important; }`]
    ],
    themeConfig: {
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: { buttonText: 'Search Docs', buttonAriaLabel: 'Search Docs' },
                            modal: {
                                noResultsText: 'No results for',
                                resetButtonTitle: 'Reset search',
                                footer: { selectText: 'to select', navigateText: 'to navigate', closeText: 'to close' }
                            }
                        }
                    },
                    cn: {
                        translations: {
                            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
                            }
                        }
                    }
                }
            }
        }
    },
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            title: 'NodeAuth Wiki',
            themeConfig: enThemeConfig
        },
        cn: {
            label: '简体中文',
            lang: 'zh-CN',
            link: '/cn/',
            title: 'NodeAuth Wiki',
            themeConfig: zhThemeConfig
        }
    },

    async transformPageData(pageData) {
        if (pageData.frontmatter.description) return

        const fs = await import('node:fs')
        const path = await import('node:path')

        try {
            const docPath = path.resolve(process.cwd(), 'docs', pageData.relativePath)
            const content = fs.readFileSync(docPath, 'utf-8')

            const mainContent = content.replace(/^---[\s\S]+?---\n*/, '')

            const plainText = mainContent
                .replace(/<style[\s\S]*?<\/style>/gi, '') // 移除样式块
                .replace(/<script[\s\S]*?<\/script>/gi, '') // 移除脚本块
                .replace(/```[\s\S]*?```/g, '') // 移除代码块
                .replace(/<[^>]*>/g, '') // 移除剩余 HTML 标签
                .replace(/^\|.*\|$/gm, '') // 移除表格行
                .replace(/^#+\s+.*/gm, '') // 移除标题
                .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
                .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接文字
                .replace(/[\\`*_~#]/g, '') // 移除格式符号
                .replace(/\s+/g, ' ') // 合并空格
                .trim()

            const desc = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '')
            if (desc && desc.length > 20) {
                pageData.description = desc
            }
        } catch (e) {
            // 失败时自动使用顶层的默认 description
        }
    },

    async transformHead({ pageData }) {
        const { relativePath } = pageData
        const head: any[] = []
        const hostname = 'https://wiki.nodeauth.io'

        const cleanPath = relativePath.replace(/\.md$/, '').replace(/index$/, '')

        let enPath: string, zhPath: string, canonicalPath: string;
        
        if (relativePath.startsWith('en/')) {
            // 英文文档：已经被 rewrite 为根路径
            enPath = cleanPath.slice(3); // 去掉 'en/'
            zhPath = enPath ? `cn/${enPath}` : 'cn/';
            canonicalPath = enPath;
        } else if (relativePath.startsWith('cn/')) {
            // 中文文档：路径为 cn/xxx
            zhPath = cleanPath;
            const purePath = cleanPath.slice(3); // 去掉 'cn/'
            enPath = purePath;
            canonicalPath = zhPath;
        } else {
            enPath = cleanPath;
            zhPath = cleanPath ? `cn/${cleanPath}` : 'cn/';
            canonicalPath = cleanPath;
        }

        // 添加 Canonical 标签
        head.push(['link', { rel: 'canonical', href: `${hostname}/${canonicalPath}` }])
        
        // 添加 Hreflang 标签
        head.push(['link', { rel: 'alternate', hreflang: 'en', href: `${hostname}/${enPath}` }])
        head.push(['link', { rel: 'alternate', hreflang: 'zh-CN', href: `${hostname}/${zhPath}` }])
        // x-default 统一指向英文根路径
        head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: `${hostname}/${enPath}` }])

        // 添加 Open Graph 和 Twitter Cards (社交媒体分享优化)
        head.push(['meta', { property: 'og:url', content: `${hostname}/${canonicalPath}` }])
        head.push(['meta', { property: 'og:type', content: 'article' }])
        head.push(['meta', { property: 'og:title', content: pageData.title || 'NodeAuth Wiki' }])
        if (pageData.description) {
            head.push(['meta', { property: 'og:description', content: pageData.description }])
        }
        head.push(['meta', { property: 'og:site_name', content: 'NodeAuth Wiki' }])
        head.push(['meta', { property: 'og:image', content: `${hostname}/logo.svg` }])
        head.push(['meta', { name: 'twitter:card', content: 'summary' }])

        return head
    }
})
