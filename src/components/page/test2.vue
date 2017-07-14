<template>
    <div>
        <vue-qr :bgSrc='src' :logoSrc="src2" text="Hello world!" height="200" width="200"></vue-qr>
    </div>
</template>
<script>
    import VueQr from 'vue-qr'
    this.use(VueQr);
    export default{
        data(){
            return {
                codes:'陈子涵'
            }
        },

        methods:{

        },

    }
</script>
<style>
</style>