<template>
    <div id="app">
        <span class="title">小黑板</span>
       我只想写点务实，能看懂，读者可复现的原创文章。<br>
       穷苦大学生，目前大三。<br>
       <span class="url">其他链接：</span>
       <a href="http://pan.jibei66.com/#/welcome" target="_blank">妮可云盘</a>
       <a href="http://tenno.jibei66.com/" target="_blank">仓鼠导航</a>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
   #app{
       width: 100%;
       background-color: white;
       box-shadow:0px 2px 6px 4px #f5f5f5;
       box-sizing: border-box;
       border-radius: 10px;
       padding: 15px;
       .title{
           display: block;
           font-size: 20px;
           font-weight: bold;
           padding-bottom: 5px;
       }
       .url{
           display: block;
           margin-top: 20px;
       }
       a{
           text-decoration: none;
           color:inherit;
           font-size: 16px;
           padding: 0 20px;
           color: #38b7ea;
           &:hover{
               color: #78c6e6;
           }
       }
   }
</style>