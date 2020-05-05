<template>
    <div id="app">
        <span class="title">标签云</span>
        <span class="cloud" v-for="(item, index) in labelList" 
        :key="index" :style="{fontSize: (item.count-1)*3 + 16 + 'px'}"
        @click="readlist(item.labelname)"    >{{item.labelname}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            labelList:[]
        }
    },
    created() {
        this.getLabels()
    },
    methods: {
        // 获取标签列表
        async getLabels(){
            const {data} = await this.$http.get(`getLabelCloud`)
            if (data.code !== 200) return this.$message('登录后方可使用此功能')
            // console.log(data);
            this.labelList = data.arr
        },
        readlist(name){
            this.$store.commit('setName',name)
            this.$store.commit('setCategory','label')
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
           color: #777;
           &:hover{
               color: #78c6e6;
                cursor: pointer;
           }
       }       
   }
</style>