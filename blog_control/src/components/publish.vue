<template>
    <div>
        <el-card>
            <el-button @click="choosefile()">选择md</el-button>
            <span v-if="choosedFileName">{{choosedFileName}}</span>
            <el-button @click="upload()" :disabled="publishit?false:true">上传</el-button>
            <input id="flieinput" type="file" accept=".md" ref="file" @change="checkField($event)">
            <!-- 文章详细内容表单 -->
            <el-form ref="form" :model="form" label-width="100px" class="articleForm">
                <el-form-item label="文章标题：">
                    <el-input v-model="uploadArticle.title" class="changeInput"></el-input>
                </el-form-item>
                <el-form-item label="文章介绍：">
                    <el-input type="textarea" :rows="3" v-model="uploadArticle.detail" class="changeInput"></el-input>
                </el-form-item>
                <el-form-item label="发布时间：">
                    <el-input v-model="uploadArticle.datetime" :disabled="true" class="changeInput"></el-input>
                </el-form-item>
                <el-form-item label="文章分类：">
                    <el-select v-model="uploadArticle.sortid" placeholder="请选择分类">
                        <el-option v-for="(item, index) in sortList" :key="index" 
                        :label="item.sortname" :value="item.sortid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标签：">
                    <el-select v-model="uploadArticle.labelid" placeholder="请选择标签" >
                        <el-option v-for="(item, index) in labelList" :key="index" 
                        :label="item.labelname" :value="item.labelid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
            return {
                choosedFileVisible:'',
                choosedFileName:'',
                uploadArticle:{
                    title:'',
                    detail:'',
                    datetime:'',
                    sortid:'',
                    labelid:''
                },
                sortList:[],
                labelList:[],
            }
        },
    created() {
        this.uploadArticle.datetime = this.getFormatDate()
        this.getSortList()
        this.getLabelList()

    },
    computed: {
        publishit(){
            let list = Object.values(this.uploadArticle)
            // 只要数组有空就返回false
            let res = list.every(function(item,index,arr){
                  return item!=='';
             });
            return res&&this.choosedFileName
        }
    },
    methods: {
        // 选择上传的文件
        choosefile() {
            let nico = this.$refs.file
            nico.click()
        },
        // 监听文件上传input的改变
        checkField(dom){
            let arr = dom.target.value.split('\\')
            this.choosedFileName = arr[arr.length-1]
        },
        // 上传文章
        upload() {
            let formData = new FormData();
            formData.append('title', this.uploadArticle.title);
            formData.append('detail', this.uploadArticle.detail);
            formData.append('datetime', this.uploadArticle.datetime);
            formData.append('sortid', this.uploadArticle.sortid);
            formData.append('labelid', this.uploadArticle.labelid);
            formData.append('file', this.$refs.file.files[0])
            this.$http.post(`uploadfile`, formData, {
                'Content-Type': 'multipart/form-data'
            }).then(res => {
                // console.log(res);
                this.$message.success('文章发布成功')
                // 将数据置空
                this.choosedFileName = ''
                this.uploadArticle={
                    title:'',
                    detail:'',
                    datetime:this.getFormatDate(),
                    sortid:'',
                    labelid:''
                }
            })
        },
        // 获取当前时间
        getFormatDate() {
            var date = new Date();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentDate = date.getFullYear() + "-" + month + "-" + strDate
                    + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            return currentDate;
        },
        // 获取分类列表
        async getSortList(){
            const {data} = await this.$http.get(`getAllSorts`)
            this.sortList = data.arr
        },
        // 获取标签列表
        async getLabelList(){
            const {data} = await this.$http.get(`getAllLabels`)
            this.labelList = data.arr
        },
    },
}
</script>
<style lang="less" scoped>
    span{
        padding-left: 20px;
        padding-right: 20px;
    }
    #flieinput { 
        opacity: 0;
        transform: translateY(-200px);
    }
    .articleForm{
        padding-top: 20px;
    }
    .changeInput{
        max-width: 500px;
    }
</style>