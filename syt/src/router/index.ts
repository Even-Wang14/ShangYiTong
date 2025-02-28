import Hospital from '@/pages/hospital/Hospital.vue'
import {createRouter,createWebHistory} from 'vue-router'

export default createRouter({
    // 路由模式
    history:createWebHistory(),
    routes:[
        {
            path:'/home',
            // 注册组件的新写法
            component:() =>import('@/pages/home/Home.vue')
        },
        {
            path:'/hospital',
            component:Hospital,
            children:[
                {
                    path:'register',
                    component:()=>import('@/pages/hospital/Register.vue')
                },
                {
                    path:'detail',
                    component:()=>import('@/pages/hospital/Detail.vue')
                },
                {
                    path:'close',
                    component:()=>import('@/pages/hospital/Close.vue')
                },
                {
                    path:'search',
                    component:()=>import('@/pages/hospital/Search.vue')
                },
                {
                    path:'notice',
                    component:()=>import('@/pages/hospital/Notice.vue')
                },
                {
                    path:'register_docter',
                    component:() => import('@/pages/hospital/RegisterDocter.vue')
                },
                {
                    path:'register_confirm',
                    component:() => import('@/pages/hospital/RegisterConfirm.vue')
                }

            ]
        },
        {
            path:'/user',
            component:() => import('@/pages/user/index.vue'),
            children:[
                {
                    path:'certification',
                    component:() => import('@/pages/user/certification.vue')
                },
                {
                    path:'order',
                    component:() => import('@/pages/user/order.vue')
                },
                {
                    path:'patient',
                    component:() => import('@/pages/user/patient.vue')
                },
                {
                    path:'profile',
                    component:() => import('@/pages/user/profile.vue')
                },
                {
                    path:'feedback',
                    component:() => import('@/pages/user/feedback.vue')
                },                
            ]

        },
        {
            path:'/',
            redirect:'/home'
        }
    ],
    // 滚动行为控制，控制滚动条位置
    scrollBehavior(){
        return{
            left:0,
            top:0
            }
    }
})