<template>
    <div class="continer">
        <h2 class="tip"> 确认挂号信息</h2>
        <el-card class="box-card">
            <!-- 卡片的头部 -->
            <template #header>
                <div class="card-header">
                    <span>选择就诊人</span>
                    <el-button type="primary" @click="goUser">
                        <svg t="1712123736927" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="10085" width="20" height="20">
                            <path
                                d="M735.444775 810.6672h-372.479069a79.359802 79.359802 0 0 1-78.76247-79.701134c0-43.946557 35.327912-79.743801 78.76247-79.743801h372.479069c43.434558 0 78.719803 35.797244 78.719803 79.743801S778.879333 810.6672 735.444775 810.6672M347.392412 343.596368c0-25.983935 7.93598-51.029206 22.954609-72.490486A137.556989 137.556989 0 0 1 483.328072 213.33536c28.885261 0 55.893194 9.514643 78.677136 25.17327-2.60266-0.128-5.162654-0.469332-7.80798-0.469332-59.306518 0-114.60238 28.415929-147.924964 75.989144a168.020913 168.020913 0 0 0-30.719923 96.938424c0 4.735988 1.109331 9.17331 1.49333 13.823965a126.421017 126.421017 0 0 1-29.653259-81.194463m388.052363 264.959337h-372.479069c-64.853171 0-117.503706 51.626538-120.789031 116.181043A80.042467 80.042467 0 0 1 213.33408 663.595568c0-43.989223 35.327912-79.701134 78.719803-79.701134h256.426026c0.682665 0 1.23733-0.341332 1.877328-0.383999 1.279997 0 2.517327 0.383999 3.839991 0.383999 73.045151 0 138.026322-42.325228 165.546253-107.818398a21.33328 21.33328 0 1 0-39.338569-16.511958c-20.821281 49.578543-70.399824 81.663796-126.207684 81.663796-74.922479 0-135.93566-58.453187-135.93566-130.261008 0-25.941268 7.93598-50.986539 22.954609-72.490486a137.556989 137.556989 0 0 1 112.981051-57.770522c45.39722 0 87.637114 21.589279 112.981051 57.727856 5.247987 7.466648 9.685309 15.530628 13.183967 23.893274a21.33328 21.33328 0 0 0 39.338568-16.597292 170.239574 170.239574 0 0 0-17.621289-31.786588 176.596892 176.596892 0 0 0-67.413165-57.17319 20.394616 20.394616 0 0 0-3.455991-10.197308A180.308883 180.308883 0 0 0 483.328072 170.6688c-59.306518 0-114.60238 28.415929-147.882297 75.946477a168.106246 168.106246 0 0 0-30.719923 96.981091c0 64.341172 36.437242 122.623693 95.103762 152.746284 10.111975 17.023957 22.954609 32.085253 38.186571 44.885222H292.053883C225.152717 541.227874 170.66752 596.09707 170.66752 663.595568c0 51.455871 32.298586 97.749089 80.298466 115.157045l0.298666 0.085333A121.599696 121.599696 0 0 0 362.965706 853.33376h372.479069c66.943833 0 121.386363-54.911863 121.386363-122.367694 0-67.498498-54.442531-122.410361-121.386363-122.410361"
                                fill="#3C405D" p-id="10086"></path>
                        </svg>
                        添加就诊人
                    </el-button>
                </div>
            </template>
            <!-- 卡片中间 展示就诊人信息 -->
            <div class="user">
                <Visitor @click="changeIndex(index)" class="item" v-for="(user,index) in userArr" :key="user.id" :user="user" :index="index" :currentIndex="currentIndex" />
            </div>
        </el-card>
        <!-- 底部医院信息展示 -->
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 展示医生信息 -->
            <el-descriptions class="margin-top" :column="2" border >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期
                        </div>
                    </template>
                    {{ docInfo.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院
                        </div>
                    </template>
                    {{ docInfo.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室
                        </div>
                    </template>
                    {{ docInfo.param?.depname }}
                </el-descriptions-item>                 
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生
                        </div>
                    </template>
                    {{ docInfo.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称
                        </div>
                    </template>
                    {{ docInfo.title }}
                </el-descriptions-item>                
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长
                        </div>
                    </template>
                    {{ docInfo.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            挂号费
                        </div>
                    </template>
                    {{ docInfo.amount }}
                </el-descriptions-item>
                                                               
            </el-descriptions>
        </el-card>
        <!-- 确认挂号 -->
        <div class="btn">
            <el-button type="primary" :disabled="currentIndex==-1?true:false" @click="submitOrder">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqGetUser,reqDoctorInfo } from '@/api/hospital'
import { reqSubmitOrder } from '@/api/user'
import { onMounted,ref } from 'vue';
import type { DoctorInfoData,UserResponseData,UserArr,Doctor } from '@/types'
import type { SubmitOrder } from '@/types/user'
import { useRoute,useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
let route = useRoute()
let router = useRouter()
let userArr = ref<UserArr>([])
let docInfo = ref<Doctor>({})
// 存储用户选择的就诊人信息的索引值
let currentIndex = ref<number>(-1)
onMounted(() => {
    // 获取就诊人信息
    fetchUserData()
    // 获取医生信息
    fetchDocInfo()
})

function changeIndex(index:number){
    currentIndex.value = index
    console.log(currentIndex.value,index);
}

async function fetchUserData(){
   let result:UserResponseData = await reqGetUser();
   console.log(result);
   if( result.code == 200){
        userArr.value = result.data
        // console.log(userArr.value,'useruser');
   }
}

async function fetchDocInfo() {
    let result:DoctorInfoData = await reqDoctorInfo(route.query.docId as string)
    // console.log(result,'docdoc');
    if (result.code==200){
        docInfo.value = result.data
    }
}

// 确定挂号按钮
async function submitOrder(){
    let hoscode = docInfo.value.hoscode
    let scheduleId = docInfo.value.id
    let patientId = userArr.value[currentIndex.value].id
    // 提交订单
    let result:SubmitOrder = await reqSubmitOrder(hoscode,scheduleId,patientId)
    // console.log(result);
    if (result.code==200){
        router.push({path:'/user/order',query:{orderId:result.data}})
    }else{
        ElMessage({
            type:'error',
            message:result.message
        })
    }
    
}

const goUser = () => {
    router.push({path:'user/patient',query:{type:'add'}})
}

</script>

<style lang="scss" scoped>
.continer {
    margin: 10px 20px;

    .tip {
        padding: 10px;
        font-weight: bold;
        color: #7f7f7f;
        margin-top: 10px;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 33%;
                margin: 5px 15px 5px 5px;
            }
        }
    }
    .btn{
        display: flex;
        justify-content: center;
        margin: 10px 5px;
        padding: 5px;
    }
}
</style>
