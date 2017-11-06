// cookie.ts
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

router.get('/loop', async (ctx) => {
    const VideoID = ctx.query.VideoID ? ctx.query.VideoID : ctx.cookies.get('VideoID'); // 當我們沒有傳遞參數時，嘗試去讀取cookie的內容，播放上一次的內容
    ctx.cookies.set('VideoID', VideoID);    // 將本次的VideoID存到cookie中
    await ctx.render('looper', {
        VideoID: VideoID ? VideoID : undefined,
    });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
