<template>
    <div id="app">
        <div class="box">
            <el-input v-model="username" placeholder="用户名"></el-input>
            <el-input v-model="password" placeholder="密码"></el-input>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
}
</script>
<style lang="less" scoped>
    #app{
        position: relative;
        width: 100%;
        height: 100%;
        .box{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-80%);
            width: 30vw;
            height: 300px;
            background-color: white;
            box-shadow:0px 2px 6px 4px #f5f5f5;
            padding: 30px;
            box-sizing: border-box;
            
        }
    }
</style>