<template>
  <div class="flex flex-col relative">
    <!-- Fixed Navbar -->
    <Navbar />
    <router-view :socket="socket" :isConnected="isConnected" :userConnected="userConnected"></router-view>
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
      userConnected: 0
    }
  },
  mounted() {
    this.socket = io('http://192.168.54.52:5001')

    this.socket.on('connect', () => {
      this.isConnected = true
      console.log('Socket connected hahaha');
    })

    this.socket.on('disconnect', () => {
      this.isConnected = false
      console.log('Socket disconnected');
    })

    this.socket.on('user_connected', (data) => {
      console.log('Pesan dari server', data)
      console.log('Jumlah pengguna', data.amount)
      this.$store.commit('setUserCount', data.amount)
      this.userConnected = data.amount
    })

    this.socket.on('user_disconnected', (data) => {
      console.log('Pesan dari server', data)
      console.log('Jumlah pengguna', data.amount)
      this.$store.commit('setUserCount', data.amount)
      this.userConnected = data.amount
    })
  }
}
</script>


