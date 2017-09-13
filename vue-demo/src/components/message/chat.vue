<template>
  <div id="messageContent">
    <div class="title">
      <i class="icon-angle-left item" @click="closeSend"></i>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item">{{name}}</div>
      <div class="item"></div>
      <div class="item"></div>
      <i class="icon-user item"></i>
    </div>
    <div class="lt_zong">
      <p class="lt_df lt_df1" v-if="admin">
        <span class="img"><img src="../../assets/message.png"></span>
        <span class="lt_sjx"></span>
        <span class="lt_zi lt_zi3">欢迎来到缘分天空</span>
      </p>
    </div>
    <div class="lt_bottom">
      <form>
        <input type="text" value="" class="lt_inp"/>
        <!--<p class="lt_mask"></p>-->
        <span @click="doSendfunction">提交</span>
      </form>
    </div>
  </div>
</template>
<script>
  export default{
    props:{
      myMessage:Object,
      websocket:WebSocket,
    },
    data: function() {
      return {
        tolkTo:"",
        name:"",
        fPhoto:'',
//        websocket:null,
        admin:false
      }
    },
    mounted: function(){

      console.log(this.$route.query);
      this.name=this.$route.query.fName;
      this.tolkTo=this.$route.query.fNo;
      this.fPhoto=this.$route.query.fPhoto;
      this.websocket.onmessage =this.onMessage;
    },
    methods:{
      closeSend:function () {
        console.log("Aaa");
        this.$router.go(-1);
      },
      onOpen: function(openEvt) {
        console.log(openEvt);
      },
      onMessage:function (evt) {
        var vm = this;
        if(evt.data!="连接成功"){
          var mes=JSON.parse(evt.data);
          if(mes["userNo"]==this.tolkTo && mes["status"]==1){
            var a = mes["msg"];
            if(a.length>16){
              var str= "<p class='lt_df lt_df1'>" +
                "<span class='img'><img src='http://appinter.sunwoda.com"+vm.fPhoto+"'></span>" +
                "<span class='lt_sjx'></span>" +
                "<span class='lt_zi  lt_zi3'>"+a+"</span>" +
                "</p>"
            }else {
              var str = "<p class='lt_df'>" +
                "<span class='img'><img src='http://appinter.sunwoda.com"+vm.fPhoto+"'></span>" +
                "<span class='lt_sjx'></span>" +
                "<span class='lt_zi'>"+a+"</span>" +
                "</p>"
            }
            $('.lt_zong').append(str);
          }



        }
        console.log(evt.data);
      },
      onError:function()  {},
      onClose:function() {},
      doSendfunction () {
        var vm =this;
        if($('.lt_inp').val()!=''){
          if (vm.websocket.readyState == (vm.websocket.OPEN==undefined?1:vm.websocket.OPEN)) {
            var socketMsg={
              status:"1",
              userNo:this.tolkTo,//要发送消息的用户的userId,ALL为发送给所有人
              msg:$('.lt_inp').val()
            }
            vm.websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
            if ($('.lt_inp').val().length>=16) {
              var str='' +
                '<p class="lt_df lt_df1 lt_rig"><span class="img2">' +
                '<img src="http://appinter.sunwoda.com'+vm.myMessage.photo+' width="40" height="42"></span>' +
                '<span class="lt_sjx lt_sjx1"></span>' +
                '<span class="lt_zi lt_zi3 lt_zi1">'+$('.lt_inp').val()+'</span></p>';
              $('.lt_zong').append(str);
              $('.lt_inp').val('');
            } else{
              var str='<p class="lt_df  lt_rig">' +
                '<span class="img2"><img src="http://appinter.sunwoda.com'+vm.myMessage.photo+'width="40" height="42">' +
                '</span><span class="lt_sjx lt_sjx1">' +
                '</span><span class="lt_zi  lt_zi1">'+$('.lt_inp').val()+'</span></p>';
              $('.lt_zong').append(str);
              $('.lt_inp').val('');
            }
          } else {
            alert("连接失败!");
          }
        }

      },
    },
    destroyed: function () {
      console.log("关闭");
    }

  }
</script>
<style>
  #messageContent{
    position: absolute;
    top: 0;
     z-index: 9999;
    width: 100%;
    font-size: 0.3rem;
    height: 100%;
    background: #e4e8f1 ;
  }
  #messageContent .title{
    display: flex;
    height: 5%;
    width: 100%;
    align-items: center;
    border-bottom: solid #eeeeee 1px;
    color: #555;
    background: #ffffff;
    justify-content: center;
  }
  #messageContent .title:first-child{
   text-align: left;
  }
  #messageContent .title:last-child{
   text-align: right;
  }
  #messageContent .title .item{
    display: inline-block;
    text-align: center;
    flex: 1;
  }
  .lt_con{
    margin-top: 0.72rem;
    height:8.6rem;
  }
  .lt_zong{
    padding: 0 0.17rem 0 0.24rem;
    height:85%;
    overflow: scroll;
    background: #e4e8f1;
  }
  .lt_zong>p{
    position: relative;
    clear: both;
  }
  .lt_df{
    padding: 0.23rem 0.19rem 0.13rem 0.55rem;
    height: 0.72rem ;

  }
  .lt_df .img{
    position: absolute;
    top:0.14rem;
    left: 0;
  }
  .lt_df img{
    width: 0.8rem;
    height: 0.84rem;
  }
  .lt_rig{
    padding: 0.23rem 0.55rem 0.13rem 0.19rem;
    /*background:url(../images/ss1.png) right top no-repeat;*/
    background-size: 0.72rem 0.73rem;
  }
  .lt_rig .img2{
    position: absolute;
    top:0.14rem;
    right: 0;
  }
  .lt_zong .lt_rig .lt_df img{
    width: 0.8rem;
    height: 0.84rem;
  }
  .lt_sjx{
    border-top: 0.2rem solid transparent;
    border-left: 0.2rem solid transparent;
    border-bottom: 0.2rem solid transparent;
    border-right: 0.2rem solid #fff;
    float: left;
    margin-top: 0.13rem;
  }
  .lt_sjx1{
    float: right;
    border-top: 0.2rem solid transparent;
    border-right: 0.2rem solid transparent;
    border-bottom: 0.2rem solid transparent;
    border-left: 0.2rem solid #fff;
  }

  .lt_zi{
    float: left;
    padding: 0.23rem 0.19rem 0.13rem 0.23rem;
    font-size: 0.24rem;
    color: #666;
    background: #fff;
    border-radius: 0.1rem;
  }
  .lt_zi1{
    float: right;
  }
  .lt_zi3{
    width: 4.16rem;
    text-align: left;
  }
  .lt_df1{
    height: 1rem;
  }
  .lt_bottom{
    width:6.08rem;
    height:6%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #F5F5F5;
    padding: 0.2rem 0.16rem;
  }
  .lt_bottom input{
    width: 80%;
    height:0.5rem;
    border-radius: 0.2rem;
    background: #fff;
    border:1px solid #ccc;
    float: left;
    font-size: 0.2rem;
    padding: 0.05rem 0.08rem;
  }
  .lt_box{
    position: relative;
  }
  .lt_mask{
    width: 3.51rem;
    height: 0.41rem;
    /*background:url(../images/lt1.png) 0 0 no-repeat;*/
    background-size:4rem 0.41rem;
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;;
  }
  .lt_bottom span{
    float: right;
    height: 0.6rem;
    margin-right: 0.22rem;
    line-height: 0.6rem;
  }


</style>
