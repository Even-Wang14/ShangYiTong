<template>
    <div class="vistor">
        <div class="top">
            <div class="left">
                <span class="insurance">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button circle type="primary" :icon="Edit"></el-button>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型:{{ user.param.certificatesTypeString }}</p>
            <p>证件号:{{ user.certificatesNo }}</p>
            <p>性别:{{ user.sex == 0 ? '女' : '男' }}</p>
            <p>出生日期:{{ user.birthdate }}</p>
            <p>手机号码:{{ user.phone }}</p>
            <p>婚姻状况:{{ user.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址:{{ user.address }}</p>
            <p>详细住址:{{ user.param.fullAddress }}</p>
            <!-- 已选择样式 -->
            <transition name="confirm">
                <div class="confirm" v-if="currentIndex==index">已选择</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
// 接收父组件传来的信息
let props = defineProps(['user', 'currentIndex', 'index'])

// console.log(props.user);
console.log('indexindex',props.currentIndex, props.index);



</script>

<style scoped lang="scss">
.vistor {
    box-shadow: 0 4px 20px 0 rgb(0 0 0 / 4%);

    .top {
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            .insurance {
                background: white;
                padding: 5px;
                margin: 10px;
                font-size: 12px;
                border-radius: 5px;
            }

            .username {
                color: #7f7f7f;
            }
        }

        .right {
            margin-right: 10px
        }
    }

    .bottom {
        color: #7f7f7f;
        padding: 10px;

        p {
            line-height: 40px;
        }

        .confirm {
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 200px;
            top: 40%;
            opacity: 0.5;
            transform: rotate(40deg);
            font-weight: bold;
            font-size: 20px;
        }
        .confirm-enter-from{
            transform: scale(1);
        }
        .confirm-enter-active{
            transition: all 0.3s;
        }
        .confirm-enter-to{
            transform: scale(1.2);
        }

    }
}
</style>