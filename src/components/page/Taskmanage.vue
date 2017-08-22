<template>
    <div class="win fr" id="win">
        <div class="wm">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i>正在进行中的工作</span>
                    <el-row>
                        <el-col :span="8">
                            <el-form ref="form" :model="form" label-width="120px">
                                <el-form-item label="任务标题：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="执行人：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="任务类型：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="截止时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">

                        </el-col>
                        <el-col :span="8">

                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="已经完成的工作">
                    <el-row>
                        <el-col :span="8">
                            <el-form ref="form" :model="form" label-width="120px">
                                <el-form-item label="任务标题：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="执行人：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="任务类型：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="截止时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">

                        </el-col>
                        <el-col :span="8">

                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="需要修正的工作">
                    <el-row>
                        <el-col :span="8">
                            <el-form ref="form" :model="form" label-width="120px">
                                <el-form-item label="任务标题：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="执行人：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="任务类型：">
                                    <el-input v-model="form.name" disabled="disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="截止时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">

                        </el-col>
                        <el-col :span="8">

                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form:{

                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/ele_public.less';
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
    @import '../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>