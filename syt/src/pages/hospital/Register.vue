<template>
  <div v-if="hosStore.hosInfo.bookingRule">
    <!-- <div>{{ hosStore }}</div> -->
    <div class="register">
      <div class="top">
        <div class="title">{{ hosStore.hosInfo.hospital?.hosname }}</div>
        <div class="level">
          <svg t="1710484678857" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="904" width="16" height="16">
            <path
              d="M696.32 896H383.146667c-52.48 0-95.146667-43.52-95.146667-97.28v-358.4c0-26.026667 9.813333-50.346667 28.16-68.693333l213.76-220.16a47.445333 47.445333 0 0 1 67.413333 0l21.76 22.186666c14.506667 14.933333 22.613333 34.986667 22.613334 55.893334l-2.133334 13.653333-27.306666 135.68h188.586666C853.333333 378.88 896 422.4 896 476.16v71.68c0 11.946667-2.133333 23.466667-6.4 35.413333l-105.386667 253.44c-14.933333 35.84-49.493333 59.306667-87.893333 59.306667zM563.2 190.293333L352.426667 407.466667c-8.533333 8.533333-13.226667 20.053333-13.226667 32.853333v358.4c0 25.6 19.626667 46.08 43.946667 46.08h313.173333c17.493333 0 33.706667-11.093333 40.533333-27.733333l105.386667-253.013334c1.706667-5.12 2.986667-10.666667 2.986667-16.213333v-71.68c0-25.6-19.626667-46.08-43.946667-46.08h-200.96c-12.373333 0-23.893333-5.546667-31.573333-14.933333a40.704 40.704 0 0 1-8.533334-34.133334l29.866667-154.026666c0-5.12-2.986667-12.373333-8.106667-17.92l-18.773333-18.773334zM153.6 887.466667c-14.08 0-25.6-11.52-25.6-25.6v-421.546667c0-14.08 11.52-25.6 25.6-25.6s25.6 11.52 25.6 25.6v421.546667c0 14.08-11.52 25.6-25.6 25.6z"
              fill="#707070" p-id="905"></path>
          </svg>
          <span>{{ hosStore.hosInfo.hospital.param.hostypeString }}</span>
        </div>
      </div>
      <div class="content">
        <div class="left">
          <img :src="`data:image/jpeg;base64,` + hosStore.hosInfo.hospital?.logoData" />
        </div>
        <div class="right">
          <h3>挂号规则</h3>
          <div class="time">
            <span>预约周期:{{ hosStore.hosInfo.bookingRule?.cycle }}</span>
            <span>放号时间:{{ hosStore.hosInfo.bookingRule?.releaseTime }}</span>
            <span>停挂时间:{{ hosStore.hosInfo.bookingRule?.quitTime }}</span>
          </div>
          <div class="address">
            <span>具体位置：{{ hosStore.hosInfo?.hospital?.param?.fullAddress }}</span>
            <span>乘车路线：{{ hosStore.hosInfo.hospital?.route }}</span>
          </div>
          <div class="releaseTime">
            退号时间：就诊前一工作日{{ hosStore.hosInfo.bookingRule?.quitTime }}前取消
          </div>
          <div class="ruler">
            <h3>医院预约规则</h3>
            <div class="ruleInfo" v-for="(item, index) in hosStore.hosInfo.bookingRule?.rule" :key="index">{{ item }}</div>

          </div>
        </div>
      </div>
      <!-- 科室信息 -->
      <div class="department">
        <div class="leftNav">
          <ul>
            <li @click="changeIndex(index)" v-for="(department,index) in hosStore.departmentArr" :key="department.depcode"  :class="{active:index==currentIndex}">{{department.depname}}</li>
          </ul>
        </div>
        <div class="departmentInfo">
          <!-- 一个div表示一个大科室 -->
          <div class="showDepartment" v-for="department in hosStore.departmentArr" :key="department.depcode">
            <h1 class="cur">{{ department.depname }}</h1>
            <!-- 展示大科室下的小科室 -->
            <ul>
              <li @click="login(item)" v-for="item in department.children" :key="item.depcode">{{ item.depname }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter,useRoute } from "vue-router";
import useDetailStore from "@/store/modules/HospitalDetail"
import useUserStore from '@/store/modules/User';
let hosStore = useDetailStore()
let router = useRouter()
let route = useRoute()
// console.log('hosStore', hosStore);
// 控制科室高亮的响应式数据
let currentIndex = ref<number>(0)
function changeIndex(index:number) {
  currentIndex.value = index
  // 点击导航获取右侧的科室H1标题
  let allH1 = document.querySelectorAll('.cur')
  // console.log(allH1);
  // 利用原生的scrollIntoView达到点击跟随的效果
  allH1[currentIndex.value].scrollIntoView({
    behavior:'smooth',//过渡动画效果
    block:'start'//滚动到的位置,默认start
  });
}
let userStore = useUserStore()
function login(item:any){
  // item 用户选中的科室数据
    // userStore.visiable =true
    // console.log(item);
    router.push({
      path:'/hospital/register_docter',
    query:{hoscode:route.query.hoscode,depcode:item.depcode}})
}

</script>

<style scoped lang="scss">
.register {
  .top {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 20px;

    .title {
      font-size: 24px;
    }

    .level,
    .ruler {
      color: #7f7f7f;
      margin-left: 10px;

      span {
        margin-left: 5px;
      }
    }
  }

  .content {
    margin-top: 20px;
    display: flex;

    .left {
      width: 80px;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }

    .right {
      margin-left: 20px;
      flex: 1;
      color: #7f7f7f;
      font-size: 18px;

      div {
        margin-top: 10px;
      }

      .time {
        span {
          margin-right: 20px;
        }
      }
    }

  }
  .department {
    width: 100%;
    height: 500px;
    display: flex;
    margin-top: 20px;
    .leftNav {
      width: 80px;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        li {
          cursor: pointer;
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 40px;
          &.active {
            border-left: 1px solid red;
            color: red;
            background: white;
          }
        }
      }
    }
}
.departmentInfo {
      cursor: pointer;
      flex: 1;
      margin-left: 20px;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .showDepartment {
        h1 {
          background-color: rgb(248, 248, 248);
          color: #7f7f7f;
          font-size: 16px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            color: #7f7f7f;
            width: 33%;
            line-height: 30px;
          }
        }
      }
    }
}
</style>