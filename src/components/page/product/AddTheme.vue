<template>
    <div class="win fr" id="win">
        <div class="wm">
            <p class="wTit">|&nbsp;&nbsp;主题添加</p>
            <el-form :model="theme_edit" label-width="170px">
                <el-row>
                    <el-col :span="12">
                        <!--主题名称 -->
                        <el-form-item label="主题名称:" required>
                            <el-input v-model="theme_edit.themem_name"></el-input>
                        </el-form-item>
                        <!--创建人-->
                        <el-form-item label="创建人:" required>
                            <el-input v-model="theme_edit.themem_founder"></el-input>
                        </el-form-item>
                        <!--流行主色-->
                        <el-form-item label="流行主色:" required>
                            <el-input v-model="theme_edit.themem_main_color"></el-input>
                        </el-form-item>
                        <!--流行辅色-->
                        <el-form-item label="流行辅色:" required>
                            <el-input v-model="theme_edit.themem_secondary_color"></el-input>
                        </el-form-item>
                        <!--款式参考-->
                        <el-form-item label="款式参考:" required>
                            <el-input v-model="theme_edit.themem_reference"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="款式参考:" required>-->
                        <!--<el-upload-->
                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                        <!--list-type="picture-card"-->
                        <!--:on-preview="handlePictureCardPreview"-->
                        <!--:on-remove="handleRemove">-->
                        <!--<i class="el-icon-plus"></i>-->
                        <!--</el-upload>-->
                        <!--<el-dialog v-model="theme_edit.themem_reference" size="tiny">-->
                        <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                        <!--</el-dialog>-->
                        <!--</el-form-item>-->
                        <!--波段搭配-->
                        <el-form-item label="波段搭配:" required>
                            <el-input v-model="theme_edit.themem_band_matching"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="波段搭配:" required>-->
                        <!--<el-upload-->
                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                        <!--list-type="picture-card"-->
                        <!--:on-preview="handlePictureCardPreview"-->
                        <!--:on-remove="handleRemove">-->
                        <!--<i class="el-icon-plus"></i>-->
                        <!--</el-upload>-->
                        <!--<el-dialog v-model="theme_edit.themem_band_matching" size="tiny">-->
                        <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                        <!--</el-dialog>-->
                        <!--</el-form-item>-->
                    </el-col>
                    <el-col :span="12">
                        <!--元素/风格/工艺版 -->
                        <el-form-item label="元素/风格/工艺版 :" required>
                            <el-input v-model="theme_edit.themem_elemental"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="元素/风格/工艺版:" required>-->
                        <!--<el-upload-->
                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                        <!--list-type="picture-card"-->
                        <!--:on-preview="handlePictureCardPreview"-->
                        <!--:on-remove="handleRemove">-->
                        <!--<i class="el-icon-plus"></i>-->
                        <!--</el-upload>-->
                        <!--<el-dialog v-model="theme_edit.themem_elemental" size="tiny">-->
                        <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                        <!--</el-dialog>-->
                        <!--<div style="margin:30px 0;">-->
                        <!--<el-checkbox label="元素"></el-checkbox>-->
                        <!--<el-checkbox label="风格"></el-checkbox>-->
                        <!--<el-checkbox label="工艺版"></el-checkbox>-->
                        <!--</div>-->
                        <!--<el-input type="textarea" v-model="theme_edit.desc" rows="3" style="width:75%;"></el-input>-->
                        <!--</el-form-item>-->
                        <!--创建人-->
                        <el-form-item label="备注:" required>
                            <el-input type="textarea" v-model="theme_edit.themem_remarks" rows="6"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="wSub">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('theme_edit')">保存</el-button>
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
            return {
                theme_edit: {
                    themem_name: '',
                    themem_founder: '',
                    themem_main_color: '',
                    themem_secondary_color: '',
                    themem_reference: '',
                    themem_band_matching: '',
                    themem_elemental: '',
                    themem_remarks: ''
                }
            }
        },
        methods: {
            onSubmit() {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'producttheme/add',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        themem_name: this.theme_edit.themem_name,
                        themem_founder: this.theme_edit.themem_founder,
                        themem_main_color: this.theme_edit.themem_main_color,
                        themem_secondary_color: this.theme_edit.themem_secondary_color,
                        themem_reference: this.theme_edit.themem_reference,
                        themem_band_matching: this.theme_edit.themem_band_matching,
                        themem_elemental: this.theme_edit.themem_elemental,
                        themem_remarks: this.theme_edit.themem_remarks,
                    }
                }).then(function (response) {
                    //alert(response.data.flag);
                    if (response.data.flag == "producttheme_add_success") {
                        self.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        self.$router.push('/productplan');
                    } else {
                        self.$message.error("添加失败");
                    }
                }).catch(function (error) {
                    self.$message.error("添加失败" + error);
                });
            },

        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #00B38B;
        border-radius: 100px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #00B38B;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        border-radius: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .el-upload--picture-card {
        width: 75%;
        height: 40px;
        border: none;
        vertical-align: bottom;
        position: relative;
    }

    .el-upload--picture-card i {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 20px;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>