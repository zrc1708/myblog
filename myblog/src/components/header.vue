<template>
    <div id="app">
        <div class="header">
            <a href="http://www.jibei66.com">
                <img src="../assets/nico.png" alt="">
                <span>jibei·极北</span>
            </a>
            <ul>
                <li @click="move('/articlelist')">主页</li>
                <li>归档</li>
                <li @click="move('/readarticle?articleid=me.md')">关于我</li>
                <!--清除浮动样式-->
                <div style="clear:both;"></div>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        move(url){
            let data=window.location.href;
            let name=data.split("/#")[1];
            if(name===url)  {
                // 刷新文章列表
                this.$store.commit('setArticleList')
                return
            }

            this.$router.push({
                path:url,
            })
        }
    },
}
</script>
<style lang="less" scoped>
    @keyframes show{
		0%{
            width: 0%;
        }
        100%{
            width: 100%;
        }
	}
    #app{
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        box-shadow:0px 2px 15px 4px #eeeeee;
        background-color: white;
        .header{
            width: 100%;
            max-width: 1770px;
            display: flex;
            a{
                display: block;
                text-decoration: none;
                color:inherit;
                margin-right: 20px;
                img{
                    vertical-align: bottom;
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                }
                span{
                    font-size: 25px;
                    line-height: 60px;
                }
            }
            ul {
                margin: 0;
                padding: 0;
                li{
                    float: left;
                    list-style: none;
                    margin: 20px;
                    position: relative;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover::after{
                        animation:show 0.2s ease-in-out forwards;
                    }
                    &::after{
                        content: "";
                        display: block;
                        position: absolute;
                        // top: 37px;
                        bottom: -7px;
                        // width: 100%;
                        height: 3px;
                        background-color: #eeeeee;
                    }
                }
        }
        }
    }
</style>