<template>
    <div>
        <!-- 展示全部订单的结构 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号订单</span>
                </div>
            </template>
            <!--提供用户选择的下拉菜单-->
            <el-form :inline="true">
                <el-form-item label="就诊人">
                    <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser" style="width: 240px">
                        <el-option label="请选择全部就诊人" value=""></el-option>
                        <el-option v-for="item in allUser" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="changeOrderState" style="width: 240px">
                        <el-option label="全部订单" value=""></el-option>
                        <el-option v-for="(item, index) in allOrderStatus" :key="index" :label="item.comment"
                            :value="item.status"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 表格展示订单的数据 -->
            <el-table border style="margin: 10px 0px" :data="allOrderArr">
                <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
                <el-table-column label="医院" prop="hosname"></el-table-column>
                <el-table-column label="科室" prop="depname"></el-table-column>
                <el-table-column label="医生" prop="title"></el-table-column>
                <el-table-column label="挂号费" prop="amount"></el-table-column>
                <el-table-column label="就诊人" prop="patientName"></el-table-column>
                <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button type="text" @click="goDetail(row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="totalOrder"
                @current-change="getAllOrder" @size-change="handler" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { reqUserOrderInfo,reqAllPatient,reqOrderStatus } from '@/api/user';
import { UserOrderInfoResData,Records,AllOrderStatusResponse,AllUser,AllUserResponse,OrderState } from '@/types/user';
let router = useRouter()
//当前分页器页码
let pageNo = ref<number>(1);
//当前页码展示几条数据
let pageSize = ref<number>(10);
let patientId = ref<string>('')
let orderStatus = ref<string>('')
let allOrderArr = ref<Records>([])
let totalOrder = ref<number>(0)
let allUser = ref<AllUser>([])
let allOrderStatus = ref<OrderState[]>([])
onMounted(() => {
    getAllOrder()
    getData()
})
async function getAllOrder(pager:number=1){
    pageNo.value = pager
    let result:UserOrderInfoResData = await reqUserOrderInfo(pageNo.value,pageSize.value,patientId.value,orderStatus.value)
    if(result.code==200){
        allOrderArr.value = result.data.records
        totalOrder.value = result.data.total;
    }
    
}

async function getData() {
    const result:AllUserResponse = await reqAllPatient()
    const result1:AllOrderStatusResponse = await reqOrderStatus()
    allUser.value = result.data
    allOrderStatus.value = result1.data
}

function goDetail(row:any){
    router.push({path:'/user/order',query:{orderId:row.id}})
}

function handler(pSize:number){
    pageSize.value = pSize
    getAllOrder()
}

function changeUser(){
    getAllOrder()
}

function changeOrderState(){
    getAllOrder()
}
</script>

<style scoped></style>