import { createStore } from "vuex";
import Cookies from "js-cookie";

const store = createStore({
    state: {
        userCount: 0,
        isConnected: false,
        userAuth: {
            id: "",
            username: "",
            role: ""
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
        loadUserAuthFromCookies({ commit }) {
            const username = Cookies.get("username");
            const role = Cookies.get("role");
            const csrf_token = Cookies.get("csrf_access_token");

            if (username && role) {
                commit("setUserAuth", { username, role, csrf_token });
            }
        }
    }
});

export default store;
