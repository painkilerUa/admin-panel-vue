export const login = (state) => {
    state.user.authorized = true
}

export const setOrders = (state) => {
    state.orders = [];
}

export  const setCustomers = (state, payload) => {
    state.customers = JSON.parse(payload)
}

export const setProducts = (state, payload) => {
    state.products = JSON.parse(payload)
}

export const setInformationMsg = (state, payload) => {
    state.msg.text = payload.text;
    state.msg.className[payload.className] = true

}
export const setOrderUserId = (state, payload) => {
    state.new_order.order_user_id = payload.customer_id
}

export const addOrderedProductId = (state, payload) => {

}

export  const removeSelectedCustomer = (state) => {
    state.new_order.order_user_id = null;
}
export const removeSelectedProduct = (state, payload) => {
    let products = state.new_order.order_products;
    for(let i in products){
        if(payload === products[i].id){
            products.splice(i, 1)
            break;
        }
    }
}

export const addChosenCustomer = (state, payload) => {
    state.new_order.order_user_id = payload;
}

export const addChosenProduct = (state, payload) => {
    let products = state.new_order.order_products;
    for(let product of products){
        if(payload.id === product.id){
            product['quantity']++
            return
        }
    }
    products.push(payload)
}

export const addCreatedProductToOrder = (state, payload) => {
    state.new_order.order_products.push({id: payload, quantity: 1})
}