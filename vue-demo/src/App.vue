<template>
  <div id="app">
    <router-view class="abb"></router-view>
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
  $.ajax({
    type:"post",
    url:"http://172.16.98.74:8080/swdAPP/common/LoveTheSkyUser/loveTheSkyUserIndex.json?",
    dataType:"json",
    data: {"token":"dcf88e4b2976b6c4eb50e65b27390552"},
    success:function(data){
      console.log(data);
      if(data.statusCode==-1){
        window.location.href="static/h5/index.html";
      }
    }});
export default {
  name: 'app'

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
