<template>
  <div class="flex flex-col relative">
    <!-- Fixed Navbar -->
    <Navbar :username="username" :role="role" />
    <router-view :socket="socket"></router-view>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Navbar from './components/Navbar.vue'
import Cookies from 'js-cookie';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      socket: null,
      isConnected: false,
      ipAddress: import.meta.env.VITE_SERVER_URL,
      username: "",
      role: "", 
    }
  },
  async created() {
    await this.getAuth();
  },
  mounted() {
    this.socket = io(this.ipAddress)

    this.socket.on('connect', () => {
      this.isConnected = true
      this.$store.commit('setIsConnected', true)
      console.log('Socket connected hahaha');
      // console.log(import.meta.env.VITE_SERVER_URL);
    })

    this.socket.on('disconnect', () => {
      this.isConnected = false
      this.$store.commit('setIsConnected', false)
      this.$store.commit('setUserCount', 0)
      console.log('Socket disconnected huhuhu');
    })

    this.socket.on('user_connected', (data) => {
      console.log('Pesan dari server', data)
      console.log('Jumlah pengguna', data.amount)
      this.$store.commit('setUserCount', data.amount)
      this.$store.commit('setTotalChat', data.total_chat)
    })

    this.socket.on('user_disconnected', (data) => {
      console.log('Pesan dari server', data)
      console.log('Jumlah pengguna', data.amount)
      this.$store.commit('setUserCount', data.amount)
    })
  },
  computed: {
    ...mapState(['userAuth']),
  },
  methods: {
    ...mapMutations(['setUserAuth']),
    async getAuth() {
      try {
        const response = await fetch(this.ipAddress + "/users/auth", {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': Cookies.get("csrf_access_token"),
          },
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          this.username = data.username;
          this.role = data.role;
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("role", data.role);
          
          this.$nextTick(() => {
              console.log("Isi userAuth setelah update:", this.$store.state.userAuth);
          });
        } else {

          this.username = null;
          this.role = null;
          console.log(data);
        }
      } catch (error) {
        console.error(error);
        this.username = null;
        this.role = null;
      }
    }
  }
}
</script>


