<template>
    <div class="win fr" id="win">
        <div class="wm">
            <p class="wTit">|&nbsp;&nbsp;主题添加</p>
            <el-dialog style="color:#fff" title="款式参考" :visible.sync="dialogFormVisible" :modal-append-to-body='false'
                       size="small" >
                <el-carousel arrow="always" height="1000px" :autoplay="false">
                    <el-carousel-item v-for="item in items" :key="item">
                        <div style="margin: 0 auto">
                            <img :src='item'>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
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
                                <el-row>
                                    <el-col :span="8">
                                        <el-upload class="upload-demo"
                                                   action="http://upload.qiniu.com/"
                                                   :on-preview="handlePreview"
                                                   :on-remove="handleRemove"
                                                   :on-success="handleAvatarSuccess"
                                                   :on-error="handleError"
                                                   :before-upload="beforeAvatarUpload"
                                                   :data="postData"
                                                   :file-list="fileList">
                                            <el-button size="small" type="primary" style="font-size:14px;">点击上传</el-button>
                                        </el-upload>
                                    </el-col>
                                    <el-col :span="8" :push="8">
                                        <el-button size="small" type="primary" style="font-size:14px;" @click="dialogFormVisible = true">查看款式参考</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
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
    import ElCol from "element-ui/packages/col/src/col";
    export default{
        components: {ElCol},
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
                items:['http://osyuuevsn.bkt.clouddn.com/FipSnXPrBhcXYNPYTP3YaKB5H5o5','http://osyuuevsn.bkt.clouddn.com/Flh_7fTFWSGesNFTCtxblpGYE4UV','http://osyuuevsn.bkt.clouddn.com/FqwnbVHiMvcp0hQYE-LFyvkiTqtF','http://osyuuevsn.bkt.clouddn.com/FrIFOLlXooN9JCDz-YjW-TKEce5J'],
                fileList: [],
                postData: {
                    token: this.userphoto_token,
                },
                dialogFormVisible: false,
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {

                console.log(file);
            },
            handleAvatarSuccess(res, file) {
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

    .el-carousel__item h1 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>