<template>
    <div class="win fr" id="win">
        <div class="wm">
            <p class="wTit">| 添加波段</p>
            <el-dialog title="选择商品主题" :visible.sync="dialogForm">
                <el-form :label-position="form" :model="form" label-width="140px">
                    <el-cascader
                        :options="form.options"
                        v-model="form.selectedOptions"
                        placeholder="请选择分类"
                        changeOnSelect
                        size="small"
                        style="width:400px;margin-bottom:20px;">
                    </el-cascader>
                    <el-table
                            v-loading="loading"
                            element-loading-text="拼命加载中..."
                            :data="tableData1"
                            style="width: 100%">
                        <!--主题编号-->
                        <el-table-column
                                prop="themem_id"
                                label="主题编号"
                                min-width="90">
                        </el-table-column>
                        <!--主题名称-->
                        <el-table-column
                                prop="themem_name"
                                label="主题名称"
                                min-width="90">
                        </el-table-column>
                        <!--流行主色-->
                        <el-table-column
                                prop="themem_main_color"
                                label="流行主色"
                                min-width="90">
                        </el-table-column>
                        <!--流行辅色-->
                        <el-table-column
                                prop="themem_secondary_color"
                                label="流行辅色"
                                min-width="90">
                        </el-table-column>
                        <!--状态-->
                        <el-table-column
                                prop="temem_status"
                                label="状态">
                            <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.$index,scope.row)"></el-button>
                            <el-button type="primary" icon="view" size="small"></el-button>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-dialog>
            <el-form :label-position="form" :model="form" label-width="140px">
                <el-row>
                    <el-col :span="12">
                        <!--年度季节-->
                        <el-form-item label="年度季节:" required>
                            <el-input v-model="form.season" ></el-input>
                        </el-form-item>
                        <!--商品主题-->
                        <el-form-item label="商品主题:" required>
                            <el-input v-model="form.goods"></el-input>
                            <el-button type="primary" style="margin-top:10px;"  @click="dialogForm = true">选择商品主题</el-button>
                        </el-form-item>
                        <!--订货会-->
                        <el-form-item label="订货会:" required>
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <!--波段名称-->
                        <el-form-item label="波段名称:" required>
                            <el-select v-model="form.region" placeholder="请选择波段名称" style="width:100%" >
                                <el-option label="第一波段" value="第一波段"></el-option>
                                <el-option label="第二波段" value="第二波段"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--波段日期-->
                        <el-form-item label="波段日期：" required>
                            <el-col :span="12">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="1" > - </el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-date-picker type="date" placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--设计完成日期-->
                        <el-form-item label="设计完成日期:" required>
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="内审会:" required>
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <!--纸样完成日期-->
                        <el-form-item label="纸样完成日期:" required>
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <!--期货-->
                        <el-form-item label="期货：" required>
                            <el-col :span="12">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="1" > -</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-date-picker type="date" placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <!--上货日-->
                        <el-form-item label="上货日:" required>
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="wSub" style="margin-top:0;">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()" >保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                form:{
                    name: '',
                    region: '',
                    type: '',
                    date1: '',
                    date2: '',
                },
                color1: '#E3a0ff',
                color2: '#ccc',
                value1:'',
                dialogForm:false,
                loading: false,
                tableData1: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        methods:{
            theme_edit(){

            },
            onSubmit(){
            },
        },

    }
</script>
<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>
<style>
    .line{
        text-align:center;
        line-height:30px;
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>