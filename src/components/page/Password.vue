<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <div class="wTit">| 修改密码</div>
            <el-row>
                <el-col :span="12">
                    <el-form :model="form" :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="pw">
                            <el-input type="password" v-model="form.pw" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="pass" required>
                            <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
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
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    pw:'',
                    pass: '',
                    checkPass: '',
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    pw: [
                        { required: true, message: '请填写原密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/ele_public.less';
</style>

<style scoped>
    @import '../../assets/css/behind_cont.css';