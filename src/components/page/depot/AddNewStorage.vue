<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">|&nbsp;&nbsp;新增入库单</div>

            <el-dialog style="color:#fff" title="选择面辅料" :visible.sync="dialogFormVisible" :modal-append-to-body='false'
                       size="small" @open="handleOpen">

                <span class="demonstration">请选择分类：</span>

                <el-cascader
                        :options="form.options"
                        v-model="form.selectedOptions"
                        @change="handleChange">
                </el-cascader>
                <!--table-->
                <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        style="width: 100%;margin-top:30px"
                >
                    <el-table-column
                            prop="no"
                            label="单号"
                            min-width="50">
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="面辅料名称"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="class"
                            label="分类"
                            min-width="50">
                    </el-table-column>

                    <el-table-column
                            prop="supplier"
                            label="供应商货号"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="操作">
                    </el-table-column>
                </el-table>

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
                url: 'http://192.168.31.243/ksbapi2/api/',
                labelPosition: 'right',
                deportstorage: {
                    dpsnumber: '',
                    indate: '',
                    consignee_id: '',
                    consignee: '',
                    localarticlenumber: '',
                },
                dialogFormVisible: false,
                form: {
                    options: [],
                    selectedOptions: [],
                },
                formLabelWidth: '120px',
            }
        },
        mounted: function () {
            this.getdpsnumber();
            this.deportstorage.consignee_id = JSON.parse(localStorage.getItem('ksb_user')).data.id;
            this.deportstorage.consignee = JSON.parse(localStorage.getItem('ksb_user')).data.name;
        },
        methods: {
            getdpsnumber () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.url + 'deps/createdepsnumber',
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
            handleOpen() {

            },
        },
    }
</script>

<style>
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
    .el-input__icon{
        right:4%;
    }
    .wm .el-input .el-input__inner {
        width: 100%;
    }
    .demonstration{
        color:#fff;
    }
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:rgba(255,255,255,.98);
    }

    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>