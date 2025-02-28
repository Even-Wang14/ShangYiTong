<template>
    <div class="box-card">
        <!-- 实名认证组件的结构 -->
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>实名认证</span>
                </div>
            </template>
            <!-- 实名认证的提示部分 -->
            <div class="tip">
                <p>
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
                </p>
            </div>
            <!-- 卡片身体的底部:认证成功的结构、认证未成功的结构 -->
            <el-descriptions v-if="userInfo.authStatus == 1" size="small" class="margin-top" :column="1" border
                style="margin: 20px auto">
                <el-descriptions-item label-align="center" :width="30">
                    <template #label>
                        <div class="cell-item">用户姓名</div>
                    </template>
                    {{ userInfo.name }}
                </el-descriptions-item>
                <el-descriptions-item label-align="center" :width="30">
                    <template #label>
                        <div class="cell-item">证件类型</div>
                    </template>
                    {{ userInfo.certificatesType == "10" ? "身份证" : "户口本" }}
                </el-descriptions-item>
                <el-descriptions-item label-align="center" width="30px">
                    <template #label>
                        <div class="cell-item">证件号码</div>
                    </template>
                    {{ userInfo.certificatesNo }}
                </el-descriptions-item>
            </el-descriptions>
            <!-- 用户未验证的结构 -->
            <!-- label-width="80" 标签占位 -->
            <el-form v-if="userInfo.authStatus == 2" style="width: 60%; margin: 20px auto" label-width="80"
                :model="params" :rules="rules" ref="form">
                <el-form-item label="用户姓名" prop="name">
                    <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificatesType">
                    <el-select style="width: 100%" placeholder="请选择证件类型" v-model="params.certificatesType">
                        <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificatesNo">
                    <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="上传证件" prop="certificatesUrl">
                    <!-- action:upload组件向服务器提交图片路径
                        limit:照片墙约束图片个数
                        on-exceed:超出约束数量的钩子
                    -->
                    <el-upload ref="upload" list-type="picture-card" :on-remove="handleRemove"
                        :on-preview="handlePictureCardPreview" :on-success="successhandler" :on-exceed="exceedhandler"
                        :limit="1" action="/api/oss/file/fileUpload?fileHost=userAuah">
                        <img style="width: 100%; height: 100%" src="../../assets/images/auth_example.png" alt="" />
                    </el-upload>

                    <el-dialog v-model="PreviewVisable">
                        <img w-full v-if="params.certificatesUrl" style="width: 100%; height: 100%"
                            :src="params.certificatesUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="submit">提交</el-button>
                    <el-button type="primary" size="default" @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref,reactive } from "vue";
import { reqCertifi,reqCertifiType,reqUserCertation } from '@/api/user'
import { InfoFilled } from "@element-plus/icons-vue";
import type { reqCertification,UserCertification,reqCertifiTypeData,CertifiType,UserParams } from "@/types/user";
import { ElMessage } from "element-plus";
// 获取用户认证信息
let userInfo = ref<UserCertification>({} as UserCertification)
let arrType = ref<CertifiType[]>([] as CertifiType[])
let params = reactive<UserParams>({} as UserParams)
let PreviewVisable = ref<boolean>(false)
// 重置时清空以上传的文件
let upload = ref()
// 获取form组件用于验证图片上传的表单
let form = ref()
onMounted(() => {
    getCertifiInfo()
    // 获取证件类型的接口
    getType()
})
async function getCertifiInfo(){
    let result:reqCertification = await reqCertifi()
    if(result.code==200){
        userInfo.value = result.data
    }
}
async function getType(){
    let result:reqCertifiTypeData = await reqCertifiType()
    if(result.code==200){
        arrType.value=result.data
    }
}
function exceedhandler(){
    ElMessage({
        type:'error',
        message:'图片只能上传一张'
    })
}
// 图片上传成功的钩子
function successhandler(response:any) {
    //如果图片上传成功校验结果清除
    form.value.clearValidate('certificatesUrl');
      //收集上传成功图片地址
    //response:上传图片请求服务器返回的数据
    //uploadFile上传文件对象
    params.certificatesUrl = response.data
}

function handlePictureCardPreview(){
    PreviewVisable.value = true
}

function handleRemove(){
  params.certificatesUrl = "";
}
function reset(){
    // 清除文件上传列表
    upload.value.clearFiles()
    Object.assign(params,{} as UserParams)
}

async function submit(){
    // 进行全部的表单校验
    //全部的表单校验通过返回一个成功的promise
    //如果有一个表单校验失败返回的是一个失败的promise对象,后面的语句就不在执行了    
    await form.value.validate()
    try {
        await reqUserCertation(params);
        ElMessage({
            type:'success',
            message:'认证成功'
        })
        // 认证成功以后再次获取用户信息
        getCertifiInfo()

    } catch (error) {
        ElMessage({
            type:'error',
            message:'认证失败'
        })
    }

    }

// 表单校验规则
function validName(rule: any, value: any, callBack: any){
    const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确中文姓名"));
    }
}
//证件类型校验的方法
const validType = (rule: any, value: any, callBack: any) => {
  if (value == "10" || value == "20") {
    callBack();
  } else {
    callBack(new Error("请选择证件的类型"));
  }
};

//证件号码的校验方法
const validNo = (rule: any, value: any, callBack) => {
  let sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
  let hkb = /^\d{9}$/;
  if (sfz.test(value) || hkb.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的身份证或者户口本的号码"));
  }
};
//证件照图片的
const validUrl = (rule: any, value: any, callBack: any) => {
  if (value.length) {
    callBack();
  } else {
    callBack(new Error("请上传证件照图片"));
  }
};

const rules={
    // 
    name:[{required:true, validator:validName, trigger: 'blur'}],
    certificatesType:[{required:true, validator:validType, trigger: 'blur'}],
    certificatesNo:[{required:true, validator:validNo, trigger: 'blur'}],
    certificatesUrl:[{required:true, validator:validUrl, trigger: 'blur'}],
}
</script>

<style scoped lang="scss">
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #7f7f7f;
    }
}
</style>