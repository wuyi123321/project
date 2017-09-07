<template>
   <div id="love">
     <div id="top">
       <div class="item">关注</div>
       <div class="item" @click="getList">推荐</div>
       <div class="item" @click="addShow"><i class="icon-plus"></i></div>
       <div class="item">图片</div>
       <div class="item" @click="mytolk">我的</div>
     </div>
     <add-item id="addItem" :userNo="userNo" :token="token"></add-item>
     <div class="content">
       <div class="item" v-for="item in tleTolk">
         <div class="it_top"><div class="it_img" ><img @click="showPeople" v-bind:id="item.userNo" v-bind:src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"/></div><div class="name">{{item.userName}}</div></div>
         <div class="it_content">
           <p><span @click="getTp">{{item.type}}</span>{{item.message}}</p>
           <div class="showImgs">
              <div class="imgItem" v-for="i in item.pPath==null?[]:item.pPath.split(';')" v-if="i !=''">
                <img v-bind:src="'http://appinter.sunwoda.com'+i" />
              </div>
           </div>
         </div>
         <el-collapse accordion>
           <el-collapse-item v-for="item in item.listReply" class="it_message" :key="item.fId">
             <template slot="title">
               <div class="me_content">
                 <div class="it_img"><img @click="showPeople" v-bind:id="item.pUSerNo" v-bind:src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"/></div>
                 <div class="name">{{item.userName}}<i>
                   <el-popover
                     placement="bottom"
                     title="添加回复"
                     width="250"
                     trigger="click">
                     <el-input type="textarea" placeholder="期待您的神回复" v-model="replay"></el-input>
                     <div class="submessage" @click="submessage" v-bind:id="item.pMessageId" v-bind:fId="item.replyId">确定</div>
                     <i class="icon-comment"  slot="reference"></i>
                   </el-popover></i></div>
                 <div class="me_txt">{{item.pMessage}}</div>
               </div>
             </template>
             <div v-for="item in item.listReply">
               <div class="me_content">
               <div class="it_img"><img @click="showPeople" v-bind:id="item.pUSerNo" v-bind:src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"/></div>
               <div class="name">{{item.userName}}<span style="margin-left: 5px;margin-right: 5px">回复</span>{{item.fName}}<i>
                 <el-popover
                   placement="bottom"
                   title="添加回复"
                   width="250"
                   trigger="click">
                   <el-input type="textarea" placeholder="期待您的神回复" v-model="replay"></el-input>
                   <div class="submessage" @click="submessage" v-bind:id="item.pMessageId" v-bind:fId="item.replyId">确定</div>
                   <i class="icon-comment"  slot="reference"></i>
                 </el-popover></i></div>
               <div class="me_txt">{{item.pMessage}}</div>
             </div>
             </div>
           </el-collapse-item>
         </el-collapse>
         <div class="it_bottom">
           <i class="icon-thumbs-up" @click="total"  v-bind:id="item.messageId"><span>{{item.total}}</span></i>
           <i class="icon-thumbs-down" @click="dTotal"  v-bind:id="item.messageId"><span>{{item.dTotal}}</span></i>
           <i><el-popover
             placement="bottom"
             title="添加回复"
             width="250"
             trigger="click">
             <el-input type="textarea" placeholder="期待您的神回复" v-model="replay"></el-input>
             <div class="submessage" @click="submessage" v-bind:id="item.messageId" v-bind:fId="0">确定</div>
           <i class="icon-comment"  slot="reference"></i>
           </el-popover>
           </i>
         </div>
       </div>
     </div>
     <person id="me" :myMessage="peopleMessage"></person>
   </div>
</template>

<script>
  import addItem from "@/components/love/addItem.vue";
  import person from "@/components/comm/person.vue";

export default {
  name: 'hello',
  props:{
    userNo:String,
    token:String,
  },
  data () {
    return {
      tleTolk:[],
      replay:"",
      peopleMessage:{},
    }
  },
  mounted: function () {
   this.getList();
  },
  methods:{
    addShow:function () {
      $("#addItem").animate({height:"100vh"},"fast")
    },
    remove_add:function () {
      $("#addItem").animate({height:"0"},"fast")
    },
    showPeople:function () {
      var perNo=event.target.getAttribute("id");
      this.getPeopleMemessage(perNo);
      $("#me").animate({width:"100vw"},"fast")
    },
    getTp:function () {

    },
    //评论
    submessage:function (event) {

      var totolkId=event.target.getAttribute("id");
      var fId=event.target.getAttribute("fId");
      console.log(totolkId+"asajks"+fId);
      var vm=this;
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/insertReply.json";
      vm.$http.get(href+"?pUSerNo="+this.userNo+"&token="+this.token+"&pMessage="+this.replay+"&pMessageId="+totolkId+"&fId="+fId
          ).then((response) => {
            console.log(response);
            this.$message('提交成功');
          }, (response) => {
           console.log('error');
          });
    },
    total:function(event){
      console.log(event.target.getAttribute("id"));
      var messId=event.target.getAttribute("id");
      this.setsee(messId,1);
    },
    dTotal:function (event) {
      console.log(event.target.getAttribute("id"));
      var messId=event.target.getAttribute("id");
      this.setsee(messId,-1);
    },

    //点赞和点差方法
    setsee:function (messId,type) {
      console.log(this.userNo+this.token);
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/thumbsUpMessage.json";
      this.$http.get(href+"?token="+this.token+"&tMessageId="+messId+"&tType="+type+"&tUserNo="+this.userNo
      ).then((response) => {
        if(response.data.statusCode=="41058"){
          this.$message('您已经点过赞');
        }else if(response.data.message=="操作成功"){
          this.$message('提交成功');
        }
        console.log(response);
      }, (response) => {
        console.log('error');
      });
    },

    //获取我的说说
    mytolk:function () {
      var vm=this;
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findStatement.json";
      vm.$http.get(href+"?token="+this.token+"&pageSize="+10+"&page=1&userNo="+this.userNo
      ).then((response) => {
        console.log(response);
        vm.tleTolk=response.data.dataInfo.listData;
        console.log(vm.tleTolk);
      }, (response) => {
        console.log('error');
      });
    },
    //获取数据
    getList:function () {
      var vm=this;
      var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findStatement.json";
      vm.$http.get(href+"?token="+this.token+"&pageSize="+10+"&page=1"
      ).then((response) => {
        console.log(response);
       vm.tleTolk=response.data.dataInfo.listData;
       console.log(vm.tleTolk);
      }, (response) => {
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
  }
}
</script>


<style>
#love{
  font-size: 0.25rem;
}
#love #me{
  width: 0;
  position: fixed;;
  top:0;
  background: #fff;
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
  #love .content{
    margin-top: 40px;
    font-size: 0.24rem;
    background: #fff9f3;
  }
  #love .content .item{
    padding-top: 10px;
    border-bottom:#fff9f3 solid 2px ;
  }
  #love  .content .item .it_top{
    background: #fff;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  #love .content .item .it_top .it_img{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-top: 5px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    z-index: 100;
  }
  #love .content .item .it_top .name{
    display: inline-block;
    height: 30px;
    float: right;
    margin-right: 50px;

    line-height: 30px;
  }
  #love .content .item .it_content{
    background: #fff;
    padding-top: 10px;

  }
  #love .content .item .it_content p{
    padding-left: 5px;
    padding-right: 5px;
    line-height: 0.38rem;
  }
  #love .content .item .it_content span{
    color: #fda7f7;
    padding-left: 5px;
    padding-right: 10px;
  }
#love .content .item .it_content .showImgs{
  display: flex;
  flex-wrap: wrap

}
#love .content .item .it_content .showImgs .imgItem{
  flex: 1;
  padding: 0.1rem;
  overflow: hidden;
  min-width: 30vw;
  max-width: 30vw;
  width: 30vw;
  height: 30vw;
}
#love .content .item .it_content .showImgs .imgItem img{
  display: inline-block;
  width: 30vw;
  height: 30vw;
  border: solid 1px #eeeeee;
}
  #love .content .item .it_message{
    background: #fff;
    padding-left: 5px;
    padding-right: 5px;
  }
  #love .content .item .it_message .me_content{
    background: #eee;
    border-top: solid #fff 1px;

  }
  #love .el-collapse {
    border: none;
  }
#love .el-collapse-item__header {
   height: 100%;
  line-height: inherit;
  padding-left: 0;
  background-color: #fff;
  color: #48576a;
  cursor: pointer;
  border-bottom: 1px solid #dfe6ec;
  font-size: 13px;
}
#love .el-collapse-item__header>i{
  display: none;
}
  #love .content .item .it_message .me_content .it_img{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-top: 5px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
  }
  #love .content .item .it_message .me_content .name{
    width:80%;
    display: inline-block;
    height: 40px;
    float: right;
    line-height: 40px;
  }
  #love .content .item .it_message .me_content .name i{
    width: 50px;
    height: 40px;
    float: right;
    line-height: 40px;
    color: #aaa;
    font-size: 0.25rem;
  }
  #love .content .item .it_message .me_content .me_txt{
    clear: both;
    padding-left: 5px;
    padding-right: 5px;
    line-height: 0.4rem;
  }
  #love .content .item .it_bottom{
    background: #fff;
    padding: 5px;
    font-size: 0.3rem;
    color: #aaa;
    display: flex;
    align-items: center;
  }
  #love .content .item .it_bottom i{
    flex: 1;
    text-align: center;
  }
  #love .content .item .it_bottom i span{
    font-size: 0.25rem;
  }
 .submessage{
     margin-top: 2px;
     text-align: right;
     font-size: 13px;
  }
</style>
