<template>
  <div class="flex flex-col relative">
    <!-- Fixed Navbar -->
    <Navbar />
    <router-view :socket="socket"></router-view>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      socket: null,
      isConnected: false,
      ipAddress: import.meta.env.VITE_SERVER_URL
    }
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
    })

    this.socket.on('user_disconnected', (data) => {
      console.log('Pesan dari server', data)
      console.log('Jumlah pengguna', data.amount)
      this.$store.commit('setUserCount', data.amount)
    })
  }
}
</script>


