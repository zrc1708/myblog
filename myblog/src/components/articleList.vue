<template>
    <div id="app">
        <my-article v-for="(item, index) in article" :key="index"></my-article>
    </div>
</template>
<script>
import myarticle from './article.vue'

export default {
    data() {
        return {
            article:['1','1','1','1','1','1']
        }
    },
    components:{
    'my-article':myarticle
  }
}
</script>
<style lang="less" scoped>
   
</style>