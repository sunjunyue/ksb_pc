<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <div class="wTit">| 修改密码</div>
            <el-row>
                <el-col :span="12">
                    <el-form :model="form" :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="old_password">
                            <el-input type="password" v-model="form.old_password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_password" required>
                            <el-input type="password" v-model="form.new_password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass" required>
                            <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <div class="wSub">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                                <el-button @click="resetForm('form')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    old_password:'',
                    new_password: '',
                    checkPass: '',
                },
                rules2: {
                    new_password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    old_password: [
                        { required: true, message: '请填写原密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
              submitForm(formName) {
                //alert(this.formAccount.birthday);
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'user/modifyuserpassword',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        user_id: JSON.parse(localStorage.getItem('ksb_user')).data.id,
                        old_password: self.form.old_password,
                        new_password: self.form.new_password,
                        checkPass: self.form.checkPass,
                    }
                }).then(function (response) {
                    //alert(response.data.flag);
                    if (response.data.flag == "modify_user_password_success") {
                        self.$message({
                            message: '用户信息更新成功',
                            type: 'success'
                        });
                        //self.$router.push('/usersmanage');
                    } else {
                        self.$message.error("用户信息更新失败2" + response.data.flag);
                    }
                }).catch(function (error) {
                    self.$message.error("用户信息更新失败：" + error);
                })
            },
              resetForm(form) {
                this.$refs[form].resetFields();
              }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/ele_public.less';
</style>

<style scoped>
    @import '../../assets/css/behind_cont.css';