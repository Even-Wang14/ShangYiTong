<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button class="button" type="primary" :icon="User" @click="addUser">添加就诊人</el-button>
        </div>
      </template>
      <!-- 就诊人管理模块展示就诊人信息的结构 -->
      <div class="visitors" v-if="scene == 0">
        <Visitor @changeScene="changeScene" @deleteUser="removeUser" class="item" v-for="(user, index) in userArr"
          :key="user.id" :user="user" :index="index" />
      </div>
      <!-- 添加就诊人|修改已有的就诊人信息的结构 -->
      <div class="form" v-if="scene == 1">
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form style="width: 60%; margin: 10px auto">
          <el-form-item label="用户姓名">
            <el-input placeholder="请你输入用户姓名" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请你选择证件的类型" style="width: 100%" v-model="userParams.certificatesType">
              <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请你输入证件号码" v-model="userParams.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="userParams.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="userParams.birthdate" value-format="YYYY-MM-DD" type="date" placeholder="选择出生日期" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请你输入用户手机号码" v-model="userParams.phone"></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
        <el-form style="width: 60%; margin: 10px auto">
          <el-form-item label="婚姻状况">
            <el-radio-group v-model="userParams.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保">
            <el-radio-group v-model="userParams.isInsure">
              <el-radio :label="1">自费</el-radio>
              <el-radio :label="0">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前的住址">
            <el-cascader :props="props" v-model="userParams.addressSelected" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input placeholder="请你输入用户详细地址" v-model="userParams.address"></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form style="width: 60%; margin: 10px auto" label-width="80">
          <el-form-item label="用户姓名">
            <el-input placeholder="请你输入用户姓名" v-model="userParams.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请你选择证件的类型" style="width: 100%" v-model="userParams.contactsCertificatesType">
              <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请你输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请你输入用户手机号码" v-model="userParams.contactsPhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="submit">提交</el-button>
            <el-button type="primary" size="default" @click="reset">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetUser } from "@/api/hospital";
import { useRouter,useRoute } from "vue-router";
import { reqCertifiType,reqCity,reqAddOrUpdataUser } from "@/api/user";
import { onMounted,ref,reactive,watch } from "vue";
import { UserResponseData,UserArr } from "@/types";
import { reqCertifiTypeData,CertifiType,AddOrUpdateUser } from "@/types/user";
import { User } from "@element-plus/icons-vue";
import { ElMessage, type CascaderProps } from "element-plus";
onMounted(() => {
  // 获取所有就诊人的信息
  getAllUser()
  // 获取证件类型
  getCertifiType()
  // 判断是否从挂号组件来的,
  if(route.query.type=='edit'){
    scene.value=1
  }
  if (route.query.type == "add") {
    scene.value = 1;
  }

})
let route = useRoute()
let router = useRouter()
let scene = ref<number>(0)
let userArr = ref<UserArr>([])
let certationArr = ref<CertifiType[]>([])
let userParams = reactive<AddOrUpdateUser>({
    name: '',
    certificatesType: '',
    certificatesNo:'',
    sex:0,
    birthdate:'',
    phone:'',
    isMarry:0,
    isInsure:0,
    addressSelected:[],
    address:'',
    contactsName:'',
    contactsCertificatesType:'',
    contactsCertificatesNo:'',
    contactsPhone:''
})
// 获取全部就诊人信息
async function getAllUser(){
  let result:UserResponseData = await reqGetUser()
  if(result.code==200){
    userArr.value = result.data
  }
}

// 添加就诊人回调
function addUser(){
  // 清空历史数据
  reset()
  scene.value=1
}

const reset=() => {
  Object.assign(userParams,{
    id:null,
    name: '',
    certificatesType: '',
    certificatesNo:'',
    sex:0,
    birthdate:'',
    phone:'',
    isMarry:0,
    isInsure:0,
    addressSelected:[],
    address:'',
    contactsName:'',
    contactsCertificatesType:'',
    contactsCertificatesNo:'',
    contactsPhone:''
  })
}

function changeScene(user:AddOrUpdateUser){
  scene.value=1;
  Object.assign(userParams,user)
}

async function getCertifiType(){
  let result:reqCertifiTypeData = await reqCertifiType()
  if(result.code==200){
    certationArr.value = result.data
  }
}

// 获取地区数据
const props:CascaderProps={
  lazy: true,
  async lazyLoad(node:any, resolve) {
    let result:any = await reqCity(node.data.id||'86')
    // 整理数组
    let showData = result.data.map((item:any) => {
      return {
        label:item.name,
        value:item.value,
        leaf:!item.hasChildren,
      }
    });
    resolve(showData)
  },  
}

async function submit(){
  try {
    await reqAddOrUpdataUser(userParams)
    ElMessage({
      type:'success',
      message:userParams.id?'更新成功':'新增成功'
    })
    // 判断是从哪来的,提交成功以后去挂号界面还是就诊人管理界面
    if(route.query.type){
      router.back()
    }else{
      scene.value=0
    }
    getAllUser()
  } catch (error) {
    ElMessage({
      type:'error',
      message:userParams.id?'更新失败':'新增失败'
    })    
  }

}

// 监听就诊人数据
watch(() => userArr.value,() => {
  if(route.query.type=='edit'){
    let user = userArr.value.find(( item:any)=> {
      // 找到要更新的就诊人
      return item.id==route.query.id
    })
    Object.assign(userParams,user)
  }
})

// 子组件删除数据时调用
function removeUser(){
  getAllUser()
}
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visitors {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 32%;
    margin: 5px;
  }
}</style>