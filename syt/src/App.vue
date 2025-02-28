<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>
    <!-- component -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- bottom -->
    <HospitalBottom></HospitalBottom>
    <!-- 登陆组件 -->
    <Login/>
    <!-- 暴力重置验证数据的方法 -->
    <!-- <Login v-if="userStore.visiable"/> -->
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import {onMounted} from 'vue'
// 暴力重置验证数据的方法
import useUserStore from '@/store/modules/User';
let userStore = useUserStore()
// onMounted(() => {
//   request.get('/hosp/hospital/1/10').then((res) => {
//     console.log('app request', res);
//   })
// })
</script>
<style scoped lang="scss">
.container{
  display: flex;
  align-items: center;
  flex-direction: column;
  .content{
    margin-top: 70px;
    min-height: 700px;
    width: 1200px;
  }

}
</style>
