<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <!--选项卡-->
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <!--用户管理-->
                <el-tab-pane label="用户管理" name="first">
                    <el-form
                        :label-position="labelPosition"
                        :model="formAccount"
                        :rules="rules"
                        ref="formAccount"
                        label-width="100px">
                        <el-row :gutter="20">
                            <el-col :span="11" >
                                <!--头像-->
                                <el-form-item label="头像:">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="fa fa-user-circle fa-5x avatar-uploader-icon" style="font-size:100px;"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                                <!--用户名-->
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
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions0">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :push="2">
                                <!--手机号-->
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
                                    <el-input type="textarea" v-model="formAccount.remarks" rows="8"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4"></el-col>
                        </el-row>
                        <div class="wSub">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('formAccount')">提交更新</el-button>
                                <el-button @click="resetForm('formAccount')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
                <!--角色配置-->
                <el-tab-pane label="角色配置" name="second"></el-tab-pane>
                <!--用户状态-->
                <el-tab-pane label="用户状态" name="third">
                    <el-form :label-position="labelPosition" :model="formAccount" label-width="100px">
                        <div style="width:50%;margin-top:30px;">
                            <el-form-item label="用户状态:" required>
                                <el-radio-group @change="handleUserstatusChange()" v-model="formAccount.userstatus">
                                    <el-radio-button label="-1">待审核</el-radio-button>
                                    <el-radio-button label="1">启用</el-radio-button>
                                    <el-radio-button label="2">禁用</el-radio-button>
                                    <el-radio-button label="3">删除</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
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
                    birthday: '',
                    sex: 1,
                    mobile: '',
                    email: '',
                    wechart: '',
                    remarks: '',
                    userstatus: '',
                    userstatus2: '',
                },
                radio3: '-1',
                imageUrl: '',
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
                },
                activeName: 'first'
            };
        },
        mounted: function () {
            this.getData();
        },
        methods: {
            getData(){
                this.formAccount = JSON.parse(localStorage.getItem('ksb_ceu'));
                this.formAccount.sex = parseInt(JSON.parse(localStorage.getItem('ksb_ceu')).sex);
                this.imageUrl = JSON.parse(localStorage.getItem('ksb_ceu')).photourl;
                /*if (JSON.parse(localStorage.getItem('ksb_ceu')).userstatus == "-1"){
                 this.value3 = '0';
                 } else {
                 this.value3 = '100';
                 }*/
                var os = JSON.parse(localStorage.getItem('ksb_ceu')).userstatus;

                if (os == '待审核') {
                    this.formAccount.userstatus = '-1';
                    this.formAccount.userstatus2 = '-1';
                } else if (os == '启用') {
                    this.formAccount.userstatus = '1';
                    this.formAccount.userstatus2 = '1';
                } else if (os == '禁用') {
                    this.formAccount.userstatus = '2';
                    this.formAccount.userstatus2 = '2';
                } else if (os == '删除') {
                    this.formAccount.userstatus = '3';
                    this.formAccount.userstatus2 = '3';
                }
                //this.formAccount.userstatus = JSON.parse(localStorage.getItem('ksb_ceu')).userstatus;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleUserstatusChange(){
                if (this.formAccount.userstatus != this.formAccount.userstatus2) {
                    const self = this;
                    this.$ajax({
                        method: 'post',
                        url: this.apiurl + 'user/modifyuserstatus',
                        params: {
                            token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                        },
                        data: {
                            user_id: this.formAccount.id,
                            userstatus: this.formAccount.userstatus,
                        }
                    }).then(function (response) {
                        if (response.data.flag == "modify_user_status_success") {
                            self.$message({
                             message: '用户状态更新成功',
                             type: 'success'
                             });
                        } else {
                            self.$message.error("用户状态更新失败");
                        }
                    })
                }

            },
            submitForm(formName) {
                //alert(this.formAccount.name);
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax({
                            method: 'post',
                            url: this.apiurl + 'user/modifyuserbyid',
                            params: {
                                token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                            },
                            data: {
                                user_id: this.formAccount.id,
                                accountname: this.formAccount.accountname,
                                name: this.formAccount.name,
                                sex: this.formAccount.sex,
                                birthday: this.formAccount.birthday,
                                mobile: this.formAccount.mobile,
                                email: this.formAccount.email,
                                wechart: this.formAccount.wechart,
                                remarks: this.formAccount.remarks,
                            }
                        }).then(function (response) {
                            //alert(response.data.flag);
                            if (response.data.flag == "modify_user_success") {
                                self.$message({
                                    message: '用户信息更新成功',
                                    type: 'success'
                                });
                                self.$router.push('/usersmanage');
                            } else {
                                self.$message.error("用户信息更新失败" + response.data.data.error_message);
                            }
                        }).catch(function (error) {
                            self.$message.error("用户信息更新失败：" + error);
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
    @import '../../assets/css/ele_public.less';
</style>
<style>
    @import '../../assets/css/behind_cont.css';
    /*头像*/
    .avatar-uploader .el-upload {
        border-radius: 100px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: rgba(0, 179, 139, 0.98);
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
    /*.el-form-item__label{*/
    /*color:rgba(255, 255, 255, 0.88);*/
    /*}*/


</style>

