<template>
    <div id="app">
        <my-article v-for="(item, index) in articleList" :key="index" :article='item' ></my-article>
    </div>
</template>
<script>
import myarticle from './article.vue'

export default {
    data() {
        return {
            articleList:[]
        }
    },
    created() {
        this.getArticleList()
    },
    methods: {
        async getArticleList(){
            let {data} = await this.$http.get(`getArticles`)
            if(data.code!==200){
                console.log(获取失败);
                return
            }
            this.articleList = data.arr
            this.$store.commit('setArticleNum',this.articleList.length)
        }
    },
    components:{
        'my-article':myarticle
    },
     watch:{
    '$store.state.name':async function(newFlag, oldFlag){
        let name = this.$store.state.name
        let category = this.$store.state.category
        let {data} = await this.$http.get(`getlist/${category}/${name}`)
        // console.log(data);
        this.articleList = data.arr
    },
    '$store.state.getarticle':async function(newFlag, oldFlag){
        this.getArticleList()
    }
  }
}
</script>
<style lang="less" scoped>
   
</style>