<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 新增入库单</div>


            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: 'http://192.168.31.243/ksbapi2/api/',
                labelPosition: 'right',

            }
        }
    }
</script>

<style>
    .win{
        width: calc(100% - 328px);
    }
    .wm{
        width: calc(100% - 100px)
    }
    .el-checkbox__label{
        font-size:16px;
    }
    .wm .el-form-item{
        width:100%;
    }
    .el-form-item__content{
        width:100%
    }
    .wm .el-input .el-input__inner{
        width:100%;
    }
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>