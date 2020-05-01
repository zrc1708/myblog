<template>
    <div id="app">
        <span class="title">标签云</span>
        <span class="cloud" v-for="(item, index) in list" 
        :key="index" :style="{fontSize: item.size*3 + 16 + 'px'}">{{item.name}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list:[ {name:'DockerJWT',size:0},{name:'spring',size:0},{name:'springboot',size:0},
            {name:'mybatis',size:0},{name:'html',size:3},{name:'javascript',size:0},
            {name:'css',size:0},{name:'less',size:1},{name:'scss',size:0},
            {name:'typescript',size:0},{name:'jquery',size:0},{name:'node.js',size:0},
            {name:'koa',size:2},{name:'express',size:0},{name:'vue',size:3},
            {name:'agular',size:0},{name:'react',size:0},{name:'serverless',size:0},
            {name:'docker',size:0},{name:'linux',size:0},{name:'macos',size:0},]
        }
    },
}
</script>
<style lang="less" scoped>
   #app{
       width: 100%;
       padding: 15px;
       .title{
           display: block;
           font-size: 20px;
           font-weight: bold;
           padding-bottom: 5px;
       }
       .cloud{
           padding: 0 5px;
            word-break: break-all; 
        //    text-align: justify;
        //    text-justify: inter-ideograph;
           color: #777;
           &:hover{
               color: #78c6e6;
                cursor: pointer;
           }
        }       
   }
</style>