<template>
    <div>
        <!-- 展示订单详情 -->
        <el-card class="box-card">
            <template #header>
                <div class="detail">挂号详情</div>
            </template>
            <div class="top">
                <!-- 左侧标签 -->
                <el-tag type="success">
                    <div class="tag">
                        <span><svg t="1712479253585" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5353" width="16" height="16"><path d="M173.077333 362.666667l91.114667-214.677334a65.6 65.6 0 0 1 86.016-34.773333c11.584 4.906667 24.96 10.282667 40.896 16.448 8.277333 3.2 16.789333 6.464 27.904 10.666667 28.202667 10.709333 39.296 14.933333 46.144 17.642666l51.477333-51.669333c28.181333-28.16 74.112-27.946667 102.570667 0.533333l195.925333 195.925334c16.426667 16.426667 23.445333 38.634667 21.056 59.904H896a42.666667 42.666667 0 0 1 42.666667 42.666666v490.666667a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V405.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h45.077333z m48.96 0h39.104l169.194667-169.770667-27.328-10.389333c-11.2-4.245333-19.818667-7.530667-28.224-10.794667a1459.2 1459.2 0 0 1-42.197333-17.002667 20.522667 20.522667 0 0 0-26.901334 10.88L222.037333 362.666667z m108.842667 0h454.954667a23.509333 23.509333 0 0 0-5.290667-25.322667l-195.925333-195.925333a23.36 23.36 0 0 0-33.024-0.213334L330.88 362.666667zM128 405.333333v490.666667h768V405.333333H128z m597.333333 320a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666z m0-42.666666a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z" fill="#7cba59" p-id="5354"></path></svg></span>
                        <span>{{ orderInfo.param?.orderStatusString }}</span>
                    </div>
                </el-tag>
                <!-- 右侧二维码 -->
                <div class="right_info">
                    <img src="../../assets/images/code_app.png" alt="">
                    <div class="info">
                        <p>微信关注“北京114预约挂号”</p>
                        <p>快速挂号，轻松就医</p>
                    </div>
                </div>
            </div>
            <!-- 订单详情底部结构 -->
            <div class="bottom">
                <!-- 左侧展示订单详情信息 -->
                <div class="left">
                    <el-descriptions
                    class="margin-top"
                    :column="1"
                    border>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊人信息
                        </div>
                    </template>
                    {{ orderInfo.patientName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊日期
                        </div>
                    </template>
                    {{ orderInfo.reserveDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊医院
                        </div>
                    </template>
                    {{ orderInfo.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊科室
                        </div>
                    </template>
                    {{ orderInfo.depname }}
                    </el-descriptions-item>  
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生职称
                        </div>
                    </template>
                    {{ orderInfo.title }}
                    </el-descriptions-item> 
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item" >
                        挂号费
                        </div>
                    </template>
                    <span style="color: red;">
                        {{ orderInfo.amount }}
                    </span>
                    </el-descriptions-item> 
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        挂号订单
                        </div>
                    </template>
                    {{ orderInfo.outTradeNo }}
                    </el-descriptions-item> 
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        挂号时间
                        </div>
                    </template>
                    {{ orderInfo.createTime }}
                    </el-descriptions-item>                                                                                  
                    </el-descriptions>    
                    <div class="btn" v-if="orderInfo.orderStatus==0||orderInfo.orderStatus==1">
                        <el-popconfirm title="确定取消预约?" @confirm="cancel">
                            <template #reference>
                            <el-button type="primary">取消预约</el-button>                                                                       
                            </template>
                        </el-popconfirm>                        
                        <el-button type="primary" v-if="orderInfo.orderStatus==0" @click="payDialog">支付</el-button>                                                                       
                    </div>
                </div>
                <div class="right">
                    <el-card>
                        <template #header>
                        <div class="card-header">
                            <span>注意事项</span>
                        </div>
                        </template>
                            <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                            <p style="color: red">
                            2.【取号】就诊当天需在{{ orderInfo.fetchTime }}前
                            在医院取号，未取号视为爽约，该号不退不换；
                            </p>
                            <p>
                            3.【退号】在{{ orderInfo?.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
                            </p>
                            <p>
                            4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                            </p>
                            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
        <!-- 展示支付二维码 -->
        <!-- 对话框通过 v-model 的true false控制显示与隐藏的-->
        <el-dialog v-model="dialogVisible" title="微信支付" width="500" @close="closeDialog">
            <div class="qrcode">
                <img :src="QRUrl" alt="">
                <p>请使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <!-- 底部插槽 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closeDialog">关闭窗口</el-button>
                </div>
            </template>           
        </el-dialog>        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import {reqOrderInfo,reqCancelOrder,reqQRcode,reqPayStatus} from '@/api/user'
import { useRoute } from 'vue-router';
import type {OrderResponseData,OrderData,QRData,PayResult} from '@/types/user'
import { ElMessage } from 'element-plus';
import QRCode from 'qrcode'
let route = useRoute()
let orderInfo = ref<OrderData>({})
let dialogVisible = ref<boolean>(false)
let QRUrl = ref<string>('')
// 存储定时器的引用
let timer = ref<any>('')
onMounted(() => {
    getOrderInfo()
})
function closeDialog(){
    dialogVisible.value = false;
    clearInterval(timer.value)
}
async function getOrderInfo(){
    let result:OrderResponseData = await reqOrderInfo(route.query.orderId as string)
    // console.log(result);
    if(result.code==200){
        orderInfo.value=result.data
    }
}
// 取消订单
async function cancel(){
    try {
        // 取消预约成功
        await reqCancelOrder(route.query.orderId as string)
        getOrderInfo()
    } catch (error) {
        ElMessage({
            type:'error',
            message:'取消预约失败'
        })
    }
}
// 支付
async function payDialog(){
    dialogVisible.value = true;
    // 获取二维码信息
    let result:QRData = await reqQRcode(route.query.orderId as string)
    if(result.code==200){
        QRUrl.value = await QRCode.toDataURL(result.data.codeUrl)
        // 只要二维码出来,需要每隔几秒问一下服务器是否支付成功
        timer.value = setInterval(async() => {
           let result:PayResult = await reqPayStatus(route.query.orderId as string)
           if(result.data){
            dialogVisible.value=false;
            // 提示信息
            ElMessage({
                type:'success',
                message:'支付成功'
            });
            clearInterval(timer.value)
            getOrderInfo()
           }
        },2000)
    }
}
</script>

<style scoped lang="scss" >
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: 900;
    }
    .top{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        .tag{
            display: flex;
            justify-content: center;
            align-items: center;
            span{padding: 3px;}
        }
        .right_info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                height: 50px;
            }
            .info{
                margin-left: 10px;
                p{
                    font-style: 12px;
                    line-height: 20px;
                }
            }
        }
    }
    .bottom{
        display: flex;
        margin-top: 20px;
        .left{
            flex: 4;
            .btn{
                margin: 10px 0px;
            }
        }
        .right{
            margin-left: 20px;
            flex: 6;
            p{
                line-height: 20px;
            }
        }
    }
}
:deep(.el-dialog__body){
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
}
.qrcode{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        line-height:30px   
    }
}
</style>