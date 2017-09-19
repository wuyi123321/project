<template>
  <div class="block">
    <el-carousel height="150px" width = "100%">
      <el-carousel-item v-for="item in activeImg" :key="item">
        <img src="../../assets/2.jpg" height="150px" width = "100%"/>
      </el-carousel-item>
    </el-carousel>
    <div id="nav">
      <ul @click="show_type">
        <li v-for="item in lType">{{item}}</li>
      </ul>
    </div>
    <div class="body">
      <div class="title" v-model="type"> {{type}}<span @click="changeMesage">换一批</span></div>
      <div class="content">
        <ul>
          <li v-for="item in peopleListin.listData" >
            <div class="img_item">
              <div class="img_show" @click="showPeople">
                <img  v-bind:src="'http://appinter.sunwoda.com'+item.photo" v-bind:id="item.userNo"/>
              </div>
              <div class="img_bottom">
                <span>{{item.area}}</span>
                <span>{{item.username}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="body">
      <div class="title">单身推荐<span @click="getvip">换一批</span></div>
      <div class="content">
        <ul>
          <li v-for="item in vipListin.listData" class="list_item">
            <div class="img_item">
              <div class="img_show" @click="showPeople">
                <img v-bind:src="'http://appinter.sunwoda.com'+item.photo" v-bind:id="item.userNo"/>
              </div>
              <div class="person_message">
                <table>
                  <tr >
                    <td style="border: none">姓名</td>
                    <td style="border: none">{{item.username}}<a href="../../../static/h5/index.html">注册</a></td>
                  </tr>
                  <tr>
                    <td>身高</td>
                    <td>{{item.height}}</td>
                  </tr>
                  <tr>
                    <td>电话</td>
                    <td>{{item.tel}}</td>
                  </tr>
                  <tr>
                    <td>籍贯</td>
                    <td>{{item.area}}</td>
                  </tr>
                  <tr>
                    <td>部门</td>
                    <td>{{item.department}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="body">
      <div class="title">特色活动</div>
      <div class="content">
        <ul>
          <li class="list_item">
            <div class="img_item">

              <div class="img_show" >
                <a href="http://mp.weixin.qq.com/s/oNME5Zj3TfJcciylsbleHg"><img src="../../assets/active.png" /></a>
              </div>
              <div class="person_message">
                <table>
                  <tr >
                    <td style="border: none">主题</td>
                    <td style="border: none">花开月正圆，我们约会吧</td>
                  </tr>
                  <tr >
                    <td>时间</td>
                    <td>2017年9月23日</td>
                  </tr>
                  <tr>
                    <td>地点</td>
                    <td>石岩（待定）</td>
                  </tr>
                  <tr>
                    <td >内容</td>
                    <td >假面联谊派对
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <person id="person" :myMessage="peopleMessage" :websocket="websocket"  ></person>
  </div>
</template>
<script>
  import person from "@/components/comm/person.vue";
  export default {
    name: 'hello',
    props:{
      peopleList:Object,
      vipList:Object,
      lType:Array,
      websocket:WebSocket,
      token:String,
      userNo:String
    },
    data () {
      return {
        activeImg:["src/assets/1.jpg","src/assets/2.jpg","src/assets/3.jpg","../assets/4.jpg"],
        peopleListin:{},
        type:"",
        vipListin:{},
        flag:1,
        flag1:1,
        peopleMessage:{}
      }
    },
    created: function(){
      this.peopleListin=this.peopleList;
      this.vipListin = this.vipList;
      this.type=this.lType[0];
      console.log(this.vipList);
    },
    methods:{
      getPeopleMemessage(userNO){
        let vm = this;
        vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/findLoveTheSkyUser.json?userNo='+userNO+'&token='+this.token).then((response) => {
          vm.peopleMessage=response.data.dataInfo.listData[0];
        }, (response) => {
          console.log('error');
        });
      },
      showPeople:function (event) {//人物展示页面显示
        var perNo=event.target.getAttribute("id");
        console.log(perNo);
        this.getPeopleMemessage(perNo);
        $("#person").animate({width:"100vw"},"fast")
      },
      show_type:function (event) {
        this.type=event.target.innerHTML;
        this.getType(3,1,this.type);
      },
      changeMesage:function () {
        this.flag++;
        this.getType(3,this.flag,this.type);
      },
      //获取不同类型的用户
      getType:function (num,page,type) {
        var vm=this;
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findUserBytypes.json";
        vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo+"&pageSize="+6+"&page="+page+"&lTypes="+type
        ).then((response) => {
          console.log(response);
          vm.peopleListin=response.data.dataInfo;
        }, (response) => {
          console.log('error');
        });
      },
      //获取推荐用户的数据
      getvip:function () {
        this.flag1++;
        var vm=this;
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findUserBytypes.json";
        vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo+"&pageSize="+3+"&page="+this.flag1+"&lTypes=推荐"
        ).then((response) => {
          console.log(response);
          vm.vipListin=response.data.dataInfo;
        }, (response) => {
          console.log('error');
        });
      }

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
      if (websocket.readyState == (websocket.OPEN==undefined?1:websocket.OPEN)) {
        var socketMsg={
          status:status,
          userNo:uNo,//要发送消息的用户的userId,ALL为发送给所有人
          msg:msg
        }
        websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
        alert("发送成功!");
      } else {
        alert("连接失败!");
      }
    },
    components: {
      person,
    }
  }
</script>
<style>
  .block #person{
    width: 0;
    position: fixed;;
    top:0;
    background: #fff;
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
    display: flex;
  }
  #nav ul li{
    flex:1;
    float: left;
    font-size: 0.25rem;
    height: 100%;
    line-height: 25px;
    text-align: center;
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
  .body .title span{
    display: inline-block;
    float: right;
    margin-right:2%;
  }
  .content ul{
    zoom:1;
    margin-top: 0.15rem;
  }
  .content ul:after{
    clear:both;
    display:block;
    content:"";
    height:0;
    overflow:hidden;
  }
  .content ul li{
    margin-left: 2%;
    width: 30vw;
    float: left;
    border: solid #eee 1px;
    margin-top:0.1rem ;
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
  }
  .list_item .img_show{
    float: left;
    border-right:solid #eee 1px;;
  }
  .list_item .img_item .person_message{
    width: 65%;
    float: right;
    background: #eee;
    font-size: 0.25rem;
    overflow: hidden;
    height: 35vw;
  }
  .person_message table{
    height: 35vw;
    width: 100%;
    text-overflow:ellipsis;
    border-top: #ffffff 1px solid;
    border-bottom: #ffffff 1px solid;
  }

  .person_message table tr{
    width: 100%;
  }
  .person_message table tr td{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding-left: 0.1rem;
    border-top: #ffffff 1px solid;
  }
  .content .img_bottom{
    height: 20px;
    line-height: 20px;
    width: 100%;
    font-size: 0.2rem;
    display: flex;
  }
  .content .img_bottom span{
    flex: 1;
    text-align: center;
  }
</style>
