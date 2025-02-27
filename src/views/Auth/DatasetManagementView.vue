<template>
  <div class="flex justify-around md:hidden pb-8">
    <router-link
      v-for="(button, index) in buttons"
      :to="`/admin/dataset-management/${endpoint[index]}`"
      :key="index"
      class="px-6 py-2 rounded-full shadow-md text-sm"
      :class="[isRouteActive(`/admin/dataset-management/${endpoint[index]}`) ? 'bg-sky-600 text-white font-bold' : 'bg-white text-sky-600']"
    > 
      {{ button }}
    </router-link>
  </div>
  <!-- View ini menampilkan halaman-halaman yang berkaitan dengan manajemen dataset -->
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      buttons: ["PDF", "Link", "Vector DB"],
      endpoint: ["pdf", "link", "vectordb"],
    }
  },
  methods: {
    isRouteActive(route) {
      return this.$route.path === route
    }
  }
}
</script>

