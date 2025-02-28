
export interface ResponseData{
    'code':number,
    'message':string,
    'ok':boolean
}
// 提交订单接口返回数据类型的ts
export interface SubmitOrder extends ResponseData{
    data:number
}
// 订单详情
export interface OrderData {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: {
        orderStatusString: string
      }
    userId: number
    outTradeNo: string
    hoscode: string
    hosname: string
    depcode: string
    depname: string
    scheduleId: string
    title: string
    reserveDate: string
    reserveTime: number
    patientId: number
    patientName: string
    patientPhone: string
    hosRecordId: string
    number: number
    fetchTime: string
    fetchAddress: string
    amount: number
    quitTime: string
    orderStatus: number
  }
// 订单接口返回的数据类型
export interface OrderResponseData extends ResponseData{
    data:OrderData
}

// 获取二维码接口返回的数据
export interface PayInfo {
    codeUrl: string
    orderId: number
    totalFee: number
    resultCode: string
  }
export interface QRData extends ResponseData{
    data:PayInfo
}

// 查询支付结果
export interface PayResult extends ResponseData{
    data:boolean
}

// 实名认证数据类型
export interface UserCertification{
        id: number
        createTime: string
        updateTime: string
        isDeleted: number
        param: {}
        openid: null
        nickName: null
        phone: string
        name: string
        certificatesType: string
        certificatesNo: string
        certificatesUrl: null
        authStatus: number
        status: number
}

export interface reqCertification extends ResponseData{
    data:UserCertification
}

// 证件类型
export interface CertifiType {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: {}
    parentId: number
    name: string
    value: string
    dictCode: string
    hasChildren: boolean
  }

export interface reqCertifiTypeData extends ResponseData{
    data:CertifiType[]
}
// 用户认证携带的参数
export interface UserParams {
    certificatesNo: string
    certificatesType: string
    certificatesUrl: string
    name: string
  }

// 用户所有订单列表
export interface AllOrderData {
    records: Record[]
    total: number
    size: number
    current: number
    orders: any[]
    hitCount: boolean
    searchCount: boolean
    pages: number
  }
  
export interface Record {
id: number
createTime: string
updateTime: string
isDeleted: number
param: {
    orderStatusString: string
    }
userId: number
outTradeNo: string
hoscode: string
hosname: string
depcode: string
depname: string
scheduleId: any
title: string
reserveDate: string
reserveTime: number
patientId: number
patientName: string
patientPhone: string
hosRecordId: string
number: number
fetchTime: string
fetchAddress: string
amount: number
quitTime: string
orderStatus: number
}
  
export type Records = Record[]
// 用户所有订单列表的ts类型
export interface UserOrderInfoResData extends ResponseData{
    data:AllOrderData
}

export interface User {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: Param
    userId: number
    name: string
    certificatesType: string
    certificatesNo: string
    sex: number
    birthdate: string
    phone: string
    isMarry: number
    provinceCode: string
    cityCode: string
    districtCode: string
    address: string
    contactsName: string
    contactsCertificatesType: string
    contactsCertificatesNo: string
    contactsPhone: string
    isInsure: number
    cardNo: any
    status: string
  }
  
  export interface Param {
    certificatesTypeString: string
    contactsCertificatesTypeString: any
    cityString: string
    fullAddress: string
    districtString: string
    provinceString: string
  }
  
// 获取全部就诊人的信息
export type AllUser = User[]

export interface AllUserResponse extends ResponseData{
    data:AllUser
}
export interface OrderState {
        comment: string
        status: number
}

export interface AllOrderStatusResponse extends ResponseData{
    data:OrderState[]
}

// 新增/修改就诊人
export interface AddOrUpdateUser{
    id?: string,
    name: string,
    certificatesType: string,
    certificatesNo:string,
    sex:number,
    birthdate:string,
    phone:string,
    isMarry:number,
    isInsure:number,
    addressSelected:string[],
    address:string,
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string
  }

