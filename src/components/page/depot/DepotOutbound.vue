<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 出库单管理</div>
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
                                icon="search">
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
            <el-button type="primary" class="fr" @click="handleCommand('addnewoutbound')" :disabled="addisdis">新增出库单</el-button>
            <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    element-loading-text="拼命加载中..."
                    :data="tableData33"
                    style="width: 100%">
                <!--出库单号-->
                <el-table-column
                        prop="obnumber"
                        label="出库单号"
                        min-width="150">
                </el-table-column>
                <!--出库时间-->
                <el-table-column
                        prop="outdate"
                        label="出库时间"
                        min-width="100">
                </el-table-column>
                <!--面辅料名称-->
                <el-table-column
                        prop="articlename"
                        label="面辅料名称"
                        min-width="100">
                </el-table-column>
                <!--本地货号-->
                <el-table-column
                        prop="localarticlenumber"
                        label="本地货号"
                        min-width="100">
                </el-table-column>
                <!--计量单位-->
                <el-table-column
                        prop="measureunit"
                        label="计量单位"
                        min-width="50">
                </el-table-column>
                <!--出库数量-->
                <el-table-column
                        prop="quantity"
                        label="出库数量"
                        min-width="80">
                </el-table-column>
                <!--出库单价-->
                <el-table-column
                        prop="pricestr"
                        label="出库单价"
                        min-width="50">
                </el-table-column>
                <!--出库总价-->
                <el-table-column
                        prop="zpricestr"
                        label="出库总价"
                        min-width="100">
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
        data () {
            return {
                addisdis: false,
                form: {
                    dates: '',
                },
                tableData33: [],
                cur_page: 1,
                page_size: 10,
                total: 0,
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
                            message: '目前处于库存月结期，暂时无法新增出库单',
                            duration: 0
                        });
                    }
                }).catch(function (error) {

                })
            },
            handleCommand(command){
                if (command == 'addnewoutbound') {
                    this.$router.push('addnewoutbound');
                }
            },
            gettableData33 () {
                const self = this;
                self.loading = true;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/getoutboundlist',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        page_size: self.page_size,
                    }
                }).then(function (response) {
                    self.tableData33 = response.data.data.outbounds;
                    for (var o in self.tableData33) {
                        //alert(self.tableData33[o].indate.substr(0,10));
                        self.tableData33[o].outdate = self.tableData33[o].outdate.substr(0,10);
                        self.tableData33[o].pricestr = self.$formatCurrency(self.tableData33[o].price, 2);
                        self.tableData33[o].zpricestr = self.$formatCurrency(self.tableData33[o].zprice, 2);
                    }
                    self.total = response.data.data.outbound_count;
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
    .wm .el-input .el-input__inner{
        width:100%
    }
    .el-input__icon {
        right: 4%;
    }
</style>