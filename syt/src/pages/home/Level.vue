<template>
  <div class="level">
    <h1>Hospital</h1>
    <div class="content">
      <div class="left">Level:</div>
      <ul class="hospital">
        <li :class='{active:activeFlag==""}' @click="changeLevel('')">All</li>
        <li v-for="level in levelArr" :key="level.value" 
            @click="changeLevel(level.value)"
            :class="{active:activeFlag==level.value}">
          {{level.name}}</li> 
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reqHospitalLevelAndRegion } from '@/api/home.ts';
  import type { HosLevelAndRegResponseData,HosLevelAndRegArr } from '@/types/';
  import { onMounted,ref } from 'vue';
  // 接收副组件传给的回调函数
  const emit = defineEmits(['getLevel'])
  onMounted(() => {
    getLevel();
  });
  // 获取医院等级数据
//   const getLevel = async () => {
//   let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion(
//     "HosType"
//   );
//   //存储医院等级的数据
//   if (result.code == 200) {
//     levelArr.value = result.data;
//   }
// };
  let levelArr = ref<HosLevelAndRegArr>([])
  // 控制等级高亮的的数据
  let activeFlag = ref<string>('')
  async function getLevel(){
    let result: HosLevelAndRegResponseData = await reqHospitalLevelAndRegion(
      "HosType"
    );
    
    // 存储医院等级的数据
    if (result.code == 200) {
      console.log(result);
      levelArr.value = result.data;
    }
  }
  // 点击等级高亮
  function changeLevel(level:string){
    // 高亮的响应式数据存储level
    activeFlag.value = level
    // 改变level的时候也需要将level值传回给父组件
    emit('getLevel',level)
  }
</script>

<style lang="scss" scoped>
.level {
  color: #7f7f7f;

  h1 {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
  }

  .content {
    display: flex;

    .left {
      margin-right: 10px;
      width: 50px;
    }

    .hospital {
      display: flex;

      li {
        margin-right: 10px;

        &.active {
          color: #55a6fe;
        }
      }
      li:hover{
        color: #55a6fe;
        cursor:pointer;

      }
    }
  }
}
</style>