import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

// 应用初始状态
const state = {
    count: 10,
    userToken: sessionStorage.getItem('USER_TOKEN') ,   // 用户token
    userName: "",                                     // 用户名字
    addOutlets:{
        applicationEndTime: "",     // 结束时间
        applicationNo: "",         // 定单编号
        applicationStartTime:"",
        applicationUserNo: "",
        networkContacts: "",
        networkName: "",
        recommendChannelId: "",
    },
    pendingContract:{

    },
    form:{

    }
}

// 定义所需的 mutations
const mutations = {              // mutations 利用它可以更改状态，本质就是用来处理数据的函数，其接收唯一参数值state。里面就是写方法 事件处理器用来驱动状态的变化。
    INCREMENT(state) {
        state.count++              //state 看成我们项目中使用的数据的集合
    },                             // Getters：用来从 store 获取 Vue 组件数据。
    DECREMENT(state) {              // Actions：可以给组件使用的函数，以此用来驱动事件处理器 mutations
        state.count--               // Vuex 规定，属于应用层级的状态只能通过 Mutation 中的方法来修改，而派发 Mutation 中的事件只能通过 action。
    },
    UPDATE_USER_TOKEN(state,token){
        state.userToken = token;
    },
    USER_NAME(state,name){
        state.userName = name;
    },
    ADD_OUTLETS(state,name){
        state.addOutlets = name
    },
    PENDING_CONTRACT(state,name){
        state.pendingContract = name
    },
    CONTRACT_NUMBER(state,name){
        state.form=name
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})