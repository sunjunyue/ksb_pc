<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 入库单管理</div>
            <!--list-->
            <el-form :model="form" ref="form" class="fl" style="width:50%">
                <el-row>
                    <el-col :span="8">
                        <!--日期选择-->
                        <el-row>
                            <el-date-picker
                                v-model="form.dates"
                                type="daterange"
                                align="right"
                                placeholder="请选择日期范围"
                                :picker-options="dateoptions">
                            </el-date-picker>
                        </el-row>
                    </el-col>
                    <el-col :span="8" :push="1">
                        <!--搜索-->
                        <el-input
                                placeholder="面辅料名称/货号/供应商货号/入库签收"
                                icon="search"
                                v-model="input2"
                                :on-icon-click="handleIconClick">
                        </el-input>
                    </el-col>
                    <el-col :span="6" :push="2">
                        <el-form-item>
                            <!--是否显示红单-->
                            <el-checkbox style="margin-left:15px;line-height:37px;">是否显示红单</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" class="fr" @click="handleCommand('addnewstorage')" :disabled="addisdis">新增入库单</el-button>
            <div class="clear"></div>
            <!--table-->
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中..."
                    :data="tableData33"
                    style="width: 100%">
                <el-table-column
                        prop="dpsnumber"
                        label="单号"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="indate"
                        label="入库时间"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="articlename"
                        label="面辅料名称"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="supplierarticlenumber"
                        label="供应商货号"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="measureunit"
                        label="计量单位"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="入库数量"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="pricestr"
                        label="单价"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="zpricestr"
                        label="总价"
                        min-width="100">
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
                labelPosition: 'right',
                addisdis: false,
                filteroptions: {
                    startdate: '',
                    enddate: '',
                },
                form: {
                    dates: '',
                },
                dateoptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                input2: '',
                tableData33: [],
                cur_page: 1,
                page_size: 5,
                total: 0,
                loading: false,
            }
        },
        mounted: function(){
            this.getdepsflag();
            this.gettableData33();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.gettableData33();
            },
            getdepsflag () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/getdepsflag',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    }
                }).then(function (response) {
                    if (response.data.flag == 'create_deportstorage_stop') {
                        self.addisdis = true;
                        self.$notify({
                            title: '提示信息',
                            message: '目前处于库存月结期，暂时无法新增入库单',
                            duration: 0
                        });
                    }
                }).catch(function (error) {

                })
            },
            openaddstorage () {
                this.$router.push('addnewstorage');
            },
            handleIconClick () {

            },
            handleCommand(command){
                if (command == 'addnewstorage') {
                    this.$router.push('addnewstorage');
                }
            },
            gettableData33 () {
                const self = this;
                self.loading = true;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/getdepslist',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        page_size: self.page_size,
                    }
                }).then(function (response) {
                    self.tableData33 = response.data.data.depos;
                    for (var o in self.tableData33) {
                        //alert(self.tableData33[o].indate.substr(0,10));
                        self.tableData33[o].indate = self.tableData33[o].indate.substr(0,10);
                        self.tableData33[o].pricestr = self.$formatCurrency(self.tableData33[o].price, 2);
                        self.tableData33[o].zpricestr = self.$formatCurrency(self.tableData33[o].zprice, 2);
                    }
                    self.total = response.data.data.depos_count;
                    self.loading = false;
                }).catch(function (error) {
                    alert(error);
                    self.loading = false;
                })
            },
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>

<style scoped>
    .win {
        width: calc(100% - 328px);
    }

    .wm {
        width: calc(100% - 100px)
    }

    .el-checkbox__label {
        font-size: 16px;
    }

    .wm .el-input .el-input__inner{
        width:100%
    }

    .el-input__icon {
        right: 4%!important;
    }
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:#ffffff;
    }

</style>