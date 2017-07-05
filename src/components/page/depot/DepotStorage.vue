<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 入库单管理</div>
            <!--list-->
            <el-form :model="form" :rules="rules" ref="form" class="fl">
                <el-row>
                    <el-col :span="10">
                        <!--日期选择-->
                        <el-row>
                            <el-col :span="10">
                                <el-line-heightform-item  prop="date1">
                                    <el-date-picker type="date" placeholder="起始日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-line-heightform-item >
                            </el-col>
                            <el-col :span="2" offset="1" style="line-height:37px;color:#fff;">至</el-col>
                            <el-col :span="10">
                                <el-line-heightform-item prop="date2">
                                    <el-date-picker type="date" placeholder="截止日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                                </el-line-heightform-item>
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
                            <el-checkbox v-model="checked"style="margin-left:15px;line-height:37px;">是否显示红单</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" class="fr" @click="handleCommand('addnewstorage')">新增入库单</el-button>
            <div class="clear"></div>
            <!--table-->
            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    style="width: 100%"
            >
                <el-table-column
                        prop="no"
                        label="单号"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="入库时间"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="library"
                        label="入库签收"
                        min-width="100">
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
                        prop="num"
                        label="本地货号"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="supplier"
                        label="供应商货号"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="unit"
                        label="计量单位"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="account"
                        label="入库数量"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="单价"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="总价"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="操作">
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
                form : {
                    date1: '',
                    date2: '',
                },
                input2: '',
            }
        },
        methods: {
            openaddstorage () {
                this.$router.push('addnewstorage');
            },
            handleIconClick () {

            },
            handleCommand(command){
                if (command == 'addnewstorage'){
                    this.$router.push('addnewstorage');
                }
            },
        }
    }
</script>

<style scoped>
    .win{
        width: calc(100% - 328px);
    }
    .wm{
        width: calc(100% - 100px)
    }
    .el-checkbox__label{
        font-size:16px;
    }
    .wm .el-input .el-input__inner{
        width:100%!important;
    }
    .el-input__icon {
        right: 4%;
    }

    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>