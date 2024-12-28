<template>
  <div class="flex flex-col relative">
    <!-- Fixed Navbar -->
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>


