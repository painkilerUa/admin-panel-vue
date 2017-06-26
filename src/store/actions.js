import Vue from 'vue'
import router from '../router'

const api = {
    serverURL: 'http://localhost:3001/api/',
    // timeout: 20000
}

function requestToServer(urlEnd, type, payload = {}){
    return Vue.http[type](api.serverURL + urlEnd, payload, {headers: {'Authorization': 'Bearer ' + localStorage['access_token']}})
}

console.log(requestToServer)
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
            commit('setInformationMsg', {text: 'Пользователь был успешно создан', 'className': 'alert-success'})
        }
    ).catch((err) => {
        commit('setInformationMsg', {text: 'Пользователь не был создан. Проверте существующих пользователей по номеру телефона', 'className': 'alert-danger'})
    })
}
