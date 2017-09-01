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
           <li v-for="item in 4" v-bind:id="item">
             <div class="img"><img src="../../assets/photo.png" width="39" height="39"/></div>
             <div class="right">
               <div class="r_top">张三{{item}}</div>
               <div  class="r_bottom">晚上谈谈人生</div>
               <div class="time">下午2:12</div>
             </div>
           </li>
         </ul>
      </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    sendmessage:function (event) {
      var a=event.target.parentNode.parentNode.getAttribute("id");
      console.log(event.target.parentNode.parentNode.getAttribute("id"))
      window.location.href="../../static/h5/message.html?tolkTo="+a;
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
