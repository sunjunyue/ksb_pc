<template>
    <div class="win fr" id="win">
        <div class="wm">
            <div class="wTit">| 研发任务管理</div>
            <el-tabs type="border-card">
                <el-tab-pane><span slot="label"><i class="el-icon-loading"></i> 进行中的研发任务</span>
                    <!-- 进行中的研发任务 -->
                    <el-carousel arrow="always" height="500px" :autoplay="false">
                        <el-carousel-item v-for="item in items" :key="item">
                            <el-card :body-style="{ padding: '0px' }" class="wm">
                                <img :src="item.taskphotourl" width="300" height="400" class="image">
                                <div style="padding: 14px;">
                                    <span>{{ item.taskname }}</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{ item.taskdeadline }}</time>
                                        <el-button type="text" class="button">查看详细</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-carousel-item>
                    </el-carousel>
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
                items: [{
                    taskphotourl: 'http://osyuuevsn.bkt.clouddn.com/FrIFOLlXooN9JCDz-YjW-TKEce5J',
                    taskname: '测试任务',
                    taskdeadline: '2017-12-31',
                }],
                msg: 'Welcome to Your Vue.js App',
                config: {
                    value: 'https://www.baidu.com',
                    imagePath: '',
                    filter: 'color'
                },
                currentDate: new Date(),
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
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .el-tabs__item.is-active{
        color:rgba(0, 179, 139, 0.98);
    }
    .el-tabs__item:hover{
        color:rgba(0, 179, 139, 0.98);
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>