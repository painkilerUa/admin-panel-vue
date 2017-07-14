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
            console.log(res);
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

export const getProducts = ({commit}, payload) => {
    requestToServer('products', 'get', payload).then(
        res => {
            commit('setProducts', res.bodyText)
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

export const createNewProductAction = ({commit}, payload) => {
    requestToServer('products', 'post', payload).then(
        res => {
            console.log(res)
            requestToServer('products', 'get', payload).then(
                response => {
                    commit('setProducts', response.bodyText);
                    commit('addCreatedProductToOrder', res.body['product_id'])
                }
            ).catch((err) => {
                console.log(err)
            });
            setInformationMsg({commit}, {'text': 'Продукт был успешно создан', 'className' : 'alert-success'});
        }
    ).catch((err) => {
        console.log(err);
        setInformationMsg({commit}, {'text': 'Продукт не был создан. Проверте правильность введенных данных', 'className' : 'alert-danger'});
    })
}


export const  removeSelectedCustomer = ({commit}, payload) => {
    commit('removeSelectedCustomer')
}
export const removeSelectedProduct = ({commit}, payload) => {
  commit('removeSelectedProduct', payload)
}
export const addChosenCustomer = ({commit}, payload) => {
    commit('addChosenCustomer', payload)
}

export const addChosenProduct = ({commit}, payload) => {
    commit('addChosenProduct', payload)
}

export const setInformationMsg = ({commit}, payload) => {
  commit('setInformationMsg', {'text': payload.text, 'className': payload.className});
  setTimeout(() => {
    commit('setInformationMsg', {'text': '', 'className': ''})
  }, 5000)
}

export const setValueNewOrder =({commit}, payload) => {
    commit('setValueNewOrder', payload);
}

export const createNewOrder =({commit, state}, payload) => {
    let order = state.new_order;
    let date = +new Date();
    order['order_date'] = date;
    order['order_status_date'] = date;
    if(!state.new_order.order_del_city || !state.new_order.order_prepay || !state.new_order.order_products.length || !state.new_order.order_status || !state.new_order.order_user_id){
        setInformationMsg({commit}, {'text': 'Заказ не был создан. Не все поля заполнены.', 'className' : 'alert-danger'});
        return;
    }
    requestToServer('orders', 'post', order).then(
        res => {
            setInformationMsg({commit}, {'text': 'Заказ был успешно создан. Номер заказа: ' + res.body.order_id, 'className' : 'alert-success'});
            commit('clearStateNewOrder');
            router.push('/orders')
        }
    ).catch((err) => {
        console.log(err);
        setInformationMsg({commit}, {'text': 'Заказ не был создан. Проверте правильность введенных данных', 'className' : 'alert-danger'});
    })
}
