<template>
  <nav
    class="top-0 left-0 right-0 bg-white sticky z-50 bg-white/70 backdrop-blur-[30px]"
    :class="{ 'border-b': isScrolled }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div class="flex justify-between items-center">
        <div class="hidden md:flex space-x-4">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <div>
          <button
            class="bg-sky-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:bg-sky-700 transition duration-200 ease-in-out"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
  },
};
</script>
