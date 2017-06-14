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
            login: '',
            pass: ''
        },
        orders: []
    },
    getters,
    mutations,
    // mutations: {
    //     logout: state => {
    //         state.user.authorized = !state.user.authorized
    //     }
    // },
    actions
})