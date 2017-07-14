<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 月度结余</div>
            <el-row :gutter="20">
            <el-col :span="6">
                <el-cascader
                        :options="form.options"
                        placeholder="请选择分类"
                        v-model="form.selectedOptions"
                        @change="handleChange">
                </el-cascader>
            </el-col>
            <el-col :span="18">
                <el-row style="margin-bottom:30px;">
                    <el-col :span="6">
                        <div class="block">
                            <el-date-picker
                                    v-model="value4"
                                    type="month"
                                    placeholder="选择年月">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="6" style="margin-left:15px;">
                        <el-button type="primary">面辅料月度结存</el-button>
                    </el-col>
                </el-row>
                <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        style="width: 100%">
                    <el-table-column
                            prop="post_num"
                            label="本地货号"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_monthly"
                            label="月度"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_balance_last"
                            label="上月结余"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_amount_last"
                            label="上月金额"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_storage_current "
                            label="当月入库"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_amount_current "
                            label="入库金额"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_outgoing_current"
                            label="当月出库"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_amount_current"
                            label="出库金额"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_balance"
                            label="本月结余"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="post_amount"
                            label="本月金额"
                            min-width="100">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    options: [],
                    selectedOptions: [],
                },
                value4:''
            }
        },
        mounted: function () {
           this.getform();
        },
        methods:{
            handleChange () {
                this.categoryid = this.form.selectedOptions[this.form.selectedOptions.length-1];
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
