// 统一管理首页模块接口
import request from "@/utils/request";
import type { HospitalResponseData,HosLevelAndRegResponseData,HospitalInfo } from "../types";
// 通过枚举管理首页模块的接口地址
enum API {
    HOSPITAL_URL = '/hosp/hospital/',
    HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
    // 根据医院关键字的名字获取数组
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
    
}
// 获取医院数据
export const reqHospital = (page: number, limit: number, hostype='',districtCode='') => request.get<any,HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
// 获取医院等级或区域数据
export const reqHospitalLevelAndRegion = (dictCode:string) => request.get<any,HosLevelAndRegResponseData>(API.HOSPITALLEVELANDREGION_URL+dictCode)
// 根据医院关键字的名字获取数组
export const reqHospitalInfo = (hosname:string) => request.get<any,HospitalInfo>(API.HOSPITALINFO_URL+hosname)
