<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 分类管理</div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input
                            placeholder="输入分类名称进行过滤"
                            v-model="filterText">
                    </el-input>

                    <el-tree
                            class="filter-tree"
                            :data="data2"
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                            ref="tree2">
                    </el-tree>
                </el-col>
                <el-col :span="18">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="新增分类" name="add">
                            <el-form :label-position="labelPosition" :model="formdata2" label-width="140px">
                                <!--分类名称 -->
                                <el-form-item label="分类名称:" required>
                                    <el-row>
                                        <el-col :span="21">
                                            <el-input v-model="formdata2.name"></el-input>
                                        </el-col>
                                        <el-col :span="2" :push="1">
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <!--分类显示名称 -->
                                <el-form-item label="分类显示名称:" required>
                                    <el-row>
                                        <el-col :span="21">
                                            <el-input v-model="formdata2.displayname"></el-input>
                                        </el-col>
                                        <el-col :span="2" :push="1">
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <!--分类层级 -->
                                <el-form-item label="分类层级:" required>
                                    <el-row>
                                        <el-col :span="21">
                                            <el-select v-model="formdata2.level" placeholder="请选择分类层级"
                                                       @change="levelchange">
                                                <el-option
                                                        v-for="item in leveloptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                        :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="2" :push="1">
                                            <el-button type="primary" class="fa fa-question-circle fa-lg"
                                                       @click="openHelp"></el-button>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <!--分类父级 -->
                                <el-form-item label="分类父级:" required>
                                    <el-row>
                                        <el-col :span="21">
                                            <el-select v-model="formdata2.parentid" placeholder="请选择分类父级">
                                                <el-option-group
                                                        v-for="group in parentoptions"
                                                        :key="group.label"
                                                        :label="group.label">
                                                    <el-option
                                                            v-for="item in group.children"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-option-group>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="2" :push="1">
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <!--分类描述 -->
                                <el-form-item label="分类描述:" required>
                                    <el-row>
                                        <el-col :span="21">
                                            <el-input type="textarea" v-model="formdata2.description" rows="3"
                                                      style="width:75%;"></el-input>
                                        </el-col>
                                        <el-col :span="2" :push="1">
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <div class="wSub" style="margin-top:-10px">
                                    <el-form-item>
                                        <el-button type="primary" @click="submitformdata2">保存</el-button>
                                        <el-button>取消</el-button>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="编辑分类" name="edit">编辑分类</el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        mounted: function () {
            this.getData2();
            this.getleveloptions();
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            openHelp () {
                this.$notify({
                    title: '新增分类操作帮助',
                    message: '',
                    duration: 0,
                })
            },
            getData2 () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.url + 'rmc/getrmcjson',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                }).then(function (response) {
                    if (response.data.flag == 'get_raw_meterial_category_json_success') {
                        self.data2 = eval(response.data.data);
                    } else {

                    }
                }).catch(function (error) {
                    conosle.log(error);
                })
            },
            getleveloptions () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.url + 'rmc/getleveloptions',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                }).then(function (response) {
                    if (response.data.flag == 'get_leveloptions_success') {
                        //alert(response.data.data);
                        self.leveloptions = eval(response.data.data);
                    } else {

                    }
                }).catch(function (error) {
                    conosle.log(error);
                })
            },
            getparentoptions () {
                if (this.formdata2.level != 1) {
                    const self = this;
                    this.$ajax({
                        method: 'post',
                        url: self.url + 'rmc/getplevel',
                        params: {
                            token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                        },
                        data: {
                            level: this.formdata2.level,
                        }
                    }).then(function (response) {
                        if (response.data.flag == 'get_parentids_by_level_success') {
                            self.parentoptions = eval(response.data.data);
                        } else {

                        }
                    }).catch(function (error) {
                        conosle.log(error);
                    })
                } else {
                    this.parentoptions = [{label:"顶级分类",children:[{value:-1,label:"面辅料分类"}]}]
                }
            },
            levelchange () {
                //alert(123);
                //alert(this.formdata2.level);
                this.getparentoptions();
                this.formdata2.parentid = '';
            },
            submitformdata2() {
                //alert(this.formdata2.name + '|'+ this.formdata2.displayname+'|'+this.formdata2.level+'|'+this.formdata2.parentid+'|'+this.formdata2.description);
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.url + 'rmc/addrmc',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        name: this.formdata2.name,
                        displayname: this.formdata2.displayname,
                        level: this.formdata2.level,
                        parentid: this.formdata2.parentid,
                        description: this.formdata2.description,
                    }
                }).then(function (response) {
                    if (response.data.flag == 'add_raw_meterial_category_success') {
                        self.$message({
                            message: '新增面辅料分类成功',
                            type: 'success'
                        });
                        this.getData2();
                    } else {

                    }
                }).catch(function (error) {
                    conosle.log(error);
                })
            }
        },

        data() {
            return {
                url: 'http://192.168.31.243/ksbapi2/api/',
                labelPosition: 'right',
                formdata2: {
                    name: '',
                    displayname: '',
                    level: '',
                    parentid: '',
                    description: '',
                },
                filterText: '',
                data2: [],
                leveloptions: [],
                parentoptions: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                activeName: 'add'
            };
        }
    };
</script>

<style>
    .sort {
        width: 160px;
    }

    .wm .el-input .el-input__inner {
        width: 100%;
    }

    .wm .el-form-item {
        width: 65%;
    }

    .el-select {
        display: block;
    }

    .el-input__icon {
        right: 2%;
    }

    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>