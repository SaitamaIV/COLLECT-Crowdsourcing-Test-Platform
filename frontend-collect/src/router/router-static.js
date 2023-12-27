import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'

Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import registerDirector from "@/views/register-director";
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import register from '@/views/register'
import center from '@/views/center'
import notice from '@/views/notice'
import algorithm from '@/views/algorithm'
import user from '@/views/modules/user/list'
import missionList from '@/views/modules/mission/list'
import myMissionList from '@/views/modules/mission/myList'
import missionDetail from '@/views/modules/mission/detail'
import missionEdit from '@/views/modules/mission/edit'
import reportList from '@/views/modules/report/list'
import reportDetail from '@/views/modules/report/detail'
import reportTogether from '@/views/modules/report/togetherView'
import reportSimilar from '@/views/modules/report/similarView'
import reportSimilarList from '@/views/modules/report/similarList'
import reportEdit from '@/views/modules/report/edit'
import userDetail from '@/views/modules/user/detail'
import contactUs from '@/views/contact-us'

//2.配置路由   注意：名字
const routes = [
    {
        path: '/index', name: 'index', component: Index, children: [{
            // 这里不设置值，是把main作为默认页面
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/updatePassword',
            name: 'updatePassword',
            component: UpdatePassword
        },  {
            path: '/center',
            name: 'center',
            component: center
        },
            {
                path: '/notice',
                name: 'notice',
                component: notice
            },
            {
                path: '/algorithm',
                name: 'algorithm',
                component: algorithm
            }
            , {
                path: '/user',
                name: 'user',
                component: user
            }
            ,{
                path: '/user/detail',
                name: 'userDetail',
                component: userDetail
            },
            {
                path: '/mission',
                name: 'mission',
                component: missionList
            },
            {
                path: 'mymission',
                name: 'myMission',
                component: myMissionList
            },
            {
                path: '/mission/detail',
                name: '/missionDetail',
                component: missionDetail
            },
            {
                path: '/mission/edit',
                name: '/missionEdit',
                component: missionEdit
            },
            {
                path: '/report',
                name: 'report',
                component: reportList
            },
            {
                path: '/report/detail',
                name: '/reportDetail',
                component: reportDetail
            },
            {
                path: '/report/similardetail',
                name: '/reportDetail',
                component: reportDetail
            },
            {
                path: '/report/edit',
                name: '/reportEdit',
                component: reportEdit
            },
            {
                path: '/report/together',
                name: '/reportTogether',
                component: reportTogether
            },
            {
                path: '/report/similar',
                name: '/reportSimilar',
                component: reportSimilar
            },
            {
                path: '/report/similarlist',
                name: '/reportSimilarList',
                component: reportSimilarList
            },
            {
                path: '/contact-us',
                name: 'contactUs',
                component: contactUs
            }
        ]
    },

    //以下是不顶端部影响的
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register-director',
        name:'register-director',
        component:registerDirector
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/',
        redirect: '/login'
    },      /*默认跳转路由*/
    {
        path: '*',
        component: NotFound
    }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
    mode: 'hash',   /*hash模式改为history*/
    routes // （缩写）相当于 routes: routes
})

export default router;