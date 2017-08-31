<template>
   <div id="me">
         <div class="top">
           <div class="photo">
             <div class="img"><img src="../images/photo.png"/></div>
           </div>
           <div class="name">张三三</div>
         </div>
     <div class="basemessage">

       <ul>
         <li>
           <i class="icon-tablet"><span>18829891720</span></i>
         </li>
       <li>
         <i class="icon-user"><span>女</span><span>24岁</span><span>水瓶座</span><span>陕西安康</span></i>
       </li>
         <li>
           <i class="icon-exclamation-sign"><span>冷静女神</span><span>活泼可爱</span><span>工作达人</span></i>
         </li>
     </ul>
       <div class="right">
         <i class="icon-angle-right" ></i>
       </div>

     </div>
     <div class="">
     </div>
  </div>
</template>
<script>
  $.ajax({
    type:"post",
    url:"http://172.16.98.74:8080/swdAPP/common/LoveTheSkyUser/findLoveTheSkyUser.json",
    dataType:"json",
    data: {"token":"dcf88e4b2976b6c4eb50e65b27390552","userNo":"170711125"},
    success:function(data){
      console.log(data);
    }});
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>


<style>
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
#me  i{
    font-size: 0.3rem;
    margin-left: 10px;
  color: #555;
  }
#me i span{
    font-size: 0.2rem;
    margin-left: 5px;
  }
#me .right{
    position: absolute;
    right: 5px;
    top: 30px;
  }
</style>
