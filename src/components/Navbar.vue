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
        <router-link v-if="role === 'admin'"
          to="/admin"
          :class="{ 'font-bold transition-all duration-300 ease-in-out': $route.path.startsWith('/admin') }" @click="toggleSlider()"
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
          <router-link v-if="role === 'admin' && csrf_token"
            to="/admin"
            :class="{ 'font-bold transition-all duration-300 ease-in-out': $route.path.startsWith('/admin') }"
          >Administrator</router-link>
        </div>
        <div v-if="!username && !role">
          <button
            class="bg-sky-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:bg-sky-700 transition duration-200 ease-in-out"
            @click="openModal()"
          >
            Masuk
          </button>
        </div>
        <div v-else class="relative">
          <transition name="scale">
            <div v-show="showPopupUser" ref="popupContainer" class="absolute top-10 right-0 z-50 bg-white shadow-md rounded-lg border w-56 p-4">
              <div>
                <div class="text-lg font-bold">
                  {{ username }}
                  <p class="text-sm font-semibold text-gray-400 capitalize">{{ role }}</p>
                </div>
                <button @click="handleLogout" class="mt-5 bg-red-600 font-semibold text-white px-4 py-1 rounded-lg hover:bg-red-800 transition duration-200 ease-in-out w-full">
                  Log Out
                </button>
              </div>
            </div>
          </transition>
          <button @click.stop="togglePopupUser" class="bg-gray-300 text-white p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </div>

  <LoginModal
      v-model:showModal="showModal"
      v-model:closeModal="closeModal"
      v-model:name="name"
      v-model:email="email"
      v-model:password="password"
      v-model:confirmPassword="confirmPassword"
      @update:name="updateName"
      @update:email="updateEmail"
      @update:password="updatePassword"
      @update:confirmPassword="updateConfirmPassword"
      @submit="handleLogin"
    />
</template>

<script>
import { mapState, mapActions } from "vuex";
import Logo from "@/assets/logo/logo.jpg"
import LoginModal from "./modal/LoginModal.vue";
import BarButton from "./buttons/BarButton.vue";
import CloseButton from "./buttons/CloseButton.vue";
import Cookies from "js-cookie";

export default {
  name: "Navbar",
  data() {
    return {
      logoImage: Logo,
      isScrolled: false,
      showModal: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showSlider: false,
      showPopupUser: false,
      ipAddress: import.meta.env.VITE_SERVER_URL
    };
  },
  components: {
    LoginModal,
    BarButton,
    CloseButton
  },
  computed: {
    ...mapState({
      username: state => state.userAuth.username,
      role: state => state.userAuth.role,
      csrf_token: state => state.userAuth.csrf_token
    })
  },
  mounted() {
    this.loadUserAuthFromCookies();

    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.closePopup);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.closePopup);
  },
  methods: {
    ...mapActions(["loadUserAuthFromCookies"]),
    removeAllCookies() {
      const allCookies = Cookies.get(); // Ambil semua cookie
      for (let cookie in allCookies) {
        Cookies.remove(cookie, { path: "/" });
      }
    },
    async handleLogout() {
      try {
        const response = await fetch(this.ipAddress + "/users/logout", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': Cookies.get("csrf_access_token"),
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          },
          credentials: 'include',
        });
        
        this.removeAllCookies();

        const data = await response.json();
        console.log(this.csrf_token);
        console.log(data);
        this.$store.commit("setUserAuth", {});
      }
      catch (error) {
        console.error(error);
      }
      window.location.reload();

    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    togglePopupUser() {
      console.log(this.userAuth)
      this.showPopupUser = !this.showPopupUser;
      console.log(this.showPopupUser)
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
    },
    updateName(value) {
      this.name = value;
      console.log(this.name)
    },
    updateEmail(value) {
      this.email = value;
      console.log("Nama: ", this.name)
      console.log("email: ", this.email)
    },
    updatePassword(value) {
      this.password = value;
    },
    updateConfirmPassword(value) {
      this.confirmPassword = value;
    },
    closePopup(event) {
      if (this.$refs.popupContainer && !this.$refs.popupContainer.contains(event.target)) {
        this.showPopupUser = false;
      }
    }
  },
};
</script>

<style>
.scale-enter-active, .scale-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.scale-enter-from, .scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.scale-enter-to, .scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

