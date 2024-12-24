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
          <div class="flex-shrink-0">
            <a href="https://akademik.undiksha.ac.id/wp-content/uploads/sites/45/2022/06/Pedoman-Studi-2017.pdf" target="_blank" class="text-lg font-semibold flex rounded-md text-sky-500 py-2 pl-4 pr-3 gap-2 items-center">
              <span>Explore</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
                </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        isScrolled: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.isScrolled = window.scrollY > 0;
      },
    },
  };
  </script>
  