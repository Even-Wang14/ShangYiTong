// 对于axios进行二次封装
// 目的：1.利用axios请求，响应拦截器功能
// 目的：2.请求拦截器，一般可以在请求头中携带公共参数 token
// 目的:3.响应拦截器,简化服务器返回的数据,处理http网络错误
import axios from "axios";
import useUserStore from "@/store/modules/User";
import {ElMessage} from 'element-plus'
// 利用axios.create方法传建一个axios实例,可以设置基础路径.超时时间设置
const request = axios.create({
    baseURL:'/api', //请求基础路径设置
    timeout:5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // config :请求拦截器回调注入的对象,(配置对象需要返回),配置对象的身上最终要的一件事情headers属性
    //可以通过请求头携带公共参数-token
    let userStore = useUserStore();
    // token 公共参数，如果用户登陆了 需要携带
    if(userStore.userInfo.token){
        config.headers.token = userStore.userInfo.token
    }
    return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
    //响应拦截器成功的回调,一般会进行简化数据
    return response.data;
},(error) => {
    //处理http网络错误
    let status = error.response.request.code
    switch(status){
        case 404:
            // 错误信息提示
            ELMessage({
                type:'error',
                // message:'request fail path problem'
                message:error.message
            })
            break;
        // case 500 | 501 | 502 | 503 | 504 | 505: //写法有误应按照如下方法写
        case 500:case 501:
            ElMessage({
                type: 'error',
                message: '服务器挂了'
          })
          break;            
        case 401:
            ELMessage({
                type:'error',
                message:'参数有误'
            })
          break;
    }
    return Promise.reject(new Error(error.message))
})

//务必对外暴露axios
export default request;
