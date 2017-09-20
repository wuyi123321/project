<template>
      <div id="message">
         <ul >
           <li id="0">
             <router-link :to="{path: '/info', query: {
                      fNo:'123',
                      fName:'管理员',
                      fPhoto:'../../assets/message.png'
             }}">
             <div class="img"><img src="../../assets/message.png" width="39" height="39"/></div>
             <div class="right">
               <div class="r_top">管理员</div>
               <div class="r_bottom">亲爱的用户：欢迎来到缘分的天空,在这里求缘分，交好友</div>
               <div class="time">下午5:12</div>
             </div>
             </router-link>
           </li>
           <li v-for="item in friList" v-bind:id="item.userNo" v-bind:name="item.userName" v-bind:fPhoto="item.headPhoto" v-bind:photo="myMessage.photo" @click="clear(item.userNo)">
             <router-link :to="{path: '/info', query: {
                      fNo:item.userNo,
                      fName:item.userName,
                      fPhoto:item.headPhoto
             }}">
             <div class="img"><img v-bind:src="'http://appinter.sunwoda.com'+item.headPhoto" width="39" height="39"/></div>
             <div class="right">
               <div class="r_top">{{item.userName}}</div>
               <div  class="r_bottom">
                 <span v-if="item.online" style="color: #11b95c">在线</span>
                 <span v-if="item.online==false"style="color: #aaa">离线</span>
                 <el-badge :value="getPersonMnum(item.userNo)" ></el-badge></div>
               <div class="time"></div>
             </div>
             </router-link>
           </li>
         </ul>
        <router-view :getNum="getNum" :addFmesC="addFmesC" :websocket="websocket" :myMessage="myMessage" :mes="onMessage" :personMess="fMessC"></router-view>
        <el-popover
          ref="popover1"
          placement="left"
          width="220"
          trigger="click">
          <div>
          <div style="padding-bottom: 5px">好友请求</div>
           <div v-for="(i,index) in addFmesC" class="add_item">
                 {{JSON.parse(i).userNo}}
                 {{JSON.parse(i).msg}}
             <div class="tof">
               <span :id="JSON.parse(i).userNo" :index="index" @click="agree">同意添加</span> <span @click="disagree" :index="index">不同意</span>
             </div>
           </div>
          </div>
        </el-popover>
        <div id="addMes" v-popover:popover1><el-badge is-dot :hidden="badgehid">好友请求</el-badge>
         </div>
      </div>
</template>

<script>
export default {
  props:{
    addFmes:Array,
    userNo:String,
    token:String,
    myMessage:Object,
    websocket:WebSocket,
    fMess:Array,
    mesend:Function,
    fMess1:Array
  },
  data () {
    return {
      badgehid: true,
      friList:{},
      addFmesC:[],
      fMessC:[],
      getNum:[]
    }
  },
  created: function () {
    this.websocket.onmessage =this.onMessage;
    this.websocket.onopen =this.onOpen;
    this.getNum = this.fMess1;
    console.log(this.getNum);
  },
  mounted: function () {
    this.addFmesC=this.addFmes;
    this.fMessC=this.fMess;
    if(this.addFmes.length>0){
      this.badgehid=false;
    }
    var vm = this;
    var href="http://appinter.sunwoda.com/common/lsfriend/friendInfo.json";
    vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo
    ).then((response) => {
      console.log(response);
      vm.friList=response.data.dataInfo.listData;
    }, (response) => {
      console.log('error');
    });
  },
  methods:{
    //获取不同人的消息数量
    getPersonMnum:function(uNo) {
      var num=0;
      for (var i=0;i<this.getNum.length;i++){
      if(JSON.parse(this.getNum[i]).userNo==uNo ){
          num++
       }
      }
      return num
    },
    clear:function (uNo) {
      console.log(this.getNum);
      var i=this.getNum.length;
      while(i--){
        if(JSON.parse(this.getNum[i]).userNo==uNo){
          this.getNum.splice(i,1);
        }
      }
//      for (var i=0;i<this.getNum.length;i++){//数组遍历删除不能用这种方法
//        if(JSON.parse(this.getNum[i]).userNo==uNo){
//          console.log(i);
//        this.getNum.splice(i,1);
//        }
//      }
    },
    agree:function (event) {
      var vm = this;
      var perNo=event.target.getAttribute("id");
      var index=event.target.getAttribute("index");
      console.log(perNo);
      var href="http://appinter.sunwoda.com/common/lsfriend/addFriend.json";
      vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo+"&friendNo="+perNo+"&status=0"
      ).then((response) => {
        console.log(response);
        if(response.data.message=="操作成功"){
         vm.$message('添加成功');
         this.addFmesC.splice(index,index);
          event.target.parentNode.parentNode.innerHTML=null;
        }else {
          vm.$message(response.data.message);
          this.addFmesC.splice(index,index+1);
          if(this.addFmes.length==0){
            this.badgehid=true;
          }
        }
      }, (response) => {
        console.log('error');
      });
    },
    disagree:function (event) {
      var index=event.target.getAttribute("index");
      this.addFmesC.splice(index,index+1);
      if(this.addFmes.length==0){
        this.badgehid=true;
      }
    },
    onOpen: function(openEvt) {
      console.log(openEvt);
    },
    onMessage:function (evt) {
      if(evt.data != "连接成功" && JSON.parse(evt.data)["status"]==2){
        this.addFmesC.push(evt.data);
      }
      if(evt.data != "连接成功" && JSON.parse(evt.data)["status"]==1){
       var id=JSON.parse(evt.data)["userNo"];
        this.fMessC.push(evt.data);
        this.getNum.push(evt.data);
        $("#"+id+" "+".el-badge__content")[0].style="display:block";
        $("#"+id+" "+".el-badge__content")[0].innerHTML=parseInt($("#"+id+" "+".el-badge__content")[0].innerHTML)+1;
        console.log( $("#"+id+" " +".time")[0]);

        $("#"+id+" " +".time")[0].innerHTML=JSON.parse(evt.data)["TIME"].slice(5,16);
        console.log(this.getNum);
    }
      if(this.addFmes.length>0){//添加好友请求数量大于零
        this.badgehid=false;
      }
      console.log(evt.data);
      console.log(this.addFmesC);
      console.log(this.fMessC);
    },

  },
  computed: {
  },
  destroyed: function () {
    this.websocket.onmessage =this.mesend;
    console.log("关闭1");
  }
}
</script>

<style>
#message ul li{
  clear: both;
  height: 50px;
  border-bottom: solid #eee 1px;
  font-size: 0.35rem;
  position: relative;
}
#message #addMes{
  position: fixed;
  top: 40%;
  right: 0px;
  display: flex;
  justify-content: center ;
  align-items: center;
  width: 70px;
  height:20px;
  border-radius: 10px;
  background:#afddff ;
  border: 1px solid #afddff;
  font-size: 0.01rem;
}

.el-popover .add_item{

  width: 100%;
  border-top: solid 1px #eeeeee;
}
.el-popover .add_item .tof{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.el-popover .add_item span{
  display: inline-block;
  padding-right: 5px;
  height: 25px;
  line-height: 25px;
}
#message ul li{
  z-index: 100;
}
#message ul li .img{
  height: 39px;
  margin: 6px 10px;
  float: left;
}
#message ul li .right{
  font-size: 0.23rem;
  float: left;
  height: 100%;
  width: 200px;
}
#message ul li .right .r_top{
  display: block;
  clear: both;
  width: 100%;
  height: 50%;
  line-height:30px;
}
#message ul li .right .r_bottom{
  display: inline-block;
   width: 100%;
   height: 50%;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
}
#message ul li .right .time{
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
