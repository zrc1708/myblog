 <template>
    <div>
        <el-card>
            <el-button class="firstbtn" @click="openadd()">增加标签</el-button>
            <el-table :data="labelList" style="width: 100%" stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="labelname" label="分类名" ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="openchange(scope.row)">修改</el-button>
                        <el-button size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 修改标签对话框 -->
        <el-dialog title="分类修改" :visible.sync="changeDialogVisible" width="30%" class="card">
            <el-form ref="form" :model="form" label-width="25%">
                <el-form-item label="分类名：">
                    <el-input v-model="changed.labelname" class="changeInput"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeSort">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 增加标签对话框 -->
        <el-dialog title="标签增加" :visible.sync="addDialogVisible" width="30%" class="card">
            <el-form ref="form" :model="form" label-width="25%">
                <el-form-item label="分类名：">
                    <el-input v-model="addname" class="changeInput"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSort">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            labelList:'',
            changeDialogVisible:false,
            changed:'',
            addDialogVisible:false,
            addname:''
        }
    },
    created() {
        this.getSortList()
    },
    methods: {
        // 获取分类列表
        async getSortList(){
            const {data} = await this.$http.get(`getAllLabels`)
            if (data.code !== 200) return this.$message('登录失效')
            // console.log(data);
            this.labelList = data.arr
        },
        // 打开修改框
        openchange(item){
            this.changeDialogVisible = true
            this.changed = JSON.parse( JSON.stringify(item))
        },
        // 修改标签
        async changeSort(){
            const {data} = await this.$http.post(`changeLabel`,this.changed)
            if (data.code !== 200) return this.$message('登录失效')
            this.changeDialogVisible = false
            this.getSortList()
            this.$message.success('标签修改成功')
        },
        // 打开增加框
        openadd(){
            this.addDialogVisible = true
        },
        // 增加标签
        async addSort(){
            let name = this.addname
            const {data} = await this.$http.post(`addLabel`,{name})
            if (data.code !== 200) return this.$message('登录失效')
            this.addDialogVisible = false
            this.getSortList()
            this.$message.success('标签增加成功')
        }
    },
}
</script>
<style lang="less" scoped>
.changeInput{
    display: block!important;
    width: 80%!important;
}
.firstbtn{
    margin-bottom: 20px;
}
</style>