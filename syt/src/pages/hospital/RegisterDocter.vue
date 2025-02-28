<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{workData.baseMap?.hosname}}</div>
            <div class="line">|</div>
            <div class="department">{{workData.baseMap?.bigname}}</div>
            <div class="dot">.</div>
            <div class="hosdepartment">{{workData.baseMap?.depname}}</div>
        </div>
        <div class="center">
            <h3 class="date">{{workData.baseMap?.workDateString}}</h3>
            <!-- 展示号源情况的 -->
            <div class="container">
                <div class="item" :class="{active:item.status==-1||item.availableNumber==-1, cur:item.workDate==workTime.workDate}" @click="changeTime(item)" v-for="item in workData.bookingScheduleList" :key="item">
                    <div class="top_c">{{item.workDate}}</div>
                    <div class="bottom">
                        <div v-if="item.status==-1">停止挂号</div>
                        <div v-if="item.status==0">
                            {{ item.availableNumber==-1?'约满了':`有号(${item.availableNumber})`  }}
                        </div>
                        <div v-if="item.status==1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page='pageNo' layout="prev, pager, next" :total="workData.total" @current-change="fetchWorkData"/>
        </div>
        <div class="doctor">
            <!-- 展示即将放号时间 -->
            <div class="will" v-if="workTime.status==1">
                <span class="time">{{ workTime.workDate }} 放号</span>
            </div>
            <!-- 展示医生结构 -->
            <div class="docitem" v-else>
                <div class="morning">
                    <div class="tip">
                        <svg t="1711959746369" class="icon" viewBox="0 0 1204 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5362" width="25" height="25"><path d="M109.37121 929.926305c0-30.113219 24.391707-54.685605 55.649228-54.685605H1037.09925c30.715483 0 55.649228 25.234877 55.649228 54.685605a54.926511 54.926511 0 0 1-55.649228 54.685605H165.020438a55.468549 55.468549 0 0 1-55.649228-54.685605z m437.003029-761.864432V54.715718a54.685605 54.685605 0 0 1 109.431437 0v113.346155a511.984943 511.984943 0 0 0-109.431437 0zM216.694721 349.885487L149.963829 283.154595a54.685605 54.685605 0 0 1 0.602264-76.668255 54.685605 54.685605 0 0 1 76.668255-0.602264l66.971798 66.730892c-28.547331 22.886046-54.685605 48.723188-77.511425 77.270519z m691.279048-77.270519l66.670666-66.730892a54.685605 54.685605 0 0 1 76.668254 0.602264c21.320159 21.380385 21.079253 56.251492 0.602265 76.668255l-66.730893 66.730892a494.037465 494.037465 0 0 0-77.210292-77.270519z m75.704631 384.124217a382.618556 382.618556 0 0 0-765.176886 0H54.685605A54.926511 54.926511 0 0 0 0 711.42479c0 29.149596 24.692839 54.685605 54.685605 54.685606h1092.507572a54.926511 54.926511 0 0 0 54.685606-54.685606 55.287869 55.287869 0 0 0-54.685606-54.685605h-163.514777z" fill="#8ccaea" p-id="5363"></path></svg>
                        <span>上午号源</span>
                    </div>
                    <div class="docinfo" v-for="doc in morningArr" :key="doc.id">
                        <div class="left">
                            <div class="info">
                                <span>{{doc.title}}</span>
                                <span>|</span>
                                <span>{{doc.docname}}</span>
                            </div>
                            <div class="skill">{{doc.skill}}</div>
                        </div>
                        <div class="right">
                            <div class="money">￥{{ doc.amount }}</div>
                            <el-button type="primary" @click="goConfirm(doc)">{{doc.availableNumber}}</el-button>
                        </div>
                    </div>
                </div>
                <div class="after">
                    <div class="tip">
                        <svg t="1711961258516" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7941" width="20" height="20"><path d="M460.692 748.152h76.087v152.174h-76.087zM824.355 582.085l-53.549 54.044L878.4 742.753l53.549-54.045-107.593-106.623zM196.94 582.073L89.347 688.697l53.549 54.044 107.592-106.623-53.548-54.045zM866.484 393.084h152.175v-76.087H866.484v76.087zM156.32 393.084v-76.087H4.176v76.087H156.32z" p-id="7942" fill="#8ccaea"></path><path d="M4.175 139.466v76.087h243.067c-32.436 49.97-50.572 108.41-50.572 168.88 0 172.148 141.178 312.21 314.724 312.21S826.12 556.582 826.12 384.434c0-60.475-18.137-118.916-50.567-168.88h243.112v-76.087H4.174z m745.851 244.961c0 130.205-107.046 236.124-238.638 236.124S272.751 514.632 272.751 384.427c0-63.688 26.388-124.546 72.317-168.88h332.624c45.935 44.323 72.334 105.192 72.334 168.88z" p-id="7943" fill="#8ccaea"></path></svg>
                        <span>下午号源</span>
                    </div>
                    <div class="docinfo" v-for="doc in afterArr" :key="doc.id">
                        <div class="left">
                            <div class="info">
                                <span>{{doc.title}}</span>
                                <span>|</span>
                                <span>{{doc.docname}}</span>
                            </div>
                            <div class="skill">{{doc.skill}}</div>
                        </div>
                        <div class="right">
                            <div class="money">￥{{ doc.amount }}</div>
                            <el-button type="primary" @click="goConfirm(doc)">{{ doc.availableNumber }}</el-button>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref,computed } from 'vue';
import { reqHospWork,reqDetailDoctor } from '@/api/hospital';
import { useRoute,useRouter } from 'vue-router';
import { HospitalWorkData,DoctorResponseData,Doctor } from '@/types';
import path from 'path';
let route = useRoute()
let router = useRouter()
// 分页器页码
let pageNo = ref<number>(1)
let limit = ref<number>(6)
let workData = ref<any>({})
// 存储排班日期
let workTime:any = ref({})
let docArr = ref<Doctor[]>([])
// 组件挂载完毕发送一次请求
onMounted(() => {
    fetchWorkData()
})
async function fetchWorkData(){
    let result:HospitalWorkData = await reqHospWork(pageNo.value,limit.value,route.query.hoscode,route.query.depcode);
    // console.log(result);
    if(result.code==200){
        workData.value = result.data
        // 存储第一天日期的数据
        workTime.value = workData.value.bookingScheduleList[0]
        getDoctorWorkData()
    }
    
}
// 获取某一天医生的排班数据
async function getDoctorWorkData(){
    let hoscode:string = route.query.hoscode as string;
    let depcode:string = route.query.depcode as string;
    let workDate:string = workTime.value.workDate;
    // 获取排班医生的数据
    let result:DoctorResponseData = await reqDetailDoctor(hoscode,depcode,workDate)
    if(result.code == 200){
        docArr.value = result.data
        console.log(result);
        
    }
    
}
function changeTime(item:any){
    workTime.value = item;
    // 再发一次获取排班数据
    getDoctorWorkData()
}

// 医生数据上午下午分开
let morningArr = computed(() => {
    return docArr.value.filter((doc:Doctor) => {
        return doc.workTime==0
    })
})
let afterArr = computed(() => {
    return docArr.value.filter((doc:Doctor) => {
        return doc.workTime==1
    })
})

// 路由跳转进入医生选择确认页面
function goConfirm(doctor:Doctor){
    router.push({path:'/hospital/register_confirm',query:{docId:doctor.id}})
}

</script>

<style scoped lang="scss">
.wrap{
    .top{
        display: flex;
        color: #7f7f7f;
        .line{
            margin: 0px 5px;
        }
        .dot{
            margin: 0 5px;
        }
    }
    .center{
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .date{
            font-weight: bold;
        }
        .container{
            display: flex;
            width: 100%;
            margin: 30px 0px;
            .item{
                cursor: pointer;
                flex: 1;
                width: 100%;
                border: 1px solid skyblue;
                margin: 0px 5px;
                transition: all 0.3s;
                &.active{
                    border: 1px solid #ccc;
                    color: #7f7f7f;
                    .top_c{
                        background-color: #ccc;
                    }
                }
                &.cur{
                    transform: scale(1.1);
                }
                .top_c{
                    background-color: #e8f2ff;
                    text-align: center;
                    line-height: 30px;
                    width: 100%;
                }
                .bottom{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                }
            }
        }
    }
    .doctor{
       .will{
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        .time{
            color: skyblue;
        }
       } 
       .docitem{
        .morning, .after{
            .tip{
                display: flex;
                align-items: center;
                span{
                    color: #7f7f7f;
                    font-weight: bold;
                }
            }
            .docinfo{
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                border-bottom: 1px solid #ccc;
                .left{
                    .info{
                        color: skyblue;
                        margin: 10px 0px;
                        span{ 
                            margin: 5px 5px;
                            font-size: 20px;
                            font-weight: bold;
                        }
                    }
                    .skill{
                        margin: 10px 0;
                        color: #7f7f7f;
                    }
                }
                .right{
                    width: 150px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .money{
                        color: #7f7f7f;
                        font-weight: bold;
                    }
                }
            }
        }
       }
    }
}
</style>