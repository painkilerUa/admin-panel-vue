import Vue from  'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as getters from  './getters'
import * as mutations from './mutations'
import * as actions from './actions'
export const store = new Vuex.Store({
    state: {
        user: {
            authorized: false,
            login: null,
            pass: null,
            isSuperUser: false
        },
        orders: [],
        customers: [],
        products: [],
        msg: {
            text: '',
            className: {'alert-success': false, 'alert-danger': false}
        },
        new_order: {
            order_user_id: null,
            order_prepay: null,
            order_del_city: null,
            order_del_name: null,
            order_del_depart_num: null,
            order_del_address: null,
            order_date: null,
            order_status: null,
            order_status_date: null,
            order_products: [],
            order_comment: null
        },
        optionsOrderStatus: [
                   { text: 'В ожидании', value: 'pending' },
                   { text: 'В обработке', value: 'processing' },
                   { text: 'Оплачен', value: 'paid' },
                   { text: 'Удержан', value: 'holding' },
                   { text: 'Отправлен', value: 'sended' },
                   { text: 'Выполнен', value: 'completed' },
                   { text: 'Закрыт', value: 'closed' },
                   { text: 'Подтвержден', value: 'confirmed' }
               ]
    },
    getters,
    mutations,
    actions
})


