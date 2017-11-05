// router.ts
import Koa = require('koa');
import Router = require('koa-router');

const app = new Koa();
const router = new Router();                            // 建立router實例

router
.get('/', async (ctx) => {                              // 設計 GET / 的行為
    ctx.body = 'Root page';
})
.post('/hello', async (ctx) => {                        // 設計 POST /hello 的行為
    ctx.body = 'Hello page';
});

app.use(router.routes()).use(router.allowedMethods());  // 將我們設計的Router串接在app上

app.listen(3000);
