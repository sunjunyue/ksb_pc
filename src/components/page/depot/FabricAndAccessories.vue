<style scoped>
    .sort {
        width: 160px;
    }
    .el-select-dropdown{
        wideh:24%;
    }


    .wm .el-form-item {
        width: 65%;
    }

    .el-select {
        display: block;
    }

    .el-input__icon {
        right: 2%;
    }

    /*.wm .el-form-item__label{
        color:rgba(49, 53, 65, 0.68)!important;
    }*/
    .wm .el-input{
        border:1px rgba(49, 53, 65, 0.68) solid;
        border-radius:4px
    }
    .el-dialog {
        background-color:#324057!important;
    }
    .el-dialog__title{
        color:#324057;
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>
<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 面辅料目录</div>

            <el-dialog style="color: #324057" title="新增面辅料目录" :visible.sync="dialogFormVisible" :modal-append-to-body='false'
                size="small" @open="handleOpen">
                <el-form :model="form">
                    <el-form-item label="本地货号：" :label-width="formLabelWidth">
                        <el-input v-model="form.localarticlenumber" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分类：" :label-width="formLabelWidth">
                        <el-input v-model="form.categorylabel" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="面辅料名称：" :label-width="formLabelWidth">
                        <el-input v-model="form.faname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="计量单位：" :label-width="formLabelWidth">
                        <el-radio-group v-model="form.measureunit">
                            <el-radio-button label="米">米</el-radio-button>
                            <el-radio-button label="码">码</el-radio-button>
                            <el-radio-button label="公斤">公斤</el-radio-button>
                            <el-radio-button label="个">个</el-radio-button>
                            <el-radio-button label="只">只</el-radio-button>
                            <el-radio-button label="件">件</el-radio-button>
                            <el-radio-button label="副">副</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="参考单价：" :label-width="formLabelWidth">
                        <el-input v-model="form.referenceprice" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商：" :label-width="formLabelWidth">
                        <el-input v-model="form.supplier" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submintForm">提 交</el-button>
                </div>
            </el-dialog>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input
                            placeholder="输入分类名称进行过滤"
                            v-model="filterText">
                    </el-input>
                    <div class="wTree">
                        <el-tree
                                class="filter-tree"
                                :data="data2"
                                :props="defaultProps"
                                :filter-node-method="filterNode"
                                showCheckbox
                                check-strictly
                                highlightCurrent
                                @check-change="handleCheckChange"
                                ref="tree2">
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="18">
                    <!--button-->
                    <div class="wBtn">
                        <el-button type="primary" icon="plus" @click="dialogFormVisible=true" :disabled="addbuttondisabled">新增面辅料</el-button>
                    </div>
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
                                min-width="120">
                        </el-table-column>
                        <el-table-column
                                prop="categoryname"
                                label="所属分类"
                                min-width="100">
                        </el-table-column>
                        <el-table-column
                                prop="curr_quantity"
                                label="当前库存"
                                min-width="100">
                        </el-table-column>
                        <el-table-column
                                prop="curr_zprice"
                                label="当前库存金额"
                                min-width="120">
                        </el-table-column>
                        <el-table-column
                                prop="curr_price"
                                label="当前库存单价"
                                >
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @current-change ="handleCurrentChange"
                            layout="prev, pager, next"
                            :pageSize="page_size"
                            :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        mounted: function () {
            this.getData2();
        },
        methods:{
            handleCurrentChange(val){
                this.cur_page = val;
                this.gettableData3();
            },
            handleCheckChange(data, checked, indeterminate) {
                //console.log(data, checked, indeterminate);
                if(checked) {
                    this.$notify({
                        title: '提示',
                        message: '当前您选择的分类是：'+data.label + " [" + data.name + "]",
                        duration: 2000,
                    });
                    /*localStorage.setItem('ksb_cm_selectedid', data.id);
                    localStorage.setItem('ksb_cm_selectedlabel',data.label);
                    localStorage.setItem('ksb_cm_selectedname', data.name);*/
                    this.form.categoryid = data.id;
                    this.form.categorylabel = data.label;
                    this.form.categoryname = data.name;
                    this.addbuttondisabled = false;
                    this.gettableData3();
                }
            },
            handleOpen() {
                //alert(localStorage.getItem('ksb_cm_selectedname'));
                this.getLocalarticlenumber();
            },
            filterNode (value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleClick (tab, event) {
                console.log(tab, event);
            },
            getData2 () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'rmc/getrmcjson',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                }).then(function (response) {
                    if (response.data.flag == 'get_raw_meterial_category_json_success') {
                        self.data2 = eval(response.data.data);
                    } else {

                    }
                }).catch(function (error) {

                })
            },
            getLocalarticlenumber () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'faa/createlocalarticlenumber',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        rmc_name: this.form.categoryname
                    }
                }).then(function (response) {
                    if (response.data.flag == 'create_localarticlenumber_success') {
                        self.form.localarticlenumber = response.data.data;
                    } else {

                    }
                }).catch(function (error) {

                })
            },
            submintForm (){
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'faa/createfabricandaccessories',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        localarticlenumber: this.form.localarticlenumber,
                        categoryid: this.form.categoryid,
                        categoryname: this.form.categorylabel,
                        faname: this.form.faname,
                        measureunit: this.form.measureunit,
                        supplier: this.form.supplier,
                        referenceprice: this.form.referenceprice,
                    }
                }).then(function (response) {
                    if (response.data.flag == 'create_fabricandaccessories_success') {
                        self.dialogFormVisible = false;
                        self.form.localarticlenumber = '';
                        self.form.faname = '';
                        self.form.measureunit = '米';
                        self.form.supplier = '';
                        self.form.referenceprice = '0.00';
                        self.$message({
                            message: '新增面辅料目录成功',
                            type: 'success'
                        });

                    } else {
                        alert(response.data.data.error_message);
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
                        categoryid: self.form.categoryid,
                    }
                }).then(function (response) {
                    self.tableData3 = response.data.data.faa;
                    self.total = response.data.data.faa_count;
                    self.loading = false;
                }).catch(function (error) {
                    alert(error);
                    self.loading = false;
                })
            },
        },
        data() {
            return {
                labelPosition: 'right',
                filterText: '',
                data2: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData3: [],
                cur_page: 1,
                page_size: 5,
                total: 0,
                loading: false,
                dialogFormVisible: false,
                form: {
                    localarticlenumber: '',
                    categoryid: '',
                    categorylabel: '',
                    categoryname: '',
                    faname: '',
                    measureunit: '米',
                    supplier: '',
                    referenceprice: '0.00',
                },
                formLabelWidth: '120px',
                addbuttondisabled: true,
            };
        }
    };
</script>

<style>
    ::-webkit-scrollbar {
        width: 12px;
    }/* 滚动槽 */

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
    }/* 滚动条滑块 */

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0,0,0,0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255,0,0,0.4);
    }
</style>
