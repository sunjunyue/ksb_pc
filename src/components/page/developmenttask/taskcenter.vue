<template>
    <div class="win fr" id="win">
        <div class="wm">
            <div class="wTit">| 研发任务管理</div>
            <el-tabs type="border-card">
                <el-tab-pane><span slot="label"><i class="el-icon-loading"></i> 进行中的研发任务</span>
                    <!-- 进行中的研发任务 -->
                    <el-carousel arrow="always" height="500px" :autoplay="false">
                        <el-carousel-item v-for="item in items" :key="item">
                            <el-card :body-style="{ padding: '0px' }">
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
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-check"></i> 已完成的研发任务
                    </span>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-edit"></i> 新增研发任务
                    </span>
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <p style="color:#fff;">任务封面图</p>
                        </el-col>
                        <el-col :span="18">
                            <el-form ref="form" :model="form" label-width="120px">
                                <el-col :span="12">
                                    <el-form-item label="任务发起人:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="任务名称:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="任务来源:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="参考图:">
                                        <el-row>
                                            <el-col :span="8">
                                                <el-upload class="upload-demo"
                                                           action="http://upload.qiniu.com/"
                                                           :on-preview="handlePreview"
                                                           :on-remove="handleRemove"
                                                           :on-success="handleAvatarSuccess"
                                                           :on-error="handleError"
                                                           :before-upload="beforeAvatarUpload"
                                                           :data="postData"
                                                           :file-list="fileList"
                                                           :show-file-list="false">
                                                    <el-button size="small" type="primary" style="font-size:14px;">点击上传</el-button>
                                                </el-upload>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-button size="small" type="primary" style="font-size:14px;"
                                                           @click="dialogFormVisible = true">查看款式参考
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item label="截止时间:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="设计师:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="裁剪师:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="样衣工:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="具体要求">
                                        <el-input type="textarea"
                                                  v-model="form.name"
                                                  rows="4">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('formAccount')">立即创建</el-button>
                                    <el-button @click="resetForm('formAccount')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane>
                        <span slot="label"><i class="el-icon-caret-right"></i> 规划任务分派</span>
                </el-tab-pane>
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
                downloadButton: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
            };
        },

        mounted: function () {

        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }

    };
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    /*.time {*/
        /*font-size: 13px;*/
        /*color: #999;*/
    /*}*/

    /*.bottom {*/
        /*margin-top: 13px;*/
        /*line-height: 12px;*/
    /*}*/

    /*.button {*/
        /*padding: 0;*/
        /*float: right;*/
    /*}*/

    /*.clearfix:before,*/
    /*.clearfix:after {*/
        /*display: table;*/
        /*content: "";*/
    /*}*/

    /*.clearfix:after {*/
        /*clear: both*/
    /*}*/
    .el-card{
        border:none;
        background:none;
    }
    .el-tabs__item.is-active{
        color:rgba(0, 179, 139, 0.98);
    }
    .el-tabs__item:hover{
        color:rgba(0, 179, 139, 0.98);
    }

    .el-tabs--border-card{
        background:none;
        border:none;
    }
    .el-tabs--border-card>.el-tabs__content{
        padding:30px 15px;
    }
    .el-popover, .el-tabs--border-card{
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.62), 0 0 6px 0 rgba(0,0,0,.04);
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>