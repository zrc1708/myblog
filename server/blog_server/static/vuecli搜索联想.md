# 在vue-cli中实现搜索联想

## 先在main.js中安装vue-jsonp并引用
```js
// 搜索联想
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
```

## 组件代码模板
```html
<template>
    <div>
        <input type="text" @keyup="search" v-model="valueSearch">

    </div>
</template>
<script>

export default {
    data(){
        return{
            valueSearch:''
        }
    },
    mounted() {
      window.jsonpCB = (data) => {
          console.log(data);
      }
    },
    methods: {
        //搜索框搜索
        search(e){
          if(e.keyCode == 13){
              window.open("https://www.baidu.com/s?wd="+this.valueSearch)
              this.valueSearch = ""
          }
          this.$jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
                wd: this.valueSearch,
                cb: "jsonpCB"
          }).then(res =>{})
        },
    },
}
</script>
```