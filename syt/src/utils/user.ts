// 将存储本地用户信息的方法模块化
export const SET_TOKEN = (userInfo:string)=>{
    localStorage.setItem('USERINFO',userInfo)
}

// 得到存储的数据
export const GET_TOKEN = () => {
    
    return localStorage.getItem('USERINFO')
}

// 清空本地存储用户相关的数据token

export const REMOVE_TOKEN = () => {
    localStorage.removeItem('USERINFO')
}
