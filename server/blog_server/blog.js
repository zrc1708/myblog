const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js') // 导入数据库登录信息

const articlerouters = new Router()

// 获取最近的文章列表
articlerouters.get('/getArticles', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    // const sql = `select * from article order by id desc`
    const sql = `select a.id,a.title,a.date,a.count,a.sortid,a.labelid,a.detail,a.mdname, 
                b.sortid,b.sortname,c.labelid,c.labelname
                from article a,sort b,label c
                where a.sortid =b.sortid and a.labelid =c.labelid order by id desc limit 10`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 获取所有的文章
articlerouters.get('/getAllArticles', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `select a.id,a.title,a.date,a.count,a.sortid,a.labelid,a.detail,a.mdname, 
                    b.sortid,b.sortname,c.labelid,c.labelname
                    from article a,sort b,label c
                    where a.sortid =b.sortid and a.labelid =c.labelid order by id desc`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 获取所有的文章
articlerouters.get('/getAllSorts', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `select * from sort`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 获取所有的标签
articlerouters.get('/getAllLabels', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `select * from label`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 修改文章信息
articlerouters.post('/changeArticle', async function (ctx) {
    const id = ctx.request.body.id
    const title = ctx.request.body.title
    const detail = ctx.request.body.detail
    // 至少一位数字
    let numberflag = /^\d{1,}$/
    const sortid = numberflag.test(ctx.request.body.sortname)?ctx.request.body.sortname:ctx.request.body.sortid
    const labelid = numberflag.test(ctx.request.body.labelname)?ctx.request.body.labelname:ctx.request.body.labelid

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE article SET title = '${title}' , detail = '${detail}' ,
                sortid = '${sortid}' , labelid = '${labelid}'
                WHERE id = '${id}';`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 修改分类
articlerouters.post('/changeSort', async function (ctx) {
    const sortid = ctx.request.body.sortid
    const sortname = ctx.request.body.sortname

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE sort SET sortname = '${sortname}' WHERE sortid = '${sortid}';`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 增加分类
articlerouters.post('/addSort', async function (ctx) {
    const sortname = ctx.request.body.name

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `INSERT INTO sort ( sortname ) VALUES ( '${sortname}');`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

module.exports = articlerouters