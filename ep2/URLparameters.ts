// URLparameters.ts
import Koa = require('koa');
import Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/user/:name', async (ctx) => {      // 使用 :name 標註這個url變數
    ctx.body = `This is ${ctx.params.name}'s page.`;      // 使用 ctx.params 將這個url變數取出
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
