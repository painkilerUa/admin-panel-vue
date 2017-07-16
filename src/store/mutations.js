export const login = (state) => {
    state.user.authorized = true
}

export const setOrders = (state, payload) => {
    state.orders = payload;
}

export  const setCustomers = (state, payload) => {
    state.customers = JSON.parse(payload)
}

export const setProducts = (state, payload) => {
    state.products = JSON.parse(payload)
}

export const setInformationMsg = (state, payload) => {
    state.msg.text = payload.text;
    for(let className in state.msg.className){
        className = false;
    }
    if(payload.className){
        state.msg.className[payload.className] = true;
    }
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
    let createdProduct = state.products.find((product)=> product.id === payload);
    state.new_order.order_products.push({id: createdProduct.id, price: createdProduct.price, purchase_price: createdProduct.purchase_price, quantity: 1})
}

export const setValueNewOrder = (state, payload) => {
    for(let key in payload){
        let value = payload[key].target.value;
        state.new_order[key] = value;
    }
}

export const clearStateNewOrder = (state, payload) => {
    let order = state.new_order;
    for(let key in order){
        order[key] = null;
    }
    order['order_products'] = [];
}
