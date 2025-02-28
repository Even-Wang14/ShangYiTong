import { defineStore } from "pinia";
// pinia仓库有选择式和组合式两种写法
import {reqHosDetail, reqHosDepart} from '@/api/hospital'
import type { HospitalDetail, DetailState } from "@/types/Register";
import type { HosDepartment} from '@/types'
// import type { DetailState } from '@/types/Register'
const useDetailStore = defineStore('Register',{
    state: ():DetailState => {
        return {
            // 返回医院详情数据
            hosInfo: ({} as HospitalDetail),
            // 存储部门数据
            departmentArr:[]
        }
    },
    actions:{
        async getHospital(hoscode:string){
            // console.log('hoscodehoscodehoscode',hoscode);
            let result:HospitalDetail = await reqHosDetail(hoscode)
            // console.log('hoscoderesult',result);
            if(result.code==200){
                this.hosInfo = result.data;
            }
        },
        async getDepartment(hoscode:string){
            // console.log('getDepartment',hoscode);
            let result:HosDepartment = await reqHosDepart(hoscode)
            // console.log('getDepartment',result);
            if(result.code==200){
                this.departmentArr = result.data;
            }
        },
    },
    getters:{}
})

// 暴露仓库
export default useDetailStore;