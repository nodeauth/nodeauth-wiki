interface Env {
    ASSETS: {
        fetch: (request: Request) => Promise<Response>;
    };
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        // 旧版 /en/ 路径的 301 永久重定向
        if (url.pathname === '/en' || url.pathname.startsWith('/en/')) {
            let newPath = url.pathname.replace(/^\/en(\/|$)/, '/');
            if (!newPath.startsWith('/')) {
                newPath = '/' + newPath;
            }
            const redirectUrl = new URL(newPath + url.search, url.origin);
            return Response.redirect(redirectUrl.toString(), 301);
        }

        // 确保 xml 路径（如 sitemap.xml / sitemap-index.xml）隐式指向真实资产并附带正确 Content-Type
        if (url.pathname.endsWith('.xml')) {
            const targetPath = (url.pathname === '/sitemap-index.xml') ? '/sitemap.xml' : url.pathname;
            const targetUrl = new URL(targetPath, request.url);
            const xmlResp = await env.ASSETS.fetch(new Request(targetUrl, request));
            
            if (xmlResp.ok) {
                const xmlText = await xmlResp.text();
                return new Response(xmlText, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/xml; charset=utf-8',
                        'Cache-Control': 'public, max-age=3600'
                    }
                });
            }
        }

        return await env.ASSETS.fetch(request);
    },
};
