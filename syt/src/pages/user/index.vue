<template>
  <div class="user">
    <!-- 导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 会员中心 </span>
      </div>
      <el-menu :default-active="route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
          <el-icon><Document /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeActive('/user/order')">
          <el-icon><Location /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
          <el-icon><Setting /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>  
        <el-menu-item index="/user/profile" @click="changeActive('/user/profile')">
          <el-icon><Search /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
          <el-icon><ChatRound /></el-icon>
          <span>意见反馈</span>
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
import {Document,Menu as Location,Setting,Search,HomeFilled,ChatRound} from '@element-plus/icons-vue'
import {useRouter, useRoute} from 'vue-router';
const route = useRoute()
const router = useRouter()
function changeActive(path:string) {
  // 为了防止刷新以后数据丢失，重新跳转时也需要传参
  router.push({path,query:{hoscode:route.query.hoscode}})
}
</script>

<style scoped lang="scss">
.user {
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