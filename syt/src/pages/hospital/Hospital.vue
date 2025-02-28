<template>
  <div class="hospital">
    <!-- 导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 医院信息 </span>
      </div>
      <el-menu :default-active="route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><Document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><Location /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><Setting /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>  
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 内容展示区区 -->
    <div class="content">
      <routerView></routerView>
    </div>
  </div>
</template>

<script setup lang="ts">
// 左侧菜单要用到的图标
import { onMounted } from 'vue';
import useDetailStore from '@/store/modules/HospitalDetail';
import {Document,Menu as IconMenu,Location,Setting,Search,HomeFilled} from '@element-plus/icons-vue'
import {useRouter, useRoute} from 'vue-router';
let detailStore = useDetailStore()
// 获取路由器
const router = useRouter()
// 获取路由
const route = useRoute()
function changeActive(path:string) {
  // 为了防止刷新以后数据丢失，重新跳转时也需要传参
  router.push({path,query:{hoscode:route.query.hoscode}})
}
// 组件挂载完毕后发请求获取详情数据，存储在pinia中
onMounted(() => {
  // console.log('route',route);
  detailStore.getHospital(route.query.hoscode as string)
  detailStore.getDepartment(route.query.hoscode as string)
  })
</script>

<style scoped lang="scss">
.hospital {
  display: flex;

  .menu {
    color: #7f7f7f;
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: left
  }

  .content {
    flex: 8;
  }
}
</style>