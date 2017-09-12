<template>
  <div id="me">
    <div id="left">
      <div class="top">
        <i class="icon-angle-left" @click="removePerson"></i>
        <div class="photo">
          <div class="img"><img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo" width="120" height="120"/></div>
          <i class="icon-plus" @click="addF" :id="myMessage.userNo">加好友</i>
        </div>
        <div class="name">{{myMessage.username}}</div>
      </div>
      <div class="basemessage">
        <div class="c_title">基本信息</div>
        <ul @click="mesShowBase">
          <li>
            <i class="icon-tablet"><span>{{myMessage.tel}}</span></i>
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
        <div>
        </div>
        <div class="right">
          <i class="icon-angle-right"  @click="mesShowAll" ></i>
        </div>
      </div>
      <div class="basemessage" @click="mesShowLove">
        <div class="c_title">择偶标准</div>
        <div>
        </div>
        <div class="right">
          <i class="icon-angle-right"  @click="mesShowLove" ></i>
        </div>
      </div>
      <div class="basemessage">
        <div class="c_title">爱情宣言</div>
        <p>在那了断桥之上，白娘子在一个飘雨的时刻，满怀着憧憬与出其不意的期待，与迎来之人，撞个满怀，也便注定了一生一世的相随相守，影一个千年不变的神话，在时空的里演绎，在和风里细腻</p>
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
        $("#me").animate({width:"0"},"fast")
      },
      mesShowBase:function () {
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>修改个人基本信息</div>" +
          "         <div class='r_content'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>电话</div>" +
          "             <div class='item_value'><input placeholder='请填写电话' value="+this.myMessage.tel+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>昵称</div>" +
          "             <div class='item_value'><input placeholder='请填写昵称' value="+this.myMessage.username+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>户籍</div>" +
          "             <div class='item_value'><input  placeholder='请填写户籍' value="+this.myMessage.area+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>身高</div>" +
          "             <div class='item_value'><input placeholder='请填写身高(cm)' value="+this.myMessage.height+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>部门</div>" +
          "             <div class='item_value'><input placeholder='请填写部门' value="+this.myMessage.department+"></input></div>" +
          "           </div>" +
          "         </div>"+" <div class='queding' id='submit'>" +
          "           提交" +
          "         </div>";
        $("#r_box").html( boxcontext);
        $("#submit").on('click',function () {
          console.log(document.forms["tform"][0].value);
          var tel = document.forms["tform"][0].value;
          var area = document.forms["tform"][1].value;
          var height=document.forms["tform"][2].value;
          var tArea=document.forms["tform"][3].value;
          var department=document.forms["tform"][4].value;
        });
      },
      mesShowAll:function () {
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>完善&修改个人信息</div>" +
          "         <div class='r_content'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>QQ号</div>" +
          "             <div class='item_value'><input placeholder='请填写qq号' value="+this.myMessage.qq+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>微信号</div>" +
          "             <div class='item_value'><input placeholder='请填写微信号' value="+this.myMessage.wechatNumber+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>爱好</div>" +
          "             <div class='item_value'><input  placeholder='请填写爱好'value="+this.myMessage.hobbies+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>体重</div>\n" +
          "             <div class='item_value'><input placeholder='请填写体重' value="+this.myMessage.weight+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>工作</div>" +
          "             <div class='item_value'><input placeholder='请填写工作' value='"+this.myMessage.major+"'></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>居住地</div>" +
          "             <div class='item_value'><input placeholder='请填写居住地' value='"+this.myMessage.nativePlace+"'></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>毕业学校</div>" +
          "             <div class='item_value'><input placeholder='请填写毕业学校' value='"+this.myMessage.graduateShcool+"'></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购房情况</div>" +
          "             <div class='item_value'><input placeholder='请填写购房情况' value='"+this.myMessage.purchaseSituation+"'></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购车情况</div>" +
          "             <div class='item_value'><input placeholder='请填写购车情况' value='"+this.myMessage.carSituation+"'></input></div>" +
          "           </div>" +
          "         </div>"+" <div class='queding' id='submit'>" +
          "           提交" +
          "         </div>";
        $("#r_box").html( boxcontext);
        $("#submit").on('click',function () {
          console.log(document.forms["tform"][0].value);
          var qq = document.forms["tform"][0].value;
          var wechatNumber = document.forms["tform"][1].value;
          var hobbies=document.forms["tform"][2].value;
          var weight=document.forms["tform"][3].value;
          var major = document.forms["tform"][4].value;
          var nativePlace = document.forms["tform"][5].value;
          var graduateShcool=document.forms["tform"][6].value;
          var purchaseSituation=document.forms["tform"][7].value;
          var carSituation=document.forms["tform"][8].value;
        });
      },
      mesShowLove:function () {
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>完善&修改择偶信息</div>" +
          "         <div class='r_content'><form name='tform'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>学历</div>" +
          "             <div class='item_value'><input placeholder='请填写择偶学历' value="+this.myMessage.tEducation+" ></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>年龄</div>" +
          "             <div class='item_value'><input placeholder='请填写择偶年龄' value="+this.myMessage.tYear+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>性格</div>" +
          "             <div class='item_value'><input  placeholder='请填写择偶性格' value="+this.myMessage.tTypes+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>居住地</div>" +
          "             <div class='item_value'><input placeholder='请填写择偶居住地' value="+this.myMessage.tArea+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>月收入</div>" +
          "             <div class='item_value'><input placeholder='请填写择偶收入' value="+this.myMessage.tMonthlyIncome+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购房情况</div>" +
          "             <div class='item_value'><input placeholder='请填写择偶购房情况' value="+this.myMessage.tPurchaseSituation+"></input></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>购车情况</div>" +
          "             <div class='item_value'><input placeholder='请填写择偶购车情况' value="+this.myMessage.tCarSituation+"></input></div>" +
          "           </div>" +
          "         </div>"+" <div class='queding' id='submit'></form>" +
          "           提交" +
          "         </div>";
        $("#r_box").html( boxcontext);
        $("#submit").on('click',function () {
          console.log(document.forms["tform"][0].value);
          var tEducation = document.forms["tform"][0].value;
          var tYear = document.forms["tform"][1].value;
          var tTypes=document.forms["tform"][2].value;
          var tArea=document.forms["tform"][3].value;
          var tMonthlyIncome=document.forms["tform"][4].value;
          var tPurchaseSituation=document.forms["tform"][5].value;
          var tCarSituation=document.forms["tform"][6].value;
        });
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
      addF:function () {
        var uNo=event.target.getAttribute("id");
        console.log(uNo);
        this.doSendfunction(2,uNo,"请求加为好友");
      },
      onOpen: function(openEvt) {
        console.log(openEvt);
      },

      onMessage:function (evt) {
        alert(evt.data);

      },
      onError:function()  {},
      onClose:function() {},

      doSendfunction (status,uNo,msg) {
        if (this.websocket.readyState == (this.websocket.OPEN==undefined?1:this.websocket.OPEN)) {

          var socketMsg={
            status:status,
            userNo:uNo,//要发送消息的用户的userId,ALL为发送给所有人
            msg:msg
          }
          this.websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
          alert("发送成功!");
        } else {
          alert("连接失败!");
        }

    }
    }



  }
</script>



<style>

  #me .top i{
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 0.5rem;
  }

  #me{
    clear: both;
    height: 100%;
    overflow: hidden;
    font-size: 0.25rem;
    z-index: 998;
  }
  #me .photo{
    margin: 0 auto;
    width: 100%;
    height: 130px;
    background:#baf7fd ;
    padding-top: 10px;

  }
  #me .photo i{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fda7f7;
    width: 2rem;
    height: 1rem;
    font-size: 0.3rem;
    position: absolute;
    top: 100px;

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
    z-index: 999;
  }
  #me .basemessage{
    position: relative;
    font-size: 0.25rem;
    border-bottom: solid #fda7f7 1px;
  }
  #me .basemessage ul li{
    height: 30px;
    line-height: 30px;
  }
  #me #left ul li i{
    font-size: 0.3rem;
    margin-left: 10px;
    color: #555;
  }
  #me #left ul li i span{
    font-size: 0.23rem;
    margin-left: 5px;
  }
  #me #left .c_title{
    padding-top:0.1rem;
    padding-bottom:0.1rem;
    color: #4db3ff;
    font-size: 0.25rem;
  }
  #me #left .basemessage .right{
    position: absolute;
    height: 100%;
    top: 0;
    right: 5px;
    display: flex;
    align-items: center;
  }
  #me #left .basemessage p{
    font-size: 0.22rem;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
  }
  #right{
    width: 0;
    height: 100vh;
    font-size: 0.25rem;
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
  #right .r_title{
    color: #fda7f7;
    margin-top: 10px;

  }
  #right .r_content .r_item{
    display: flex;
    height: 0.62rem;
    font-size: 0.22rem;
    align-items:center;
    margin-left: 0.3rem;
    border-bottom: solid 1px #fda7f7;
  }
  #right .r_content .r_item .item_name{
    width: 1rem;
  }
  #right .r_content .r_item .item_value{
    flex: 1;
  }
  #right .r_content .r_item .item_value input:focus {
    outline: 0;
    border: none;

  }
  input:hover {
    border: none;
  }

  input {
    border: none;
    background: #baf7fd;
  }
  .queding{
    font-size: 0.3rem;
    text-align: right;
    margin-top: 0.3rem;
    padding-right: 0.3rem;
  }
  .queding:hover{
    color: #fda7f7;
  }
</style>
