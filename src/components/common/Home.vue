<template>
    <div class="main" id="bench">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components: {
            vHead, vSidebar
        }
    }
</script>

<style>
    .win{
        width: calc(100% - 250px);
    }
    .wm{
        width: calc(100% - 100px)
    }
    /*树形控件*/
    .wTree{
        overflow-y:scroll;height:400px;margin-top:30px;
    }

    .el-checkbox__label {
        font-size: 16px;
    }

    .tab_check{
        width:12px;
        height:12px;
        border:1px rgba(0,179,139,.68) solid;
    }
    /*弹出框*/
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:#ffffff;
    }
    /*选项卡*/
    .el-tabs__content{
        margin-top:30px;
    }
    .el-tabs__item.is-active{
        color:rgba(0, 179, 139, 0.98);
    }
    .el-tabs__item:hover{
        color:rgba(0, 179, 139, 0.98);
    }
    .el-tabs__item{
        font-size:16px;
    }
    /*单选按钮*/
    .el-form-item__label{
        color:rgba(255, 255, 255, 0.88);
    }
    /*用户状态*/
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #fff;
        background-color: rgba(0, 179, 139, 0.98);
        border-color:rgba(0, 179, 139, 0.98);
        box-shadow: -1px 0 0 0 rgba(0, 179, 139, 0.98);
    }
</style>