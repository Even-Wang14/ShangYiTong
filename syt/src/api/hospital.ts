import request from "@/utils/request";
import type { DoctorInfoData,UserResponseData,DoctorResponseData,HosDepartment,LoginData,UserLoginResponseData,WXLoginResponseData,HospitalWorkData } from "@/types";
import type { HospitalDetail} from "@/types/Register";

enum API {
    HOSPITALDETAIL_URL='/hosp/hospital/',
    // 获取医院科室数据
    HOSDEPART_URL = '/hosp/hospital/department/',
    // 获取验证码
    GETUSERCODE_URL = '/sms/send/',
    // 用户登陆接口
    USELOGIN_URL = '/user/login',
    // 获取微信扫码登陆的参数
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    // 获取某一医院的预约参数
    HOSWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    // 或去医院某一科室某一天的数据
    HOSDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    // 获取某一个账号下就诊人的信息
    GETUSER_URL = '/user/patient/auth/findAll',
    // 获取挂号医生的信息
    GETDOC_URL = '/hosp/hospital/getSchedule/'
}
// 获取医院详情接口
export const reqHosDetail = (hoscode:string)=>request.get<any,HospitalDetail>(API.HOSPITALDETAIL_URL+hoscode)
// 获取医院科室接口
export const reqHosDepart = (hoscode:string)=>request.get<any,HosDepartment>(API.HOSDEPART_URL+hoscode)
// 获取验证码
export const reqCode = (phone:string)=>request.get<any,any>(API.GETUSERCODE_URL+phone)
// 用户登陆
export const reqUserLogin = (data:LoginData) => request.post<any,UserLoginResponseData>(API.USELOGIN_URL,data)

// 获取微信扫码登陆生成二维码需要的参数接口
export const reqWxLogin = (wxRedirectUri:string) => request.get<any,WXLoginResponseData>(API.WXLOGIN_URL+`?wxRedirectUri=${wxRedirectUri}`)

// 获取预约挂号数据
export const reqHospWork = (page:number,limit:number,hoscode:string,depcode:string) => request.get<any,HospitalWorkData>(API.HOSWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`)

// 获取某天排班数据
export const reqDetailDoctor = (hoscode:string, depcode:string, workDate:string) => request.get<any,DoctorResponseData>(API.HOSDOCTOR_URL+`${hoscode}/${depcode}/${workDate}`)

// 获取某一账号下就诊人的信息
export const reqGetUser = () => request.get<any,UserResponseData>(API.GETUSER_URL);

// 获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string) => request.get<any,DoctorInfoData>(API.GETDOC_URL+scheduleId)


