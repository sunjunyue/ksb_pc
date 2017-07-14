<template>
    <div>
        <div id='code'></div>
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>
    import Vue from 'vue'
    import QRCode from 'qrcode'
    Vue.use(QRCode)
    export default{
        data(){
            return {
                codes:'陈子涵'
            }
        },
        methods:{
            useqrcode(){
                var canvas = document.getElementById('canvas')

                QRCode.toCanvas(canvas, this.codes, function (error) {
                    if (error) console.error(error)
                    console.log('success!');
                })
            }
        },
        mounted(){
            this.useqrcode();
            alert(this.codes);
        }
    }
</script>
<style>
    #canvas{width:200px!important;height:200px!important;}
</style>