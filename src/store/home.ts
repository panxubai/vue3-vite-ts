import { createStore } from "vuex"
interface IState {
    name: string;
    six: number
}
const state: IState = {
    name: "潘旭白",
    six: 10
};
const mutations = {
    setName(state: IState, data: string) {
        state.name = data;
    },
    setSix(state: IState, data: number) {
        console.log("nnnn", data)
        state.six = data;
    },
};
const actions = {
    getUserData({ commit }: any, data?: number) {
        let timer: any;
        console.log(timer, 'w12e')
        if (timer) {
            return;
        }
        return function () {
            timer = setTimeout(() => {
                commit("setSix", data);
                clearTimeout(timer);
            }, 3000)
        }

        console.log(data, timer, 'we')
    },
};
const getters = {
    getName(state: IState) {
        return state.name;
    },
    getSix(state: IState) {
        return state.six;
    },
}
export default {
    state,
    mutations,
    actions,
    getters
};