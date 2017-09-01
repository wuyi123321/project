import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Love from '@/components/love/love'
import Me from '@/components/me/me'
import Message from '@/components/message/message'
import ceshi from '@/components/ceshi'
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
      component: Message
    },
    {
      path: '/me',
      component: Me
    }
  ]
})
