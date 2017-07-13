<template>
    <!--主题区域-->
    <div class="win fr" id="win">
        <div class="wm">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="商品主题" name="theme">
                    <!--button-->
                    <div class="wBtn">
                        <el-button type="primary" icon="plus" @click="handleCommand('addprothe')">添加商品主题</el-button>
                    </div>
                    <el-table
                            :data="tableData1"
                            style="width: 100%">
                        <el-table-column
                                prop="themem_id"
                                label="主题编号"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="themem_name"
                                label="主题名称"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="themem_founder"
                                label="创建人"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="themem_main_color"
                                label="流行主色"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="themem_secondary_color"
                                label="流行辅色"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="temem_status"
                                label="状态">
                            <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.$index,scope.row)"></el-button>
                            <el-button type="primary" icon="view" size="small"></el-button>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="商品波段" name="second">商品波段</el-tab-pane>
                <el-tab-pane label="商品品类" name="third">商品品类</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData1: [],
                cur_page: 1,
                page_size: 10,
                total: 0,
                loading: false,
                activeName2: 'theme'
            };
        },
        mounted: function () {
            this.tableData();
        },
        methods: {
            handleCommand(command) {
                if (command == 'addprothe'){
                    this.$router.push('addtheme');
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            tableData () {
                const self = this;
                this.$ajax({
                    method: 'post',
                    url: self.apiurl + 'rmc/getrmcjson',
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
            tableData1 () {
                const self = this;
                self.loading = true;
                this.$ajax({
                    method: 'post',
                    url: this.apiurl + 'producttheme/index',
                    params: {
                        token: JSON.parse(localStorage.getItem('ksb_user')).data.token
                    },
                    data: {
                        curr_page: self.cur_page,
                        page_size: self.page_size,
                    }
                }).then(function (response) {
                    self.tableData = response.data.data.depos;
                    for (var o in self.tableData) {
                        //alert(self.tableData33[o].indate.substr(0,10));
                        self.tableData[o].indate = self.tableData[o].indate.substr(0,10);
                        self.tableData[o].pricestr = self.$formatCurrency(self.tableData33[o].price, 2);
                        self.tableData[o].zpricestr = self.$formatCurrency(self.tableData33[o].zprice, 2);
                    }
                    self.total = response.data.data.depos_count;
                    self.loading = false;
                }).catch(function (error) {
                    alert(error);
                    self.loading = false;
                })
            },
        },

    };
</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    .el-tabs__item.is-active{
        color:rgba(0, 179, 139, 0.98);
    }
    .el-tabs__item:hover{
        color:rgba(0, 179, 139, 0.98);
    }
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>