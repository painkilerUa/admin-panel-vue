export const login = (state) => {
    state.user.authorized = true
}

export const setOrders = (state) => {
    state.orders = [];
}

export const setInformationMsg = (state, payload) => {
    state.msg.text = payload.text;
    state.msg.className[payload.className] = true

}
export const setOrderUserId = (state, payload) => {
    state.new_order.order_user_id = payload.customer_id
}
export  const setCustomers = (state, payload) => {
    state.customers = JSON.parse(payload)
}