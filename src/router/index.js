import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from  '@/components/Login'
import Orders from '@/components/orders/Orders'
import NewOrder from '@/components/orders/NewOrder'
import EditOrder from '@/components/orders/EditOrder'
import Customers from '@/components/customers/Customers'
import NewCustomer from '@/components/customers/NewCustomerForm'
import Products from '@/components/products/Products'
import NewProduct from '@/components/products/NewProductForm'

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
        },
        {
            path: '/customers/',
            component: Customers
        },
        {
            path: '/customers/new/',
            component: NewCustomer
        },
        {
            path: '/customers/edit/:customer_id',
            component: NewCustomer
        },
        {
            path: '/products/',
            component: Products
        },
        {
            path: '/products/new',
            component: NewProduct
        },
        {
            path: '/products/edit/:product_id',
            component: NewProduct
        }
    ]
})

