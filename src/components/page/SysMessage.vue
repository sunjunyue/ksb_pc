<template>
    <div class="win fr" id="win">
        <div class="wm">
            <el-row>
                <el-col :span="8">
                    <!--搜索-->
                    <el-input
                            placeholder="消息管理"
                            icon="search"
                            v-model="input2"
                            :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中..."
                    :data="tableData33"
                    style="width: 100%;margin-top:30px;">
                <!--系统信息id-->
                <el-table-column
                        prop="sm_id"
                        label="系统信息id"
                        min-width="100">
                </el-table-column>
                <!--系统信息标题-->
                <el-table-column
                        prop="sm_title"
                        label="系统信息标题"
                        min-width="200">
                </el-table-column>
                <!--任务id-->
                <el-table-column
                        prop="task_guid"
                        label="任务id"
                        min-width="100">
                </el-table-column>
                <!--系统信息状态-->
                <el-table-column
                        prop="sm_status"
                        label="系统信息状态">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

</script>

<style>

</style>