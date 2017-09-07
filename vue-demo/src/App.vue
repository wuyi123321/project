<template>
  <div id="app">
    <router-view class="abb" :myMessage="myMessage" :peopleList="peopleList" :vipList="vipList" :lType="lType" :token="token" :userNo="userNo"></router-view>
    <div id="bottom">
        <div class="item"><router-link to="/index">主页</router-link></div>
        <div class="item"><router-link to="/love">情感天地</router-link></div>
        <div class="item"><router-link to="/message">消息</router-link></div>
        <div class="item"><router-link to="/me">我</router-link></div>
    </div>
  </div>
</template>
<script>
 import $ from 'jquery'
  //var token = "00098635bd29551e6151a76edd395cec";
 var token = "7d37573b9e465f676ecc233c4b72cbeb";

 (function ($) {
    $.getUrlParam = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);  return null;
    }
  })(jQuery);
  if($.getUrlParam("token")!=null){
    token = $.getUrlParam("token");
  }

export default {
  name: 'app',
  data () {
    return {
      token:"",
      userNo:"",
      myMessage:{},
      peopleList:{},
      vipList:{},
      lType:["女神系列","活泼可爱","工作达人","温文尔雅","心灵手巧"]
    }
  },
  mounted: function(){
    this.getmessage();
  },
  methods:{
    getmessage(){
      let vm = this;
//判断是否注册
      vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/loveTheSkyUser.json?token='+token).then((response) => {
        console.log(response);
        if(response.data.statusCode==0){//注册
          vm.token=token;
          vm.userNo=response.data.message;
          vm.getMemessage(response.data.message);  //获取个人属性
          vm.getList(response.data.message);//获取主页信息
          vm.getvipList(response.data.message,"推荐");
          var websocket = null;
          websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+token);
          websocket.onopen =this.onOpen;
          websocket.onmessage =this.onMessage;
          websocket.onerror = this.onError;
          websocket.onclose = this.onClose;
        }else {//未注册
          window.location.href="static/h5/index.html?token="+token;
        }
      }, (response) => {
        console.log('error');
      });
    },
    onOpen: function(openEvt) {
   console.log(openEvt);
 },

    onMessage:function (evt) {
   alert(evt.data);

 },
    onError:function()  {},
    onClose:function() {},

    doSendfunction () {
   if (websocket.readyState == (websocket.OPEN==undefined?1:websocket.OPEN)) {
     var msg = document.getElementById("inputMsg").value;
     var socketMsg={
       status:"1",
       userNo:"170711125",//要发送消息的用户的userId,ALL为发送给所有人
       msg:msg
     }
     websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
     alert("发送成功!");
   } else {
     alert("连接失败!");
   }
 },

    //获取个人信息
    getMemessage(userNO){
      let vm = this;
      vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/findLoveTheSkyUser.json?userNo='+userNO+'&token='+token).then((response) => {
        vm.myMessage=response.data.dataInfo.listData[0];
        if( vm.myMessage.gender==0){
          vm.lType=["冷酷幽默","阳光少年","热心勇敢","智慧过人","冷静稳重"];
        }
        console.log( vm.myMessage);

      }, (response) => {
        console.log('error');
      });
    },
    //获取类型列表信息
    getList(userNO){
      let vm = this;
      //var href="http://172.16.98.74:8080/swdAPP/common/LoveTheSkyUser/LoveTheSkyUserIndex.json?userNo=170711129&pagesize=10&page=1"
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/LoveTheSkyUserIndex.json"
      vm.$http.get(href+"?token="+token+"&userNo="+userNO+"&pageSize=6&page=1"
       ).then((response) => {
        vm.peopleList=response.data.dataInfo;
        console.log(vm.peopleList);
      }, (response) => {
        console.log('error');
      });
    },
    getvipList(userNO,iTtype){
      let vm = this;
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findUserBytypes.json"
      vm.$http.get(href+"?token="+token+"&userNo="+userNO+"&pageSize=3&page=1&lTypes="+iTtype
      ).then((response) => {
        vm.vipList=response.data.dataInfo;
        console.log(vm.vipList);
      }, (response) => {
        console.log('error');
      });
    }
  }

}
 window.close=function()
 {
   websocket.onclose();
 }
</script>

<style>
#bottom{
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    display: flex;
    font-size: 0.3rem;
    text-align: center;
    line-height: 40px;
    border-top: solid #eee 1px;
    color: #555;
  background: #fff;
}
#bottom .item{
    flex: 1;
}
#bottom .item:hover{
    background: #eeeeee;
}
.abb{
  margin-bottom: 40px;
}
</style>
