<template>
    <div class="win fr" id="win">
        <div class="wm">
            <p class="wTit">|&nbsp;&nbsp;主题添加</p>
            <!--款式参考弹出框-->
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
            <!--波段搭配弹出框-->
            <el-dialog
                    title="波段搭配"
                    :visible.sync="dialogFormVisible1"
                    :modal-append-to-body='false'
                    size="small">
                <!--轮播图-->
                <el-carousel arrow="always" height="500px" :autoplay="false">
                    <el-carousel-item v-for="item1 in items1" :key="item1">
                        <div class="img_item">
                            <a href=""><img :src='item1' height="600" width="450"></a>
                            <div class="img_ico">
                                <el-button type="primary" icon="view" :href="item1"></el-button>
                                <el-button type="primary" icon="delete2 "></el-button>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
            <!--元素/风格/工艺版 弹出框-->
            <el-dialog
                    title="元素/风格/工艺版"
                    :visible.sync="dialogFormVisible2"
                    :modal-append-to-body='false'
                    size="small">
                <!--轮播图-->
                <el-carousel arrow="always" height="500px" :autoplay="false">
                    <el-carousel-item v-for="item2 in items2" :key="item1">
                        <div class="img_item">
                            <a href=""><img :src='item2' height="600" width="450"></a>
                            <div class="img_ico">
                                <el-button type="primary" icon="view" :href="item2"></el-button>
                                <el-button type="primary" icon="delete2 "></el-button>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
            <el-form :model="theme_edit" label-width="165px">
                <el-row>
                    <el-col :span="12">
                        <!--主题名称 -->
                        <el-form-item label="主题名称:" required>
                            <el-input v-model="theme_edit.themem_name"></el-input>
                        </el-form-item>
                        <!--创建人-->
                        <el-form-item label="创建人:" required>
                            <el-input v-model="theme_edit.themem_founder"></el-input>
                        </el-form-item>
                        <!--流行主色-->
                        <el-form-item label="流行主色:" required>
                            <el-input v-model="theme_edit.themem_main_color"></el-input>
                        </el-form-item>
                        <!--流行辅色-->
                        <el-form-item label="流行辅色:" required>
                            <el-input v-model="theme_edit.themem_secondary_color"></el-input>
                        </el-form-item>
                        <!--款式参考-->
                        <el-form-item label="款式参考:" required>
                            <el-row>
                                <el-col :span="6">
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
                                    <el-button
                                        size="small"
                                        type="primary"
                                        style="font-size:14px;"
                                        @click="dialogFormVisible = true"
                                        :disabled="uploadreference">
                                        查看款式参考
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--波段搭配-->
                        <el-form-item label="波段搭配:" required>
                            <el-row>
                                <el-col :span="6">
                                    <el-upload class="upload-demo"
                                       action="http://upload.qiniu.com/"
                                       :on-preview="handlePreview1"
                                       :on-remove="handleRemove1"
                                       :on-success="handleAvatarSuccess1"
                                       :on-error="handleError1"
                                       :before-upload="beforeAvatarUpload1"
                                       :data="postData1"
                                       :file-list="fileList1"
                                       :show-file-list="false">
                                        <el-button size="small" type="primary" style="font-size:14px;">点击上传</el-button>
                                    </el-upload>
                                </el-col>
                                <el-col :span="8">
                                    <el-button
                                        size="small"
                                        type="primary"
                                        style="font-size:14px;"
                                        @click="dialogFormVisible1 = true"
                                        :disabled="uploadreference1">
                                        查看波段搭配
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <!--元素/风格/工艺版 -->
                        <el-form-item label="元素/风格/工艺版 :" required>
                            <el-row>
                                <el-col :span="6">
                                    <el-upload class="upload-demo"
                                       action="http://upload.qiniu.com/"
                                       :on-preview="handlePreview2"
                                       :on-remove="handleRemove2"
                                       :on-success="handleAvatarSuccess2"
                                       :on-error="handleError2"
                                       :before-upload="beforeAvatarUpload2"
                                       :data="postData2"
                                       :file-list="fileList2"
                                       :show-file-list="false">
                                        <el-button size="small" type="primary" style="font-size:14px;">点击上传</el-button>
                                    </el-upload>
                                </el-col>
                                <el-col :span="8">
                                    <el-button size="small"
                                               type="primary"
                                               style="font-size:14px;"
                                               @click="dialogFormVisible2 = true"
                                               :disabled="uploadreference2">查看款式参考
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <!--创建人-->
                        <el-form-item label="备注:" required>
                            <el-input type="textarea" v-model="theme_edit.themem_remarks" rows="6"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="wSub">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('theme_edit')">保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                theme_edit: {
                    themem_name: '',
                    themem_founder: '',
                    themem_main_color: '',
                    themem_secondary_color: '',
                    themem_reference: '',
                    themem_band_matching: '',
                    themem_elemental: '',
                    themem_remarks: '',
                    themem_photo:'',
                    themem_photo1:'',
                    themem_photo2:''
                },
                items: [],
                fileList: [],
                postData: {
                    token: this.userphoto_token,
                },
                dialogFormVisible: false,
                items1: [],
                fileList1:[],
                postData1: {
                    token: this.userphoto_token,
                },
                dialogFormVisible1: false,
                items2: [],
                fileList2:[],
                postData2: {
                    token: this.userphoto_token,
                },
                dialogFormVisible2: false,
                uploadreference:true,
                uploadreference1:true,
                uploadreference2:true,
            }
        },
        methods: {
            onSubmit() {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'producttheme/add',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        themem_name: this.theme_edit.themem_name,
                        themem_founder: this.theme_edit.themem_founder,
                        themem_main_color: this.theme_edit.themem_main_color,
                        themem_secondary_color: this.theme_edit.themem_secondary_color,
                        themem_reference: this.theme_edit.themem_reference,
                        themem_band_matching: this.theme_edit.themem_band_matching,
                        themem_elemental: this.theme_edit.themem_elemental,
                        themem_remarks: this.theme_edit.themem_remarks,
                    }
                }).then(function (response) {
                    if (response.data.flag == "producttheme_add_success") {
                        self.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        self.$router.push('/productplan');
                    } else {
                        alert(response.data.flag);
                        self.$message.error("添加失败");
                    }
                }).catch(function (error) {
                    self.$message.error("添加失败" + error);
                });
            },
//            款式参考
            handleRemove(photourl) {
                //console.log(file, fileList);
                for (var t = 0; t <= tpu.length; t++) {
                    if (tpu[t] == photourl.item) {
                        tpu.splice(t,1);
                        break;
                    }
                }
                if (tpu.length == 0) {
                    this.theme_edit.themem_photo = '';
                } else if (tpu.length == 1) {
                    this.theme_edit.themem_photo = tpu[0];
                } else {
                    this.theme_edit.themem_photo = tpu.join('|');
                }
                for (var i = 0; i <= this.items.length; i++) {
                    if (this.items[i] == photourl.item) {
                        this.items.splice(i,1);
                        break;
                    }
                }
                if (this.items.length == 0) {
                    this.dialogFormVisible = false;
                    this.uploadreference = true;
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleAvatarSuccess(res, file) {

                if (this.theme_edit.themem_reference == '') {
                    this.theme_edit.themem_reference = this.userphotebaseurl + res.key;
                    this.items.push(this.userphotebaseurl + res.key);
                    this.uploadreference = false;
                } else {
                    for (var i = 0; i <= this.themem_photo.length; i++) {
                        if (this.themem_photo[i] == this.userphotebaseurl + res.key) {
                            this.$message({
                                message: '请勿上传相同的图片',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    this.theme_edit.themem_reference = this.theme_edit.themem_reference + ' | ' + this.userphotebaseurl + res.key;
                    this.items.push(this.userphotebaseurl + res.key);
                }
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
//            波段搭配
            handleRemove1(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview1(file) {
                console.log(file);
            },
            handleAvatarSuccess1(res, file) {
                if (this.theme_edit.themem_band_matching == '') {
                    this.theme_edit.themem_band_matching = this.userphotebaseurl + res.key;
                    this.items1.push(this.userphotebaseurl + res.key);
                    this.uploadreference1 = false;
                } else {
                    for (var i = 0; i <= this.themem_photo.length1; i++) {
                        if (this.themem_photo1[i] == this.userphotebaseurl + res.key) {
                            this.$message({
                                message: '请勿上传相同的图片',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    this.theme_edit.themem_band_matching = this.theme_edit.themem_band_matching + ' | ' + this.userphotebaseurl + res.key;
                    this.items1.push(this.userphotebaseurl + res.key);
                }
            },
            handleError1(res) {
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
            drawImage1(ImgD, iwidth, iheight) {
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
//            元素/风格/工艺版
            handleRemove2(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview2(file) {
                console.log(file);
            },
            handleAvatarSuccess2(res, file) {
                if (this.theme_edit.themem_elemental == '') {
                    this.theme_edit.themem_elemental = this.userphotebaseurl + res.key;
                    this.items2.push(this.userphotebaseurl + res.key);
                    this.uploadreference2 = false;

                } else {
                    for (var i = 0; i <= this.themem_photo2.length; i++) {
                        if (this.themem_photo2[i] == this.userphotebaseurl + res.key) {
                            this.$message({
                                message: '请勿上传相同的图片',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    this.theme_edit.themem_elemental = this.theme_edit.themem_elemental + ' | ' + this.userphotebaseurl + res.key;
                    this.items2.push(this.userphotebaseurl + res.key);
                }
            },
            handleError2(res) {
                console.log(res)
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
            drawImage2(ImgD, iwidth, iheight) {
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
        },


    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    /*.el-upload-list--picture-card .el-upload-list__item {*/
        /*width: 80px;*/
        /*height: 80px;*/
    /*}*/

    /*.el-upload-list--picture-card .el-upload-list__item-status-label {*/
        /*background: rgba(0, 179, 139, 0.98);*/
    /*}*/

    /*.el-upload--picture-card {*/
        /*width: 80px;*/
        /*height: 80px;*/
        /*line-height: 86px;*/
    /*}*/

    /*.el-carousel__item h1 {*/
        /*color: #475669;*/
        /*font-size: 14px;*/
        /*opacity: 0.75;*/
        /*line-height: 200px;*/
        /*margin: 0;*/
    /*}*/

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
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