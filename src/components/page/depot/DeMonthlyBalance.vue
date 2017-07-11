<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 月度结余</div>
        </div>
        <!--<el-button type="primary" class="wNo" style="" @click="dialogFormVisible = true">选择本地货号</el-button>-->
        <!--<el-dialog style="color:#fff" title="选择面辅料" :visible.sync="dialogFormVisible" :modal-append-to-body='false'-->
                   <!--size="small" @open="handleOpen">-->
            <!--<el-cascader-->
                    <!--:options="form.options"-->
                    <!--v-model="form.selectedOptions"-->
                    <!--@change="handleChange"-->
                    <!--placeholder="请选择分类"-->
                    <!--changeOnSelect-->
                    <!--size="small"-->
                    <!--style="width:400px;">-->
            <!--</el-cascader>-->
        <!--</el-dialog>-->

        <el-cascader
                :options="form.options"
                placeholder="请选择分类"
                v-model="form.selectedOptions"
                @change="handleChange">
        </el-cascader>
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
            }
        },
        mounted: function () {
           this.getform();
        },
        methods:{
            handleChange () {
                this.categoryid = this.form.selectedOptions[this.form.selectedOptions.length-1];
                //this.gettableData3();
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

    .wm .el-input .el-input__inner{
        width:100%
    }

    .el-input__icon {
        right: 4%!important;
    }
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:#ffffff;
    }

</style>