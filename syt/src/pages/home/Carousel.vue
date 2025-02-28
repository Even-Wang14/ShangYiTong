<template>
    <!-- 轮播图结构 -->
    <el-carousel height="350px" motion-blur>
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../assets/images/web-banner-1.png" alt="" >
      </el-carousel-item>
    </el-carousel>    
</template>

<!-- <script setup>

</script> -->

<style lang="scss" scoped>
img{
  width: 100%;
  height: 350px;
}
</style>