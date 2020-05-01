import Vue from 'vue'
import VueRouter from 'vue-router'

import articleList from '../components/articleList.vue'
import readarticle from '../components/readArticle.vue'

Vue.use(VueRouter)

  const routes = [
    {path:'/',redirect:'/articlelist'},
    {path:'/articlelist',component:articleList},
    {path:'/readarticle',component:readarticle}
  ]

const router = new VueRouter({
  routes
})

export default router
