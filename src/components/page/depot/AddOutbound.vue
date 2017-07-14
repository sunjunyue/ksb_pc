<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">|&nbsp;&nbsp;新增出库单</div>

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
                        ref="multipleTable"
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
                            prop="curr_quantity"
                            label="库存数"
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
            </el-dialog>

            <el-form :label-position="labelPosition" :model="outbound" label-width="170px">
                <el-row>
                    <el-col :span="12">
                        <!-- 入库单单号，自动生成 -->
                        <el-form-item label="出库单单号：">
                            <el-input v-model="outbound.obnumber" :disabled="true"></el-input>
                        </el-form-item>
                        <!--入库日期 -->
                        <el-form-item label="出库日期:" required>
                            <el-date-picker
                                    v-model="outbound.outdate"
                                    :editable="false"
                                    :align="right"
                                    :type="date"
                                    placeholder="选择日期"
                                    @change="dateChange">
                            </el-date-picker>
                        </el-form-item>
                        <!--领用人 -->
                        <el-form-item label="领用人:">
                            <el-input v-model="outbound.consignee" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="本地货号:">
                            <el-input v-model="outbound.localarticlenumber" :disabled="true"></el-input>
                            <br/>
                            <el-button type="primary" class="wNo" style="margin-top:10px;" @click="dialogFormVisible = true">选择本地货号
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--面辅料名称 -->
                        <el-form-item label="面辅料名称:">
                            <el-input v-model="outbound.articlename" :disabled="true"></el-input>
                        </el-form-item>
                        <!--计量单位 -->
                        <el-form-item label="计量单位:">
                            <el-input v-model="outbound.measureunit" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="出库单价:">
                            <el-input v-model="outbound.curr_pricestr" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="出库数量:">
                            <el-input v-model="outbound.quantity" @blur="changeQuantity"></el-input>
                        </el-form-item>
                        <el-form-item label="出库金额:">
                            <el-input v-model="outbound.zpricestr" :disabled="true"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>
                <div class="edit_bottom" style="text-align:center;width:100%;margin-left:-50px;margin-top:50px;">
                    <el-form-item>
                        <el-button type="primary" @click="submit_outbound">提交</el-button>
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
                outbound: {
                    obnumber: '',
                    outdate: '',
                    consignee_id: '',
                    consignee: '',
                    localarticlenumber: '',
                    articlename: '',
                    measureunit: '',
                    quantity: '0',
                    zprice: '0.00',
                    zpricestr: '￥0.00',
                    supplierarticlenumber: '',
                    isred: '非红单',
                    categoryid: '',
                    categoryname: '',
                    curr_price: '',
                    curr_pricestr: '',
                    isred: 'false',
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
                select_item_curr_q: '0',
            }
        },
        mounted: function () {
            this.getobnumber();
            this.outbound.consignee_id = JSON.parse(localStorage.getItem('ksb_user')).data.id;
            this.outbound.consignee = JSON.parse(localStorage.getItem('ksb_user')).data.name;
        },
        methods: {
            dateChange (val) {
                this.outbound.outdate = val;
            },
            changeQuantity (event) {
                /*alert(this.deportstorage.quantity);
                alert(this.$validate_num(this.deportstorage.quantity));*/
                if (this.outbound.quantity > this.select_item_curr_q) {
                    this.outbound.quantity = this.select_item_curr_q;
                }
                if (isNaN(this.outbound.quantity)){
                    this.outbound.quantity = 0;
                } else {
                    this.outbound.zprice = this.$formatCurrency2(this.outbound.curr_price * this.outbound.quantity,2);
                    this.outbound.zpricestr = this.$formatCurrency(this.outbound.curr_price * this.outbound.quantity,2);
                }
            },
            handleSelect(index, row) {
                //alert(row.localarticlenumber);
                if(row.curr_quantity <= 0) {
                    this.$message({
                        message: '该物品当前库存为0，因此无法选择',
                        typ: 'warning'
                    });
                } else {
                    this.outbound.localarticlenumber = row.localarticlenumber;
                    this.outbound.articlename = row.faname;
                    this.outbound.measureunit = row.measureunit;
                    this.outbound.curr_price = row.curr_price;
                    this.outbound.curr_pricestr = this.$formatCurrency(row.curr_price);
                    /*this.outbound.measureunit = row.measureunit;
                this.outbound.price = row.referenceprice;
                this.outbound.categoryid = row.categoryid;
                this.outbound.categoryname = row.categoryname;

                this.dialogFormVisible = false;
                this.outbound.zprice = this.$formatCurrency2(this.outbound.price * this.outbound.quantity,2);
                this.outbound.zpricestr = this.$formatCurrency(this.outbound.price * this.outbound.quantity,2);*/
                    this.dialogFormVisible = false;
                    this.select_item_curr_q = row.curr_quantity;
                    this.outbound.quantity = row.curr_quantity;
                }
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.gettableData3();
            },
            getobnumber () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/createobnumber',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    }
                }).then(function (response) {
                    //lert(response.data.data);
                    if (response.data.flag == 'create_deportoutboundnumber_success') {
                        self.outbound.obnumber = response.data.data;
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
            submit_outbound () {
                /*alert(this.outbound.outdate);
                return;*/
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'deps/createoutbound',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        obnumber: this.outbound.obnumber,
                        outdate: this.outbound.outdate,
                        consignee_id: this.outbound.consignee_id,
                        consignee: this.outbound.consignee,
                        localarticlenumber: this.outbound.localarticlenumber,
                        articlename: this.outbound.articlename,
                        measureunit: this.outbound.measureunit,
                        price: this.outbound.curr_price,
                        quantity: this.outbound.quantity,
                        zprice: this.outbound.zprice,
                    }
                }).then (function (response) {
                    //alert(response.data.flag);
                    if (response.data.flag == 'create_outbound_success') {
                        self.$message({
                            message: '新增出库单成功',
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
            /*isred_change () {
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
            }*/
        },
    }
</script>

<style>

    .el-checkbox__label {
        font-size: 16px;
    }
    .el-input__icon {
        right: 30%
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


    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:#ffffff;
    }
</style>