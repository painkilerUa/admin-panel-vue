import Vue from 'vue'
import router from '../router'

const api = {
    serverURL: 'http://localhost:3001/api/',
    // timeout: 20000
}
function requestToServer(urlEnd, type, payload = {}){
    return Vue.http[type](api.serverURL + urlEnd, payload, {headers: payload.headers ? {}: payload.headers})
}


export const login = ({ commit }, payload) => {
    requestToServer('login', 'post', payload).then(
        resolve => {
            console.log(resolve)
            localStorage.setItem('id_token', resolve.body.id_token);
            localStorage.setItem('access_token', resolve.body.access_token);
            commit('login')
            router.push('/home')
        }
    ).catch((err) => {
//        router.push('/home')
        //commit('error_notification')
    })
}

export const getOrders = ({commit}, payload) => {
    requestToServer('orders', 'get', payload).then(
        res => {
            console.log(res)
//            commit('setOrders', res)
        }
    ).catch((err) => {

    })
}

export const createNewCustomer = ({commit}, payload) => {
    requestToServer('customers', 'post', payload).then(
        res => {
          console.log(res)
//            commit('setOrders', res)
        }
    ).catch((err) => {

    })
}
