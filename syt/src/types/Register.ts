import {DepartmentArr} from '@/types'
// 医院详情数据类型
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface  HospitalDetail {
    bookingRule: {
        cycle:       number;
        releaseTime: string;
        stopTime:    string;
        quitDay:     number;
        quitTime:    string;
        rule:        string[];
    };
    hospital: {
        id:           string;
        createTime:   string;
        updateTime:   string;
        isDeleted:    number;
        param:        {
            hostypeString: string;
            fullAddress:   string;
        };
        hoscode:      string;
        hosname:      string;
        hostype:      string;
        provinceCode: string;
        cityCode:     string;
        districtCode: string;
        address:      string;
        logoData:     string;
        intro:        null;
        route:        string;
        status:       number;
        bookingRule:  null;
    };        
}
// 医院详情接口返回数据的TS
export interface HospitalDetail extends ResponseData{
    data:HospitalDetail
}


// 定义医院详情数据
export interface DetailState {
    hosInfo:HospitalDetail;
    departmentArr:DepartmentArr
}
