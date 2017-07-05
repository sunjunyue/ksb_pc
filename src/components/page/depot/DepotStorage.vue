<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 入库单管理</div>
            <!--list-->
            <el-form :model="form" ref="form" class="fl">
                <el-row>
                    <el-col :span="10">
                        <!--日期选择-->
                        <el-row>
                            <el-col :span="10">
                                <el-date-picker type="date" placeholder="起始日期" v-model="form.date1"
                                                style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col :span="2" style="line-height:37px;color:#fff;">至</el-col>
                            <el-col :span="10">

                                <el-date-picker type="date" placeholder="截止日期" v-model="form.date2"
                                                style="width: 100%;"></el-date-picker>

                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="8">
                        <!--搜索-->
                        <el-input
                                placeholder="面辅料名称/货号/供应商货号/入库签收"
                                icon="search"
                                v-model="input2"
                                :on-icon-click="handleIconClick">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <!--是否显示红单-->
                            <el-checkbox style="margin-left:15px;line-height:37px;">是否显示红单</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" class="fr" @click="handleCommand('addnewstorage')">新增入库单</el-button>
            <div class="clear"></div>
            <!--table-->
            <el-table
                    ref="multipleTable"
                    :data="tableData33"
                    style="width: 100%">
                <el-table-column
                        prop="dpsnumber"
                        label="单号"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="indate"
                        label="入库时间"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="consignee"
                        label="入库签收"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="articlename"
                        label="面辅料名称"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="categoryname"
                        label="分类"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="localarticlenumber"
                        label="本地货号"
                        min-width="80">
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
                        prop="price"
                        label="单价"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="zprice"
                        label="总价"
                        min-width="50">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'right',
                filteroptions: {
                    startdate: '',
                    enddate: '',
                },
                form: {
                    date1: '',
                    date2: '',
                },
                input2: '',
                tableData33: [],
            }
        },
        methods: {
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
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
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

    .wm .el-input .el-input__inner {
        width: 100% !important;
    }

    .el-input__icon {
        right: 4%;
    }

    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>