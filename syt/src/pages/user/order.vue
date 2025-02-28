<template>
    <div>
        <div v-if="route.query.orderId">
            <OrderDetail/>
        </div>
        <div v-else>
            <OrderAll/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import OrderAll from '@/pages/user/OrderAll.vue'
import OrderDetail from '@/pages/user/OrderDetail.vue'
// 获取路由对象
let route = useRoute()

</script>

<style scoped lang="scss">

</style>