<template>
  <div class="addItem" id="addItem">
    <div class="add_top"><i class="icon-remove" @click="remove_add"></i><span @click="subm">发表</span></div>
    <div class="add_content">
      <el-select v-model="addType" placeholder="选择话题" filterable allow-create>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input type="textarea" v-bind:rows="rows" v-model="addContent"></el-input>
    </div>
    <div class="addPhoto">
      <div id="smallimages"  @click="det"></div>
      <div class="addphoto"><input type="file" accept="image/*" capture="camera"  id="inputfile" @change="preImg()" ><i class="el-icon-plus"></i></div>
    </div>
    <div id="blackBg2" v-show="show" @click="close">
    </div>
    <div id="blackBg3" style="display:none;width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: fixed;
    z-index: 100;color: #ffffff;text-align: center;padding-top: 50%;top: 0;font-size: 0.3rem;
">正在提交中...
      <span id="revot" style="color: #009688;display: block;margin: 20px auto;font-size: 0.25rem;border-radius: 5px;border: solid 1px #ffffff;width: 20%;height: 35px;line-height: 35px">取消上传</span>
    </div>

  </div>
</template>

<script>
  function getFileUrl(inputid,i) {
    console.log(document.getElementById(inputid).files[i]);
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
      url = document.getElementById("inputfile").value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
      url = window.URL.createObjectURL(document.getElementById(inputid).files.item(i));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
      url = window.URL.createObjectURL(document.getElementById(inputid).files.item(i));
    }else {
      url = window.webkitURL.createObjectURL(document.getElementById(inputid).files[i]);
    }
    return url;
  }
  var flag=0;
  export default {
    props:{
      userNo:String,
      token:String,
    },
    data() {
      return {
        options: [{
          value: '真情流露',
          label: '真情流露'
        }, {
          value: '文学推荐',
          label: '文学推荐'
        }, {
          value: '工作抒发',
          label: '工作抒发'
        }, {
          value: '活动求约',
          label: '活动求约'
        }, {
          value: '生活烦恼',
          label: '生活烦恼'
        }],
        show:false,
        showImage:false,
        rows:8,
        addType: '',
        addContent:"",
        imgsrcs:[]
      }
    },
    methods:{
      remove_add:function () {
        $("#addItem").animate({height:"0"},"fast")
      },
      det:function (event) {//删除图片
        if(event.target.className=="delete"){
          flag--;
          event.target.parentNode.remove();
          var a=parseInt(event.target.getAttribute("num"));//获取点击删除图标的下标
          console.log(a);
          this.imgsrcs.splice(a-1,1);
          for (var i=0;i<$(".delete").length;i++){//重新赋值下标，可以接着删除
            $(".delete")[i].setAttribute("num",i);
          }
          console.log(this.imgsrcs);
        }else {
          this.showImage=true;
          var file=event.target.src;
          $("#blackBg2").html("<div id='bigImg'><img src='"+file+"'/></div>");
        }
      },
      close:function(){
        this.showImage=false;
      },
      preImg:function(){
        for(var i = 0;i<document.getElementById("inputfile").files.length;i++){
          flag++;
          this.imgsrcs.push(document.getElementById("inputfile").files[i]);//获取表单文件往imgsrcs里加
          var src = getFileUrl("inputfile",i);
          console.log(src);
          $("#smallimages").append("<div class='cream'>"+
            "<img width='19px' height='19px' src='static/images/ic_delete.png' class='delete' @click='det' num='"+flag+"'>"+
            "<img class='smallimg' width='100%' height=100%' src='"+src+"'> </div>");
        }
        console.log(this.imgsrcs);
      },
      subm:function () {

    $("#blackBg3").css("display","block");
        var formData = new FormData();
        for(var k in this.imgsrcs){ //文件数组
          formData.append('pPath',this.imgsrcs[k]);
        }
        formData.append('type',this.addType);
        formData.append('message',this.addContent);
        formData.append('userNo',this.userNo);
        formData.append('token',this.token);
        console.log(this.userNo+this.imgsrcs+this.addContent+this.addType+this.token)
        $.ajax({
          type:"post",
          url:"http://appinter.sunwoda.com/common/LoveTheSkyUser/makeStatement.json",
          data:formData,
          cache: false,
          contentType: false,
          processData:false,
          mimeType:"multipart/form-data",
          success:function(data){
            console.log(data);
            var a=JSON.parse(data)
            $("#blackBg3").css("display","none");

         }});
      }
    },

  }
</script>

<style>
.addItem{
    width: 100%;
    height: 0;
    position: fixed;
    top: 0;
    z-index: 101;
    font-size: 0.3rem;
    background-color: #fff;
    overflow: hidden;
  }
.addItem .add_top{
    width: 100%;
    height: 40px;
    color: #888;

  }
.addItem .add_top span{
    float: right;
    display: inline-block;
    width: 50px;
    height:40px;
    line-height: 40px;
    color: #fda7f7;
  }
.addItem .add_top i{
    display: inline-block;
    width: 50px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
.addItem .add_content{
  border-top: dashed #fda7f7 1px;
 text-align: center;
  border-bottom: dashed #fda7f7 1px;
}
.addItem .add_content .el-select{
  margin-top: 10px;
  width: 80%;
  text-align: center;
}
.addItem .add_content .el-textarea{
  margin-top: 10px;
  width: 80%;
  margin-bottom: 10px;
}
.addphoto{
  margin-top: 10px;
  margin-left: 0.35rem;
  width: 1.6rem;
  height: 1.8rem;
  border-radius: 4px;
  border: dotted #aaa 1px;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.8rem;
  font-weight: 200;
  color: #888888;
  position: relative;
  display: inline-block;
  overflow: hidden;
  text-decoration: none;
  text-indent: 0;
}
.addphoto input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.addphoto:hover {
  text-decoration: none;
}
#smallimages .cream{
  margin-top: 10px;
  float: left;
  margin-left: 0.35rem;
  width: 1.6rem;
  height: 1.8rem;
  border: solid #dddddd 1px;
  border-radius: 4px;
  position: relative;
}
#smallimages .cream .delete{
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
