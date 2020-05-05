const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js') // 导入数据库登录信息
const fs = require("fs");
const path = require('path');

const articlerouters = new Router()

// file日期格式转换
function getdate(val){
    let arr = (val+'').split(' ')
    // [ 'Sun', 'Mar', '22', '2020', '22:48:42', 'GMT+0800', '(GMT+08:00)' ]
    // 一月Jan,二月Feb,三月Mar,四月Apr,五月May,六月Jun,七月Jul,八月Aug,九月Sept,十月Oct,十一月Nov,十二月Dec
    // 2020-03-22 22:24:41
    if(arr[1]==='Jan'){
        arr[1]='01'
    }else if(arr[1]==='Feb'){
        arr[1]='02'
    }else if(arr[1]==='Mar'){
        arr[1]='03'
    }else if(arr[1]==='Apr'){
        arr[1]='04'
    }else if(arr[1]==='May'){
        arr[1]='05'
    }else if(arr[1]==='Jun'){
        arr[1]='06'
    }else if(arr[1]==='Jul'){
        arr[1]='07'
    }else if(arr[1]==='Aug'){
        arr[1]='08'
    }else if(arr[1]==='Sept'){
        arr[1]='09'
    }else if(arr[1]==='Oct'){
        arr[1]='10'
    }else if(arr[1]==='Nov'){
        arr[1]='11'
    }else if(arr[1]==='Dec'){
        arr[1]='12'
    }
    return `${arr[3]}-${arr[1]}-${arr[2]} ${arr[4]}`
}

// 获取最近的文章列表
articlerouters.get('/getArticles', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    // const sql = `select * from article order by id desc`
    const sql = `select * from article a,sort b,label c
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
    const sql = `select * from article a,sort b,label c
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

// 删除文章
articlerouters.post('/deleteArticles', async function (ctx) {
    const id = ctx.request.body.id

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `DELETE FROM article where id = '${id}'`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        // arr:rs,
        code:200,
    };
});

// 通过标签/分类获取文章
articlerouters.get('/getlist/:category/:name', async function (ctx) {
    let category = ctx.params.category
    let name = ctx.params.name

    let categorysql = category==='label'?`c.labelname = '${name}'`:`b.sortname = '${name}'`

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `select * from article a,sort b,label c
                    where a.sortid =b.sortid and a.labelid =c.labelid and ${categorysql}
                    order by id desc`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 获取所有的分类
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

// 删除分类
articlerouters.post('/deleteSort', async function (ctx) {
    const id = ctx.request.body.sortid

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `DELETE FROM sort where sortid = '${id}'`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        // arr:rs,
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

// 获取分类云内容
articlerouters.get('/getSortCloud', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `Select b.sortname , count(a.sortid) as count
                from article a ,sort b 
                WHERE a.sortid = b.sortid GROUP BY a.sortid;`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 获取标签云内容
articlerouters.get('/getLabelCloud', async function (ctx) {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `Select b.labelname , count(a.labelid) as count
                from article a ,label b 
                WHERE a.labelid = b.labelid GROUP BY a.labelid;`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 删除标签
articlerouters.post('/deleteLabel', async function (ctx) {
    const id = ctx.request.body.labelid

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `DELETE FROM label where labelid = '${id}'`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        // arr:rs,
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

// 修改标签
articlerouters.post('/changeLabel', async function (ctx) {
    const labelid = ctx.request.body.labelid
    const labelname = ctx.request.body.labelname

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE label SET labelname = '${labelname}' WHERE labelid = '${labelid}';`
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

// 增加标签
articlerouters.post('/addLabel', async function (ctx) {
    const labelname = ctx.request.body.name

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `INSERT INTO label ( labelname ) VALUES ( '${labelname}');`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    return ctx.body = {
        arr:rs,
        code:200,
    };
});

// 文件上传接口
articlerouters.post('/uploadfile', async (ctx, next) => {
    // 测试上传路径的获取
    let title = ctx.request.body.title
    let detail = ctx.request.body.detail
    let datetime = ctx.request.body.datetime
    let sortid = ctx.request.body.sortid
    let labelid = ctx.request.body.labelid

    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件

    // // 将文件信息写入数据库
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `INSERT INTO article ( title, detail , date , sortid , labelid , mdname ) 
                VALUES ( '${title}', '${detail}','${datetime}',
                ${sortid} , ${labelid} ,'${file.name}');`
    const [rs] = await connection.query(sql);
 
    connection.end(function(err){
        //连接结束
    })

    // 创建可读流
    const reader = fs.createReadStream(file.path);

    let filePath = path.join(__dirname+'/static/') + `${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = {
        message:"上传成功！",
        code:200,
        };
  });
  
module.exports = articlerouters