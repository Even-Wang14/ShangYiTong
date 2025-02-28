<template>
  <div class="login_container">
    <!-- v-model控制对话框的显示与隐藏 title时对话框左侧的标题 -->
    <el-dialog v-model="userStore.visiable" title="用户登陆" width="700" @close="close">
    <!-- 对话框身体部分的内容 -->
    <el-row>
      <!-- 左侧手机登陆 微信扫一扫登陆-->
      <el-col :span="12">
        <div class="login">
          <div v-show="scene == 0">
            <el-form :model="loginParam" :rules="rules" ref="form"> 
              <el-form-item prop="phone">
                <el-input placeholder="Please enter Phone Number" :prefix-icon="User" v-model="loginParam.phone"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="Please enter Verification code" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
              </el-form-item>  
              <el-form-item>
                <el-button :disabled="!isPhone||flag ? true:false" >
                  <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"/>
                  <span v-else @click="getCode">获取验证码</span>
                </el-button>
              </el-form-item>          
            </el-form>
            <el-button type="primary" size="default" style="width: 100%;" :disabled="!isPhone || loginParam.code.length<6? true : false" @click="login">用户登陆</el-button>
            <div class="bottom" @click="changeScene">
              <p>微信扫码登陆</p>
              <svg t="1710831619799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4535" width="30" height="30"><path d="M704 397.92c-15.04-140.96-151.04-251.36-316.48-251.36-176 0-317.92 124.16-317.92 277.28a267.36 267.36 0 0 0 129.12 224c8.8 5.6-29.12 85.28-19.68 90.08s28.48-11.2 48.8-26.56 39.52-29.76 48-26.88a362.56 362.56 0 0 0 112 17.44 376.16 376.16 0 0 0 57.44-4.48c36.96 84.8 133.44 145.44 246.56 145.44a305.12 305.12 0 0 0 88.16-12.96c4.48-1.28 21.76 11.36 39.2 24.16s35.36 25.76 39.68 24c13.76-5.76-25.44-69.92-12.96-77.44 65.76-40.48 108.48-105.92 108.48-180-0.16-120-111.04-217.12-250.4-222.72z m-109.12 167.2a28 28 0 1 1 27.68-28 27.84 27.84 0 0 1-27.68 28z m-165.76 54.72a204.64 204.64 0 0 0 1.44 24.32 314.72 314.72 0 0 1-42.88 2.88 302.08 302.08 0 0 1-103.36-17.76c-3.2-1.12-14.4-4.64-20.48 0a265.28 265.28 0 0 0-32 32 142.4 142.4 0 0 0 8.96-38.4c1.12-10.24-14.56-17.6-17.76-19.68a220 220 0 0 1-98.08-178.4c0-122.88 117.6-222.4 262.72-222.4 135.36 0 246.88 86.72 260.96 198.24-124.48 17.44-219.52 108.96-219.52 219.2z m331.68-54.72a28 28 0 1 1 27.68-28 27.68 27.68 0 0 1-27.68 28z" fill="#8DC81B" p-id="4536"></path><path d="M498.24 286.08a41.92 41.92 0 1 0 41.44 41.92 41.76 41.76 0 0 0-41.44-41.92zM276.96 286.08a41.92 41.92 0 1 0 41.6 41.92 41.6 41.6 0 0 0-41.6-41.92z" fill="#8DC81B" p-id="4537"></path></svg>
            </div>
          </div>
          <div class="weChat" v-show="scene ==1" >
              <!-- 在这个容器当中显示微信扫码登录页面 -->
            <div id="login_container"></div>
            <div class="phone" @click="scene =0">
              <p>手机短信验证码登陆</p>
              <svg t="1711609917059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3501" width="16" height="16"><path d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z" p-id="3502" fill="#1296db"></path></svg>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="leftContent">
          <div class="top">
            <div class="item">
              <img src="../../assets/images/code_app.png" alt="">
              <svg t="1710831619799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4535" width="16" height="16"><path d="M704 397.92c-15.04-140.96-151.04-251.36-316.48-251.36-176 0-317.92 124.16-317.92 277.28a267.36 267.36 0 0 0 129.12 224c8.8 5.6-29.12 85.28-19.68 90.08s28.48-11.2 48.8-26.56 39.52-29.76 48-26.88a362.56 362.56 0 0 0 112 17.44 376.16 376.16 0 0 0 57.44-4.48c36.96 84.8 133.44 145.44 246.56 145.44a305.12 305.12 0 0 0 88.16-12.96c4.48-1.28 21.76 11.36 39.2 24.16s35.36 25.76 39.68 24c13.76-5.76-25.44-69.92-12.96-77.44 65.76-40.48 108.48-105.92 108.48-180-0.16-120-111.04-217.12-250.4-222.72z m-109.12 167.2a28 28 0 1 1 27.68-28 27.84 27.84 0 0 1-27.68 28z m-165.76 54.72a204.64 204.64 0 0 0 1.44 24.32 314.72 314.72 0 0 1-42.88 2.88 302.08 302.08 0 0 1-103.36-17.76c-3.2-1.12-14.4-4.64-20.48 0a265.28 265.28 0 0 0-32 32 142.4 142.4 0 0 0 8.96-38.4c1.12-10.24-14.56-17.6-17.76-19.68a220 220 0 0 1-98.08-178.4c0-122.88 117.6-222.4 262.72-222.4 135.36 0 246.88 86.72 260.96 198.24-124.48 17.44-219.52 108.96-219.52 219.2z m331.68-54.72a28 28 0 1 1 27.68-28 27.68 27.68 0 0 1-27.68 28z" fill="#bfbfbf" p-id="4536"></path><path d="M498.24 286.08a41.92 41.92 0 1 0 41.44 41.92 41.76 41.76 0 0 0-41.44-41.92zM276.96 286.08a41.92 41.92 0 1 0 41.6 41.92 41.6 41.6 0 0 0-41.6-41.92z" fill="#bfbfbf" p-id="4537"></path></svg>
              <p>微信扫一扫关注</p>
              <p>“快速预约挂号”</p>
            </div>
            <div class="item">
              <img src="../../assets/images/code_login_wechat.png" alt="">
              <svg t="1710832389161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5847" width="16" height="16"><path d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z" p-id="5848"></path></svg>
              <p>扫一扫下载</p>
              <p>“预约挂号”APP</p>
            </div>
          </div>
        </div>
        <p class="tip">SYT官方指定平台</p>
        <p class="tip">快速挂号 安全放心</p>
      </el-col>
    </el-row>
    <template #footer >
      <el-button type="primary" size="default" @click="userStore.visiable = false">关闭窗口</el-button>
    </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
// 引入微信扫吗登录参数请求
import {reqWxLogin} from '@/api/hospital'
import { useRoute,useRouter } from 'vue-router';
// 获取user仓库的visiable参数可以控制dialog对话框的显示与隐藏
import {reactive, ref, computed} from 'vue'
import CountDown from '@/components/countdown/index.vue'
import useUserStore from '@/store/modules/User';
import { User,Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import type {WXLoginResponseData} from '@/types/'
let userStore = useUserStore()
let route = useRoute()
let router = useRouter()
// 定义一个数据，控制倒计时组件的显示和隐藏
let flag = ref<boolean>(false) // flag为真，开启倒计时  flag 为假 不是倒计时
// console.log('userStore' ,userStore);
let scene = ref<number>(0) // 0代表手机号码登陆 1代表扫马登陆
// 点击微信扫码登陆
async function changeScene(){
  scene.value = 1;
  // 向SGG的后端发请求获取微信扫码需要参数,
  let redirect_URL = encodeURIComponent(window.location.origin+'/wxlogin') // 传给服务器的参数需要编码
  let result:WXLoginResponseData = await reqWxLogin(redirect_URL);
  // 生成微信扫码登陆的二维码页面
  // console.log(result);
  // @ts-ignore
  new WxLogin({
  self_redirect:false,
  id:"login_container", 
  appid: result.data.appid, 
  scope: "snsapi_login", 
  redirect_uri: result.data.redirectUri,
  state: result.data.state,
  style: "",
  href: ""
  });  
}
let loginParam = reactive({
  phone:'',
  code:''
})
console.log(loginParam);

// 计算手机号码是否符合正则
let isPhone = computed(() => {
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  // 返回布尔值，真为手机号码，假不是
  return reg.test(loginParam.phone);
})
// 获取验证码
async function getCode() {
  // 开启倒计时
  flag.value = true
  // 通知pina仓库存储验证码
  try {
    // 获取验证码成功
    await userStore.getCode(loginParam.phone);
    loginParam.code = userStore.code
  } catch (error) {
    // 获取验证码失败
    
  }
  
}
// 获取flag信息
function getFlag(val:boolean){
  // 当倒计时为0 时切换回原来的获取验证码span
  // console.log(val);
  flag.value = val
}
// 获取form组件实例
let form = ref<any>()

// 关闭时清掉数据
function close(){
  Object.assign(loginParam,{phone:'',code:''});
  // 清除表单验证数据
  form.value.resetFields()
}

// login
async function login(){
  // 验证表单是否正确
  // console.log(form.value, 'loguh');
  await form.value.validate()
  // 发起登陆请求
  // 登陆成功,展示登陆信息
  // 登陆失败,发送错取请求
  // userStore.userLogin(loginParam)

  try {
    await userStore.userLogin(loginParam)
    userStore.visiable = false
    let redirect = route.query.redirect
    if(redirect){
      router.push(redirect as string)
    }else{
      router.push('/home')
    }
  } catch (error) {
    ElMessage({
      type:'error',
      message:(error as Error).message
    })
  }
}
// 表单校验规则

// 手机号码自定义校验
function validPhone(rule:any, value:any, callBack:any) {
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  // 返回布尔值，真为手机号码，假不是
  if (reg.test(value)) {
    callBack()
  } else {
    callBack(new Error('手机号码格式不正确'))
  }
}
// 验证码自定义校验
function validCode(rule:any, value:any, callBack:any) {
  // 返回布尔值，真为手机号码，假不是
  console.log(value);
  
  if (/^\d{6}$/.test(value)) {
    callBack()
  } else {
    callBack(new Error('验证码格式不正确'))
  }
}

const rules = {
  // trigger什么时候校验表单,change 变化是校验, blur 失去焦点检验
  // phone:[{required:true,message:'手机号码格式措误',trigger:'blur',min:11}]
  // 自定义校验
  phone:[{validator: validPhone, trigger: 'change'}],
  code:[{validator: validCode, trigger: 'change'}]
}
</script>


<style scoped lang="scss">
.login_container{
  :deep(.el-dialog__body){
    padding: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .login{
    padding: 20px;
    border: 1px solid #ccc; 
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin: 10px 0px;
      }
    }
    .weChat {
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        margin: 10px 0;
      }
    }
  }
  .leftContent {
    .top{
      display: flex;
      justify-content: space-around;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 60%;
        }
        p{
          margin: 5px 0;
        }
      }
    }
  }
  .tip{
    text-align: center;
    margin:20px 0;
    font-size: 20px;
    font-weight: bold
    ;
  }
}
</style>