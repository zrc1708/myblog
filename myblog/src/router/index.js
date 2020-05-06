import Vue from 'vue'
import VueRouter from 'vue-router'

import articleList from '../components/articleList.vue'
import readarticle from '../components/readArticle.vue'
import allarticle from '../components/allarticle.vue'

Vue.use(VueRouter)

  const routes = [
    {path:'/',redirect:'/articlelist'},
    {path:'/articlelist',component:articleList},
    {path:'/readarticle',component:readarticle},
    {path:'/allarticle',component:allarticle}
  ]

const router = new VueRouter({
  routes
})

export default router
