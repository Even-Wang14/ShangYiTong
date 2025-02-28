// 定义首页模块TS 数据类型
// 有对应的转换接口https://tooltt.com/json2typescript/
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
export interface Param {
	hostypeString: string;
	fullAddress: string;
}

export interface BookingRule {
	cycle: number;
	releaseTime: string;
	stopTime: string;
	quitDay: number;
	quitTime: string;
	rule: string[];
}

export interface Hospital {
	id: string;
	createTime: string;
	updateTime: string;
	isDeleted: number;
	param: Param;
	hoscode: string;
	hosname: string;
	hostype: string;
	provinceCode: string;
	cityCode: string;
	districtCode: string;
	address: string;
	logoData: string;
	intro: string;
	route: string;
	status: number;
	bookingRule: BookingRule;
}

export type Content = Hospital[]

// 获取医院数组的类型
export interface Pageable {
	sort: Sort;
	pageNumber: number;
	pageSize: number;
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

export interface Sort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}

export interface HospitalResponseData extends ResponseData{
    data:{
        content:Content,
    },
    pageable: Pageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	first: boolean;
	sort: Sort;
	numberOfElements: number;
	size: number;
	number: number;
	empty: boolean;
}

// 代表医院等级或者地区数据的ts
export interface HosLevelAndReg {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": 10000,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean    
}
export type HosLevelAndRegArr = HosLevelAndReg[]
// 获取等级或者医院地接口返回的数据类型
export interface HosLevelAndRegResponseData extends ResponseData {
    data:HosLevelAndRegArr
}

// 获取医院列表数据
export interface HospitalInfo extends ResponseData {
	data:Content
}

// 医院科室数据

export interface Department {
	depcode: string;
	depname: string;
	children?: Department[];
}

// 存储科室的数据类型
export type DepartmentArr = Department[]
// 科室接口返回的数据类型
export interface HosDepartment extends ResponseData {
	data:DepartmentArr
}


// 用户登录接口需要携带的参数类型
export interface LoginData{
	phone:string,
	code:string
}

// 登陆接口返回的用户信息数据
export interface UserInfo{
	name:string,
	token:string
}

// 登陆接口返回数据的TS
export interface UserLoginResponseData extends ResponseData{
	data:UserInfo
}

// 用户相关state的数据类型定义
export interface UserState {
	visiable:boolean,
	code:string,
	userInfo:UserInfo
}

// 定义微信扫码登陆数据的TS类型
export interface WXLogin {
    "redirectUri": string,
    "appid": string,
    "scope": string,
    "state": string	
}

export interface WXLoginResponseData extends ResponseData {
	data:WXLogin
}


export interface BookingScheduleList {
	workDate: string
	workDateMd: string
	dayOfWeek: string
	docCount: number
	reservedNumber: number
	availableNumber: number
	status: number
  }
  
export interface BaseMap {
	workDateString: string
	releaseTime: string
	bigname: string
	stopTime: string
	depname: string
	hosname: string
	}

export interface HospitalWorkData extends ResponseData {
	data:{
		total: number
		bookingScheduleList: BookingScheduleList[]
		baseMap: BaseMap
	}
	}

// 医生排班数据
export interface Doctor {
	id: string
	createTime: string
	updateTime: string
	isDeleted: number
	param: {
		dayOfWeek: string
		depname: string
		hosname: string
		}
	hoscode: string
	depcode: string
	title: string
	docname: string
	skill: string
	workDate: string
	workTime: number
	reservedNumber: number
	availableNumber: number
	amount: number
	status: number
	hosScheduleId: string
	}
export interface DoctorResponseData extends ResponseData{
	data:Doctor[]
}	
	  
// 就诊人的数据类型
export interface User {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString": null,
        "fullAddress": string,
        "districtString": null,
        "provinceString": null
    },
    "userId": number,
    "name": number,
    "certificatesType": string,
    "certificatesNo": string,
    "sex": number,
    "birthdate": string,
    "phone": string,
    "isMarry": number,
    "provinceCode": null,
    "cityCode": null,
    "districtCode": null,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,
    "cardNo": null,
    "status": string
}
export type UserArr = User[];
export interface UserResponseData extends ResponseData {
    data: UserArr
}

// 获取某一个医生挂号数据的详情
export interface DoctorInfoData extends ResponseData {
	data:Doctor
}

