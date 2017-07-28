<template>
    <div class="main" id="login">
        <div class="bLogo">
            <img src="../../assets/images/loginLogo.png">
        </div>
        <div class="mBg">
            <div class="loginCont">
                <div class="bTit">Welcome</div>
                <div class="popup">
                    <el-form :label-position="labelPosition" :model="loginForm" :rules="rules" ref="loginForm">
                        <el-form-item prop="account">
                            <el-input type="input" v-model="loginForm.account" id="account"
                                      placeholder="用户名/邮箱/手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="loginForm.password" id="password"
                                      placeholder="登录密码"></el-input>
                        </el-form-item>
                        <el-checkbox v-model="checked" fill="#00B38B">记住密码</el-checkbox>
                        <div class="fr" style="color:#fff">
                            <span class="el-checkbox__label">忘记密码?</span>
                        </div>
                        <el-form-item>
                            <el-button type="button" @click="login_submit('loginForm')" class="bSub bg_color" id="popup-submit">登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                labelPosition: 'right',
                loginForm: {
                    account: 'bll@163.com',
                    password: '123456s',
                },
                rules: {
                    account: [{
                        required: true,
                        message: '请您填写用户名，或者邮箱地址或者手机号！',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请您填写登录密码！',
                        trigger: 'blur'
                    }]
                },
                checked: false,
            }
        },
        methods: {
            login_submit(formName){
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax({
                            method: 'post',
                            url: this.apiurl + 'user/login',
                            data: {
                                account: this.loginForm.account,
                                password: this.loginForm.password
                            }
                        }).then(function (response) {
                            if (response.data.flag == "login_success") {
                                //alert('登录成功');
                                localStorage.setItem('ksb_user', JSON.stringify(response.data));
                                self.$router.push('/readme');
                            } else {
                                alert("登录失败");
                                self.loginForm.account = '';
                                self.loginForm.password = '';
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/ele_public.less';
    @import '../../assets/css/front.less';
</style>