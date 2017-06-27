
export const isAuthorized = (state) => {
        return state.user.authorized
    }
// export default {
//     isAuthorized
// }
export const getMsg = (state) => {
        return state.msg
    }
export const getNewOrder = (state) => {
    return state.new_order
}

export const getSelectedCustomerDetail = (state) => {
    state.customers.find((customer)=>{customer.id === state.new_order.order_user_id})
}