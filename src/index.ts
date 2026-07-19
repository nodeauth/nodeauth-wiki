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

        const response = await env.ASSETS.fetch(request);

        // 如果访问的是 xml 文件（如 sitemap.xml），确保响应头包含正确的 XML Content-Type
        if (url.pathname.endsWith('.xml')) {
            const headers = new Headers(response.headers);
            headers.set('Content-Type', 'application/xml; charset=utf-8');
            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers,
            });
        }

        return response;
    },
};
