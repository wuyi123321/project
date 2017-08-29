<template>
   <div class="block">
         <div class="photo">
           <div class="img"><img src="../images/photo.png"/></div>
           <div class="name">张三三</div>
         </div>
     <div class="basemessage"><ul>
       <li>
         <i class="icon-user"><span>男</span><span>24岁</span><span>水瓶座</span><span>陕西安康</span></i>
       </li>
       <li>
         <i class="icon-mobile-phone">18829891720</i>
       </li>
     </ul>
     </div>
  </div>
</template>
<script>
  $.ajax({
    type:"post",
    url:"http://172.16.98.74:8080/swdAPP/common/LoveTheSkyUser/findLoveTheSkyUser.json",
    dataType:"json",
    data: {"token":"f7266c2ab1be42ff34d6b8c276be41e4","userNo":"170711129"},
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
.photo{
  margin: 0 auto;
  width: 100%;
  height: 130px;
  background:#baf7fd ;
  padding-top: 10px;
}
  .photo .img{
    margin: 0 auto;
    width:120px ;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  .photo .name{
    width: 100%;
    font-size: 0.35rem;
    text-align: center;
    border-bottom: solid #fda7f7 1px;
  }
  .block i{
    font-size: 0.4rem;
  }
</style>
