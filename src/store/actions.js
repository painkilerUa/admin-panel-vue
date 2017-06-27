import Vue from 'vue'
import router from '../router'

const api = {
    serverURL: 'http://localhost:3001/api/',
    // timeout: 20000
}

function requestToServer(urlEnd, type, payload = {}){
    if(type == 'get'){
        return Vue.http[type](api.serverURL + urlEnd, {headers: {'Authorization': 'Bearer ' + localStorage['access_token']}})
    }else{
        return Vue.http[type](api.serverURL + urlEnd, payload, {headers: {'Authorization': 'Bearer ' + localStorage['access_token']}})
    }
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
            commit('setOrders', res)
        }
    ).catch((err) => {
        console.log(err)
    })
}

export  const getCustomers = ({commit}, payload) => {
    requestToServer('customers', 'get', payload).then(
        res => {
            commit('setCustomers', res.bodyText)
        }
    ).catch((err) => {
        console.log(err)
    })
}

export const createNewCustomer = ({commit}, payload) => {
    requestToServer('customers', 'post', payload).then(
        res => {
            requestToServer('customers', 'get', payload).then(
                res => {
                    commit('setCustomers', res.bodyText)
                }
            ).catch((err) => {
                console.log(err)
            })
            commit('setInformationMsg', {text: 'Пользователь был успешно создан', 'className': 'alert-success'});
            commit('setOrderUserId', res.body)
        }
    ).catch((err) => {
        commit('setInformationMsg', {text: 'Пользователь не был создан. Проверте существующих пользователей по номеру телефона', 'className': 'alert-danger'})
    })
}
