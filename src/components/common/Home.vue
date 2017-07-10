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
        width: calc(100% - 300px);
    }
    .wm{
        width: calc(100% - 100px)
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
</style>