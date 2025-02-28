<template>
  <div class="detail">
    <!-- 医院名字与医院等级 -->
    <div class="top">
      <div class="name">{{hosStore.hosInfo.hospital?.hosname}}</div>
      <div class="level">
        <svg t="1710484678857" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="904" width="16" height="16"><path d="M696.32 896H383.146667c-52.48 0-95.146667-43.52-95.146667-97.28v-358.4c0-26.026667 9.813333-50.346667 28.16-68.693333l213.76-220.16a47.445333 47.445333 0 0 1 67.413333 0l21.76 22.186666c14.506667 14.933333 22.613333 34.986667 22.613334 55.893334l-2.133334 13.653333-27.306666 135.68h188.586666C853.333333 378.88 896 422.4 896 476.16v71.68c0 11.946667-2.133333 23.466667-6.4 35.413333l-105.386667 253.44c-14.933333 35.84-49.493333 59.306667-87.893333 59.306667zM563.2 190.293333L352.426667 407.466667c-8.533333 8.533333-13.226667 20.053333-13.226667 32.853333v358.4c0 25.6 19.626667 46.08 43.946667 46.08h313.173333c17.493333 0 33.706667-11.093333 40.533333-27.733333l105.386667-253.013334c1.706667-5.12 2.986667-10.666667 2.986667-16.213333v-71.68c0-25.6-19.626667-46.08-43.946667-46.08h-200.96c-12.373333 0-23.893333-5.546667-31.573333-14.933333a40.704 40.704 0 0 1-8.533334-34.133334l29.866667-154.026666c0-5.12-2.986667-12.373333-8.106667-17.92l-18.773333-18.773334zM153.6 887.466667c-14.08 0-25.6-11.52-25.6-25.6v-421.546667c0-14.08 11.52-25.6 25.6-25.6s25.6 11.52 25.6 25.6v421.546667c0 14.08-11.52 25.6-25.6 25.6z" fill="#707070" p-id="905"></path></svg>
        <span>{{hosStore.hosInfo.hospital?.param.hostypeString}}</span>
      </div>
    </div>
    <div class="logo">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${hosStore.hosInfo.hospital?.logoData}`" alt="">
      </div>
      <div class="right">
        <div class="address">
            <svg t="1710741753203" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2878" width="18" height="18"><path d="M176 841.2c0 46.8 151.2 84.4 337.6 84.4 186.4 0 337.6-37.6 337.6-84.4 0-46.8-151.2-84.4-337.6-84.4-186.4 0-337.6 38-337.6 84.4z m0 0" fill="#CCCCCC" p-id="2879"></path><path d="M798.8 339.2c0 124-214 414-270 489.6-7.6 8.8-20.8 8.8-28 0-58-75.6-272-365.2-272-489.6C228.4 196.8 356 80 513.6 80c157.6 0 285.2 116.8 285.2 259.2z m0 0" fill="#B3B3B3" p-id="2880"></path><path d="M512 340m-120 0a120 120 0 1 0 240 0 120 120 0 1 0-240 0Z" fill="#FFFFFF" p-id="2881"></path></svg>
          <span>具体地址：{{hosStore.hosInfo.hospital?.param.fullAddress}}</span>
        </div>
        <div class="route">
          <span>规划路线：{{hosStore.hosInfo.hospital?.route}}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <h1>医院介绍</h1>
      <p>{{hosStore.hosInfo.hospital?.intro}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取详情数据进行展示
import useDetailStore from '@/store/modules/HospitalDetail.ts'
let hosStore = useDetailStore()
</script>

<style scoped lang="scss">
.detail {
  .top {
    display: flex;
    align-items: center;
    .name {
      font-size: 30px;
      font-weight: bold;
    }
    .level {
      margin-left: 10px;
      span {
        margin-left: 10px;
      }
    }
  }
  .logo {
    display: flex;
    margin: 10px 10px;
    .left {
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      color: #7f7f7f;
      margin-left: 10px;
      .address {
        svg{
          width: 15px;
        }
      }
      .route {
        margin-left: 15px;
      }
      div {
        margin: 20px 0px;
      }
    }
  }
  .footer {
    color: #7f7f7f;
    p {
      margin-top: 10px;
      line-height: 30px;
    }
  }
}
</style>