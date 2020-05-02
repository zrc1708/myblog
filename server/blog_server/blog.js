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

// 获取所有的标签
articlerouters.get('/getArticles', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    // const sql = `select * from article order by id desc`
    const sql = `select count(*) from article GROUP BY labelid`
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