<template>
    <div class="navLeft">
        <!--<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title"><i class="fa fa-group fa-lg"></i>&nbsp;&nbsp;用户管理</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="2"><i class="fa fa-address-book fa-lg"></i>&nbsp;&nbsp;岗位部门</el-menu-item>
            <el-menu-item index="3"><i class="fa fa-folder fa-lg"></i>&nbsp;&nbsp;仓库管理</el-menu-item>
            <el-menu-item index="4"><i class="fa fa-sitemap fa-lg"></i>&nbsp;&nbsp;流程管理</el-menu-item>
            <el-menu-item index="5"><i class="fa fa-calendar-minus-o fa-lg"></i>&nbsp;&nbsp;款式初稿</el-menu-item>
            <el-menu-item index="6"><i class="fa fa-calendar-check-o fa-lg"></i>&nbsp;&nbsp;初稿审核</el-menu-item>
            <el-menu-item index="7"><i class="fa fa-puzzle-piece fa-lg"></i>&nbsp;&nbsp;款式制版</el-menu-item>
            <el-menu-item index="8"><i class="fa fa-pie-chart fa-lg"></i>&nbsp;&nbsp;配面辅料</el-menu-item>
            <el-menu-item index="9"><i class="fa fa-calendar-check-o fa-lg"></i>&nbsp;&nbsp;面辅料评审</el-menu-item>
            <el-menu-item index="10"><i class="fa fa-adjust fa-lg"></i>&nbsp;&nbsp;裁剪面料</el-menu-item>
            <el-menu-item index="11"><i class="fa fa-asl-interpreting  fa-lg"></i>缝制面料</el-menu-item>
            <el-menu-item index="12"><i class="fa fa-calendar-check-o fa-lg"></i>&nbsp;&nbsp;版型评审</el-menu-item>
            <el-menu-item index="13"><i class="fa fa-tags fa-lg"></i>&nbsp;&nbsp;样衣定制</el-menu-item>
        </el-menu>-->
        <div class="sidebar">
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'productplan',
                        title: '产品企划'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '款式研发',
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '任务管理',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '4',
                        title: '面辅料仓库',
                        subs: [{
                            index: 'classmanage',
                            title: '分类管理'
                        },{
                            index: 'fabricandaccessories',
                            title: '面辅料目录'
                        },{
                            index: 'depotstorage',
                            title: '入库单'
                        }, {
                            index: 'depotoutbound',
                            title: '出库单'
                        },{
                            index: 'demonthlybalance',
                            title: '月度结余'
                        }]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '5',
                        title: '系统设置',
                        subs: [{
                            index: 'usersmanage',
                            title: '用户管理'
                        }, {
                            index: 'adduser',
                            title: '角色权限'
                        }]
                    }
                ]
            }
        },
        computed: {
            onRoutes(){
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>

<style>
    .el-menu-item, .el-submenu__title{
        font-size:16px;
    }
</style>