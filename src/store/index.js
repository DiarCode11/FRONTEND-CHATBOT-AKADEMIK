import { createStore } from "vuex";
import Cookies from "js-cookie";

const store = createStore({
    state: {
        userCount: 0,
        isConnected: false,
        userAuth: {
            username: sessionStorage.getItem("username") || null,
            role: sessionStorage.getItem("role") || null
        },
        totalChat: 0
    },
    mutations: {
        setUserCount(state, count) {
            state.userCount = count;
        },
        setIsConnected(state, isConnected) {
            state.isConnected = isConnected;
        },
        setUserAuth(state, userAuth) {
            Object.assign(state.userAuth, userAuth);
        },
        clearUserAuth(state) {
            state.userAuth = { id: "", username: "", role: "" };
        },
        setTotalChat(state, totalChat) {
            state.totalChat = totalChat;
        }
    },
    actions: {
        loadUserAuthFromSession({ commit }) {
            const username = sessionStorage.getItem("username");
            const role = sessionStorage.getItem("role");

            if (username && role) {
                commit('')
            }
        }
    }
});

export default store;
