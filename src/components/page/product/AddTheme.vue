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
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://upload.qiniu.com/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="handleAvatarSuccess"
                                    :on-remove="handleRemove"
                                    :on-error="handleError"
                                    :before-upload="beforeAvatarUpload"
                                    :data="postData">
                                <i class="el-icon-plus"></i>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt>
                            </el-dialog>
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
                        <!--波段搭配-->
                        <el-form-item label="波段搭配:" required>
                            <el-input v-model="theme_edit.themem_band_matching"></el-input>
                        </el-form-item>
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
                <div class="wSub" style="margin-top:0px;">
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
                },
                dialogImageUrl:'',
                postData: {
                    token: this.userphoto_token,
                },
                dialogVisible: false,
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
                        alert(response.data.flag);
                        self.$message.error("添加失败");
                    }
                }).catch(function (error) {
                    self.$message.error("添加失败" + error);
                });
            },
            handlePictureCardPreview(res, file) {

                //this.dialogImageUrl = file.userphotebaseurl + res.key;
                this.dialogImageUrl = this.userphotebaseurl + res.key;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file.response.key);
                var tt = this.theme_edit.themem_reference.split('|');
                //alert(tt.length);
                if (tt.length == 1) {
                    this.theme_edit.themem_reference = '';
                } else {
                    for (var i = 0; i<tt.length; i++) {
                        //alert(tt[i]);
                        if (tt[i].indexOf(file.response.key) >= 0){
                            tt.splice(i,1);
                        }
                    }
                    this.theme_edit.themem_reference = tt.join('|');
                }

                /*alert(this.theme_edit.themem_reference);*/
            },
            handleAvatarSuccess(res, file) {
                //alert(res.key);
                //this.imageUrl =
                /*console.log(res)*/
                if(this.theme_edit.themem_reference == '') {
                    this.theme_edit.themem_reference = this.userphotebaseurl+ res.key
                } else {
                    this.theme_edit.themem_reference = this.theme_edit.themem_reference + ' | ' + this.userphotebaseurl + res.key
                }
            },
            handleError(res) {
                console.log(res)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG &&!isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                    return false;
                }
                return true;
            },
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    .el-upload-list--picture-card .el-upload-list__item{
        width:80px;
        height:80px;
    }
    .el-upload-list--picture-card .el-upload-list__item-status-label{
        background:rgba(0, 179, 139, 0.98);
    }
    .el-upload--picture-card{
        width:80px;
        height:80px;
        line-height:86px;
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>