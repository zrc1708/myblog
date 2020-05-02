(async function run() {
    var fs = require('fs')
    //加载依赖
    const Koa = require('koa'); //引入koa框架
    const Static = require('koa-static-cache'); //引入koa静态资源依赖
    const Router = require('koa-router'); //引入koa路由
    const cors = require('koa2-cors')//引入跨域依赖

    const app = new Koa(); //类似于实例化
    app.use(cors());//解决跨域问题
    
    //加载静态资源
    app.use(Static('./static', {
        prefix: '/static',
        gzip: true
    }));

    const router = new Router();//路由

    router.get('/', async ctx => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./static/index.html');
    });

    const articlerouter = require('./blog.js')

    app.use(router.routes());//挂载路由
    app.use(articlerouter.routes());


    app.listen(8877, () => {});

})();