<template>
  <div id="love">
    <div id="top">
      <div class="item">关注</div>
      <div class="item"><router-link to="/all">推荐</router-link></div>
      <div class="item" @click="addShow"><i class="icon-plus"></i></div>
      <div class="item">图片</div>
      <div class="item"><router-link to="/my">我的</router-link></div>
    </div>
    <router-view :token="token" :websocket="websocket" :userNo="userNo" :myMessage="myMessage" :isadmin="isadmin"></router-view>
    <add-item id="addItem" :userNo="userNo" :token="token" :close="remove_add" ></add-item>
  </div>
</template>



<script>


  import addItem from "@/components/love/addItem.vue";
  export default {
    name: 'hello',
    props:{
      userNo:String,
      token:String,
      websocket:WebSocket,
      myMessage:Object,
      isadmin:Number
    },
    data () {
      return {
        tleTolk:[],
        replay:"",
        peopleMessage:{},
        counter:1,
        showImg:false,
        imgSrc: ''
      }
    },
    mounted: function () {
      console.log(this.isadmin)
    },
    methods:{
      addShow:function () {//开始添加说说
        $("#addItem").animate({height:"100vh"},"fast")
      },
      remove_add:function () {//关闭添加
        $("#addItem").animate({height:"0"},"fast")
      },

    },
    components: {
      addItem,
    }
  }
</script>


<style>
  #love{
    font-size: 0.25rem;
  }
 #love #addItem{
   position: fixed;
   z-index: 999;
 }
  #love .router-link-active{
    display: block;
    color: #fda7f7;
  }
  #love #top{
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    display: flex;
    font-size: 0.3rem;
    text-align: center;
    line-height: 40px;
    border-bottom: solid #eee 1px;
    color: #555;
    background: #fff;
    z-index: 101;
  }
  #love #top .item{
    flex: 1;
  }
  #love #top .item i{
    margin: 5px auto;
    display: block;
    width:80% ;
    height: 30px;
    line-height: 30px;
    background: #fda7f7;
    border-radius: 4px;
    color: #fff;
  }


  #love #top .item:hover{
    color: #fda7f7;
  }
  .el-message-box {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    width: 0;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

</style>
