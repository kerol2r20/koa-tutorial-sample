// static.ts
import Koa = require('koa');
import Path = require('path');
import fileserve = require('koa-static');

const app = new Koa();

app.use(fileserve(Path.join(__dirname, 'static'))); // 將static資料夾中的檔案直接掛載到server上

app.listen(3000);
