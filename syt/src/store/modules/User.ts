// 定义用户相关的请求
import { defineStore } from "pinia";
// 引入获取验证码的请求方法
import { reqCode,reqUserLogin } from "@/api/hospital";
import type { LoginData,UserLoginResponseData,UserState } from "@/types";
import { GET_TOKEN,SET_TOKEN,REMOVE_TOKEN } from "@/utils/user";
const useUserStore = defineStore('User', {
  state: ():UserState => {
    return {
      visiable: false, // 控制dialog的显示与隐藏
      code:'', //存储用户的验证码
      // userInfo:JSON.parse(localStorage.getItem('USERINFO') as string) || {}
      userInfo:JSON.parse(GET_TOKEN() as string) || {}
    }
  },
  actions:{
    async  getCode(phone:string){
      // 正常开发时不需要await
      let result:any = await reqCode(phone);
      if (result.code == 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogin(loginData:LoginData){
      let result:UserLoginResponseData = await reqUserLogin(loginData);
      // console.log(result);
      if (result.code==200){
        this.userInfo = result.data
        // 本地化存储数据
        SET_TOKEN(JSON.stringify(this.userInfo))
        // localStorage.setItem('USERINFO',JSON.stringify(this.userInfo))
        return 'ok';
      } else{
        return Promise.reject(new Error(result.message))
      }
    },
    logout(){
      // 清空仓库数据
      this.userInfo = {name:'',token:''}
      // 清空本地存储数据
      REMOVE_TOKEN();
    }
  },
  getters:{}
})

export default useUserStore