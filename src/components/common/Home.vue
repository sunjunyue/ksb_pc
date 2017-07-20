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
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:#ffffff;
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

</style>