<template>
  <div id="mytolk">
    <Scroll :on-refresh="onRefresh" :on-infinite="onInfinite" id="scoll"><div class="content">
      <div class="item" v-for="(mess,n) in tleTolk">
        <div class="it_top">
          <div class="it_img" ><img @click="showPeople" v-bind:id="mess.userNo" v-bind:src="'http://appinter.sunwoda.com'+mess.photo" width="30" height="30"/></div>
          <div class="name">{{mess.userName}}<i class="icon-minus-sign" @click="deleteMytolk(mess.messageId,n)" v-if="mess.userNo==userNo"></i></div>
        </div>
        <div class="it_content">
          <p><span @click="getTp">{{mess.type}}</span>{{mess.message}}</p>
          <div class="showImgs">
            <div class="imgItem" v-for="i in mess.pPath==null?[]:mess.pPath.split(';')" v-if="i !=''">
              <img v-bind:src="'http://appinter.sunwoda.com'+i" @click="clickImg($event)"/>
            </div>
          </div>
        </div>
        <el-collapse accordion>
          <el-collapse-item v-for="(item,m) in mess.listReply" class="it_message" :key="item.fId">
            <template slot="title">
              <div class="me_content">
                <div class="it_img"><img @click="showPeople" v-bind:id="item.pUSerNo" v-bind:src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"/></div>
                <div class="name">{{item.userName}}
                  <i><el-popover
                    placement="bottom"
                    width="250"
                    trigger="click">
                    <div style="padding: 10px">
                      <div style="padding-bottom: 5px;font-size: 0.25rem" >添加回复</div>
                      <el-input type="textarea" placeholder="期待您的神回复" v-model="replay"></el-input>
                      <div class="submessage" @click="submessage(n,m,item.userName)" v-bind:id="item.pMessageId" v-bind:fId="item.replyId">确定</div></div>
                    <i class="icon-comment"  slot="reference"></i>
                  </el-popover></i>
                  <i class="icon-minus-sign" @click="deleteMyreply(item.replyId,mess.messageId,n,m,'al')" v-if="item.pUSerNo==userNo"></i>
                </div>
                <div class="me_txt">{{item.pMessage}}</div>
              </div>
            </template>
            <div v-for="(item,s) in item.listReply">
              <div class="me_content">
                <div class="it_img"><img @click="showPeople" v-bind:id="item.pUSerNo" v-bind:src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"/></div>
                <div class="name">{{item.userName}}<span style="margin-left: 5px;margin-right: 5px">回复</span>{{item.fName}}<i>
                  <el-popover
                    placement="bottom"
                    width="250"
                    trigger="click">
                    <div style="padding: 10px">
                      <div style="padding-bottom: 5px;font-size: 0.25rem" >添加回复</div>
                      <el-input type="textarea" placeholder="期待您的神回复" v-model="replay"></el-input>
                      <div class="submessage" @click="submessage(n,m,item.userName)" v-bind:id="item.pMessageId" v-bind:fId="item.replyId">确定</div></div>
                    <i class="icon-comment"  slot="reference"></i>
                  </el-popover></i>
                  <i class="icon-minus-sign" @click="deleteMyreply(item.replyId,mess.messageId,n,m,s)" v-if="item.pUSerNo==userNo"></i>
                </div>
                <div class="me_txt">{{item.pMessage}}</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="it_bottom">
          <i class="icon-thumbs-up" @click="total"  v-bind:id="mess.messageId"><span>{{mess.total}}</span></i>
          <i class="icon-thumbs-down" @click="dTotal"  v-bind:id="mess.messageId"><span>{{mess.dTotal}}</span></i>
          <i><el-popover
            placement="bottom"
            width="250"
            trigger="click">
            <div style="padding: 10px">
              <div style="padding-bottom: 5px;font-size: 0.25rem" >添加回复</div>
              <el-input type="textarea" placeholder="期待您的神回复" v-model="replay"></el-input>
              <div class="submessage" @click="submessage(n,'bl','no')" v-bind:id="mess.messageId" v-bind:fId="0">确定</div>
            </div>
            <i class="icon-comment"  slot="reference"></i>
          </el-popover>
          </i>
        </div>
      </div>
    </div></Scroll>
    <person id="person" :myMessage="peopleMessage" :websocket="websocket"  ></person>
    <bigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></bigImg>
  </div>
</template>

<script>
  import addItem from "@/components/love/addItem.vue";
  import person from "@/components/comm/person.vue";
  import Scroll from '@/components/comm/fresh.vue';
  import bigImg from '@/components/comm/bigImg.vue';
  export default {
    name: 'hello',
    props:{
      userNo:String,
      token:String,
      websocket:WebSocket,
      myMessage:Object
    },
    data () {
      return {
        tleTolk:[],//说说的总数目
        replay:"",//回复信息内容容器
        peopleMessage:{},//获取人物信息
        counter:1,//刷新基点
        showImg:false,
        imgSrc: ''
      }
    },
    mounted: function () {
      this.getmytolk();
    },
    methods:{
      //删除我的说说
      deleteMytolk:function (messageId,n) {
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/deleteStatement.json";
          this.$http.get(href+"?token="+this.token+"&messageId="+messageId
          ).then((response) => {
            console.log(response);
            if(response.data.message=="操作成功"){
              this.tleTolk.splice(n,1);
              this.$message( {type: 'success',
                message: '删除成功成功!'});
            }
          }, (response) => {
            console.log('error');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //删除评论
      deleteMyreply:function (replyId,messId,n,m,s) {//replyId:回复的ID,messId：说说的id,n:第几条说说,m：一级回复的数量,s：二级回复的数量
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/deleteReply.json";
          this.$http.get(href+"?token="+this.token+"&replyId="+replyId
          ).then((response) => {
            console.log(response);
            if(response.data.message=="操作成功"){
              if(s=='al'){
                this.tleTolk[n].listReply.splice(m,1)
              }else {
                this.tleTolk[n].listReply[m].listReply.splice(s,1)
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              this.$message.error('删除失败');
            }

          }, (response) => {
            console.log('error');
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      clickImg(e) {//图片放大
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src;
      },
      viewImg(){//图片隐藏
        this.showImg = false;
      },
      addShow:function () {//开始添加说说
        $("#addItem").animate({height:"100vh"},"fast")
      },
      remove_add:function () {//关闭添加
        $("#addItem").animate({height:"0"},"fast")
      },
      showPeople:function () {//人物展示页面显示
        var perNo=event.target.getAttribute("id");
        this.getPeopleMemessage(perNo);
        $("#person").animate({width:"100vw"},"fast")
      },
      getTp:function () {

      },
      //评论
      submessage:function (n,m,fname) {//n:一级回复的第几条；m:二级回复的第几条；fname:回复的人姓名
        var totolkId=event.target.getAttribute("id");
        var fId=event.target.getAttribute("fId");
        console.log(totolkId+"asajks"+fId);
        console.log(n);
        console.log(m);
        console.log(fname);

        var vm=this;
        if(this.replay!=""){//评论不能为空
          var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/insertReply.json";
          vm.$http.get(href+"?pUSerNo="+this.userNo+"&token="+this.token+"&pMessage="+this.replay+"&pMessageId="+totolkId+"&fId="+fId
          ).then((response) => {
            console.log(response);
            if(response.data.message=="操作成功"){
              this.$message({type: 'success', message: '提交成功'});
              var me=response.data.dataInfo.listData[0];//返回评论的内容和id信息
              //进行其他信息封装
              me.photo=this.myMessage.photo;
              me.userName=this.myMessage.username;
              me.fName=fname;
              if(m=='bl'){//一级回复页面添加元素
                this.tleTolk[n].listReply.push(me);
              }else {
                this.tleTolk[n].listReply[m].listReply.push(me);
              }
              this.replay="";
              $(".el-popover").css("display","none");
            }else {
              this.$message('评论失败');
            }
          }, (response) => {
            console.log('error');
          });
        }else {
          this.$message('评论不能为空');
        }
      },
      //点赞
      total:function(event){
        console.log(event.target.getAttribute("id"));
        var messId=event.target.getAttribute("id");
        this.setsee(messId,1,event);
      },
      //点差
      dTotal:function (event) {
        console.log(event.target.getAttribute("id"));
        var messId=event.target.getAttribute("id");
        this.setsee(messId,-1,event);
      },
      //点赞和点差方法
      setsee:function (messId,type,event) {
        console.log( event.target.firstChild.innerHTML);
        var num=parseInt(event.target.firstChild.innerHTML);
        var vm = this;
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/thumbsUpMessage.json";
        this.$http.get(href+"?token="+this.token+"&tMessageId="+messId+"&tType="+type+"&tUserNo="+this.userNo
        ).then((response) => {
          if(response.data.statusCode=="41058"){
            this.$message('您已经点过赞');
          }else if(response.data.message=="操作成功"){
            this.$message( {type: 'success',
              message: '点赞成功!'});
            event.target.firstChild.innerHTML = num+1;
          }
          console.log(response);
        }, (response) => {
          console.log('error');
        });
      },
      //获取我的说说
      getmytolk:function () {
        var vm=this;
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findStatement.json";
        vm.$http.get(href+"?token="+this.token+"&pageSize="+10+"&page=1&userNo="+this.userNo
        ).then((response) => {
          console.log(response);
          if(response.data.dataInfo==null){
            this.$message('您还没有情感宣泄，快去添加吧');
            vm.$el.querySelector('.load-more').style.display = 'none';
          }
          else {
            if(response.data.dataInfo.listData.length<10){
              vm.$el.querySelector('.load-more').style.display = 'none';
            }
            vm.tleTolk=response.data.dataInfo.listData;
          }
        }, (response) => {
          console.log('error');
        });
      },
      //下拉刷新
      onRefresh:function(done) {
        this.getmytolk();
        this.counter=1;
        done() // call done
        this.$el.querySelector('.load-more').style.display = 'block';
      },
      //上拉加载
      onInfinite:function(done) {
        let vm = this;
        this.counter++
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findStatement.json";
        vm.$http.get(href+"?token="+this.token+"&userNo="+this.userNo+"&pageSize="+10+"&page="+this.counter).then((response) => {
          console.log(response);
          if(response.data.dataInfo==null){
            this.$el.querySelector('.load-more').style.display = 'none';
            this.$message('已经没有更多了');
          }else {
            let arr = response.data.dataInfo.listData;
            for(var i in arr){
              vm.tleTolk.push(arr[i]);
            }
            console.log(vm.tleTolk);
          }
          done() ;// call done
        }, (response) => {
          this.counter--;
          done()
          console.log('error');
        });
      },
      //获取人物信息
      getPeopleMemessage(userNO){
        let vm = this;
        vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/findLoveTheSkyUser.json?userNo='+userNO+'&token='+this.token).then((response) => {
          vm.peopleMessage=response.data.dataInfo.listData[0];
        }, (response) => {
          console.log('error');
        });
      }
    },
    components: {
      addItem,
      person,
      Scroll,
      bigImg
    }
  }
</script>


<style>
  .el-message-box{
    margin-left: 15px;
    margin-right: 15px;
    width: 90%;
  }
  #mytolk{
    font-size: 0.25rem;
  }
  #mytolk #person{
    width: 0;
    position: fixed;;
    top:0;
    background: #fff;
  }
  #mytolk #top{
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
  #mytolk #top .item{
    flex: 1;
  }
  #mytolk #top .item i{
    margin: 5px auto;
    display: block;
    width:80% ;
    height: 30px;
    line-height: 30px;
    background: #fda7f7;
    border-radius: 4px;
    color: #fff;
  }
  #mytolk #top .item:hover{
    color: #fda7f7;
  }
  #mytolk #scoll{
    margin-top:2px;
  }
  #mytolk .content{
    margin-top: 40px;
    font-size: 0.24rem;
    background: #fff9f3;
  }
  #mytolk .content .item{
    padding-top: 10px;
    border-bottom:#fff9f3 solid 2px ;
  }
  #mytolk  .content .item .it_top{
    background: #fff;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  #mytolk .content .item .it_top .it_img{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-top: 5px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    z-index: 100;
  }
  #mytolk .content .item .it_top .name{
    display: inline-block;
    height: 30px;
    float: right;
    margin-right: 30px;
    line-height: 30px;
  }
  #mytolk .content .item .it_top .name i{
    padding-left: 15px;
    font-size: 0.25rem;
    color: #bbb;
  }
  #mytolk .content .item .it_content{
    background: #fff;
    padding-top: 10px;

  }
  #mytolk .content .item .it_content p{
    padding-left: 5px;
    padding-right: 5px;
    line-height: 0.38rem;
  }
  #mytolk .content .item .it_content span{
    color: #fda7f7;
    padding-left: 5px;
    padding-right: 10px;
  }
  #mytolk .content .item .it_content .showImgs{
    display: flex;
    flex-wrap: wrap

  }
  #mytolk .content .item .it_content .showImgs .imgItem{
    flex: 1;
    padding: 0.1rem;
    overflow: hidden;
    min-width: 30vw;
    max-width: 30vw;
    width: 30vw;
    height: 30vw;
  }
  #mytolk .content .item .it_content .showImgs .imgItem img{
    display: inline-block;
    width: 30vw;
    height: 30vw;
    border: solid 1px #eeeeee;
  }
  #mytolk .content .item .it_message{
    background: #fff;
    padding-left: 5px;
    padding-right: 5px;
  }
  #mytolk .content .item .it_message .me_content{
    background: #eee;
    border-top: solid #fff 1px;

  }
  #mytolk .el-collapse {
    border: none;
  }
  #mytolk .el-collapse-item__header {
    height: 100%;
    line-height: inherit;
    padding-left: 0;
    background-color: #fff;
    color: #48576a;
    cursor: pointer;
    border-bottom: 1px solid #dfe6ec;
    font-size: 13px;
  }
  #mytolk .el-collapse-item__header>i{
    display: none;
  }
  #mytolk .content .item .it_message .me_content .it_img{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-top: 5px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
  }
  #mytolk .content .item .it_message .me_content .name{
    width:80%;
    display: inline-block;
    height: 40px;
    float: right;
    line-height: 40px;
  }
  #mytolk .content .item .it_message .me_content .name i{
    width: 50px;
    height: 40px;
    float: right;
    line-height: 40px;
    color: #aaa;
    font-size: 0.25rem;
  }
  #mytolk .content .item .it_message .me_content .me_txt{
    clear: both;
    padding-left: 5px;
    padding-right: 5px;
    line-height: 0.4rem;
  }
  #mytolk .content .item .it_bottom{
    background: #fff;
    padding: 5px;
    font-size: 0.3rem;
    color: #aaa;
    display: flex;
    align-items: center;
  }
  #mytolk .content .item .it_bottom i{
    flex: 1;
    text-align: center;
  }
  #mytolk .content .item .it_bottom i span{
    font-size: 0.25rem;
  }
  .submessage{
    margin-top: 2px;
    text-align: right;
    font-size: 13px;
  }
</style>
