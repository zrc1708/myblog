<template>
    <div>
        <el-card>
            <!-- 文件列表 -->
            <el-table :data="articleList" style="width: 100%" stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="title" label="文章名" ></el-table-column>
                <el-table-column label="发表日期" >
                    <template slot-scope="scope">
                        {{scope.row.date.split('T')[0]}}
                    </template>
                </el-table-column>
                <el-table-column prop="detail" label="文章介绍" ></el-table-column>
                <el-table-column prop="sortname" label="文章分类" ></el-table-column>
                <el-table-column prop="labelname" label="文章标签" ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="openchange(scope.row)">修改</el-button>
                        <el-button size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 修改文件对话框 -->
        <el-dialog title="文章修改" :visible.sync="changeDialogVisible" width="30%" class="card">
            <el-form ref="form" :model="form" label-width="25%">
                <el-form-item label="文章标题：">
                    <el-input v-model="changed.title" placeholder="文章标题" class="changeInput"></el-input>
                </el-form-item>
                <el-form-item label="发表日期：">
                    <el-input v-model="newDate" :disabled="true" class="changeInput"></el-input>
                </el-form-item>
                <el-form-item label="文章分类：">
                    <el-select v-model="changed.sortname" placeholder="请选择分类">
                        <el-option v-for="(item, index) in sortList" :key="index" 
                        :label="item.sortname" :value="item.sortid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标签：">
                    <el-select v-model="changed.labelname" placeholder="请选择标签" >
                        <el-option v-for="(item, index) in labelList" :key="index" 
                        :label="item.labelname" :value="item.labelid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章介绍：">
                    <el-input type="textarea" :rows="3" v-model="changed.detail" class="changeTextArea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeArticle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            articleList:[],
            sortList:[],
            labelList:[],
            changeDialogVisible:false,
            changed:{date:''}
        }
    },
    computed: {
        newDate(){
            return this.changed.date.split('T')[0]
        }
    },
    created() {
        this.getArticles()
        this.getSortList()
        this.getLabelList()
    },
    methods: {
        // 获取文章列表
        async getArticles(){
            const {data} = await this.$http.get(`getAllArticles`)
            if (data.code !== 200) return this.$message('登录后方可使用此功能')
            // console.log(data);
            this.articleList = data.arr
        },
        // 获取分类列表
        async getSortList(){
            const {data} = await this.$http.get(`getAllSorts`)
            // if (data.code !== 200) return this.$message('登录后方可使用此功能')
            // console.log(data);
            this.sortList = data.arr
        },
        // 获取标签列表
        async getLabelList(){
            const {data} = await this.$http.get(`getAllLabels`)
            // if (data.code !== 200) return this.$message('登录后方可使用此功能')
            // console.log(data);
            this.labelList = data.arr
        },
        // 打开修改文件对话框
        openchange(item){
            this.changeDialogVisible = true
            this.changed = JSON.parse( JSON.stringify(item))
        },
        // 确认修改
        async changeArticle(){
            this.changeDialogVisible = false
            const {data} = await this.$http.post(`changeArticle`,this.changed)
            if (data.code !== 200) return this.$message('登录后方可使用此功能')
            // console.log(this.changed);
            this.$message.success('修改成功')
            this.getArticles()
        }
    },
}
</script>
<style lang="less" scoped>
.changeInput{
    display: block!important;
    width: 80%!important;
}
.changeTextArea {
    width: 80%!important;
}

</style>