<template>
    <div>
        <div class="info">
      <h1>{{ hosStore.hosInfo.hospital?.hosname }}听诊信息</h1>
      <el-empty description="暂无信息" />
    </div>
    </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/HospitalDetail';
let hosStore = useDetailStore()
</script>

<style scoped lang="scss">
.info {
  h1 {
    text-align: center;
    font-size: 30px;
  }
}
</style>