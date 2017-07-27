<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <!--选项卡-->
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <!--任务管理-->
                <el-tab-pane label="任务管理" name="first">
                    <el-form :model="tasking_item" ref="tasking_item"
                             label-width="100px">
                        <el-row>
                            <!--form left-->
                            <el-col :span="8">
                                <!--封面图-->
                                <el-form-item label="封面图:">
                                    <img :src="tasking_item.taskphotourl" width="200" height="200" style="border-radius:4px;">
                                </el-form-item>
                                <!--二维码-->
                                <el-form-item label="二维码:">
                                    <img :src="tasking_item.devtask_qrcodeurl" width="200" height="200" style="border-radius:4px;">
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" >
                                <!--任务发起人-->
                                <el-form-item label="发起人:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_builder"></el-input>
                                </el-form-item>
                                <!--任务名称-->
                                <el-form-item label="任务名称:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_name"></el-input>
                                </el-form-item>
                                <!--任务来源-->
                                <el-form-item label="任务来源:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_source"></el-input>
                                </el-form-item>
                                <!--参考图-->
                                <el-form-item label="参考图:">
                                    <el-button size="small" type="primary" style="font-size:14px;">
                                        查看款式参考
                                    </el-button>
                                </el-form-item>
                                <!--截止时间-->
                                <el-form-item label="截止时间:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_deadline"></el-input>
                                </el-form-item>
                                <!--设计师-->
                                <el-form-item label="设计师:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_designer"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <!--制版师-->
                                <el-form-item label="制版师:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_patternmaker"></el-input>
                                </el-form-item>
                                <!--裁剪师-->
                                <el-form-item label="裁剪师:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_cutter"></el-input>
                                </el-form-item>
                                <!--样衣工-->
                                <el-form-item label="样衣工:">
                                    <el-input :disabled="true" v-model="tasking_item.devtask_yyg"></el-input>
                                </el-form-item>
                                <!--具体要求-->
                                <el-form-item label="具体要求：">
                                    <el-input :disabled="true" type="textarea"
                                              v-model="tasking_item.devtask_text"
                                              :rows="7">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" @click="returnv()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!--任务进度-->
                <el-tab-pane label="完成进度" name="second">
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
                tasking_item:{
                    guid: '',
                    taskphotourl: '',
                    devtask_qrcodeurl: '',
                    devtask_builder:'',
                    devtask_name:'',
                    devtask_source:'',
                    devtask_deadline:'',
                    devtask_designer:'',
                    devtask_patternmaker:'',
                    devtask_cutter:'',
                    devtask_yyg:'',
                    devtask_text:''
                },
            }
        },
        mounted: function () {
            //alert("DDDDD:"+this.$route.params.guid);
            this.tasking_item.guid = localStorage.getItem('ksb_ctaskguid');
            this.gettasking_item();
        },
        methods:{
            returnv() {
               this.$router.push('/taskcenter');
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            gettasking_item() {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'devtask/getdevtaskbyguid',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        guid: self.tasking_item.guid,
                    }
                }).then(function (response) {
                    if(response.data.flag == "get_devtask_by_guid_success") {
                        self.tasking_item.taskphotourl = response.data.data.devtask.taskphotourl
                            self.tasking_item.devtask_qrcodeurl = response.data.data.devtask.devtask_qrcodeurl,
                            self.tasking_item.devtask_builder = response.data.data.devtask.devtask_builder,
                            self.tasking_item.devtask_name = response.data.data.devtask.devtask_name,
                            self.tasking_item.devtask_source = response.data.data.devtask.devtask_source,
                            self.tasking_item.devtask_deadline = response.data.data.devtask.devtask_deadline,
                            self.tasking_item.devtask_designer = response.data.data.devtask.devtask_designer,
                            self.tasking_item.devtask_patternmaker = response.data.data.devtask.devtask_patternmaker,
                            self.tasking_item.devtask_cutter = response.data.data.devtask.devtask_cutter,
                            self.tasking_item.devtask_yyg = response.data.data.devtask.devtask_yyg,
                            self.tasking_item.devtask_text = response.data.data.devtask.devtask_text
                    }
                }).catch(function (error) {
                    alert(error);

                })
            },
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