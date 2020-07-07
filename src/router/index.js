import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'

import Buttons from '@/views/components/Buttons'

// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'
import AsphaltRoad from "../views/components/el-table";


/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    {path: '/pages',redirect: '/pages/p404', name: 'Pages',
          component: {
            render (c) { return c('router-view') }
              // Full,
          },
          children: [{path: '404',  name: 'Page404', component: _import('errorPages/Page404') },
                     {path: '500',name: 'Page500',component: _import('errorPages/Page404')},
                    ]
    }


]

export default new Router({
  mode: 'hash', 
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [

 {
    path: '/',
    redirect: '/dashboard',
    name: '首页',
    component: Full,
    hidden:false,
    children: [
    {path: '/dashboard',name: '首页',icon:'speedometer',component: _import('Dashboard')},
      {path:'/RoadInformation', name: '道路基本信息', icon: "bookmark", component: _import('RoadInformation')},
      {path:'/DailyReport', name: '日常巡检表', icon: 'merge', component: _import('DailyReport')},
      {path: '/RegularReport', name: '定期检查', icon: 'ios-paper', component: _import('RegularReport')},
      {path:'/FlatReport', name: '道路平整度检测表', icon: 'ios-paper', component: _import('FlatReport')},
      {path:'/DamageReport', name: '道路损坏记录表', icon: 'ios-paper', component: _import('DamageReport')},
      {path: '/map', name: '道路地图展示',icon:'ios-paper',component: _import('map')},
      {path: '/statistics', name: '统计页面',icon:'ios-paper',component: _import('statistics')}
    ]
  },




  { path: '*', redirect: '/pages/404', hidden: true }
  
];
