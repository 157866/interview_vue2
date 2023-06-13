import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const actions = {
    getUserName(context, value) {
        context.commit('GetUserName', value)
    },
    SetUserUId(context, value) {
        context.commit("SetUserUId", value)
    },

    setSalesTime(context, value) {
        context.commit("GetSalesTime", value)
    },
    setSize(context, value) {
        context.commit("GetSize", value)
    },
    setStart(context, value) {
        context.commit("GetStart", value)
    }
}
const mutations = {
    GetUserName(state, value) {
        state.userName = value
    },
    SetUserUId(start, value) {
        state.uid = value
    },
    GetSalesTime(start, value) {
        start.salesTime = value
    },
    GetSize(start, value) {
        start.size = value
    },
    GetStart(start, value) {
        start.start = value;
    }
}
const state = {
    userName: null,
    salesTime: null,
    uid: null,
    start: 1,
    size: 5,
}
export default new Vuex.Store({
    actions,
    mutations,
    state
})