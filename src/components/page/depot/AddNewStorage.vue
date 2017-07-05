<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">|&nbsp;&nbsp;新增入库单</div>

            <el-dialog style="color:#fff" title="选择面辅料" :visible.sync="dialogFormVisible" :modal-append-to-body='false'
                       size="small" @open="handleOpen">

                <el-cascader
                        :options="form.options"
                        v-model="form.selectedOptions"
                        @change="handleChange"
                        placeholder="请选择分类"
                        changeOnSelect
                        size="small"
                        style="width:400px;">
                </el-cascader>
                <!--table-->
                <el-table
                        v-loading="loading"
                        element-loading-text="拼命加载中..."
                        :data="tableData3"
                        style="width: 100%">
                    <el-table-column
                            prop="localarticlenumber"
                            label="本地货号"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="faname"
                            label="面辅料名称"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="categoryname"
                            label="所属分类"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_select"
                            label="选择">
                        <template scope="scope">
                            <el-button type="primary" icon="check" size="small" @click="handleSelect(scope.$index,scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :pageSize="page_size"
                        :total="total">
                </el-pagination>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
                </div>
            </el-dialog>

            <el-form :label-position="labelPosition" :model="deportstorage" label-width="170px">
                <el-row>
                    <el-col :span="12">
                        <!-- 入库单单号，自动生成 -->
                        <el-form-item label="入库单单号：">
                            <el-input v-model="deportstorage.dpsnumber" :disabled="true"></el-input>
                        </el-form-item>
                        <!--入库日期 -->
                        <el-form-item label="入库日期:" required>
                            <el-date-picker
                                    v-model="deportstorage.indate"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <!--入库签收人 -->
                        <el-form-item label="入库签收人:">
                            <el-input v-model="deportstorage.consignee" :disabled="true"></el-input>
                        </el-form-item>
                        <!--本地货号 -->
                        <el-form-item label="本地货号:">
                            <el-input v-model="deportstorage.localarticlenumber" :disabled="true"></el-input>
                            <br/>
                            <el-button type="primary" class="wNo" style="" @click="dialogFormVisible = true">选择本地货号
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--面辅料名称 -->
                        <el-form-item label="面辅料名称:">
                            <el-input v-model="deportstorage.articlename" :disabled="true"></el-input>
                        </el-form-item>
                        <!--计量单位 -->
                        <el-form-item label="计量单位:">
                            <el-input v-model="deportstorage.measureunit" :disabled="true"></el-input>
                        </el-form-item>
                        <!--参考单价 -->
                        <el-form-item label="单价:">
                            <el-input v-model="deportstorage.price"></el-input>
                        </el-form-item>
                        <el-form-item label="入库数量:">
                            <el-input v-model="deportstorage.price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'right',
                deportstorage: {
                    dpsnumber: '',
                    indate: '',
                    consignee_id: '',
                    consignee: '',
                    localarticlenumber: '',
                    articlename: '',
                    measureunit: '',
                    price: '',
                },
                dialogFormVisible: false,
                form: {
                    options: [],
                    selectedOptions: [],
                },
                formLabelWidth: '120px',
                tableData3: [],
                cur_page: 1,
                page_size: 5,
                total: 0,
                loading: false,
                categoryid: '',
            }
        },
        mounted: function () {
            this.getdpsnumber();
            this.deportstorage.consignee_id = JSON.parse(localStorage.getItem('ksb_user')).data.id;
            this.deportstorage.consignee = JSON.parse(localStorage.getItem('ksb_user')).data.name;
        },
        methods: {
            handleSelect(index, row) {
                //alert(row.localarticlenumber);
                this.deportstorage.localarticlenumber = row.localarticlenumber;
                this.deportstorage.articlename = row.faname;
                this.deportstorage.measureunit = row.measureunit;
                this.deportstorage.price = row.referenceprice;

                this.dialogFormVisible = false;
                //this.$message('编辑第'+(index+1)+'行');
                //localStorage.setItem('ksb_ceu', JSON.stringify(row));
                //alert(JSON.parse(localStorage.getItem('ksb_ceu')).userguid);
                //const self = this;
                //self.$router.push('/edituser');
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.gettableData3();
            },
            getdpsnumber () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/createdepsnumber',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    }
                }).then(function (response) {
                    //alert(response.data.data);
                    if (response.data.flag == 'create_deportstoragenumber_success') {
                        self.deportstorage.dpsnumber = response.data.data;
                    }
                }).catch(function (error) {

                });
            },
            getform () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'rmc/getrmcjson2',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                }).then(function (response) {
                    if (response.data.flag == 'get_raw_meterial_category_json2_success') {
                        //alert(response.data.data);
                        self.form.options = eval(response.data.data);
                    } else {

                    }
                }).catch(function (error) {

                })
            },
            gettableData3 () {
                const self = this;
                self.loading = true;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'faa/getfaalist',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        page_size: self.page_size,
                        categoryid: self.categoryid,
                    }
                }).then(function (response) {
                    if(response.data.flag == 'get_fabricandaccessories_list_success' && response.data.data.faa_count != 0) {
                        self.tableData3 = response.data.data.faa;
                        self.total = response.data.data.faa_count;
                    }
                    self.loading = false;
                }).catch(function (error) {
                    alert(error);
                    self.loading = false;
                })
            },
            handleOpen() {
                this.getform();
            },
            handleChange () {
                this.categoryid = this.form.selectedOptions[this.form.selectedOptions.length-1];
                this.gettableData3();
            },
        },
    }
</script>

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

    .wm .el-form-item {
        width: 100%;
    }

    .el-form-item__content {
        width: 100%
    }

    .wm .el-input .el-input__inner {
        width: 72%;
    }

    .demonstration {
        color: #fff;
    }

    .el-dialog {
        background-color: #324057
    }

    .el-dialog__title {
        color: rgba(255, 255, 255, .98);
    }

    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>