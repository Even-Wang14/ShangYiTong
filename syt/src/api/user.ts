// 引入二次封装的axios
import request from '@/utils/request'
import type {AddOrUpdateUser,AllOrderStatusResponse,AllUserResponse,SubmitOrder,OrderResponseData,QRData,PayResult,reqCertification,reqCertifiTypeData,UserParams,UserOrderInfoResData} from '@/types/user'
// 枚举地址
enum API{
    // 提交订单,获取订单号码接口
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder/',
    // 或取订单详情
    GETORDERINFO_URL='/order/orderInfo/auth/getOrderInfo/',
    // 取消订单接口
    ORDERCANCEL_URL='/order/orderInfo/auth/cancelOrder/',
    // 获取订单支付的二维码接口
    QRCODE_URL='/order/weixin/createNative/',
    // 是否支付
    PAYRESULT_URL='/order/weixin/queryPayStatus/',
    // 获取当前用户实名认证信息
    CERTIFICATION_URL='/user/auth/getUserInfo/',
    // 获取证件类型
    CERTIFITYPE_URL='/cmn/dict/findByDictCode/',
    // 会员认证
    USERCERTATION_URL='/user/auth/userAuah',
    // 获取用户订单的
    USERORDER_URL = '/order/orderInfo/auth/',
    // 获取就诊人列表
    ALLUSER_URL = '/user/patient/auth/findAll',
    // 或取订单状态
    ORDERSTATUS_URL = '/order/orderInfo/auth/getStatusList',
    // 获取地区信息
    CITY_URL = '/cmn/dict/findByParentId/',
    // 新增就诊人
    ADDUSER_URL = '/user/patient/auth/save',
    // 更新就诊人
    UPDATEUSER_URL = '/user/patient/auth/update',
    // 删除就诊人
    DELETEUSER_URL = '/user/patient/auth/remove/'
}
// 传建订单
export const reqSubmitOrder = (hoscode:string,scheduleId:string,patientId:number)=>request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
// 获取订单详情
export const reqOrderInfo = (id:string)=>request.get<any,OrderResponseData>(API.GETORDERINFO_URL+id)
// 取消订单
export const reqCancelOrder = (orderId:string)=>request.get<any,any>(API.ORDERCANCEL_URL+orderId)
// 订单支付
export const reqQRcode = (orderId:string)=>request.get<any,QRData>(API.QRCODE_URL+orderId)
// 查询订单支付状态
export const reqPayStatus = (orderId:string)=>request.get<any,PayResult>(API.PAYRESULT_URL+orderId)
// 获取实名认证信息
export const reqCertifi = ()=>request.get<any,reqCertification>(API.CERTIFICATION_URL)
// 获取证件类型
export const reqCertifiType = () => request.get<any,reqCertifiTypeData>(API.CERTIFITYPE_URL+'CertificatesType')
// 实名认证
export const reqUserCertation = (data:UserParams)=>request.post<any,any>(API.USERCERTATION_URL,data)
// 获取用户订单
export const reqUserOrderInfo = (page:number,limit:number,patientId:string,orderStatus:string)=>request.get<any,UserOrderInfoResData>(API.USERORDER_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
// 获取就诊人列表
export const reqAllPatient = ()=>request.get<any,AllUserResponse>(API.ALLUSER_URL)
// 获取订单状态
export const reqOrderStatus = ()=>request.get<any,AllOrderStatusResponse>(API.ORDERSTATUS_URL)
// 获取省市信息
export const reqCity = (parentId:string)=>request.get<any,any>(API.CITY_URL+parentId)
// 新增/更新就诊人
export const reqAddOrUpdataUser = (data:AddOrUpdateUser)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data)
    }else{
        return request.post<any,any>(API.ADDUSER_URL,data)
    }
}
// 删除就诊人
export const reqDeleteUser = (id:number)=>request.delete<any,any>(API.DELETEUSER_URL+id)


