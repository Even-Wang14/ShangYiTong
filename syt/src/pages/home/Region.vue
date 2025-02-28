<template>
    <div class="region">
        <div class="content">
        <div class="left">
            Region:
        </div>
        <ul >
            <li :class="{active:activeFlag==''}" @click="changeRegion('')">All</li>
            <li v-for="item in regionArr" :key="item.value"
            @click="changeRegion(item.value)"
            :class="{active:activeFlag==item.value}">
            {{item.name}}</li>
        </ul>            
        </div>

    </div>
</template>

<script setup lang="ts">
  import { reqHospitalLevelAndRegion } from '@/api/home.ts';
  import type { HosLevelAndRegResponseData,HosLevelAndRegArr } from '@/types/';
  import { onMounted,ref } from 'vue';
  const emit = defineEmits(['getRegion'])
  onMounted(() => {
    getRegion();
  });
  let regionArr = ref<HosLevelAndRegArr>([])
  // 控制等级高亮的的数据
  let activeFlag = ref<string>('')
  async function getRegion(){
  let result: HosLevelAndRegResponseData = await reqHospitalLevelAndRegion(
      "Beijin"
  );
  // 存储医院等级的数据
  if (result.code == 200) {
      regionArr.value = result.data;
  }
  }
  // 点击等级高亮
  function changeRegion(level:string){
  // 高亮的响应式数据存储level
    activeFlag.value = level
    // 改变region的时候也需要将region值传回给父组件
    emit('getRegion',level)
  }  
</script>

<style scoped lang="scss">
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 50px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }

}
</style>