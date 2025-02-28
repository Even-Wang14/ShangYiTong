<template>
  <div>
    <!-- 首页轮播图的结构 -->
    <Carousel />
    <!-- 首页医院搜索表单 -->
    <Search />
    <!-- 展示医院的结构 -->
    <el-row :gutter=20>
      <el-col :span="20">
        <!-- Level Component -->
        <Level @getLevel="getLevel"/>
        <!-- Region Component -->
        <Region @getRegion="getRegion"/>
        <!-- Show Hospital -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item"/>
        </div>
        <el-empty description="暂无数据" v-else/>
        <!-- pagination -->
        <!-- 可以根据自身喜好调整layout -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]" :background="true"
          layout="sizes, prev, pager, next, -> ,total, jumper" 
          :total="total" @@update:page-size="sizeChange"
          @update:current-page="currentChange" />
      </el-col>
      <el-col :span="4">
        <Tip/>
      </el-col>
    </el-row>
  </div>

</template>

<script setup lang="ts">
// 引入轮播图组件
import Carousel from './Carousel.vue'
// 引入首页搜索组件
import Search from './Search.vue'
// 引入首页医院等级
import Level from './Level.vue'
// 引入地区组件
import Region from './Region.vue'
// 引入医院信息
import Card from './Card.vue'
// 引入右侧组件
import Tip from './Tip.vue'
import {reqHospital} from '@/api/home.ts'
// 分页器 所需数据
import {ref, onMounted} from 'vue'
import type { Content,HospitalResponseData } from '../../types'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
// 存储已有的医院数据
let hasHospitalArr = ref<Content>([])
// 存储已有医院总个数
let total = ref(10)
// 存储医院等级
let hostype = ref<string>('')
// 存储医院地区
let districtCode = ref<string>('')
// 组件挂载完毕发送一次请求
onMounted(() => {
  getHospitalInfo()
})
// function getHospitalInfo() { // 不是用于调用的函数 不这么写
const getHospitalInfo = async() => {
    // 获取医院数据，默认获取第一页，一页10个
    // 这里filter了没有与月时间的数据
    let result:HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
    if(result.code == 200){
      let temple = result.data.content
      
      temple = temple.filter(function(hospitalInfo) {
        return hospitalInfo.bookingRule?.releaseTime;
          });
      hasHospitalArr.value = temple
      // total.value = temple.length
      total.value = result.data.totalElements
    }else{
      
    }
  }
// 分页器页码变化时触发
function currentChange() {
  getHospitalInfo()
}
// const currentChange = () => {
//   getHospitalInfo()
// }

// 下拉菜单变化时
function sizeChange(){
  // 自动回到第一页，不写api也会自动回到
  pageNo.value = 1
  getHospitalInfo()
}
// 子组件的自定义事件

function getLevel(level:string){
  // 保存请求参数
  hostype.value = level
  // 再次发请求，查询相关level数据
  getHospitalInfo()
}


function getRegion(level:string){
  // 保存请求参数
  districtCode.value = level
  // 再次发请求，查询相关level数据
  getHospitalInfo()
}
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>