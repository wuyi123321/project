<template>
      <div id="message">
         <ul @click="sendmessage">
           <li id="0">
             <div class="img"><img src="../../assets/message.png" width="39" height="39"/></div>
             <div class="right">
               <div class="r_top">系统消息</div>
               <div class="r_bottom">亲爱的用户：欢迎来到缘分的天空,在这里求缘分，交好友</div>
               <div class="time">下午5:12</div>
             </div>
           </li>
           <li v-for="item in friList" v-bind:id="item.userNo" v-bind:name="item.userName" v-bind:fPhoto="item.headPhoto" v-bind:photo="myMessage.photo">
             <div class="img"><img v-bind:src="'http://appinter.sunwoda.com'+item.headPhoto" width="39" height="39"/></div>
             <div class="right">
               <div class="r_top">{{item.userName}}</div>
               <div  class="r_bottom"><span v-if="item.online" style="color: #11b95c">在线</span><span v-if="item.online==false"style="color: #aaa">离线</span></div>
               <div class="time">下午2:12</div>
             </div>
           </li>
         </ul>
        <el-popover
          ref="popover1"
          placement="left"
          title="验证消息"
          width="220"
          trigger="click">
           <div v-for="i in addFmes" class="add_item">
                 {{JSON.parse(i).userNo}}
                 {{JSON.parse(i).msg}}
             <div class="tof">
               <span :id="JSON.parse(i).userNo" @click="agree">同意添加</span> <span @click="disagree">不同意</span>
             </div>
           </div>
        </el-popover>
        <div id="addMes" v-popover:popover1><el-badge is-dot :hidden="badgehid">好友请求</el-badge>
         </div>
      </div>
</template>

<script>
export default {
  name: 'hello',
  props:{
    addFmes:Array,
    userNo:String,
    token:String,
    myMessage:Object
  },
  data () {
    return {
      badgehid: true,
      friList:{}
    }
  },
  mounted: function () {
    console.log("Aa")
    console.log(this.addFmes);
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
    sendmessage:function (event) {
      var id=event.target.parentNode.parentNode.getAttribute("id");
      var name=event.target.parentNode.parentNode.getAttribute("name");
      var fPhoto=event.target.parentNode.parentNode.getAttribute("fPhoto");
      var photo=event.target.parentNode.parentNode.getAttribute("photo");
      console.log(event.target.parentNode.parentNode.getAttribute("id"))
      window.location.href="../../static/h5/message.html?tolkTo="+id+"&name="+name+"&token="+this.token +"&fPhoto="+fPhoto+"&photo="+photo;
    },
    agree:function (event) {
      var vm = this;
      var perNo=event.target.getAttribute("id");
      console.log(perNo);
      var href="http://appinter.sunwoda.com/common/lsfriend/addFriend.json";
      vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo+"&friendNo="+perNo+"&status=0"
      ).then((response) => {
        console.log(response);
        if(response.data.message=="操作成功"){
         vm.$message('添加成功');
          event.target.parentNode.parentNode.innerHTML=null;
        }else {
          vm.$message(response.data.message);
        }
      }, (response) => {
        console.log('error');
      });
    },
    disagree:function (event) {
      event.target.parentNode.parentNode.innerHTML=null;
    },
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
