<template>
  <div id="me">
    <div id="left">
      <div class="top">
        <i class="icon-angle-left" @click="removePerson"></i>
        <div class="photo">

          <div class="img"><img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo" width="120" height="120"/></div>
        </div>
        <div class="name">{{myMessage.username}}</div>
      </div>
      <div class="basemessage">
        <ul >
          <li>
            <i class="icon-tablet"><span>{{myMessage.tel}}</span></i>
          </li>
          <li>
            <i class="icon-user"><span>{{myMessage.gender==0?"女":"男"}}</span><span>{{myMessage.education}}</span><span>{{myMessage.height}}</span><span>{{myMessage.area}}</span></i>
          </li>
          <li>
            <i class="icon-exclamation-sign"><span>{{myMessage.department}}</span></i>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>

  export default {
    props:{
      myMessage:Object
    },
    data () {
      return {
        sex:""
      }
    },
    methods:{
      removePerson:function () {
        $("#me").animate({width:"0"},"fast")
      },
    },
    mounted: function () {
      this.getsex;
      console.log(this.myMessage.gender);
    },
    computed: {
      getsex:function() {
        if(this.myMessage.gender==0){
          this.sex="女"
        }else {
          this.sex="男"
        }
      }
    }
  }
</script>



<style>
  #me{
    clear: both;
    height: 100vh;
    overflow: hidden;
  }
  #me .photo{
    margin: 0 auto;
    width: 100%;
    height: 130px;
    background:#baf7fd ;
    padding-top: 10px;
  }
  #me .photo .img{
    margin: 0 auto;
    width:120px ;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  #me .top{
    position: relative;
  }
  #me .top i{
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 0.5rem;
  }
  #me .top .name{
    margin-top: -0.15rem;
    width: 100%;
    font-size: 0.35rem;
    text-align: center;
    border-bottom: solid #fda7f7 1px;
  }
  #me .basemessage{
    position: relative;
    font-size: 0.3rem;
    border-bottom: solid #fda7f7 1px;
  }
  #me .basemessage ul li{
    height: 30px;
    line-height: 30px;
  }
  #me #left i{
    font-size: 0.3rem;
    margin-left: 10px;
    color: #555;
  }
  #me #left i span{
    font-size: 0.23rem;
    margin-left: 5px;
  }
  #me #left .right{
    position: absolute;
    right: 5px;
    top: 30px;
  }
  #right{
    width: 0;
    height: 100vh;
    font-size: 0.3rem;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
  }
  #right>div:first-child{
    flex: 1;
    background: rgba(0,0,0,0.2);
  }
  #right>div:last-child{
    flex: 4;
    background:#baf7fd;
  }
  #right i{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 0.3rem;
    margin-top: 0.2rem;
  }
</style>
