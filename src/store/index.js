import { createStore } from "vuex";
import { message } from "ant-design-vue";

export default createStore({
  state: {
    message: "",
    spinning: false,
  },
  getters: {},
  mutations: {
    setMessage(state, payload) {
      state.message = payload;
    },
    setIndicator(state, payload) {
      state.spinning = payload;
    },
  },
  actions: {
    message({ commit }, payload) {
      commit("setMessage", payload);
    },
    showAlter({ state }) {
      message.error(state.message);
    },
    loading({ commit }, payload) {
      commit("setIndicator", payload);
    },
  },
  modules: {},
});
