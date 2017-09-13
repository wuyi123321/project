import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Love from '@/components/love/love'
import Me from '@/components/me/me'
import Message from '@/components/message/message'
import ceshi from '@/components/message/chat'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      component:Main
    },
    {
      path: '/love',
      component:Love
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
