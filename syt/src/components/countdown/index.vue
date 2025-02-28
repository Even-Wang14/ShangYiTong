<template>
    <div>
        <span>获取验证码({{time}}s)</span>
    </div>
</template>

<script setup lang="ts">
// 倒计时组件
import { ref,watch } from 'vue'; 
// 接收父组件传来的props-flasg用于控制计数器组件的显示与隐藏
let props = defineProps(['flag'])
let emit = defineEmits(['getFlag'])
let time = ref<number>(5);
// 监听父组件传来的props数据变化情况
watch(() =>props.flag,() => {
    // console.log('123');
    // 开启定时器
    let timer = setInterval(() => {
        time.value--
        if (time.value ==0){
            emit('getFlag',false)
            clearInterval(timer)
        }
    },1000)},
    {
        immediate:true
    })
</script>

<style scoped lang="scss">

</style>