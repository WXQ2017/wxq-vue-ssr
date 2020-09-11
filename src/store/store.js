import Vue from "vue";
import vuex from "vuex"

Vue.use(vuex)
// import ()


export function createStore() {
    return new vuex.Store({
        state: {
            items:{}
        },
        actions: {
            fetchItem({commit}, id) {
                return commit("setItem", {id})
            }
        },
        mutations: {
            setItem (state, { id, item }) {
              Vue.set(state.items, id, item)
            }
          }
    })
}