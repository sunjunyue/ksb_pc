<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <!--选项卡-->
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <!--任务管理-->
                <el-tab-pane label="任务管理" name="first">
                    <el-form :model="taskdetail" :rules="rules" ref="taskdetail"
                             label-width="100px">
                        <el-row>
                            <!--form left-->
                            <el-col :span="9">
                                <!--封面图-->
                                <el-form-item label="封面图:">
                                    <img :src="tasking_items[0].taskphotourl" width="100" height="100" style="border-radius:4px;">
                                </el-form-item>
                                <!--任务发起人-->
                                <el-form-item label="发起人:">
                                    <el-input v-model="taskdetail.devtask_builder"></el-input>
                                </el-form-item>
                                <!--任务名称-->
                                <el-form-item label="任务名称:">
                                    <el-input v-model="taskdetail.devtask_name"></el-input>
                                </el-form-item>
                                <!--任务来源-->
                                <el-form-item label="任务来源:">
                                    <el-input v-model="taskdetail.devtask_source"></el-input>
                                </el-form-item>
                                <!--参考图-->
                                <el-form-item label="参考图:">
                                    <el-button size="small" type="primary" style="font-size:14px;">
                                        查看款式参考
                                    </el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="9" :push="3">
                                <!--截止时间-->
                                <el-form-item label="截止时间:">
                                    <el-date-picker
                                            v-model="taskdetail.devtask_deadline"
                                            type="date"
                                            placeholder="选择日期"
                                            @change="dateChange"
                                            style="width:100%">
                                    </el-date-picker>
                                </el-form-item>
                                <!--二维码-->
                                <el-form-item label="二维码:">
                                    <img :src="taskdetailurl[0].code" width="100" height="100">
                                </el-form-item>
                                <!--具体要求-->
                                <el-form-item label="具体要求：">
                                    <el-input type="textarea"
                                          v-model="taskdetail.devtask_text"
                                          :rows="7">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="wSub">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('formAccount')">提交更新</el-button>
                                <el-button @click="resetForm('formAccount')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="完成进度" name="second">
                    <!--任务进度-->
                        <el-steps :space="100" :active="1" :align-center="true">
                            <el-step title="设计初稿" icon="edit"></el-step>
                            <el-step title="初稿审核" icon="upload"></el-step>
                            <el-step title="面辅料准备" icon="picture"></el-step>
                            <el-step title="面辅料审核" icon="edit"></el-step>
                            <el-step title="设计制版" icon="upload"></el-step>
                            <el-step title="裁剪" icon="picture"></el-step>
                            <el-step title="制作样衣" icon="edit"></el-step>
                            <el-step title="定稿审核" icon="upload"></el-step>
                        </el-steps>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                activeName2: 'first',
                taskdetail:{

                },
                taskdetailurl: [{
                    code: 'http://osyuuevsn.bkt.clouddn.com/Fmf3iyMUtsMKz9MAH5HWtvtZ5MM7',
                }],
                radio: '1',
                tasking_items: [{
                    taskphotourl: 'http://osyuuevsn.bkt.clouddn.com/Fmf3iyMUtsMKz9MAH5HWtvtZ5MM7',
                    devtask_name: '测试任务',
                    devtask_deadline: '2017-07-20',
                    devtask_progress: '25',
                }],
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>
<style>
    .el-step__head.is-finish {
        color: rgba(0, 179, 139, 0.98);
        border-color: rgba(0, 179, 139, 0.98);
    }
    .el-step__title.is-finish {
        color: rgba(0, 179, 139, 0.98);
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>