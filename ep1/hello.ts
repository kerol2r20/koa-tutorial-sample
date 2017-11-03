// hello.ts
import Koa = require('koa');            // 引入koa模組

const app = new Koa();                  // 建立koa實例

app.use(async (ctx) => {                // 中間件
    ctx.body = '<h1>Hello Koa</h1>';    // 回傳資料給與前端
});

app.listen(3000);                       // 監聽Port 3000
