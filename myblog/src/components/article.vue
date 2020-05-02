<template>
    <div id="app">
       <div class="article" @click="readArticle">{{article.title}}</div>
       <ul>
            <li><i class="fa fa-calendar"></i>{{article.date.split('T')[0]}}</li>
            <li><i class="fa fa-folder"></i>{{article.sortname}}</li>
            <li><i class="fa fa-tag"></i>{{article.labelname}}</li>
            <!--清除浮动样式-->
            <div style="clear:both;"></div>
       </ul>
       <div class="detail">
            {{article.detail}}
       </div>
    </div>
</template>
<script>
export default {
    props: ['article'],
    data() {
        return {
            
        }
    },
    mounted() {
        // console.log(this.article);
    },
    methods: {
        readArticle(){
            this.$store.commit('setArticleId',this.article.mdname)
        }
    },
}
</script>
<style lang="less" scoped>
    #app{
        width: 100%;
        background-color: white;
        border-radius: 10px;
        box-shadow:0px 2px 6px 4px #f5f5f5;
        // margin-left: 20px;
        margin-bottom: 20px;
        padding: 15px;
        color: #565a5f;
        box-sizing: border-box;
        .article{
            font-size: 30px;
            cursor: pointer;
            &:hover{
                color: #38b7ea;
            }
        }
        ul{
            margin: 0;
            padding: 0;
            li{
                i{
                    margin-right: 10px;
                }
                line-height: 25px;
                margin: 10px;
                float: left;
                list-style: none;
                font-size: 16px;
                &:nth-child(1){
                    margin-left: 0;
                    cursor: default;
                }
                &:nth-child(2),
                &:nth-child(3){
                    cursor: pointer;
                }
                &:nth-child(2):hover,
                &:nth-child(3):hover{
                    color: #38b7ea;
                }
            }
        }
        .detail{
            font-size: 16px;
        }
    }
    
</style>