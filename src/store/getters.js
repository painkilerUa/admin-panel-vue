
export const isAuthorized = (state) => {
        return state.user.authorized
    }

export const getUserSettings = (state) => {
    return state.user
}

export const getMsg = (state) => {
        return state.msg
    }
export const getNewOrder = (state) => {
    return state.new_order
}

export const getSelectedCustomerDetail = (state) => {
    return state.customers.find(customer => state.new_order.order_user_id === customer.id)
}
export const getSelectedProductsDetail = (state) => {
    let selectedProducts = [];
    let new_order_products = state.new_order.order_products;
    let products = state.products;
    for(let order_product of new_order_products){
        for(let product of products){
            if(order_product.id === product.id){
                selectedProducts.push({
                    id: order_product.id,
                    quantity: order_product.quantity,
                    name: product.name,
                    vendor: product.vendor,
                    price: order_product.quantity * product.price
                })
            }
        }
    }
    return selectedProducts;
}
export const getCustomers = (state) => {
    return state.customers
}

export const getProducts = (state) => {
    return state.products
}
// export const getFilteredOrders = (state, payload) => {
//   console.log(payload)
//   return state.orders;
// }
export const getFilteredOrders = (state, getters) => (payload) => {
  return state.orders.filter((order) => {
    if (!payload.main_phone || order.customer_main_phone.toString().indexOf(payload.main_phone) > -1) return true;
  }).filter((order) => {
    if (!payload.order_status || payload.order_status === order.order_status) return true;
  }).filter((order) => {
    if (!payload.surname|| order.customer_surname.toLowerCase().indexOf(payload.surname.toLowerCase()) > -1) return true;
  })
}

export const getOptionsOrderStatus = (state) => {
    return state.optionsOrderStatus;
}

export const getOrderById = (state, getters) => (payload) => {
  return state.orders.find(order => order.order_id == payload)
}
