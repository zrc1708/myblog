<template>
  <div id="app">
    <my-header></my-header>

    <div class="content">
      <div class="leftbar">
        <my-card ></my-card>
      </div>

      <div class="content_article">
        <router-view></router-view>
      </div>

      <div class="sidebar">
        <my-blackboard></my-blackboard>
        <my-mycloud></my-mycloud>
      </div>
    </div>
    
  </div>
</template>
<script>
import header from '../src/components/header.vue'
import mycard from '../src/components/mycard.vue'
import myarticle from '../src/components/article.vue'
import blackboard from '../src/components/blackboard.vue'
import mycloud from '../src/components/cloud.vue'

export default {
  data() {
    return {
    }
  },
  // mounted() {
  //       this.leftBarTop = this.$refs.mycard.getBoundingClientRect().top
  //       window.addEventListener("scroll", this.handleScroll);
  // },
  // methods: {
  //       handleScroll() {
  //           console.log(this.leftBarTop);
  //           if(this.$refs.mycard.getBoundingClientRect().top<=0){
  //             let width = this.$refs.mycard.getBoundingClientRect().width
  //               this.$refs.mycard.style.position = 'fixed'
  //               // this.$refs.mycard.style.top = this.leftBarTop+'px'
  //               this.$refs.mycard.style.width = width +'px'
  //               this.$refs.content.style.marginLeft = width +'px'
  //           }
  //       },
  // },
  components:{
    'my-header':header,
    'my-card':mycard,
    'my-article':myarticle,
    'my-blackboard':blackboard,
    'my-mycloud':mycloud
  },
  watch:{
    '$store.state.articleId':function(newFlag, oldFlag){
      let id = this.$store.state.articleId
      // console.log(id);
      this.$router.push({
        path:`/readarticle?articleid=${id}`,
        // query:{articleId:id}
      })
    }
  }
}
</script>
<style lang="less">
  #app{
    .content{
      display: flex;
      width: 100%;
      max-width: 1770px;
      margin: 0 auto;
      padding-top: 30px;
        .leftbar{
          flex: 2;
        }
        .content_article{
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          flex: 6;
        }
        .sidebar{
          flex: 2;
        }
    } 
    
  }
</style>
