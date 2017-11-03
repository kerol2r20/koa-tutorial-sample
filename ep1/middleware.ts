// middleware.ts
import Koa = require('koa');

const app = new Koa();

// Stage 1
app.use(async (ctx, next) => {
    ctx.body = 'Stage 1 Pass\n';
    next();                         // 將context轉交給下個middleware
});

// Stage 2
app.use(async (ctx) => {
    ctx.body += 'Stage 2 Pass\n';   // 我們不呼叫next()，因此這是這是最後一個middleware
});

// Stage 3
app.use(async (ctx) => {
    ctx.body += 'Stage 3 Pass\n';   // 因為Stage 2沒有呼叫next()，因此這個中間件不會被執行
});

app.listen(3000);
