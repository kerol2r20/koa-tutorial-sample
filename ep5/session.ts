// session.ts
import Koa = require('koa');
import Router = require('koa-router');
import Path = require('path');
import Views = require('koa-views');
import Session = require('koa-session');

const app = new Koa();
const router = new Router();

app.keys = ['MySecretKey']

app.use(Views(Path.join(__dirname, 'views'), {
    extension: 'pug',
    map: {
        pug: 'pug',
    },
}));

app.use(Session(app));

router.get('/loop', async (ctx) => {
    const VideoID = ctx.query.VideoID ? ctx.query.VideoID : ctx.cookies.get('VideoID');
    ctx.cookies.set('VideoID', VideoID);
    if(ctx.session) {                                                   // 判斷ctx.session是否存在
        if(VideoID) {
            if(ctx.session.orderedVideos){
                if(ctx.session.orderedVideos.indexOf(VideoID)==-1){
                    ctx.session.orderedVideos.push(VideoID);            // 將請求過的影片放入ctx.session.orderedVideos中
                }
            }
            else {
                ctx.session.orderedVideos = [];                         // 如果ctx.session.orderedVideos不存在，則初始化他為一個空陣列
            }
        }
    }
    await ctx.render('looper', {
        VideoID: VideoID ? VideoID : null,
        orderedVideos: ctx.session ? ctx.session.orderedVideos : null,
    });
});

router.get('/reset', async (ctx) => {
    ctx.cookies.set('VideoID', undefined);                              // 清除Cookie
    ctx.session = null;                                                 // 清除Session
    ctx.redirect('/loop');                                              // 重導向回/loop頁面
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);