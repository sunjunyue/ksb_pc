<template>
    <div class="win fr" id="win">
        <!--主题区域-->
        <div class="wm">
            <div class="wTit">| 月度结余</div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="less">
    @import '../../../assets/css/ele_public.less';
</style>

<style>
    @import '../../../assets/css/behind_cont.css';
    @import 'http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>

<style scoped>
    .win {
        width: calc(100% - 328px);
    }

    .wm {
        width: calc(100% - 100px)
    }

    .el-checkbox__label {
        font-size: 16px;
    }

    .wm .el-input .el-input__inner{
        width:100%
    }

    .el-input__icon {
        right: 4%!important;
    }
    .el-dialog {
        background-color:#324057
    }
    .el-dialog__title{
        color:#ffffff;
    }

</style>