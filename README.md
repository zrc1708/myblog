# myblog
+ 前后端全栈开发的小个人博客
+ 博客采用响应式设计，适配手机以及平板电脑
+ 前端博客采用Vue全家桶，博客后台采用Vue全家桶+elementUI
+ 后端采用node.js+koa+MySQL搭建  
+ 欢迎访问[极北的个人博客](http://blog.jibei66.com)
# 大致效果
+ 博客部分  
![博客首页](https://pic.abcyun.co/image/5ebba97f6ae9d.jpg)
![阅读博客](https://pic.abcyun.co/image/5ebba97f6e4e2.jpg)
+ 后台部分  
![后台管理](https://pic.abcyun.co/image/5ebba97fd6827.jpg)
![文章编辑](https://pic.abcyun.co/image/5ebba97f6a297.jpg)
## 注意
如需运行本项目，请先在blog_server文件夹下新建mysql.js文件，内容样例如下
```js
var mysql_nico = {
    host: '111.11.11.111',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'my_blog'
}
module.exports = mysql_nico;
```
