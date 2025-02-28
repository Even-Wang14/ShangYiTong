<template>
    <div class="top">
        <div class="content">
            <!-- left -->
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>Shangyitong Booking Register</p>
            </div>
            <!-- right -->
            <div class="right">
                <p class="help">Help</p>
                <!-- 没有用户名 -->
                <p class="Login" @click="login" v-if="!userStore.userInfo.name">Signin/Signup</p>
                <!-- 有用户名 -->
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/User';
import { ArrowDown } from '@element-plus/icons-vue';
let router = useRouter()
const goHome = () => {
    router.push({ path: '/home' })
}
let userStore = useUserStore()
function login() {
    userStore.visiable = true
}
// 点击登陆按钮时弹出对话框

// 推出登陆按钮的回调
function logout(){
    // 清除pina 仓库的数据
    userStore.logout()
    // 编程式导航 跳回到首页
    router.push({path:'/home'});
}

function goUser(path){
    router.push({path});
}
</script>

<style lang="scss" scoped>
.top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    background: white;

    .content {
        width: 1200px;
        height: 70px;
        background: white;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe
            }
        }

        .right {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: rgb(104, 102, 102);

            .help {
                margin-right: 10px;
                ;
            }
        }
    }
}
</style>