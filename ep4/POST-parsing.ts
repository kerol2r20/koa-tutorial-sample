// POST-parsing.ts
import Koa = require('koa');
import Router = require('koa-router');
import Path = require('path');
import Views = require('koa-views');
import bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

interface IUser {                           // 建立一個IUser的interface，如果是寫Javascript可以不用寫這個
    username: string;
    password: string;
}

const users: IUser[] = [];                  // 建立一個空的users陣列，裡頭即將存放多個users

app.use(Views(Path.join(__dirname, 'views'), {
    extension: 'pug',
    map: {
        pug: 'pug',
    },
}));

app.use(bodyParser());                      // 插入bodyParser中間件，必須要由這個中間件才可以爬取POST資料

router.get('/users', async (ctx) => {       // 瀏覽/users時渲染全部會員的資料
    await ctx.render('users', {
        users,
    });
});

router
.get('/regist', async (ctx) => {            // 瀏覽/regist時渲染註冊頁面
    await ctx.render('regist');
})
.post('/regist', async (ctx) => {           // 處理/regist表單
    const user: IUser = {
        username: ctx.request.body.username,    // bodyParser爬取到的資訊會存放在ctx.request.body物件中
        password: ctx.request.body.password,
    };
    users.push(user);
    console.log(users);
    await ctx.redirect('/users');
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
