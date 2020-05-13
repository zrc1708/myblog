<template>
  <div id="app">
    <my-header></my-header>

    <div class="content">

      <div class="leftbar">
        <my-card ></my-card>
        <div class="showbar">
          <my-blackboard></my-blackboard>
          <my-mycloud></my-mycloud>
        </div>
      </div>

      <div class="content_article">
        <router-view></router-view>
      </div>

      <div class="sidebar">
        <my-blackboard></my-blackboard>
        <my-mycloud></my-mycloud>
      </div>
    </div>
    <!-- github快捷按钮 -->
    <my-github></my-github>
    <!-- 底部备案信息 -->
    <my-foot></my-foot>
  </div>
</template>
<script>
import header from '../src/components/header.vue'
import mycard from '../src/components/mycard.vue'
import myarticle from '../src/components/article.vue'
import blackboard from '../src/components/blackboard.vue'
import mycloud from '../src/components/cloud.vue'
import github from '../src/components/github.vue'
import foot from '../src/components/foot.vue'

export default {
  components:{
    'my-header':header,
    'my-card':mycard,
    'my-article':myarticle,
    'my-blackboard':blackboard,
    'my-mycloud':mycloud,
    'my-github':github,
    'my-foot':foot
  },
  watch:{
    '$store.state.articleId':function(newFlag, oldFlag){
      let id = this.$store.state.articleId.split('?')[0]
      this.$router.push({
        path:`/readarticle?articleid=${id}`,
      })
    },
    '$store.state.name':async function(newFlag, oldFlag){
        let name = this.$store.state.name
        let category = this.$store.state.category
        console.log(name,category)
        this.$router.push({
          path:`/clarticle?category=${category}&name=${name}`,
        })
    },
  }
}
</script>
<style lang="less">
  #app{
    box-sizing: border-box;
    .content{
      padding-top: 20px;
      display: flex;
      width: 100%;
      max-width: 1770px;
      margin: 0 auto;
        .leftbar{
          padding-left: 20px;
          padding-bottom: 20px;
          height: 400px;
          flex: 2;
          .showbar{
            padding-top: 20px;
            display: none;
          }
        }
        .content_article{
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          flex: 6;
        }
        .sidebar{
          padding-right: 20px;
          flex: 2;
        }
    } 
  }
  @media(max-width:1200px){
    #app{
      .content{
        .leftbar{
          .showbar{
            display: block;
          }
        }
        .sidebar{
          display: none;
        }
      }
    }
  }
  @media(max-width:945px){
    #app{
      .content{
        flex-direction: column;
        .leftbar{
          height: 125px;
          padding-right: 20px;
          .showbar{
            display: none;
          }
        }
        .sidebar{
          display: none;
        }
      }
    }
  }
  @media(max-width:720px){
    #app{
      .content{
        .leftbar{
          height: 80px;
        }
      }
    }
  }
  @media(max-width:433px){
    #app{
      .content{
        padding-top: 5px;
        .leftbar{
          height: 50px;
          padding-bottom: 5px;
          padding-left: 5px;
          padding-right: 5px;
        }
        .content_article{
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }
  }
</style>
