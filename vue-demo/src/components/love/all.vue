<template>
  <div id="mytolk">
    <Scroll :on-refresh="onRefresh" :on-infinite="onInfinite" id="scoll">
      <love-list :userNo="userNo"
                 :token="token"
                 :websocket="websocket"
                 :myMessage="myMessage"
                 :tleTolk="tleTolk"
                 :isadmin="isadmin"
                 v-on:ee="getPeopleMemessage"
                 v-on:bigImg="bigimg"
      >
      </love-list>
    </Scroll>

    <person id="person" :myMessage="peopleMessage" :websocket="websocket" v-if="peopleshow"  ></person>
    <bigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></bigImg>
  </div>
</template>



<script>
  import Scroll from '@/components/comm/fresh.vue';
  import loveList from '@/components/love/loveList.vue';
  import person from "@/components/comm/person.vue";
  import bigImg from '@/components/comm/bigImg.vue';
  export default {
    name: 'hello',
    props:{
      userNo:String,
      token:String,
      websocket:WebSocket,
      myMessage:Object,
      isadmin:Number
    },
    data () {
      return {
        showImg:false,
        tleTolk:[],//说说的总数目
        counter:1,//刷新基点
        peopleMessage:{},
        imgSrc:"",
        peopleshow:false
      }
    },
    mounted: function () {
      this.getmytolk();
      console.log(this.isadmin)
      console.log(this.peopleMessage)
    },
    methods:{
      bigimg(src) {//图片放大
        this.showImg = true;
        this.imgSrc = src;
      },
      viewImg(){//图片隐藏
        this.showImg = false;
      },
      //获取我的说说
      getmytolk:function () {
        var vm=this;
        var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/findStatement.json";
        vm.$http.get(href+"?token="+this.token+"&pageSize="+10+"&page=1"
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
        vm.$http.get(href+"?token="+this.token+"&pageSize="+10+"&page="+this.counter).then((response) => {
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
      getPeopleMemessage:function(userNO){
        this.peopleshow=true;
        let vm = this;
        vm.$http.get('http://appinter.sunwoda.com/common/LoveTheSkyUser/findLoveTheSkyUser.json?userNo='+userNO+'&token='+this.token).then((response) => {
          if(response.data.message=='操作成功'){
            vm.peopleMessage=response.data.dataInfo.listData[0];
            $("#person").css("z-index","999");
            $("#person").animate({width:"100vw"},"fast");
          }else {
            this.$message({type: 'error', message: '获取数据失败'});
          }
        }, (response) => {
          console.log('error');
        });
      },
    },
    components: {
      loveList,
      Scroll,
      person,
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
    position: fixed;
    top:0;
    background: #fff;
    z-index: 999;
  }
</style>
