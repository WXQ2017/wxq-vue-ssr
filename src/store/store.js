import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);
// import ()

export function createStore() {
  return new vuex.Store({
    state: {
      items: 11,
    },
    actions: {
      fetchItem({ commit }, id) {
        return commit("setItem", { id });
      },
    },
    mutations: {
      setItem(state, id) {
        state.items = id;
      },
    },
  });
}
