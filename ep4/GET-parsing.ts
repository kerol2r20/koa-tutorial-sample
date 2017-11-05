// GET-parsing.ts
import Koa = require('koa');
import Router = require('koa-router');
import Path = require('path');
import Views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(Views(Path.join(__dirname, 'views'), {
    extension: 'pug',
    map: {
        pug: 'pug',
    },
}));

router.get('/loop/', async (ctx) => {
    const VideoID = ctx.query.VideoID;          // 讀取QueryString中的VideoID
    await ctx.render('looper', {
        VideoID: VideoID ? VideoID : undefined, // 如果存在VideoID變數則傳給前端，否則就傳undefined
    });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
