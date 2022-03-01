const Router = require('@koa/router');
const router = new Router();

const RouterHandlerMap = new Map();

// 懒加载 Route Handler，Route 首次被请求时才会 require 相关文件
const lazyloadRouteHandler = (routeHandlerPath) => (ctx) => {
    if (RouterHandlerMap.has(routeHandlerPath)) {
        return RouterHandlerMap.get(routeHandlerPath)(ctx);
    }

    const handler = require(routeHandlerPath);
    RouterHandlerMap.set(routeHandlerPath, handler);
    return handler(ctx);
};

// Deprecated: DO NOT ADD ANY NEW ROUTES HERE

// RSSHub migrated to v2
// router.get('/rsshub/rss', lazyloadRouteHandler('./routes/rsshub/routes')); // 弃用
// router.get('/rsshub/routes', lazyloadRouteHandler('./routes/rsshub/routes'));
// router.get('/rsshub/sponsors', lazyloadRouteHandler('./routes/rsshub/sponsors'));

// 1draw
router.get('/1draw', lazyloadRouteHandler('./routes/1draw/index'));

// aqnb
router.get('/aqnb', lazyloadRouteHandler('./routes/aqnb/news'));

// mirror.xyz
router.get('/mirror/:id', lazyloadRouteHandler('./routes/mirror/entries'));

// KBS migrated to v2
// router.get('/kbs/today/:language?', lazyloadRouteHandler('./routes/kbs/today'));
// router.get('/kbs/news/:category?/:language?', lazyloadRouteHandler('./routes/kbs/news'));

// Deprecated: DO NOT ADD ANY NEWS ROUTES HERE

module.exports = router;
