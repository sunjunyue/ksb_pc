<template>
    <!-- header -->
    <div class="header bg_acolor">
        <div class="logo fl">
            <img src="../../assets/images/sLogo.png">
        </div>
        <div class="headNav fr">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                     style="margin-right:20px;">
                <el-submenu index="1">
                    <template slot="title"><i class="fa fa-user-o fa-lg"></i> &nbsp;{{username}}</template>
                    <el-menu-item index="1-1" @click="handlepersonal('personal')">
                        个人信息
                    </el-menu-item>
                    <el-menu-item index="1-2" @click="handlepassword('password')">
                        修改密码
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="2" @click="handlemessage('sysmessage')"><i class="fa fa-bell-o fa-lg"></i>
                    <el-badge :value="2" class="item">
                        消息
                    </el-badge>
                </el-menu-item>
                <el-menu-item index="3" @click="handleCommand('loginout')">
                    退出
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                name: '系统管理员',
                activeIndex2: '',
            }
        },
        computed: {
            username(){
                let username = JSON.parse(localStorage.getItem('ksb_user'));
                return username.accountname ? username.accountname : this.name;
            }
        },
        methods: {
            handleCommand(command) {
                const self = this;
                if (command == 'loginout') {
                    //localStorage.removeItem('ksb_user');
                    localStorage.clear();
                    self.$router.push('/');
                }
            },
            handleSelect () {
                
            },
            handlemessage(message){
                if (message == 'sysmessage') {
                    this.$router.push('sysmessage');
                }
            },
            handlepersonal(personal){
                if (personal == 'personal') {
                    this.$router.push('personal');
                }
            },
            handlepassword(password){
                if (password == 'password') {
                    this.$router.push('password');
                }
            },
        }
    }
</script>

<style>
    .el-badge__content.is-fixed {
        top: 18px;
        right: 3px;
    }
</style>