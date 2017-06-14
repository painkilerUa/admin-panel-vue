import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from  '@/components/Login'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/orders',
            component: Orders
        }
    ]
})
