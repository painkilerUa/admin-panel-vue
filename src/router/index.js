import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from  '@/components/Login'
import Orders from '@/components/orders/Orders'
import NewOrder from '@/components/orders/NewOrder'
import EditOrder from '@/components/orders/EditOrder'

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
            path: '/orders/',
            component: Orders//,
            // children: [
            //   { path: 'new', component: NewOrder }
            // ]
        },
        {
            path: '/orders/new',
            component: NewOrder
        },
        {
            path: '/orders/edit/:order_id',
            component: EditOrder
        }
    ]
})
