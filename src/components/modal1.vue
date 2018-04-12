<template>
    <!--弹出的模态框start-->
    <div id="modal_box" v-show="modelTogg">
        <div class="img_box">
                <div class="img_contain" v-show="transTogg" >
                    <img :src="imgSrc" alt=""  :style="{ transform: scale  }"   v-drag="{dragOutX:40,dragOutY:40}">
                </div>

                <div class="img_contain" v-show="!transTogg" >
                    <img :src="imgSrc" alt=""  :style="{ transform: rotate}"   >
                </div>
            <div class="close" @click="closeModal"></div>
            <div class="left" @click="upperPage"></div>
            <div class="right" @click="nextPage"></div>
            <div class="bottom_box">
                <span><img src="../assets/big.png" alt="" @click="bigImg()"></span>
                <span><img src="../assets/turn.png" alt="" @click="turnImg()"></span>
                <span><img src="../assets/small.png" alt="" @click="smallImg()"></span>
                <span><a href="" id="downLoad" @click="downLoadImg(imgSrc)"><img src="../assets/download.png" alt="" ></a></span>
            </div>
        </div>
    </div>
    <!--弹出的模态框end-->
</template>
<script>
    import vueDragDrag from 'vue-dragdrag'
    export default{
        name:"modal",
        props:['modelTogg','imgSrc','files'],
        data(){
            return{
                scaleTimes:0,
                scale:'scale(1)',
                rotateTime:0,
                rotate:'rotate(0deg)',
                transTogg:false,
            }
        },
        computed:{

        },
        methods:{
            closeModal(){
                this.scaleTimes=0;
                this.scale="scale(1)";
                this.rotateTime=0;
                this. rotate='rotate(0deg)';
                this.$emit('closeModal');
            },
            chooseRotate(){
                switch(this.rotateTime)
                {
                    case 0:
                        this.rotate='rotate(0deg)';
                        break;
                    case 1:
                        this.rotate='rotate(90deg)';
                        break;
                    case 2:
                        this.rotate='rotate(180deg)';
                        break;
                    case 3:
                        this.rotate='rotate(270deg)';
                        break;
                    default:
                }
            },
            chooseScale(){
                switch(this.scaleTimes)
                {
                    case 0:
                        this.scale="scale(1)";
                        break;
                    case 1:
                        this.scale="scale(2)";
                        break;
                    case 2:
                        this.scale="scale(4)";
                        break;
                    case 3:
                        this.scale="scale(6)";
                        break;
                    case 4:
                        this.scale="scale(1)";
                        break;
                    default:
                }
            },
            bigImg(){
                this.transTogg=true;
                if(this.scaleTimes>=3){
                    this.scaleTimes=3;
                    this.$message({
                        message: "图片已放大到最大，无法再放大",
                        type: 'error'
                    })
                }else{
                    this.scaleTimes++;
                }
                console.log('this.scaleTimes',this.scaleTimes);
                this.chooseScale();
            },
            smallImg(){
                this.transTogg=true;
                if(this.scaleTimes<1){
                    this.scaleTimes=0;
                    this.$message({
                        message: "图片已缩小到最小，无法再次缩小",
                        type: 'error'
                    })
                }else{
                    this.scaleTimes--;
                }
                console.log('this.scaleTimes',this.scaleTimes);
                this.chooseScale();
            },
            // 旋转图片
            turnImg(){
                this.transTogg=false;
                this.rotateTime++;
                if( this.rotateTime>=4){
                    this.rotateTime=0;
                }
                console.log(this.rotateTime);
                this.chooseRotate();
            },
            // 下载图片
            downLoadImg(src){
                var odownLoad=document.getElementById("downLoad");
                console.log(src)
                this.myBrowser();
                if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                    //IE
                    odownLoad.href="#";
                    var oImg=document.createElement("img");
                    oImg.src=src;
                    oImg.id="downImg";
                    var odown=document.getElementById("down");
                    odown.appendChild(oImg);
                    this.SaveAs5(document.getElementById('downImg').src)
                }else{
                    //!IE
                    odownLoad.href=src;
                    odownLoad.download="";
                }

            },
            //判断浏览器类型
            myBrowser(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (isOpera) {
                    return "Opera"
                }; //判断是否Opera浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    return "FF";
                } //判断是否Firefox浏览器
                if (userAgent.indexOf("Chrome") > -1){
                    return "Chrome";
                }
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    return "IE";
                }; //判断是否IE浏览器
                if (userAgent.indexOf("Trident") > -1) {
                    return "Edge";
                } //判断是否Edge浏览器
            },
            SaveAs5(imgURL) {
                var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
                for(; oPop.document.readyState != "complete"; )
                {
                    if (oPop.document.readyState == "complete")break;
                }
                oPop.document.execCommand("SaveAs");
                oPop.close();
            },
            getdata (evt) {
                console.log(evt.draggedContext.element.id)
            },
            datadragEnd (evt) {
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)

            },
            upperPage(){
                this.$emit('upperPage',this.files);
            },
            nextPage(){
                console.log(this.files);
                this.$emit('nextPage',this.files);
            }
        },
        components:{

        },
        mounted:function(){
            console.log(this.files);
        }

    }
</script>
<style scoped lang="scss">
    #modal_box{
        position: fixed;
        left: 50%;
        width:768px;
        height:525px;
        background: #ffffff;
        margin-left: -384px;
        border: 1px solid #bbbbbb;
        top:50%;
        margin-top:-300px;
        z-index:1001;
        .img_box{
            background: #e5e5e5;
            position: relative;
            width:634px;
            height: 440px;
            margin: 30px auto;
            .close{
                position: absolute;
                width: 30px;
                height:30px;
                background: url("../assets/close.png");
                background-size: 100%;
                right: -60px;
                top:-25px;
            }
            .left,.right{
                position: absolute;
                top: 200px;
                width: 40px;
                height:40px;
            }
            .left{
                background: url("../assets/left.png");
                background-size: 100%;
                left: -60px;
            }
            .right{
                background: url("../assets/right.png");
                background-size: 100%;
                right: -60px;
            }
            .img_contain{
                width: 634px;
                height:440px;
                overflow: hidden;
                position: relative;
                background:#e5e5e5;
                text-align:center;
                img{
                    height: 440px;
                }
            }
            .bottom_box{
                width: 200px;
                height:40px;
                position: absolute;
                bottom: -60px;
                margin-left: -100px;
                display:flex;
                justify-content:space-around;
                left: 50%;
                img{
                    width: 20px;
                    height:20px;
                }
            }
        }
        img#downImg{
            display: none;
        }
    }
</style>