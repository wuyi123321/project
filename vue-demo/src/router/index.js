import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Love from '@/components/love/love'
import Me from '@/components/me/me'
import Message from '@/components/message/message'
import ceshi from '@/components/message/chat'
import mytolk from '@/components/love/myTolk'
import all from '@/components/love/all'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      component:Main
    },
    {
      path: '/love',
      component:Love,
      children:[
        { path: '/my', component: mytolk },
        { path: '/all', name:'home',component:all },
        { path: '/love', name:'home', component:all },
      ]
    },
    {
      path: '/message',
      component: Message,
      children:[
        { path: '/info',
          component: ceshi }
      ]
    },
    {
      path: '/me',
      component: Me
    },{
      path: '*', redirect: '/me'
    }

  ]
})
