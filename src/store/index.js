import { createStore } from "vuex";

const store = createStore({
    state: {
        userCount: 0
    },
    mutations: {
        setUserCount(state, count) {
            state.userCount = count;
        }
    },
});

export default store;
