import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../components/login.vue'
import home from '../components/home.vue'
import myarticle from '../components/myarticle'
import publish from '../components/publish'
import mysort from '../components/mysort'
import mylabel from '../components/mylabel'

Vue.use(VueRouter)

  const routes = [
    {path:'/',redirect:'/login'},
    {path:'/login',component:login},
    {path:'/home',component:home,children:[
      {path:'/myarticle',component:myarticle},
      {path:'/publish',component:publish},
      {path:'/mysort',component:mysort},
      {path:'/mylabel',component:mylabel}
    ]}
]

const router = new VueRouter({
  routes
})

// next()放行，next('/login')强制跳转
router.beforeEach((to,from,next)=>{

  if(to.path==='/login') return next()
  // 获取token
  const tokenStr =  window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()

})

export default router
