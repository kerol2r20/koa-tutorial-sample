// views.ts
import Koa = require('koa');
import Router = require('koa-router');
import Path = require('path');
import Views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(Views(Path.join(__dirname, 'views'), {
    extension: 'pug',                   // 預設模板的副檔名為.pug
    map: {
        pug: 'pug',                     // 映射.pug檔到pug模板引擎
    },
}));

router.get('/loop/:VideoID', async (ctx) => {
    await ctx.render('index', {         // 因為我們有設定預設副檔名為.pug，所以不需要打index.pug
        VideoID: ctx.params.VideoID,    // 將變數傳給模板引擎
    });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
