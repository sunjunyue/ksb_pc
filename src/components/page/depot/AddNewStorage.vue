<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">|&nbsp;&nbsp;新增入库单</div>
            <!--弹出框-->
            <el-dialog
                    title="选择面辅料"
                    :visible.sync="dialogFormVisible"
                    :modal-append-to-body='false'
                    size="small"
                    @open="handleOpen">
                <!--级联选择器-->
                <el-cascader
                    :options="form.options"
                    v-model="form.selectedOptions"
                    @change="handleChange"
                    placeholder="请选择分类"
                    changeOnSelect
                    size="small"
                    style="width:400px;margin-bottom:20px;">
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
                <!--page-->
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :pageSize="page_size"
                        :total="total">
                </el-pagination>
            </el-dialog>
            <!--form-->
            <el-form :label-position="labelPosition" :model="deportstorage" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <!-- 入库单单号，自动生成 -->
                        <el-form-item label="入库单单号：">
                            <el-input
                                    v-model="deportstorage.dpsnumber"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                        <!--入库日期 -->
                        <el-form-item label="入库日期:" required>
                            <el-date-picker
                                v-model="deportstorage.indate"
                                :editable="false"
                                :align="right"
                                :type="date"
                                placeholder="选择日期"
                                @change="dateChange">
                            </el-date-picker>
                        </el-form-item>
                        <!--入库签收人 -->
                        <el-form-item label="入库签收人:">
                            <el-input
                                v-model="deportstorage.consignee"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                        <!--本地货号 -->
                        <el-form-item label="本地货号:">
                            <el-input
                                v-model="deportstorage.localarticlenumber"
                                :disabled="true">
                            </el-input>
                            <el-button
                                    type="primary"
                                    class="wNo"
                                    style="margin-top:10px;"
                                    @click="dialogFormVisible = true">
                                    选择本地货号
                            </el-button>
                        </el-form-item>
                        <!--供应商货号-->
                        <el-form-item label="供应商货号:" required>
                            <el-input
                                v-model="deportstorage.supplierarticlenumber">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--面辅料名称 -->
                        <el-form-item label="面辅料名称:">
                            <el-input
                                v-model="deportstorage.articlename"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                        <!--计量单位 -->
                        <el-form-item label="计量单位:">
                            <el-input
                                v-model="deportstorage.measureunit"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                        <!--参考单价 -->
                        <el-form-item label="单价:">
                            <el-input
                                v-model="deportstorage.price">
                            </el-input>
                        </el-form-item>
                        <!--入库数量-->
                        <el-form-item label="入库数量:">
                            <el-input
                                v-model="deportstorage.quantity"
                                @blur="changeQuantity">
                            </el-input>
                        </el-form-item>
                        <!--总金额-->
                        <el-form-item label="总金额:">
                            <el-input
                                v-model="deportstorage.zpricestr"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                        <!--是否红单-->
                        <el-form-item label="是否是红单:">
                            <el-switch
                                v-model="deportstorage.isred"
                                width="80"
                                on-color="rgba(0, 179, 139, 0.98)"
                                off-color="#f00"
                                on-value="非红单"
                                off-value="红单"
                                on-text="非红单"
                                off-text="红单"
                                style="margin-top:5px;"
                                @change="isred_change">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="wSub">
                    <el-form-item>
                        <el-button type="primary" @click="submit_deportstorage">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </div>
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
                    price: '0.00',
                    quantity: '0',
                    zprice: '0.00',
                    zpricestr: '￥0.00',
                    supplierarticlenumber: '',
                    isred: '非红单',
                    categoryid: '',
                    categoryname: '',
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
            dateChange (val) {
                this.deportstorage.indate = val;
            },
            changeQuantity (event) {
                /*alert(this.deportstorage.quantity);
                alert(this.$validate_num(this.deportstorage.quantity));*/
                if (isNaN(this.deportstorage.quantity)){
                    this.deportstorage.quantity = 0;
                } else {
                    this.deportstorage.zprice = this.$formatCurrency2(this.deportstorage.price * this.deportstorage.quantity,2);
                    this.deportstorage.zpricestr = this.$formatCurrency(this.deportstorage.price * this.deportstorage.quantity,2);
                }
            },
            handleSelect(index, row) {
                //alert(row.localarticlenumber);
                this.deportstorage.localarticlenumber = row.localarticlenumber;
                this.deportstorage.articlename = row.faname;
                this.deportstorage.measureunit = row.measureunit;
                this.deportstorage.price = row.referenceprice;
                this.deportstorage.categoryid = row.categoryid;
                this.deportstorage.categoryname = row.categoryname;

                this.dialogFormVisible = false;
                this.deportstorage.zprice = this.$formatCurrency2(this.deportstorage.price * this.deportstorage.quantity,2);
                this.deportstorage.zpricestr = this.$formatCurrency(this.deportstorage.price * this.deportstorage.quantity,2);
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
            submit_deportstorage () {
                alert(this.deportstorage.indate);
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/createdeps',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        dpsnumber: this.deportstorage.dpsnumber,
                        indate: this.deportstorage.indate,
                        consignee_id: this.deportstorage.consignee_id,
                        consignee: this.deportstorage.consignee,
                        localarticlenumber: this.deportstorage.localarticlenumber,
                        articlename: this.deportstorage.articlename,
                        measureunit: this.deportstorage.measureunit,
                        price: this.deportstorage.price,
                        quantity: this.deportstorage.quantity,
                        zprice: this.deportstorage.zprice,
                        supplierarticlenumber: this.deportstorage.supplierarticlenumber,
                        isred: this.deportstorage.isred,
                        categoryid: this.deportstorage.categoryid,
                        categoryname: this.deportstorage.categoryname,
                    }
                }).then (function (response) {
                    alert(response.data.flag);
                    if (response.data.flag == 'create_deportstorage_success') {
                        self.$message({
                            message: '新增入库单成功',
                            type: 'success'
                        });
                    }
                    else {
                        alert(response.data.message);
                    }
                })
            },
            handleOpen() {
                this.getform();
            },
            handleChange () {
                this.categoryid = this.form.selectedOptions[this.form.selectedOptions.length-1];
                this.gettableData3();
            },
            isred_change () {
                if (this.deportstorage.isred == '非红单' && this.deportstorage.quantity.substr(0,1) != '-') {
                    this.deportstorage.quantity = '-'+this.deportstorage.quantity;
                } else if (this.deportstorage.isred == '红单' && this.deportstorage.quantity.substr(0,1) == '-') {
                    this.deportstorage.quantity = this.deportstorage.quantity.substr(1);
                }

                if (this.deportstorage.isred == '非红单' && this.deportstorage.zpricestr.substr(0,1) != '-') {
                    this.deportstorage.zpricestr = '-'+this.deportstorage.zpricestr;
                } else if (this.deportstorage.isred == '红单' && this.deportstorage.zpricestr.substr(0,1) == '-') {
                    this.deportstorage.zpricestr = this.deportstorage.zpricestr.substr(1);
                }

                if (this.deportstorage.isred == '非红单' && this.deportstorage.zprice.substr(0,1) != '-') {
                    this.deportstorage.zprice = '-'+this.deportstorage.zprice;
                } else if (this.deportstorage.isred == '红单' && this.deportstorage.zprice.substr(0,1) == '-') {
                    this.deportstorage.zprice = this.deportstorage.zprice.substr(1);
                }
            }
        },
    }
</script>

<style scoped>

    /*.el-checkbox__label {*/
        /*font-size: 16px;*/
    /*}*/

    /*.wm .el-form-item {*/
        /*width: 100%;*/
    /*}*/

    /*.el-form-item__content {*/
        /*width: 100%*/
    /*}*/

    /*.wm .el-input .el-input__inner {*/
        /*width: 72%;*/
    /*}*/

    /*.demonstration {*/
        /*color: #fff;*/
    /*}*/

    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>