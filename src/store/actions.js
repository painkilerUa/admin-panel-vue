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
            commit('login', resolve.body.role);
            getOrders({commit});
            getCustomers({commit});
            getProducts({commit});
            router.push('/home')
        }
    ).catch((err) => {
//        router.push('/home')
        //commit('error_notification')
    })
}

export const logout = ({ commit }, payload) => {
    commit('logout')
}

export const getOrders = ({commit}, payload) => {
    requestToServer('orders', 'get', payload).then(
        res => {
            console.log('getOrders', res);
            commit('setOrders', res.body)
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
                    router.history.current.path === '/customers/new' ? router.push('/customers'): ''
                }
            ).catch((err) => {
                console.log(err)
            })
            setInformationMsg({commit}, {'text': 'Пользователь был успешно создан', 'className' : 'alert-success'});
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
                    router.history.current.path === '/products/new' ? router.push('/products') : ''
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
    if(!state.new_order.order_del_city || !state.new_order.order_products.length || !state.new_order.order_status || !state.new_order.order_user_id){
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

export const editOrderAction =({commit, state}, payload) => {
    requestToServer('orders', 'put', payload).then(
        res => {
            console.log('editOrderAction', res)
            setInformationMsg({commit}, {'text': 'Заказ был успешно обновлен', 'className' : 'alert-success'});
            getOrders({commit})
            router.push('/orders')
        }
    ).catch((err) => {
        console.log(err);
        setInformationMsg({commit}, {'text': 'Заказ не был обновлен. Проверте правильность введенных данных', 'className' : 'alert-danger'});
    })
}

export const updateCustomer = ({commit, state}, payload) => {
    requestToServer('customers', 'put', payload).then(
        res => {
            console.log('updateCustomer', res)
            setInformationMsg({commit}, {'text': 'Данные клиента были успешно обновлены', 'className' : 'alert-success'});
            getCustomers({commit})
            router.push('/customers')
        }
    ).catch((err) => {
        console.log(err);
        setInformationMsg({commit}, {'text': 'Данные клиента не был обновлен. Проверте правильность введенных данных', 'className' : 'alert-danger'});
    })
}

export const updateProductAction = ({commit}, payload) => {
    requestToServer('products', 'put', payload).then(
        res => {
            console.log('updateProductAction', res)
            requestToServer('products', 'get').then(
                response => {
                    commit('setProducts', response.bodyText);
                    router.push('/products')
                }
            ).catch((err) => {
                console.log('updateProductAction', err)
            });
            setInformationMsg({commit}, {'text': 'Продукт был успешно обновлен', 'className' : 'alert-success'});
        }
    ).catch((err) => {
        console.log('updateProductAction', err);
        setInformationMsg({commit}, {'text': 'Продукт не был обновлен. Проверте правильность введенных данных', 'className' : 'alert-danger'});
    })
}

export const uploadPricesOnServer = ({commit}, payload) => {
    requestToServer('products-prices', 'put', payload).then(
        res => {
            let text;
            console.log('products-prices', res)
            if(res.body.type === 'prices_file'){
                text = 'Прайсы были успешно загружены'
            }else if(res.body.type === 'up_time'){
                text = 'Цены были успешно обновлены'
                commit('setUpdatePriceDate', res.body.data);
            }
            setInformationMsg({commit}, {'text': text, 'className' : 'alert-success'});
        }
    ).catch((err) => {
        console.log(err);
        setInformationMsg({commit}, {'text': 'Прайсы не были успешно загружены', 'className' : 'alert-danger'});
    })
}

export const setLastUpdatePricesDate = ({commit}, payload) => {
    requestToServer('products-prices', 'get', payload).then(
        res => {
            commit('setUpdatePriceDate', res.body.data);
        }
    ).catch((err) => {
        console.log('setLastUpdatePricesDate', err);
    })
}

export const changeQuantityInputValue = ({commit}, payload) => {
    commit('changeQuantityInputValue', payload);
}