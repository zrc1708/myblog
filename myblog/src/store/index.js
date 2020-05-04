import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleId:'',
    category:'',
    name:''
  },
  mutations: {
    setArticleId(state,val){
      state.articleId = val
    },
    setCategory(state,val){
      state.category = val
    },
    setName(state,val){
      state.name = val
    }
  },
  actions: {
  },
  modules: {
  }
})
