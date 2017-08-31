<template>
   <div class="block">
          <el-carousel height="150px" width = "100%">
              <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
              </el-carousel-item>
          </el-carousel>
          <div id="nav">
              <ul @click="show_type">
                  <li>女神专栏</li>
                  <li>活泼可爱</li>
                  <li>工作达人</li>
              </ul>
          </div>
          <div class="body">
            <div class="title" v-model="type"> {{type}}</div>
            <div class="content">
              <ul>
                <li v-for="item in 6" >
                  <div class="img_item">
                    <div class="img_show" @click="showsee">
                      <img src="../images/photo.png"/>
                      <div class="see"><span>加关注</span> <span class="leave_message" >留言</span></div>
                    </div>
                    <div class="img_bottom">
                      <span>信息中心</span>
                      <span>信息中心</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="body">
       <div class="title" v-model="type">工作达人</div>
       <div class="content">
         <ul>
           <li v-for="item in 2" class="list_item">
             <div class="img_item">
               <div class="img_show" @click="showsee">
                 <img src="../images/photo.png"/>
                 <div class="see"><span>加关注</span> <span class="leave_message" >留言</span></div>
               </div>
               <div class="person_message">
                <table>
                  <tr>
                    <td>姓名</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>年龄</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>爱好</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>部门</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><a href="../../static/h5/index.html">注册</a>微信号</td>
                    <td></td>
                  </tr>
                </table>
               </div>
             </div>
           </li>
         </ul>
       </div>
     </div>
   </div>


</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      type:"女神专栏",
    }
  },
  methods:{
    showsee:function (event) {
      console.log(event.target.parentNode.lastChild);
      console.log($(".see"));
      event.target.parentNode.lastChild.setAttribute("style","display:block");
//      $.ajax({
//          type:"post",
//          url:"http://appinter.sunwoda.com/ekp/ekpVehicleInfoDetail.json",
//          dataType:"json",
//          data: {"token":"445555","plateNumber":"122"},
//          success:function(data){
//            console.log(data);
//          }});
    },
    show_type:function (event) {
      this.type=event.target.innerHTML;
    }
  }
}
</script>


<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.block{
  width: 100%;
  height: 100%;
}
#nav{
    height: 25px;
}
#nav ul{
    width: 100%;
    height: 100%;
    border-bottom: solid #fda7f7 1px;
}
#nav ul li{
    float: left;
    font-size: 0.25rem;
    height: 100%;
    padding-right: 10px;
    line-height: 25px;
    margin-left: 10px;
    border-right: solid #eeeeee 1px;
}
  .body{
    width: 100%;
    height: auto;
    clear: both;
  }
  .body .title{
    margin-top: 0.2rem;
    font-size: 0.25rem;
    color: #fda7f7;
  }
  .content ul{
    zoom:1;
  }
.content ul:after{
  clear:both;
  display:block;
  content:"";
  height:0px;
  overflow:hidden;
}
.content ul li{
  margin-left: 2%;
  width: 30vw;
  float: left;
  border: solid #eee 1px;
}
.content  ul li .img_item{
  width: 100%;
}
.content  ul li .img_item .img_show{
  width: 30vw;
  height: 35vw;
  position: relative;
}
.content  ul li .img_item .img_show .see{
  display: none;
  width: 100%;
  height:30px;
  position: absolute;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  font-size: 0.2rem;
  color: #fff;
  line-height: 30px;
}
.see .leave_message{
  display: block;
  float: right;
}
.content  ul li .img_item img{
  width: 100%;
  height: 100%;
}
.content .list_item{
  width: 95%;
  margin-top: 10px;

}
.list_item .img_show{
  float: left;
}
.list_item .img_item .person_message{
  width: 65%;
  float: right;
  background: #eee;
  font-size: 0.25rem;
}
.person_message table{
  height: 35vw;
}
.content .img_bottom{
  height: 20px;
  line-height: 20px;
  width: 100%;
font-size: 0.2rem;
}
</style>
