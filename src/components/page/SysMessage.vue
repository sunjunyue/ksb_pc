<template>
    <div class="win fr" id="win">
        <div class="wm">
            <el-row>
                <el-col :span="8">
                    <!--搜索-->
                    <el-input placeholder="请输入内容" v-model="input2">
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中..."
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%;margin-top:30px;">
                    <!--v-loading="loading"-->
                    <!--element-loading-text="拼命加载中..."-->
                    <!--ref="multipleTable"-->
                    <!--:data="tableData"-->
                    <!--style="width: 100%;margin-top:30px;">-->
                <!--系统信息id-->
                <el-table-column
                        prop="sm_id"
                        label="系统信息id"
                        min-width="100">
                </el-table-column>
                <!--系统信息标题-->
                <el-table-column
                        prop="sm_title"
                        label="系统信息标题"
                        min-width="200">
                </el-table-column>
                <!--任务id-->
                <el-table-column
                        prop="task_guid"
                        label="任务id"
                        min-width="100">
                </el-table-column>
                <!--系统信息状态-->
                <el-table-column
                        prop="sm_status"
                        label="系统信息状态">
                </el-table-column>
                <!--操作-->
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" size="small" v-show="scope.row.sm_status == 2"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--page-->
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
                flag: 3,
                input2: '',
            }
        },
        mounted: function(){
            this.gettabledata();
        },
        methods: {
            handleIconClick () {

            },
            gettabledata () {
                const self = this;
                self.loading = true;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'sm/getsmcountlist',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        page_size: self.page_size,
                        flag: self.flag,
                        uid: JSON.parse(localStorage.getItem('ksb_user')).data.id
                    }
                }).then(function (response) {
                    if(response.data.flag == 'get_smcount_list_success') {
                        self.tableData = response.data.data.sms;
                        for (var o in self.tableData) {
                            if (self.tableData[o].sm_status == '1') {
                                self.tableData[o].sm_status = '未读';
                            } else {
                                self.tableData[o].sm_status = '已读';
                            }
                        }
                        self.total = response.data.data.sms_count;
                    }
                    self.loading = false;
                }).catch(function (error) {
                    alert(error);
                    self.loading = false;
                })
            },
        },
    };
</script>

<style scoped lang="less">
    @import '../../assets/css/ele_public.less';
</style>
<style>
    .line{
        text-align:center;
        line-height:30px;
    }
    @import '../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>