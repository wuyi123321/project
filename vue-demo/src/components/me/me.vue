<template>
  <div id="me">
    <div id="left">
      <div class="top">
        <div class="photo">
          <div class="img" id="hphoto"><img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo" width="120" height="120" @click="changeImg"/></div>
          <div class="changeimg" id="changeImg">
            <i class="icon-exchange"></i>
            <span v-show="subImg" @click="submitImg">确定</span>
            <div id="smallimages" @click="det"></div>
            <div class="addImg" v-show="addImg" ><input type="file" accept="image/*" capture="camera"  id="inputfile" @change="showImg"/><i class="icon-plus"></i></div></div>
            <div class="bgound"><img v-bind:src="'http://appinter.sunwoda.com'+myMessage.photo" width="100%" height="100%"/></div>
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
        <div>
          <div class="fullMes">
            <div class="ful_key">爱好</div><div class="ful_value">{{myMessage.hobbies}}</div>
          </div>
          <div class="fullMes">
            <div class="ful_key">居住地</div><div class="ful_value">{{myMessage.nativePlace}}</div>
          </div>
          <div class="fullMes">
            <div class="ful_key">qq号码</div><div class="ful_value">{{myMessage.qq}}</div>
          </div>
        </div>
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
            <div class="ful_key">月收入</div><div class="ful_value">{{myMessage.tMonthlyIncome}}</div>
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
    <div id="blackBg3" style="display:none;width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: fixed;
    z-index: 100;color: #ffffff;text-align: center;padding-top: 50%;top: 0;font-size: 0.3rem;
">正在提交中...
      <span id="revot" style="color: #009688;display: block;margin: 20px auto;font-size: 0.25rem;border-radius: 5px;border: solid 1px #ffffff;width: 20%;height: 35px;line-height: 35px">取消上传</span>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'hello',
    props: {
      userNo:String,
      token:String,
      myMessage:Object
    },
    data () {
      return {
       flag:0,
       addImg:true,
       imgsrcs:[],
       subImg:false
      }
    },
    mounted: function () {
      for(var item in this.myMessage){
        if(this.myMessage[item]==null){
          this.myMessage[item]='';
        }
      }
    },
    methods:{
      //点击图像事件
      changeImg:function () {
        this.flag++;
        if(this.flag%2==1){
          $("#hphoto").animate({margin:"0 20px"},"fast");
          $("#changeImg").animate({width:"53%"},"slow");
          $("#changeImg")[0].style.display="block";
        }else if(this.flag%2==0){
          $("#hphoto").animate({margin:"0 36%"},"slow");
          $("#changeImg").animate({width:"0"},"fast");
        $("#changeImg")[0].style.display="none";
        }
      },
      //input改变时往页面显示选中图像事件
      showImg:function () {
        this.imgsrcs.push(document.getElementById("inputfile").files[0]);//获取表单文件往imgsrcs里加
        var src = "";
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
          src = document.getElementById("inputfile").value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
          src = window.URL.createObjectURL(document.getElementById("inputfile").files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
          src = window.URL.createObjectURL(document.getElementById("inputfile").files.item(0));
        }else {
          src = window.webkitURL.createObjectURL(document.getElementById("inputfile").files[0]);
        }
        $("#smallimages").append("<div class='cream'>" +
          "<img width='19px' height='19px' src='static/images/ic_delete.png' class='delete'>" +
          "<img class='smallimg' width='100%' height='100%' src='" + src + "'> </div>");
        console.log(this.imgsrcs);
        this.addImg = false;
        this.subImg=true;
      },
      //删除选择图像事件
      det: function (event) {//删除图片
        if (event.target.className == "delete") {
          this.imgsrcs.pop();
          event.target.parentNode.remove();
          this.addImg = true;
          this.subImg=false;
        } else {
          console.log("Aaa");
        }
      },
      //确定更改图像事件
      submitImg:function () {
        var vm=this;
        console.log(this.imgsrcs);
        var formData = new FormData();
        formData.append('token', this.token);
        formData.append('photo',this.imgsrcs[0]);
        formData.append('userNo', this.userNo);
        $.ajax({
          type: "post",
          url: "http://appinter.sunwoda.com/common/LoveTheSkyUser/updateLoveTheSkyUserByUserNoPhoto.json",
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          mimeType: "multipart/form-data",
          success: function (data) {
            var a = JSON.parse(data)
            $("#blackBg3").css("display", "none");
            console.log(a);
            if(a.message=="操作成功"){
               vm.myMessage.photo=a.dataInfo.listData[0];
              $("#hphoto").animate({margin:"0 36%"},"fast");
              $("#changeImg")[0].style.display="none";
              vm.flag=0;
              vm.imgsrcs=[];
              vm.addImg = true;
              vm.subImg=false;
              $("#smallimages").empty();
            }
          }
        });
      },
      //基本信息修改
      mesShowBase:function () {
        var vm=this;
        $("#right").animate({width:"100vw"},"fast");
        var sex;
        var osex;
        var sex1;
        var sex2;
        if(this.myMessage.gender==0){
          sex="女";
          osex="男";
          var sex1=0;
          var sex2=1;
        }else {
          sex="男";
          osex="女";
          var sex1=1;
          var sex2=0;
        }
        var boxcontext = "<div class='r_title'>修改个人基本信息</div>" +
          "         <div class='r_content'><form name='bform'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>生日</div>" +
          "             <div class='item_value'><input type='date' placeholder='请填写生日' value="+'2017-05-04'+"></input></div>" +
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
          "             <div class='item_name'>性别</div>" +
          "             <div class='item_value'><select>" +
          "                  <option value='"+sex1+"'>"+sex+"</option><option value='"+sex2+"'>"+osex+"</option>" +
          "           </select></div>" +
          "           </div>"+
          "           <div class='r_item'>" +
          "             <div class='item_name'>学历</div>" +
          "             <div class='item_value'><select value='aaaa'>" +
          "                  <option value='"+this.myMessage.education+"' selected hidden>"+this.myMessage.education+"</option>"+
          "                  <option value='专科以下'>专科以下</option><option value='专科'>专科</option><option value='本科'>本科</option>" +
          "                  <option value='研究生'>研究生</option><option value='博士'>博士</option><option value='博士以上'>博士以上</option>" +
          "           </select></div>" +
          "           </div>"+
          "           <div class='r_item'>" +
          "             <div class='item_name'>月收入</div>" +
          "             <div class='item_value'><select>" +
          "                  <option value='"+this.myMessage.monthlyIncome+"' selected hidden>"+this.myMessage.monthlyIncome+"</option>"+
          "                  <option value='3000以下'>3000以下</option><option value='3000-5000'>3000-5000</option><option value='5000-8000'>5000-8000</option>" +
          "                  <option value='8000-10000'>8000-10000</option><option value='10000以上'>10000以上</option>" +
          "           </select></div>" +
          "           </div>" +
          "         </div></form>"+" <div class='queding' id='submit'>" +
          "           提交" +
          "         </div>";
        $("#r_box").html( boxcontext);
        $("#submit").on('click',function () {
          var birthday = document.forms["bform"][0].value;
          var name = document.forms["bform"][1].value;
          var area = document.forms["bform"][2].value;
          var height=document.forms["bform"][3].value;
          var gender=document.forms["bform"][4].value;
          var education=document.forms["bform"][5].value;
          var monthlyIncome=document.forms["bform"][6].value;
          console.log(birthday);
          var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/updateLoveUserByUserNo.json";
          vm.$http.get(href+"?token="+vm.token+"&userNo="+vm.userNo+"&username="+name+"&gender="+gender+
                             "&height="+height+"&education="+education+"&monthlyIncome="+monthlyIncome+"&area="+area
          ).then((response) => {
            console.log(response);
            if(response.data.message=="操作成功"){
              $("#right").animate({width:"0"},"slow");
              vm.myMessage.username=name;
              vm.myMessage.area=area;
              vm.myMessage.height=height;
              vm.myMessage.gender=gender;
              vm.myMessage.education=education;
              vm.myMessage.monthlyIncome=monthlyIncome;
              vm.$message('修改成功');
            }else {
              vm.$message(response.data.message);
            }
          }, (response) => {
            console.log('error');
          });
        });
      },
      mesShowAll:function () {
        var vm = this;
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>完善&修改个人信息</div>" +
          "         <div class='r_content'><form name='pform'>" +
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
          "           <div class='r_item' style='height: auto'>" +
          "             <div class='item_name'>爱情宣言</div>" +
          "             <div class='item_value'>" +
          "             <textarea style='height:80px;width: 90%;margin-top:4px;background: #baf7fd' placeholder='请填写爱情宣言'>" + this.myMessage.pLanguage+
          "             </textarea></div>" +
          "           </div>" +
          "         </div></form>"+" <div class='queding' id='submit'>" +
          "           提交" +
          "         </div>";
        $("#r_box").html( boxcontext);
        $("#submit").on('click',function () {
          console.log(document.forms["pform"][0].value);
          var qq = document.forms["pform"][0].value;
          var wechatNumber = document.forms["pform"][1].value;
          var hobbies=document.forms["pform"][2].value;
          var major = document.forms["pform"][3].value;
          var nativePlace = document.forms["pform"][4].value;
          var graduateShcool=document.forms["pform"][5].value;
          var purchaseSituation=document.forms["pform"][6].value;
          var carSituation=document.forms["pform"][7].value;
          var pLanguage=document.forms["pform"][8].value;
          var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/updateLoveTheSkyUserByUserNo.json";
          vm.$http.get(href+"?token="+vm.token+"&userNo="+vm.userNo+"&qq="+qq+"&wechatNumber="+wechatNumber+
            "&hobbies="+hobbies+"&major="+major+"&nativePlace="+nativePlace+"&graduateShcool="+graduateShcool+
            "&purchaseSituation="+purchaseSituation+"&carSituation="+carSituation+"&pLanguage="+pLanguage
          ).then((response) => {
            console.log(response);
            if(response.data.message=="操作成功"){
              $("#right").animate({width:"0"},"slow");
              vm.myMessage.qq=qq;
              vm.myMessage.wechatNumber=wechatNumber;
              vm.myMessage.hobbies=hobbies;
              vm.myMessage.major=major;
              vm.myMessage.nativePlace=nativePlace;
              vm.myMessage.graduateShcool=graduateShcool;
              vm.myMessage.purchaseSituation=purchaseSituation;
              vm.myMessage.carSituation=carSituation;
              vm.myMessage.pLanguage=pLanguage;
              vm.$message('修改成功');
            }else {
              vm.$message(response.data.message);
            }
          }, (response) => {
            console.log('error');
          });
        });
      },
      mesShowLove:function () {
        var vm = this;
        $("#right").animate({width:"100vw"},"fast");
        var boxcontext = "<div class='r_title'>完善&修改择偶信息</div>" +
          "         <div class='r_content'><form name='tform'>" +
          "           <div class='r_item' >" +
          "             <div class='item_name'>学历</div>" +
          "             <div class='item_value'><select>" +
          "                  <option value='不限'>不限</option><option value='专科以上'>专科以上</option><option value='本科以上' selected>本科以上</option>" +
          "                  <option value='研究生以上'>研究生以上</option><option value='博士以上'>博士以上</option>" +
          "           </select></div>" +
          "           </div>" +
          "           <div class='r_item'>" +
          "             <div class='item_name'>年龄</div>" +
          "             <div class='item_value'><select>" +
          "                  <option value='20-25岁'>20-25岁</option><option value='25-30岁'  selected>25-30岁</option><option value='30-35岁'>30-35岁</option>" +
          "                  <option value='35-40岁'>35-40岁</option><option value='40岁以上'>40岁以上</option>" +
          "           </select></div>" +
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
          "             <div class='item_value'><select>" +
          "                  <option value='3000以下'>3000以下</option><option value='3000-5000'>3000-5000</option><option value='5000-8000' selected>5000-8000</option>" +
          "                  <option value='8000-10000'>8000-10000</option><option value='10000以上'>10000以上</option>" +
          "           </select></div>" +
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
          var href="http://appinter.sunwoda.com/common/LoveTheSkyUser/updateLoveTheSkyUserByUserNo.json";
          vm.$http.get(href+"?token="+vm.token+"&userNo="+vm.userNo+"&tEducation="+tEducation+"&tYear="+tYear+
            "&tTypes="+tTypes+"&tArea="+tArea+"&tMonthlyIncome="+tMonthlyIncome+"&tPurchaseSituation="+tPurchaseSituation+
            "&tCarSituation="+tCarSituation
          ).then((response) => {
            console.log(response);
            if(response.data.message=="操作成功"){
              $("#right").animate({width:"0"},"slow");
              vm.myMessage.tEducation=tEducation;
              vm.myMessage.tYear=tYear;
              vm.myMessage.tTypes=tTypes;
              vm.myMessage.tArea=tArea;
              vm.myMessage.tMonthlyIncome=tMonthlyIncome;
              vm.myMessage.tPurchaseSituation=tPurchaseSituation;
              vm.myMessage.tCarSituation=tCarSituation;
              vm.$message('修改成功');
            }else {
              vm.$message(response.data.message);
            }
          }, (response) => {
            console.log('error');
          });
        });
      },
      hidRight:function () {
        $("#right").animate({width:"0"},"fast")
      },
    }
  }
</script>
<style>
  #me{
    clear: both;
    height: 100%;
    overflow: hidden;
    font-size: 0.25rem;
  }
  #me .top{
    position: relative;
  }
  #me .photo{
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 130px;
    background:rgba(186,247,253,0.3);
    padding-top: 10px;
    overflow: hidden;
  }
  #me .photo .bgound{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(5px);
  }
  #me .photo .img{
    margin: 0 auto;
    width:120px ;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  #me .photo .changeimg{
    display: none;
    width: 0;
    height: 80%;
    align-content: center;
    position: absolute;
    top: 0;
    right: 0;
  }
  #me .photo .changeimg span{
    position: absolute;
    bottom: 10px;
    left: 0;
  }
  #me .photo .changeimg .addImg{
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
  #me .fullMes{
    display: flex;
    height: 0.4rem;
    align-items: center;
    font-size: 0.24rem;
    color: #333;
  }
  #me .fullMes .ful_key{
    margin-left:10px ;
    width: 1rem;
  }
  #me .fullMes .ful_value{
  flex: 1;
  }
  #me .photo .changeimg .addImg input{
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
 #me #smallimages{
    top: 20px;
    right: 20px;
    position: absolute;
    width:100px ;
    height: 100px;
    border-radius: 10px;
    border: solid #bbb 1px;
    overflow: hidden;
  }
 #me #smallimages .cream{
    width:100px ;
    height: 100px;
  }
 #me #smallimages .cream .delete{
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 600;
  }
  #me .photo .changeimg i{
    height: 100%;
    display: flex;
    align-items: center;
    color: #ffe7ff;
    font-size: 0.4rem;
  }
  #me .photo .changeimg span{
    padding: 2px;
    border: solid 1px #aaa;
    border-radius: 4px;
  }
  #me .photo .changeimg .addImg i{
    color: #999;
  }
  #me .photo .changeimg img{
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
  }
  #me .top .name{
    margin-top: -13px;
    width: 100%;
    font-size: 0.35rem;
    text-align: center;
    border-bottom: solid #fda7f7 1px;
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
  #me .basemessage .imgs{
    display: flex;
    height: 33vw;
    background: #bbb;
    justify-content: center;
    align-items: center;
  }
  #me .basemessage .imgs .imgItem:first-child{
    border-right: solid 1px #fff;
  }
  #me .basemessage .imgs .imgItem:last-child{
    border-left: solid 1px #fff;
  }
  #me .basemessage .imgs .imgItem{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  #me .basemessage .imgs .imgItem img{
    border: solid 3px #fff;
    width: 30vw;
    height: 30vw;
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
    margin-left: 0.1rem;
    padding-bottom:0.1rem;
    color: #4db3ff;
    font-size: 0.25rem;
  }
  #me #left .basemessage .right{
    position: absolute;
    height: 100%;
    top: 0;
    right:10px;
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
 #me input {
    border: none;
    background: #baf7fd;
  }
#me  select{
  width: 80%;
   outline-color:#baf7fd;
    border: none;
    background: #baf7fd;
  }
 #me select option{
    border: none;
    outline-color:#eeeeee;
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
