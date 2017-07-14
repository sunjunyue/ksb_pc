<template>
    <div class="win fr" id="win">
        <div class="wm">
            <div class="wTit">| 研发任务管理</div>
            <el-tabs type="border-card">
                <el-tab-pane><span slot="label"><i class="el-icon-loading"></i> 进行中的研发任务</span>
                    <!-- 进行中的研发任务 -->

                </el-tab-pane>
                <el-tab-pane><span slot="label"><i class="el-icon-check"></i> 已完成的研发任务</span></el-tab-pane>
                <el-tab-pane><span slot="label"><i class="el-icon-edit"></i> 新增研发任务</span></el-tab-pane>
                <el-tab-pane><span slot="label"><i class="el-icon-caret-right"></i> 规划任务分派</span></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tableData1: [],
                msg: 'Welcome to Your Vue.js App',
                config: {
                    value: 'https://www.baidu.com',
                    imagePath: '',
                    filter: 'color'
                },
                downloadButton: false
            };
        },

        mounted: function () {

        },
        methods: {}

    };
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    .el-tabs__item.is-active{
        color:rgba(0, 179, 139, 0.98);
    }
    .el-tabs__item:hover{
        color:rgba(0, 179, 139, 0.98);
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>