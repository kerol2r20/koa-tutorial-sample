// async.ts
import Koa = require('koa');
import fs = require('fs');
import Q = require('q');
import path = require('path');

const app = new Koa();

const readFilePromise = Q.nfbind(fs.readFile);  // 將Callback版本的readFile轉為Promise版本

app.use(async (ctx) => {
    const data = await readFilePromise(path.join(__dirname, 'demo.html'), 'utf8');  // 使用await等待readFilePromise回傳回來的資料
    ctx.body = data;
});

app.listen(3000);
