<template>
    <div class="search">
        <el-autocomplete  clearable  placeholder="Please Input Hospital Name" 
        v-model="hosname" :fetch-suggestions="fetchData" 
        :trigger-on-focus="false" @select="goDetail"/>
        <el-button type="primary" plain size="default" :icon="Search">Search</el-button>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {reqHospitalInfo} from '@/api/home.ts'
import type {HospitalInfo} from '@/types'
// 收集搜索的关键字
let hosname = ref<string>('')
async function fetchData(kw:String,cb:any){
    // 用户输入完关键字会执行一次，此时发请求，获取需要展示的数据
    // trigger-on-focus 获取焦点时是否会执行
    // console.log('123123');
    let result:HospitalInfo = await reqHospitalInfo(kw)
    // 整理数据，变成组件需要的样子
    let showData = result.data.map(item=>{
        return{
            value:item.hosname,
            hoscode:item.hoscode
        }
    })
    // 给组件传输需要展示的数组
    cb(showData)
}
// 创建路由器对象
let router = useRouter()

// 点击推荐向到详情页
const goDetail = (item:any) => {
    // console.log('123',item);
    // 点击推荐项进入详情页
    router.push({path:'/hospital/register',query:{hoscode:item.hoscode}});
}

</script>

<style lang="scss" scoped>
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    // ::v-deep .el-input__wrapper{
    //     width: 600px;
    //     margin-right: 10px;
    // }
    :deep(.el-input__wrapper){
        width: 600px;
        margin-right: 10px;
    }
}
</style>