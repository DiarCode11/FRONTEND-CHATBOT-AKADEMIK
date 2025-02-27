import { createStore } from "vuex";

const auth = createStore({
    state: {
        isAuthenticated: false, // Status login
    },
    mutations: {
        setAuth(state, status) {
            state.isAuthenticated = status; // Perbarui status login
        },
    },
    actions: {
        async login({ commit }, creadentials) {
            try {
                const response = await fetch('http://192.168.37.52:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(creadentials), // Mengirimkan data login ke server
                }),
                data = await response.json();
                console.log(data);

                if (response.ok) {
                    commit('setAuth', true); // Set ke true untuk login
                } else {
                    commit('setAuth', false); // Set ke false jika login gagal  
                }
            } catch (error) {  
                console.log(error);
                commit('setAuth', false);
            }
        },
        logout({ commit }) {
            commit('setAuth', false); // Set ke false untuk logout
        },
    },
});

export default auth;