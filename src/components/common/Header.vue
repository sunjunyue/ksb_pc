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
                    <el-badge :value="sysmessagecount" class="item">
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
                sysmessagecount: 0,
            }
        },
        computed: {
            username(){
                let username = JSON.parse(localStorage.getItem('ksb_user'));
                return username.accountname ? username.accountname : this.name;
            }
        },
        mounted: function () {
            this.getsysmessagecount();
            this.gsysmessagecount();
        },
        methods: {
            gsysmessagecount() {
              setInterval(() => {
                  this.getsysmessagecount();
              }, 60000)
            },
            getsysmessagecount () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'sm/getsmcountbyuid',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        uid: JSON.parse(localStorage.getItem('ksb_user')).data.id,
                    }
                }).then(function (response) {
                    if (response.data.flag == 'get_sncount_by_uid_success') {
                        self.sysmessagecount = response.data.data.smcount;
                    }
                }).catch(function (error) {

                });
            },
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