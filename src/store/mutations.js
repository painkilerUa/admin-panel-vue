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