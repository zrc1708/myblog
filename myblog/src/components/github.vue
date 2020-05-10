<template>
    <div id="app">
        <div class="picture"></div>
        <div class="icon"><i class="fa fa-github" aria-hidden="true" @click="move"></i></div>
    </div>
</template>
<script>
export default {
    methods: {
        move(){
            window.open("https://github.com/zrc1708")
        }
    }
}
</script>
<style lang="less" scoped>
    #app{
        position: fixed;
        top: 0;
        right: 0;
        display: none;
    }
    .picture{
        width: 0;
        height: 0;
        border: 35px solid;
        border-color: #38b7ea #38b7ea transparent transparent;
    }
    .icon{
        position: fixed;
        top: 0;
        right: 0;
        i{
            font-size: 42px;
            transform: rotate(45deg);
            &::before{
                color: white;
                cursor: pointer;
            }
        }
    }
@media(max-width:945px){
    #app{
      display: block;
    }
}
@media(max-width:433px){
    .picture{
        border: 25px solid;
        border-color: #38b7ea #38b7ea transparent transparent;
    }
    .icon{
        i{
            font-size: 28px;
        }
    }
}
</style>