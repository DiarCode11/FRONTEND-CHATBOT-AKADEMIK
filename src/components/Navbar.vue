<template>
  <div
  :class="[
    'fixed top-0 left-0 right-0 z-30 border-b', 
    {  'bg-white/50': isNavActive('/'), 'bg-white': !isNavActive('/') }
  ]"
  >
    <div @click="toggleSlider()" :class="['fixed md:hidden top-0 left-0 z-30 w-full h-full bg-gray-300/70 transition-all duration-300 ease-in-out backdrop-blur-[30px]', {'hidden opacity-0': !showSlider, 'opacity-100': showSlider}]">
      
    </div>
    <div class="fixed md:hidden z-40 top-0 right-full bg-white w-4/5 h-full transition-transform duration-500 ease-out" :class="{'translate-x-full': showSlider, 'translate-x-0': !showSlider}">
      <div class="flex justify-end">
        <CloseButton @click="toggleSlider()"/>
      </div>
      <div class="flex flex-col gap-2 text-lg p-5">
        <router-link
          to="/"
          :class="{ 'font-bold transition-all duration-300 ease-in-out': isNavActive('/') }" @click="toggleSlider()" 
        >Home</router-link>
        <router-link
          to="/about"
          :class="{ 'font-bold transition-all duration-300 ease-in-out': isNavActive('/about') }" @click="toggleSlider()"
        >About</router-link>
        <router-link
          to="/admin"
          :class="{ 'font-bold transition-all duration-300 ease-in-out': isNavActive('/admin') || isNavActive('/admin/dataset-management') || isNavActive('/admin/history-chat-process') || isNavActive('/admin/feedback') || isNavActive('/admin/feedback') }" @click="toggleSlider()"
        >Administrator</router-link>
        <button
            class="bg-sky-600 mt-10 text-white px-6 py-2 rounded-lg hover:scale-105 hover:bg-sky-700 transition duration-200 ease-in-out"
            @click="openModal()"
          >
          Masuk
        </button>
      </div>
    </div>
    <nav class="mx-auto px-4 sm:px-6 lg:px-8 py-2" :class="{'backdrop-blur-[30px]': isNavActive('/')}">
      <div class="flex justify-between items-center">
        <div class="flex md:hidden cursor-pointer" @click="toggleSlider()">
          <BarButton />
        </div>
        <div class="hidden md:flex">
          <img :src="logoImage" class="h-10" alt="">
        </div>
        <div class="hidden md:flex space-x-4">
          <router-link
            to="/"
            :class="{ 'font-bold transition-all duration-300 ease-in-out': isNavActive('/') }"
          >Home</router-link>
          <router-link
            to="/about"
            :class="{ 'font-bold transition-all duration-300 ease-in-out': isNavActive('/about') }"
          >About</router-link>
          <router-link
            to="/admin"
            :class="{ 'font-bold transition-all duration-300 ease-in-out': isNavActive('/admin') || isNavActive('/admin/dataset-management') || isNavActive('/admin/history-chat-process') || isNavActive('/admin/feedback') || isNavActive('/admin/feedback') }"
          >Administrator</router-link>
        </div>
        <div>
          <button
            class="bg-sky-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:bg-sky-700 transition duration-200 ease-in-out"
            @click="openModal()"
          >
            Masuk
          </button>
        </div>
      </div>
    </nav>
  </div>

  <LoginModal
      v-model:showModal="showModal"
      v-model:closeModal="closeModal"
      v-model:email="email"
      v-model:password="password"
      @submit="handleLogin"
    />
</template>

<script>
import { mapActions } from "vuex";
import Logo from "@/assets/logo/logo.jpg"
import LoginModal from "./modal/LoginModal.vue";
import BarButton from "./buttons/BarButton.vue";
import CloseButton from "./buttons/CloseButton.vue";

export default {
  name: "Navbar",
  data() {
    return {
      logoImage: Logo,
      isScrolled: false,
      showModal: false,
      email: "",
      password: "",
      showSlider: false
    };
  },
  components: {
    LoginModal,
    BarButton,
    CloseButton
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions(["login"]),
    async loginUser() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      await this.login(credentials);
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    isNavActive(route) {
      return this.$route.path === route;
    },
    stopScroll(status){
      if (status === true) {
        document.body.classList.add("overflow-hidden")
      }
      else if (status === false) {
        document.body.classList.remove("overflow-hidden")
      }
    },
    openModal() {
      this.showModal = true;
      this.stopScroll(true)
    },
    closeModal() {
      this.showModal = false;
      this.stopScroll(false)
    },
    toggleSlider() {
      this.showSlider = !this.showSlider
      this.stopScroll(this.showSlider)
    }
  },
};
</script>

<style>
</style>

