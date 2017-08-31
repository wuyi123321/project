import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Love from '@/components/love'
import Me from '@/components/me'
import Message from '@/components/message'
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
