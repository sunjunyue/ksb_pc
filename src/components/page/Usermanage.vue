<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <!--button-->
            <div class="wBtn">
                <el-button type="primary" icon="plus" @click="handleCommand('adduser')">添加用户</el-button>
            </div>
            <!--table-->
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中..."
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="工号"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="accountname"
                        label="账户名"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="userstatus"
                        label="用户状态">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.$index,scope.row)"></el-button>
                        <el-button type="primary" icon="view" size="small"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :pageSize="page_size"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                page_size: 10,
                total: 0,
                loading: false,
            }
        },
        mounted: function(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            handleCommand(command){
                if (command == 'adduser'){
                    this.$router.push('adduser');
                }
            },
            handleEdit(index, row) {
                //alert(row.userguid);
                //this.$message('编辑第'+(index+1)+'行');
                localStorage.setItem('ksb_ceu', JSON.stringify(row));
                //alert(JSON.parse(localStorage.getItem('ksb_ceu')).userguid);
                const self = this;
                self.$router.push('/edituser');
            },
            getData () {
                const self = this;
                self.loading = true;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'user/getuserslist',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        page_size: self.page_size,
                    }
                }).then(function (response) {
                    self.tableData = response.data.data.users;
                    for (var o in self.tableData) {
                        if (self.tableData[o].userstatus == '-1') {
                            self.tableData[o].userstatus = '待审核';
                        } else if (self.tableData[o].userstatus == '1') {
                            self.tableData[o].userstatus = '启用';
                        } else if (self.tableData[o].userstatus == '2') {
                            self.tableData[o].userstatus = '禁用';
                        } else if (self.tableData[o].userstatus == '3') {
                            self.tableData[o].userstatus = '删除';
                        }
                    }
                    self.total = response.data.data.users_count;
                    self.loading = false;
                }).catch(function (error) {
                    alert(error);
                    self.loading = false;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/ele_public.less';
</style>

<style>
    @import '../../assets/css/behind_cont.css';
</style>

