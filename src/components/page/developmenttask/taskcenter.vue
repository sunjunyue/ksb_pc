<template>
    <div class="win fr" id="win">
        <div class="wm">
            <div class="wTit">| 研发任务管理</div>
            <!--弹出框-->
            <el-dialog
                title="款式参考"
                :visible.sync="dialogFormVisible"
                :modal-append-to-body='false'
                size="small">
                <!--轮播图-->
                <el-carousel arrow="always" height="500px" :autoplay="false">
                    <el-carousel-item v-for="item in items" :key="item">
                        <div class="img_item">
                            <a href=""><img :src='item' height="600" width="450"></a>
                            <div class="img_ico">
                                <el-button type="primary" icon="view" :href="item"></el-button>
                                <el-button type="primary" icon="delete2 "></el-button>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
            <el-tabs type="border-card">
                <!-- 进行中的研发任务 -->
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-loading"></i>
                        进行中的研发任务
                    </span>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <img :src="items.taskphotourl" width="300" height="300">
                            <p class="items_pro">
                               任务名称：{{items.taskname}}
                            </p>
                            <p class="items_pro">
                               截止时间：{{items.taskdeadline}}
                            </p>
                            <p class="items_pro">
                                完成情况：
                                <el-progress :percentage="100" status="success"></el-progress>
                            </p>
                            <el-button size="small" type="primary" style="font-size:14px;"
                                       @click="dialogFormVisible = true">查看详情
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <img :src="items.taskphotourl" width="300" height="300">
                            <p class="items_pro">
                                任务名称：{{items.taskname}}
                            </p>
                            <p class="items_pro">
                                截止时间：{{items.taskdeadline}}
                            </p>
                            <p class="items_pro">
                                完成情况：
                                <el-progress :percentage="100" status="success"></el-progress>
                            </p>
                            <el-button size="small" type="primary" style="font-size:14px;"
                                       @click="dialogFormVisible = true">查看详情
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <img :src="items.taskphotourl" width="300" height="300">
                            <p class="items_pro">
                                任务名称：{{items.taskname}}
                            </p>
                            <p class="items_pro">
                                截止时间：{{items.taskdeadline}}
                            </p>
                            <p class="items_pro">
                                完成情况：
                                <el-progress :percentage="100" status="success"></el-progress>
                            </p>
                            <el-button size="small" type="primary" style="font-size:14px;"
                                       @click="dialogFormVisible = true">查看详情
                            </el-button>
                        </el-col>
                    </el-row>
                    <!--page-->
                    <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :pageSize="page_size"
                        :total="total">
                    </el-pagination>
                </el-tab-pane>
                <!--已完成的研发任务-->
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-check"></i> 已完成的研发任务
                    </span>
                </el-tab-pane>
                <!--新增研发任务-->
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-edit"></i> 新增研发任务
                    </span>
                    <el-row :gutter="10">
                        <!--左侧内容-->
                        <el-col :span="6">
                            <p style="color:#fff;margin-bottom:20px;">任务封面图</p>
                            <img :src="items.taskphotourl" width="250" height="250">
                            <el-upload
                                    class="upload-demo"
                                    action="http://upload.qiniu.com/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    :show-file-list="false">
                                <el-button size="small" type="primary" style="font-size:14px;">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-col>
                        <!--form-->
                        <el-col :span="18">
                            <el-form :model="form" label-width="100px">
                                <el-row :gutter="5">
                                    <el-col :span="12">
                                        <!--任务发起人-->
                                        <el-form-item label="发起人:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <!--任务名称-->
                                        <el-form-item label="任务名称:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <!--任务来源-->
                                        <el-form-item label="任务来源:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <!--参考图-->
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
                                        <!--截止时间-->
                                        <el-form-item label="截止时间:">
                                            <el-date-picker
                                                    v-model="value1"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    style="width:100%">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <!--设计师-->
                                        <el-form-item label="设计师:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <!--裁剪师-->
                                        <el-form-item label="裁剪师:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <!--样衣工-->
                                        <el-form-item label="样衣工:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <!--具体要求-->
                                        <el-form-item label="具体要求">
                                            <el-input type="textarea"
                                              v-model="form.name"
                                              rows="4">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('formAccount')">立即创建</el-button>
                                    <el-button @click="resetForm('formAccount')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!--规划任务分配-->
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-caret-right"></i>
                        规划任务分配
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                items: {
                    taskphotourl: 'http://osyuuevsn.bkt.clouddn.com/FrIFOLlXooN9JCDz-YjW-TKEce5J',
                    taskname: '测试任务',
                    taskdeadline: '2017-12-31',
                },
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
                cur_page: 1,
                page_size: 5,
                total: 0,
                value1:'',
                fileList: [],
                postData: {
                    token: this.userphoto_token,
                },
                dialogFormVisible: false,
            };
        },

        mounted: function () {
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getTableData1();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleAvatarSuccess(res, file) {
                console.log(this.userphotebaseurl + res.key);
                /*if (this.theme_edit.themem_reference == '') {

                    this.theme_edit.themem_reference = this.userphotebaseurl + res.key;
                    this.items.push(this.userphotebaseurl + res.key);
                } else {
                    this.theme_edit.themem_reference = this.theme_edit.themem_reference + ' | ' + this.userphotebaseurl + res.key;
                    this.items.push(this.userphotebaseurl + res.key);
                }*/
            },
            handleError(res) {
                console.log(res)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                    return false;
                }
                return true;
            },
            drawImage(ImgD, iwidth, iheight) {
                //参数(图片,允许的宽度,允许的高度)
                var image = new Image();
                image.src = ImgD.src;
                if (image.width > 0 && image.height > 0) {
                    if (image.width / image.height >= iwidth / iheight) {
                        if (image.width > iwidth) {
                            ImgD.width = iwidth;
                            ImgD.height = (image.height * iwidth) / image.width;
                        } else {
                            ImgD.width = image.width;
                            ImgD.height = image.height;
                        }
                    } else {
                        if (image.height > iheight) {
                            ImgD.height = iheight;
                            ImgD.width = (image.width * iheight) / image.height;
                        } else {
                            ImgD.width = image.width;
                            ImgD.height = image.height;
                        }
                    }
                }
            },

        }
    };
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    .items_pro{
        margin:10px 0;
        color:#fff;
        font-size:16px;
    }
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
    .img_item {
        text-align: center;
        line-height: 500px;
        position:relative;
    }
    .img_item:hover .img_ico{
        display: block;
    }

    .img_item img {
        vertical-align: middle;
    }
    .img_ico{
        top:0;
        left:40%;
        display: none;
        position:absolute;
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>