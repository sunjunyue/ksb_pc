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
                    <el-carousel-item v-for="item in referencephoto_items" :key="item">
                        <div class="img_item">
                            <a href=""><img :src='item' height="600" width="450"></a>
                            <div class="img_ico">
                                <a :href='item' target="_blank">
                                    <el-button type="primary" icon="view"></el-button>
                                </a>
                                <el-button
                                        type="primary"
                                        icon="delete2"
                                        @click="handleRemove2({item})">
                                </el-button>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
            <el-tabs type="border-card" :value="tab_name" @tab-click="toTab">
                <!-- 进行中的研发任务 -->
                <el-tab-pane name="1">
                    <span slot="label">
                        <i class="fa fa-spinner"></i>
                        进行中的研发任务
                    </span>
                    <div style="margin-bottom:20px;">
                        <el-row :gutter="10">
                            <el-col :span="4">
                                <!--日期选择-->
                                <el-row>
                                    <el-date-picker
                                            v-model="form.dates"
                                            type="daterange"
                                            align="right"
                                            placeholder="请选择日期范围"
                                    >
                                    </el-date-picker>
                                </el-row>
                            </el-col>

                            <el-col :span="4">
                                <!--搜索-->
                                <el-input
                                        placeholder="任务名称"
                                        icon="search">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <el-row :gutter="10">
                        <div v-if="tasking_items[0] != null">
                            <el-col :span="8">
                                <img :src="tasking_items[0].taskphotourl" style="cursor: pointer;" width="300"
                                     height="300" @click="handleCommand('0')">
                                <p class="items_pro">
                                    <i>任务名称：</i>{{tasking_items[0].devtask_name}}
                                </p>
                                <p class="items_pro">
                                    <i>截止时间：</i>{{tasking_items[0].devtask_deadline}}
                                </p>
                                <p class="items_pro">
                                    <i>完成情况：</i>
                                    <el-progress :percentage="tasking_items[0].devtask_progress" :stroke-width="8"
                                                 style="width:300px;margin-top:10px;"></el-progress>
                                </p>
                                <el-button size="small" type="primary" style="font-size:14px;"
                                           @click="handleCommand('0')">查看详情
                                </el-button>
                            </el-col>
                        </div>
                        <el-col :span="8">
                            <div v-if="tasking_items[1] != null">
                                <img :src="tasking_items[1].taskphotourl" style="cursor: pointer;" width="300"
                                     height="300" @click="handleCommand('1')">
                                <p class="items_pro">
                                    <i>任务名称：</i>{{tasking_items[1].devtask_name}}
                                </p>
                                <p class="items_pro">
                                    <i>截止时间：</i>{{tasking_items[1].devtask_deadline}}
                                </p>
                                <p class="items_pro">
                                    <i>完成情况：</i>
                                    <el-progress :percentage="tasking_items[1].devtask_progress" :stroke-width="8"
                                                 style="width:300px;margin-top:10px;"></el-progress>
                                </p>
                                <el-button size="small" type="primary" style="font-size:14px;"
                                           @click="handleCommand('1')">查看详情
                                </el-button>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div v-if="tasking_items[2] != null">
                                <img :src="tasking_items[2].taskphotourl" style="cursor: pointer;" width="300"
                                     height="300" @click="handleCommand('2')">
                                <p class="items_pro">
                                    <i>任务名称：</i>{{tasking_items[2].devtask_name}}
                                </p>
                                <p class="items_pro">
                                    <i>截止时间：</i>{{tasking_items[2].devtask_deadline}}
                                </p>
                                <p class="items_pro">
                                    <i>完成情况：</i>
                                    <el-progress :percentage="tasking_items[2].devtask_progress" :stroke-width="8"
                                                 style="width:300px;margin-top:10px;"></el-progress>
                                </p>
                                <el-button size="small" type="primary" style="font-size:14px;"
                                           @click="handleCommand('2')">查看详情
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <!--page-->
                    <el-pagination
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :pageSize="page_size"
                            :total="total">
                    </el-pagination>
                </el-tab-pane>
                <!--已完成的研发任务-->
                <el-tab-pane name="2">
                    <span slot="label">
                        <i class="fa fa-check"></i> 已完成的研发任务
                    </span>
                </el-tab-pane>
                <!--新增研发任务-->
                <el-tab-pane name="3">
                    <span slot="label">
                        <i class="fa fa-plus"></i> 新增研发任务
                    </span>
                    <el-row :gutter="10">
                        <!--左侧内容-->
                        <el-col :span="6">
                            <p style="color:#fff;margin-bottom:20px;">任务封面图</p>
                            <img :src="task_item.taskphotourl" width="250" height="250">
                            <el-upload class="upload-demo"
                                       action="http://upload.qiniu.com/"
                                       :on-preview="handlePreview1"
                                       :on-remove="handleRemove1"
                                       :on-success="handleAvatarSuccess1"
                                       :on-error="handleError1"
                                       :before-upload="beforeAvatarUpload1"
                                       :data="postData"
                                       :file-list="fileList"
                                       :show-file-list="true" ref="upload01">
                                <el-button size="small" :disabled="uploadbtn1enable" type="primary"
                                           style="font-size:14px;">点击上传
                                </el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                            </el-upload>
                        </el-col>
                        <!--form-->
                        <el-col :span="18">
                            <el-form :model="task_item" label-width="100px">
                                <el-row :gutter="5">
                                    <el-col :span="12">
                                        <!--任务发起人-->
                                        <el-form-item label="发起人:">
                                            <el-input v-model="task_item.devtask_builder" :disabled="true"></el-input>
                                        </el-form-item>
                                        <!--任务名称-->
                                        <el-form-item label="任务名称:">
                                            <el-input v-model="task_item.devtask_name"></el-input>
                                        </el-form-item>
                                        <!--任务来源-->
                                        <el-form-item label="任务来源:">
                                            <el-radio-group v-model="task_item.devtask_source">
                                                <el-radio-button label="自定义任务"></el-radio-button>
                                                <el-radio-button label="产品规划任务"></el-radio-button>
                                            </el-radio-group>
                                        </el-form-item>
                                        <!--参考图-->
                                        <el-form-item label="参考图:">
                                            <el-row>
                                                <el-col :span="8">
                                                    <el-upload class="upload-demo"
                                                               action="http://upload.qiniu.com/"
                                                               :on-preview="handlePreview2"
                                                               :on-remove="handleRemove2"
                                                               :on-success="handleAvatarSuccess2"
                                                               :on-error="handleError2"
                                                               :before-upload="beforeAvatarUpload2"
                                                               :data="postData"
                                                               :file-list="fileList2"
                                                               :show-file-list="false" ref="upload02">
                                                        <el-button size="small"
                                                                   type="primary"
                                                                   style="font-size:14px;">
                                                            点击上传
                                                        </el-button>
                                                    </el-upload>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-button
                                                            size="small"
                                                            type="primary"
                                                            style="font-size:14px;"
                                                            @click="dialogFormVisible = true"
                                                            :disabled="uploadbtn2enable">
                                                        查看参考图
                                                    </el-button>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <!--截止时间-->
                                        <el-form-item label="截止时间:">
                                            <el-date-picker
                                                    v-model="task_item.devtask_deadline"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    @change="dateChange"
                                                    style="width:100%">
                                            </el-date-picker>
                                        </el-form-item>
                                        <!--设计师-->
                                        <el-form-item label="设计师:">
                                            <el-select v-model="task_item.devtask_designerid" placeholder="请选择"
                                                       style="width:100%">
                                                <el-option
                                                        v-for="item in designeroptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <!--制版师-->
                                        <el-form-item label="制版师:">
                                            <el-select v-model="task_item.devtask_patternmakerid" placeholder="请选择"
                                                       style="width:100%">
                                                <el-option
                                                        v-for="item in patternmakeroptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--裁剪师-->
                                        <el-form-item label="裁剪师:">
                                            <el-select v-model="task_item.devtask_cutterid" placeholder="请选择"
                                                       style="width:100%">
                                                <el-option
                                                        v-for="item in cutteroptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--样衣工-->
                                        <el-form-item label="样衣工:">
                                            <el-select v-model="task_item.devtask_yygid" placeholder="请选择"
                                                       style="width:100%">
                                                <el-option
                                                        v-for="item in yygoptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--样衣审核-->
                                        <el-form-item label="样衣审核:">
                                            <el-select v-model="task_item.devtask_yysh" placeholder="请选择"
                                                       style="width:100%">
                                                <el-option
                                                        v-for="item in yyshoptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--具体要求-->
                                        <el-form-item label="具体要求">
                                            <el-input type="textarea"
                                                      v-model="task_item.devtask_text"
                                                      :rows="3">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item>
                                    <el-button type="primary" @click="submitItems()">立即创建</el-button>
                                    <el-button @click="resetForm()">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!--规划任务分配-->
                <el-tab-pane name="4">
                    <span slot="label">
                        <i class="fa fa-tasks"></i>
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
                tab_name: '1',
                designeroptions: [],
                cutteroptions: [],
                patternmakeroptions: [],
                yygoptions: [],
                items: {},
                tasking_items: [],
                cur_page: 1,
                page_size: 3,
                total: 0,
                task_item: {
                    taskphotourl: 'http://192.168.1.6/ksbapi2/public/img/WechatIMG138.jpeg',
                    devtask_name: '',
                    devtask_builder: '',
                    devtask_builderid: '',
                    devtask_source: '自定义任务',
                    devtask_referencephoto: '',
                    devtask_deadline: '',
                    devtask_designer: '',
                    devtask_designerid: '',
                    devtask_patternmaker: '',
                    devtask_patternmakerid: '',
                    devtask_cutter: '',
                    devtask_cutterid: '',
                    devtask_yyg: '',
                    devtask_yygid: '',
                    devtask_yysh:'',
                    devtask_text: '',
                },
                referencephoto_items: [],
                fileList2: [],

                fileList1: [],
                uploadbtn1enable: false,
                uploadbtn2enable: true,
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

                value1: '',
                fileList: [],
                postData: {
                    token: this.userphoto_token,
                },
                dialogFormVisible: false,
            };
        },

        mounted: function () {
            this.task_item.devtask_builder = JSON.parse(localStorage.getItem('ksb_user')).data.name;
            this.task_item.devtask_builderid = JSON.parse(localStorage.getItem('ksb_user')).data.id;
            this.task_item.taskphotourl = this.apiurl3 + 'img/WechatIMG138.jpeg';
            this.getoptionsbyroleid(2);
            this.getoptionsbyroleid(3);
            this.getoptionsbyroleid(4);
            this.getoptionsbyroleid(5);
            this.getoptionsbyroleid(6);
            this.gettasking_items();
        },
        methods: {
            gettasking_items() {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'devtask/getdevtasklist',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        flag: 1,
                    }
                }).then(function (response) {
                    if (response.data.flag == 'get_devtask_list_success') {
                        self.tasking_items = response.data.data.devtask;
                        for (var o in self.tasking_items) {
                            self.tasking_items[o].devtask_progress = parseFloat(self.tasking_items[o].devtask_progress);
                            self.tasking_items[o].devtask_deadline = self.tasking_items[o].devtask_deadline.substr(0, 10);
                        }
                        self.total = response.data.data.devtask_count;
                    }
                }).catch(function (error) {

                });
            },
            getoptionsbyroleid (roleid) {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'user/getuserlistbyroleid',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        role_id: roleid,
                    }
                }).then(function (response) {
                    if (response.data.flag == 'get_userlist_by_roleid_success') {
                        if (roleid == 2) {
                            self.designeroptions = eval(response.data.data.users);
                        } else if (roleid == 3) {
                            self.cutteroptions = eval(response.data.data.users);
                        } else if (roleid == 4) {
                            self.patternmakeroptions = eval(response.data.data.users);
                        } else if (roleid == 5) {
                            self.yygoptions = eval(response.data.data.users);
                        }else if (roleid == 6) {
                            self.yyshoptions = eval(response.data.data.users);
                        }
                    } else {

                    }
                }).catch(function (error) {
                    conosle.log(error);
                })
            },
            dateChange (val) {
                this.task_item.devtask_deadline = val;
            },
            submitItems () {
                /*console.log(this.task_item.taskphotourl);
                 console.log(this.task_item.devtask_builder);
                 console.log(this.task_item.devtask_builderid);
                 console.log(this.task_item.devtask_name);
                 console.log(this.task_item.devtask_source);
                 console.log(this.task_item.devtask_referencephoto);
                 console.log(this.task_item.devtask_deadline);
                 console.log(this.task_item.devtask_designer);
                 console.log(this.task_item.devtask_designerid);
                 console.log(this.task_item.devtask_patternmaker);
                 console.log(this.task_item.devtask_patternmakerid);
                 console.log(this.task_item.devtask_cutter);
                 console.log(this.task_item.devtask_cutterid);
                 console.log(this.task_item.devtask_yyg);
                 console.log(this.task_item.devtask_yygid);
                 console.log(this.task_item.devtask_text);*/
                const self = this;
                self.$ajax({
                    method: 'post',
                    url: this.apiurl + 'devtask/createdevtask',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        taskphotourl: this.task_item.taskphotourl,
                        devtask_builderid: this.task_item.devtask_builderid,
                        devtask_name: this.task_item.devtask_name,
                        devtask_source: this.task_item.devtask_source,
                        devtask_referencephoto: this.task_item.devtask_referencephoto,
                        devtask_deadline: this.task_item.devtask_deadline,
                        devtask_designerid: this.task_item.devtask_designerid,
                        devtask_patternmakerid: this.task_item.devtask_patternmakerid,
                        devtask_cutterid: this.task_item.devtask_cutterid,
                        devtask_yygid: this.task_item.devtask_yygid,
                        devtask_yysh: this.task_item.devtask_yysh,
                        devtask_text: this.task_item.devtask_text,
                    }
                }).then(function (response) {
                    //alert(response.data.flag);
                    if (response.data.flag == "create_devtask_success") {
                        self.$message({
                            message: '新增任务成功',
                            type: 'success'
                        });
                        self.resetForm();
                        self.tab_name = "1";
                        self.gettasking_items();
                    } else {
                        self.$message.error("新增任务失败");
                        console.log(response.data.flag + "||" + response.data.message);
                    }
                }).catch(function (error) {
                    self.$message.error("新增任务失败" + error);
                })
            },
            toTab(target) {
                //console.log(target.name);
                this.tab_name = target.name;
            },
            resetForm() {
                this.task_item.taskphotourl = '';
                this.task_item.devtask_name = '';
                //this.task_item.devtask_builder = '';
                this.task_item.devtask_builderid = '';
                this.task_item.devtask_source = '自定义任务';
                this.task_item.devtask_referencephoto = '';
                this.task_item.devtask_deadline = '';
                this.task_item.devtask_designer = '';
                this.task_item.devtask_designerid = '';
                this.task_item.devtask_patternmaker = '';
                this.task_item.devtask_patternmakerid = '';
                this.task_item.devtask_cutter = '';
                this.task_item.devtask_cutterid = '';
                this.task_item.devtask_yyg = '';
                this.task_item.devtask_yygid = '';
                this.task_item.devtask_yyshs = '';
                this.task_item.devtask_text = '';
                this.$refs.upload01.clearFiles();
                this.$refs.upload02.clearFiles();
                this.dialogFormVisible = false;
                this.referencephoto_items = [];
                this.uploadbtn2enable = true;
                this.uploadbtn1enable = false;
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.gettasking_items();
            },
            handleRemove1(file, fileList) {
                this.task_item.taskphotourl = '';
                this.uploadbtn1enable = false;
            },
            handleRemove2(photourl) {
                //alert(photourl.item);
                var tpu = this.task_item.devtask_referencephoto.split('|');
                for (var t = 0; t <= tpu.length; t++) {
                    if (tpu[t] == photourl.item) {
                        tpu.splice(t, 1);
                        break;
                    }
                }
                if (tpu.length == 0) {
                    this.task_item.devtask_referencephoto = '';
                } else if (tpu.length == 1) {
                    this.task_item.devtask_referencephoto = tpu[0];
                } else {
                    this.task_item.devtask_referencephoto = tpu.join('|');
                }
                //alert(this.task_item.devtask_referencephoto);
                for (var i = 0; i <= this.referencephoto_items.length; i++) {
                    if (this.referencephoto_items[i] == photourl.item) {
                        this.referencephoto_items.splice(i, 1);
                        break;
                    }
                }
                if (this.referencephoto_items.length == 0) {
                    this.dialogFormVisible = false;
                    this.uploadbtn2enable = true;
                }
            },
            handlePreview1(file) {
                console.log(file);
            },
            handlePreview2(file) {
                console.log(file);
            },
            // 任务封面图片上传成功
            handleAvatarSuccess1(res, file) {
                console.log(this.userphotebaseurl + res.key);
                this.task_item.taskphotourl = this.userphotebaseurl + res.key;
                this.uploadbtn1enable = true;
                /*if (this.theme_edit.themem_reference == '') {

                 this.theme_edit.themem_reference = this.userphotebaseurl + res.key;
                 this.items.push(this.userphotebaseurl + res.key);
                 } else {
                 this.theme_edit.themem_reference = this.theme_edit.themem_reference + ' | ' + this.userphotebaseurl + res.key;
                 this.items.push(this.userphotebaseurl + res.key);
                 }*/
            },
            handleAvatarSuccess2(res, file) {
                if (this.task_item.devtask_referencephoto == '') {
                    this.task_item.devtask_referencephoto = this.userphotebaseurl + res.key;
                    this.referencephoto_items.push(this.userphotebaseurl + res.key);
                    this.uploadbtn2enable = false;
                } else {
                    for (var i = 0; i <= this.referencephoto_items.length; i++) {
                        if (this.referencephoto_items[i] == this.userphotebaseurl + res.key) {
                            this.$message({
                                message: '请勿上传相同的图片',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    this.task_item.devtask_referencephoto = this.task_item.devtask_referencephoto + '|' + this.userphotebaseurl + res.key;
                    this.referencephoto_items.push(this.userphotebaseurl + res.key);
                }
                console.log(this.task_item.devtask_referencephoto);
            },
            handleError1(res) {
                console.log(res)
            },
            handleError2(res) {
                console.log(res)
            },
            beforeAvatarUpload1(file) {
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
            beforeAvatarUpload2(file) {
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
            handleCommand(index){
                const self = this;
                localStorage.setItem('ksb_ctaskguid', this.tasking_items[index].guid);
                self.$router.push('/taskdetail');
            },
        }
    };
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    .items_pro {
        margin: 10px 0;
        color: #fff;
        font-size: 16px;
    }

    .el-card {
        border: none;
        background: none;
    }

    .el-tabs__content {
        margin-top: 0;
    }

    /*.el-tabs__item.is-active {*/
    /*color: rgba(0, 179, 139, 0.98);*/
    /*}*/

    /*.el-tabs__item:hover {*/
    /*color: rgba(0, 179, 139, 0.98);*/
    /*}*/

    .el-tabs--border-card {
        background: none;
        border: none;
    }

    .el-tabs--border-card > .el-tabs__content {
        padding: 30px 15px;
    }

    .el-popover, .el-tabs--border-card {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .62), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

    .img_item {
        text-align: center;
        line-height: 500px;
        position: relative;
    }

    .img_item:hover .img_ico {
        display: block;
    }

    .img_item img {
        vertical-align: middle;
    }

    .img_ico {
        top: 0;
        left: 40%;
        display: none;
        position: absolute;
    }

    .el-progress__text {
        color: #fff;
    }

    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>