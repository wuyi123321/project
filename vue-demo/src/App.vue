<template>
  <div id="app">
    <router-view class="abb" :fMess1="fMess1" :mesend="onMessage" :fMess="fMess" :addFmes="addFmes" :websocket="websocket" :myMessage="myMessage" :peopleList="peopleList" :vipList="vipList" :lType="lType" :token="token" :userNo="userNo"></router-view>
    <div id="bottom">
        <div class="item"><router-link to="/index"><span>主页</span></router-link></div>
        <div class="item"><router-link to="/love"><span>情感天地</span></router-link></div>
        <div class="item" @click="clearMess">
          <router-link to="/message"><el-badge v-model="mesNum" ><span>消息</span></el-badge></router-link></div>
        <div class="item"><router-link to="/me"><span>我</span></router-link></div>
    </div>
    <div class="bgloading" v-show="bgloading" >
      <div class="con" id="jinyong">
        页面加载中<i class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>
<script>
 import $ from 'jquery'
// var token="4b7bda4f37efc28440269f085da5e304";
//var token="d8786b5210b25d6232ccf7b1b95ad2bd";
// var token="427ac2cd8217032e75e00e57d42e1fc6";
//var token = "7d37573b9e465f676ecc233c4b72cbeb";
// var token ="d6519a7ba2b67b3593e7f2e54f80bc8f";
//  oken = getQueryString("token");
var chatDate=[];
export default {
  name: 'app',
  data () {
    return {
      bgloading:true,
      token:"",
      userNo:"",
      myMessage:{},
      peopleList:{},
      vipList:{},
      lType:["女神系列","活泼可爱","工作达人","温文尔雅","心灵手巧"],
      websocket:null,
      addFmes:[],
      fMess:[],
      fMess1:[],
      mesNum:0
    }
  },

  mounted: function(){
    this.token=this.getQuery("token");
    this.getmessage();
    chatDate=this.fMess;
  },
  methods:{
    getmessage(){
      let vm = this;
//判断是否注册
      vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/loveTheSkyUser.json?token='+vm.token).then((response) => {
        console.log(response);
        if(response.data.statusCode==0){//注册完成的用户
          vm.userNo=response.data.message;
          vm.getMemessage(response.data.message);  //获取个人属性
          vm.getList(response.data.message);//获取主页信息
          vm.getvipList(response.data.message,"推荐");
          vm.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+vm.token);

//    if(localStorage.getItem("chat")!=null){
           var strcha=localStorage.getItem("chat");
           var chatJaon=JSON.parse(strcha);
           console.log(strcha);
           console.log(chatJaon)
           console.log(chatJaon["cha"]);
          for(var i=0;i<chatJaon["cha"].length;i++){
            this.fMess.push(chatJaon["cha"][i]);
          }
          console.log(this.fMess);
          vm.websocket.onopen =this.onOpen;
          vm.websocket.onmessage =this.onMessage;
          vm.websocket.onerror = this.onError;
          vm.websocket.onclose = this.onClose;
        }else if( response.data.statusCode==41066 ) {//禁用的用户
          this.bgloading=true;
          console.log( $("#jinyong"));
          vm.$notify({
            title: '提示',
            message: '由于您的非法言论或行为，您已被管理员禁用，请联系企业文化部开通权限',
            duration: 0
          });
//          $("#jinyong").innerHTML="由于您的非法言论或行为，您已被管理员禁用，请联系企业文化部开通权限"
        }
        else {//未注册用户
          window.location.href="static/h5/index.html?token="+vm.token;
        }
      }, (response) => {
        console.log('error');
      });
    },
    onOpen: function(openEvt) {
   console.log(openEvt);
 },
    onMessage:function (evt) {
     if(evt.data != "连接成功" && JSON.parse(evt.data)["status"]==2){
        this.addFmes.push(evt.data);
        this.mesNum++
      }
      if(evt.data != "连接成功" && JSON.parse(evt.data)["status"]==1){
        this.fMess.push(evt.data);
        this.fMess1.push(evt.data);
        this.mesNum++
      }
      console.log(evt.data);
      console.log(this.addFmes);
      console.log(this.fMess);
 },
    getQuery:function (name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
   var r = window.location.search.substr(1).match(reg);
   if (r != null) return unescape(r[2]); return null;
      },

    onError:function()  {
      this.$message({type: 'error', message: '通信系统异常，聊天系统无法使用'});
    },
    onClose:function() {
      this.$message({type: 'error', message: '通信系统异常，聊天系统无法使用'});
    },

//    doSendfunction () {
//   if (websocket.readyState == (websocket.OPEN==undefined?1:websocket.OPEN)) {
//     var msg = document.getElementById("inputMsg").value;
//     var socketMsg={
//       status:"1",
//       userNo:"170711125",//要发送消息的用户的userId,ALL为发送给所有人
//       msg:msg
//     }
//     websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
//     alert("发送成功!");
//   } else {
//     alert("连接失败!");
//   }
// },
    //获取个人信息
    getMemessage(userNO){
      let vm = this;
      vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/findLoveTheSkyUser.json?userNo='+userNO+'&token='+vm.token
      ).then((response) => {
        if(response.data.dataInfo){
          vm.myMessage=response.data.dataInfo.listData[0];
          this.bgloading=false;
          if( vm.myMessage.gender==0){
            vm.lType=["冷酷幽默","阳光少年","热心勇敢","智慧过人","冷静稳重"];
          }
        }else {
          this.$message({type: 'error', message: '信息获取失败，重新进入'});
        }
        console.log( vm.myMessage);
      }, (response) => {
        console.log('error');
      });
    },

    //获取类型列表信息
    getList(userNO){
      let vm = this;
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/LoveTheSkyUserIndex.json";
      vm.$http.get(href+"?token="+vm.token+"&userNo="+userNO+"&pageSize=6&page=1"
       ).then((response) => {
        vm.peopleList=response.data.dataInfo;
        console.log(vm.peopleList);
      }, (response) => {
        console.log('error');
      });
    },
    //获取推荐人名单
    getvipList(userNO,iTtype){
      let vm = this;
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findUserBytypes.json";
      vm.$http.get(href+"?token="+vm.token+"&userNo="+userNO+"&pageSize=3&page=1&lTypes="+iTtype
      ).then((response) => {
        vm.vipList=response.data.dataInfo;
        console.log(vm.vipList);
      }, (response) => {
        console.log('error');
      });
    },
    clearMess(){
      this.mesNum=0;
    },
  }
}
 window.onunload=function () {
   if(chatDate != []){
     var b={
       cha:chatDate
     };
     var strChat=JSON.stringify(b);
     localStorage.setItem("chat", strChat);
   }
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
#bottom .item span{
  display: block;
}
#bottom .router-link-active{
  display: block;
  background: #eeeeee;
}
.abb{
  margin-bottom: 41px;
}
.bgloading{
  font-size: 0.25rem;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 999;
}
 .bgloading .con{
   font-size: 0.25rem;
  width: 100%;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
