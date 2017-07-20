<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <!--用户添加-->
            <el-form :model="formAccount" :rules="rules" ref="formAccount"
                     label-width="100px">
                <el-row>
                    <el-col :span="9">
                        <!--头像-->
                        <el-form-item label="头像:">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://upload.qiniu.com/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :on-error="handleError"
                                    :before-upload="beforeAvatarUpload"
                                    :data="postData">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="fa fa-user-circle fa-5x avatar-uploader-icon" style="font-size:100px;"></i>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="用户名" prop="accountname" required>
                            <el-input v-model="formAccount.accountname"></el-input>
                        </el-form-item>
                        <!--姓名-->
                        <el-form-item prop="name" label="姓名:" required>
                            <el-input v-model="formAccount.name"></el-input>
                        </el-form-item>
                        <!--性别-->
                        <el-form-item prop="sex" label="性别:" required>
                            <el-radio class="radio" v-model="formAccount.sex" :label="1">女士</el-radio>
                            <el-radio class="radio" v-model="formAccount.sex" :label="2">男士</el-radio>
                            <el-radio class="radio" v-model="formAccount.sex" :label="3">保密</el-radio>
                        </el-form-item>
                        <!--出生日期-->
                        <el-form-item prop="birthday" label="出生日期:" required>
                            <el-date-picker
                                    v-model="formAccount.birthday"
                                    type="date"
                                    format="yyyy年MM月dd日"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :push="3">
                        <!--手机号 -->
                        <el-form-item prop="mobile" label="手机号:" required>
                            <el-input v-model="formAccount.mobile"></el-input>
                        </el-form-item>
                        <!--邮箱-->
                        <el-form-item prop="email" label="邮箱:" required>
                            <el-input v-model="formAccount.email"></el-input>
                        </el-form-item>
                        <!--微信-->
                        <el-form-item prop="wechart" label="微信:">
                            <el-input v-model="formAccount.wechart"></el-input>
                        </el-form-item>
                        <!--备注说明-->
                        <el-form-item prop="remarks" label="备注说明:">
                            <el-input type="textarea" v-model="formAccount.remarks" :rows="8"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>
                <div class="wSub">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('formAccount')">立即创建</el-button>
                        <el-button @click="resetForm('formAccount')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formAccount: {
                    accountname: '',
                    name: '',
                    sex: 2,
                    birthday: '',
                    mobile: '',
                    email: '',
                    wechart: '',
                    remarks: '',
                },
                imageUrl: '',
                postData: {
                    token: this.userphoto_token,
                },
                rules: {
                    accountname: [
                        {required: true, message: '请填写用户名', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'},
                    ],
                    birthday: [
                        {type: 'date', required: true, message: '请选择出生日期', trigger: 'blur'},
                    ],
                    mobile: [
                        {required: true, message: '请填写手机号', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请填写email', trigger: 'blur'},
                    ],
                }
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                //alert(res.key);
                this.imageUrl ='http://osyuuevsn.bkt.clouddn.com/'+ res.key
                console.log(res)
            },
            handleError(res) {
                console.log(res)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG&&!isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
                return true;
            },
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax({
                            method: 'post',
                            url: this.apiurl + 'user/mregister',
                            params: {
                                token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                            },
                            data: {
                                accountname: this.formAccount.accountname,
                                name: this.formAccount.name,
                                sex: this.formAccount.sex,
                                birthday: this.formAccount.birthday,
                                mobile: this.formAccount.mobile,
                                email: this.formAccount.email,
                                wechart: this.formAccount.wechart,
                                remarks: this.formAccount.remarks,
                                photourl: this.imageUrl,
                            }
                        }).then(function (response) {
                            //alert(response.data.flag);
                            if (response.data.flag == "m_register_success") {
                                self.$message({
                                    message: '新增用户成功！',
                                    type: 'success'
                                });
                                self.$router.push('/usersmanage');
                            } else {
                                self.$message.error("新增用户失败");
                            }
                        }).catch(function (error) {
                            self.$message.error("新增用户失败" + error);
                        })
                    } else {
                        return false;
                    }
                });
            },

        }
    }
</script>

<style scoped lang="less">
    /*@import '../../assets/css/behind_cont.less';*/
    @import '../../assets/css/ele_public.less';
</style>

<style scoped>
    /*@import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';*/
    @import '../../assets/css/behind_cont.css';

    .avatar-uploader .el-upload {
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
    .el-form-item__label{
        color:rgba(255, 255, 255, 0.88)!important;
    }
    /*.el-input__inner{*/
        /*width:75%*/
    /*}*/
</style>

