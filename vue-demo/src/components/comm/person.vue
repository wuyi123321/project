<template>
  <div id="person">
    <div id="left">
      <div class="top">

        <div class="photo">
          <i class="icon-angle-left" @click="removePerson"></i>
          <div class="img" id="hphoto"><img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo" width="120" height="120"/></div>
          <div class="bgound"><img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo" width="100%" height="100%"/></div>
          <i class="icon-plus" @click="addF($event)" :id="myMessage.userNo">加好友</i>
        </div>
        <div class="name">{{myMessage.username}}</div>
      </div>
      <div class="basemessage">
        <div class="c_title">基本信息</div>
        <ul @click="mesShowBase">
          <li>
            <i class="icon-calendar"><span>{{new Date(myMessage.birthday).getFullYear()}}年{{new Date(myMessage.birthday).getMonth()+1}}月{{new Date(myMessage.birthday).getDay()}}日</span></i>
          </li>
          <li>
            <i class="icon-user"><span>{{myMessage.gender==0?"女":"男"}}</span><span>{{myMessage.education}}</span><span>{{myMessage.height}}cm</span><span>{{myMessage.area}}</span></i>
          </li>
          <li>
            <i class="icon-exclamation-sign"><span>{{myMessage.department}}</span></i>
          </li>
        </ul>
        <div class="right">
          <i class="icon-angle-right"  @click="mesShowBase" ></i>
        </div>
      </div>
      <div class="basemessage" @click="mesShowAll">
        <div class="c_title">详细信息</div>

        <div class="right">
          <i class="icon-angle-right"  @click="mesShowAll" ></i>
        </div>
      </div>
      <div class="basemessage" @click="mesShowLove">
        <div class="c_title">择偶标准</div>
        <div>
          <div class="fullMes">
            <div class="ful_key">年龄</div><div class="ful_value">{{myMessage.tYear}}</div>
            <div class="ful_key">学历</div><div class="ful_value">{{myMessage.tEducation}}</div>
          </div>
          <div class="fullMes">
            <div class="ful_key">性格</div><div class="ful_value">{{myMessage.tTypes}}</div>
          </div>
        </div>
        <div class="right">
          <i class="icon-angle-right"  @click="mesShowLove" ></i>
        </div>
      </div>
      <div class="basemessage">
        <div class="c_title">爱情宣言</div>
        <p>{{myMessage.pLanguage}}</p>
      </div>
      <div class="basemessage" style="border: none">
        <div class="c_title">照片墙</div>
        <div class="imgs">
          <div v-for="i in 3" class="imgItem">
            <img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo"/>
          </div>
        </div>
      </div>
    </div>
    <div id="right">
      <div><i class="icon-double-angle-right" @click="hidRight" ></i></div>
      <div id="r_box">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props:{
      myMessage:Object,
      websocket:WebSocket
    },
    data () {
      return {

      }
    },
    mounted: function () {
      console.log(this.myMessage);
      for(var item in this.myMessage){
        if(this.myMessage[item]==null){
          this.myMessage[item]="未设置此信息";
        }
      }
    },
    methods:{
      removePerson:function () {
        $("#person").animate({width:"0"},"fast",function () {
          $("#person").css("z-index","-1");
        });
      },
      mesShowBase:function () {
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>"+this.myMessage.username+"个人基本信息</div>" +
          "         <div class='r_content'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>电话</div>" +
          "             <div class='item_value'>"+this.myMessage.tel+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>昵称</div>" +
          "             <div class='item_value'>"+this.myMessage.username+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>户籍</div>" +
          "             <div class='item_value'>"+this.myMessage.area+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>身高</div>" +
          "             <div class='item_value'>"+this.myMessage.height+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>部门</div>" +
          "             <div class='item_value'>"+this.myMessage.department+"</div>" +
          "           </div>" +
          "         </div>"
        $("#r_box").html( boxcontext);
      },
      mesShowAll:function () {
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>"+this.myMessage.username+"个人详细信息</div>" +
          "         <div class='r_content'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>QQ号</div>" +
          "             <div class='item_value'>"+this.myMessage.qq+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>微信号</div>" +
          "             <div class='item_value'>"+this.myMessage.wechatNumber+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>爱好</div>" +
          "             <div class='item_value'>"+this.myMessage.hobbies+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>体重</div>\n" +
          "             <div class='item_value'>"+this.myMessage.weight+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>工作</div>" +
          "             <div class='item_value'>"+this.myMessage.major+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>居住地</div>" +
          "             <div class='item_value'>"+this.myMessage.nativePlace+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>毕业学校</div>" +
          "             <div class='item_value'>"+this.myMessage.graduateShcool+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购房情况</div>" +
          "             <div class='item_value'>"+this.myMessage.purchaseSituation+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购车情况</div>" +
          "             <div class='item_value'>"+this.myMessage.carSituation+"</div>" +
          "           </div>" +
          "         </div>";
        $("#r_box").html( boxcontext);
      },
      mesShowLove:function () {
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>"+this.myMessage.username+"择偶标准</div>" +
          "         <div class='r_content'>" +

          "           <div class='r_item' >" +
          "             <div class='item_name'>学历</div>" +
          "             <div class='item_value'>"+this.myMessage.tEducation+"</div>" +
          "           </div>" +

          "           <div class='r_item'>" +
          "             <div class='item_name'>年龄</div>" +
          "             <div class='item_value'>"+this.myMessage.tYear+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>性格</div>" +
          "             <div class='item_value'>"+this.myMessage.tTypes+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>居住地</div>" +
          "             <div class='item_value'>"+this.myMessage.tArea+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购房情况</div>" +
          "             <div class='item_value'>"+this.myMessage.tPurchaseSituation+"</div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购车情况</div>" +
          "             <div class='item_value'>"+this.myMessage.tCarSituation+"</div>" +
          "           </div>" +
          "         </div>";

        $("#r_box").html( boxcontext);

      },
      setPerMessage:function (mes) {
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/updateLoveTheSkyUserByUserNo.js";
        vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo+"&lTypes="+mes.lTypes+"&pLanguage=&wechatNumber=&qq=&tHeight=&nativePlace="
        ).then((response) => {

        }, (response) => {
          console.log('error');
        });
      },
      hidRight:function () {
        $("#right").animate({width:"0"},"fast")
      },
      addF:function (event) {
        var uNo=event.target.getAttribute("id");
        console.log(uNo);
        this.doSendfunction(2,uNo,"请求加为好友");
      },
      doSendfunction (status,uNo,msg) {
        if (this.websocket.readyState == (this.websocket.OPEN==undefined?1:this.websocket.OPEN)) {
          var socketMsg={
            status:status,
            userNo:uNo,//要发送消息的用户的userId,ALL为发送给所有人
            msg:msg
          };
          this.websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
          this.$message({type: 'success', message: '申请消息已经发出，等待对方回应'});
        } else {
          this.$message({type: 'error', message: '申请消息发送失败'});
        }

    }
    }




  }
</script>


<style>

  #person .top i{
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 0.5rem;
  }
  #person{
    position: fixed;
    top:0;
    clear: both;
    height: 100%;
    font-size: 0;
    z-index: 999;
  }

  #person .top{
    position: relative;
  }
  #person .photo{
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 130px;
    background:rgba(186,247,253,0.3);
    padding-top: 10px;
    overflow: hidden;
  }
  #person .photo .bgound{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(5px);
  }
  #person .photo .icon-plus{
    font-size: 0.3rem;
    display: inline-block;
    position: absolute;
 top:80px;
    left: 40px;
    color: #fda7f7;
  }

  #person .photo .img{
    margin: 0 auto;
    width:120px ;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  #person .photo .changeimg{
    display: none;
    width: 0;
    height: 80%;
    align-content: center;
    position: absolute;
    top: 0;
    right: 0;
  }
  #person .photo .changeimg span{
    position: absolute;
    bottom: 10px;
    left: 0;
  }
  #person .photo .changeimg .addImg{
    top: 20px;
    right: 20px;
    position: absolute;
    display: flex;
    width:100px ;
    height: 100px;
    justify-content: center;
    align-content: center;
    border-radius: 10px;
    border: solid #bbb 1px;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
  }
  #person .fullMes{
    display: flex;
    height: 0.4rem;
    align-items: center;
    font-size: 0.24rem;
    color: #333;
  }
  #person .fullMes .ful_key{
    margin-left:10px ;
    width: 1rem;
  }
  #person .fullMes .ful_value{
    flex: 1;
  }
  #person .photo .changeimg .addImg input{
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  #person #smallimages{
    top: 20px;
    right: 20px;
    position: absolute;
    width:100px ;
    height: 100px;
    border-radius: 10px;
    border: solid #bbb 1px;
    overflow: hidden;
  }
  #person #smallimages .cream{
    width:100px ;
    height: 100px;
  }
  #person #smallimages .cream .delete{
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 600;
  }
  #person .photo .changeimg i{
    height: 100%;
    display: flex;
    align-items: center;
    color: #ffe7ff;
    font-size: 0.4rem;
  }
  #person .photo .changeimg span{
    padding: 2px;
    border: solid 1px #aaa;
    border-radius: 4px;
  }
  #person .photo .changeimg .addImg i{
    color: #999;
  }
  #person .photo .changeimg img{
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
  }
  #person .top .name{
    margin-top: -13px;
    width: 100%;
    font-size: 0.35rem;
    text-align: center;
    border-bottom: solid #fda7f7 1px;
  }
  #person .basemessage{
    position: relative;
    font-size: 0.25rem;
    border-bottom: solid #fda7f7 1px;
  }
  #person .basemessage ul li{
    height: 30px;
    line-height: 30px;
  }
  #person .basemessage .imgs{
    display: flex;
    height: 33vw;
    background: #bbb;
    justify-content: center;
    align-items: center;
  }
  #person .basemessage .imgs .imgItem:first-child{
    border-right: solid 1px #fff;
  }
  #person .basemessage .imgs .imgItem:last-child{
    border-left: solid 1px #fff;
  }
  #person .basemessage .imgs .imgItem{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  #person .basemessage .imgs .imgItem img{
    border: solid 3px #fff;
    width: 30vw;
    height: 30vw;
  }

  #person #left ul li i{
    font-size: 0.3rem;
    margin-left: 10px;
    color: #555;
  }
  #person #left ul li i span{
    font-size: 0.23rem;
    margin-left: 5px;
  }
  #person #left .c_title{
    padding-top:0.1rem;
    padding-bottom:0.1rem;
    color: #4db3ff;
    font-size: 0.25rem;
  }
  #person #left .basemessage .right{
    position: absolute;
    height: 100%;
    top: 0;
    right: 5px;
    display: flex;
    align-items: center;
  }
  #person #left .basemessage p{
    font-size: 0.22rem;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
  }
  #person #right{
    width: 0;
    height: 100vh;
    font-size: 0.25rem;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
  }
  #person #right>div:first-child{
    flex: 1;
    background: rgba(0,0,0,0.2);
  }
  #person #right>div:last-child{
    flex: 4;
    background:#baf7fd;
  }
  #person #right i{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 0.3rem;
    margin-top: 0.2rem;
  }
  #person #right .r_title{
    color: #fda7f7;
    margin-top: 10px;

  }
  #person #right .r_content .r_item{
    display: flex;
    height: 0.62rem;
    font-size: 0.22rem;
    align-items:center;
    margin-left: 0.3rem;
    border-bottom: solid 1px #fda7f7;
  }
  #person #right .r_content .r_item .item_name{
    width: 1rem;
  }
  #person #right .r_content .r_item .item_value{
    flex: 1;
  }
  #person  #right .r_content .r_item .item_value input:focus {
    outline: 0;
    border: none;

  }
  #person input:hover {
    border: none;
  }
  #person #me input {
    border: none;
    background: #baf7fd;
  }
  #person  select{
    width: 80%;
    outline-color:#baf7fd;
    border: none;
    background: #baf7fd;
  }
  #person select option{
    border: none;
    outline-color:#eeeeee;
  }

  #person .queding{
    font-size: 0.3rem;
    text-align: right;
    margin-top: 0.3rem;
    padding-right: 0.3rem;
  }
  #person .queding:hover{
    color: #fda7f7;
  }


</style>
