<template>
    <div class="win fr" id="win">
        <div class="wm">
            <el-dialog title="研发初稿" :visible.sync="dialogFormVisible">
                <el-carousel arrow="always" height="500px" :autoplay="false">
                    <el-carousel-item v-for="item in items" :key="item1">
                        <div class="img_item">
                            <a href=""><img :src='item' height="600" width="450"></a>
                            <!--<div class="img_ico">-->
                                <!--<el-button type="primary" icon="view" :href="item"></el-button>-->
                                <!--<el-button type="primary" icon="delete2 "></el-button>-->
                            <!--</div>-->
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
            <div class="wTit">| 研发初稿</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="款式初稿:">
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
                        </el-form-item>
                        <el-form-item label="样式备注:">
                            <el-input type="textarea" v-model="form.desc" :rows="7"></el-input>
                        </el-form-item>
                        <div class="wSub">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('formAccount')">立即创建</el-button>
                                <el-button
                                        type="primary"
                                        @click="dialogFormVisible = true"
                                        :disabled="uploadreference">
                                    查看详情
                                </el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            form:{
                style_update:'',
                style_photo:'',
            },
            items: [],
            fileList:[],
            postData: {
                token: this.userphoto_token,
            },
            dialogFormVisible: false,
            uploadreference:true,
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleAvatarSuccess(res, file) {
            if (this.form.style_update == '') {
                this.form.style_update = this.userphotebaseurl + res.key;
                this.items.push(this.userphotebaseurl + res.key);
                this.uploadreference = false;
            } else {
                for (var i = 0; i <= this.style_photo.length1; i++) {
                    if (this.style_photo[i] == this.userphotebaseurl + res.key) {
                        this.$message({
                            message: '请勿上传相同的图片',
                            type: 'warning'
                        });
                        return;
                    }
                }
                this.form.style_update = this.form.style_update + ' | ' + this.userphotebaseurl + res.key;
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
    }
}
</script>

<style>

</style>