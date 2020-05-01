<template>
    <div id="app">
        {{articleId}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            articleId:''
        }
    },
    created() {
        let data=window.location.href;
        let id=data.split("?articleid=")[1];
        this.articleId = id
    },
}
</script>
<style lang="less" scoped>
    #app{
        width: 100%;
        background-color: white;
        border-radius: 10px;
        box-shadow:0px 2px 6px 4px #f5f5f5;
    }
</style>