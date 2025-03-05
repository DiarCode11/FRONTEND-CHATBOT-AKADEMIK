<template>
    <div v-if="isAuthenticated && isConnectedStatus" class="grid md:grid-cols-[280px_1fr] grid-cols-[1fr] h-screen ">
      <!-- Navbar Desktop -->
      <aside class="bg-sky-500 p-4 overflow-auto hidden md:block">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
        <nav class="pt-5">
          <ul class="space-y-4 transform transition-transform duration-200 ease-in-out">
            <li>
              <router-link to="/admin" 
                class="block py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out"
                :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin'), 'text-white': !isNavActive('/admin') }">
                <i class="bi bi-speedometer2 pr-2"></i> Dashboard
              </router-link>
            </li>
            <li>
              <!-- Dropdown Trigger -->
              <router-link to="/admin/dataset-management" @click="toggleDropdown" 
                class="block w-full text-left py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out"
                :class="{ 'text-sky-500 font-semibold bg-white': $route.path.startsWith('/admin/dataset-management'), 'text-white': !$route.path.startsWith('/admin/dataset-management') }"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <i class="bi bi-database pr-3"></i> 
                      Dataset
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 transform transition-transform duration-200 ease-in-out" :class="{ 'transform rotate-90': dropdownActive }">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
              </router-link>
              <!-- Dropdown Menu -->
              <transition name="fade">
                <ul v-if="dropdownActive" class="mt-2 space-y-2 pl-6">
                  <li>
                    <router-link to="/admin/dataset-management/pdf" 
                      class="block py-2 px-4 rounded transition-all duration-200 ease-in-out text-white"
                      :class="{ 'text-white font-bold': isNavActive('/admin/dataset-management/pdf'), 'text-white': !isNavActive('/admin') }">
                      Dataset PDF
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/dataset-management/link" 
                      class="block py-2 px-4 rounded transition-all duration-200 ease-in-out text-white"
                      :class="{ 'text-white font-bold': isNavActive('/admin/dataset-management/link'), 'text-white': !isNavActive('/admin') }">
                      Dataset Link
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/dataset-management/vectordb" 
                      class="block py-2 px-4 rounded transition-all duration-200 ease-in-out text-white"
                      :class="{ 'text-white font-bold': isNavActive('/admin/dataset-management/vectordb'), 'text-white': !isNavActive('/admin') }">
                      <p class="relative">
                        Basis Data Vektor
                      </p>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>
            <li>
              <router-link to="/admin/history-chat-process" 
                class="block py-2 px-4 rounded transition-all duration-200 ease-in-out"
                :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin/history-chat-process'), 'text-white': !isNavActive('/admin/history-chat-process') }">
                <i class="bi bi-chat-left-dots pr-3"></i> History Chat Process
              </router-link>
            </li>
            <!-- <li>
              <router-link to="/admin/feedback" 
                class="block py-2 px-4 rounded transition-all duration-200 ease-in-out"
                :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin/feedback'), 'text-white': !isNavActive('/admin/feedback') }">
                <i class="bi bi-chat-right-heart pr-3"></i> Feedback
              </router-link>
            </li> -->
          </ul>
        </nav>
      </aside>

      <!-- Navbar Mobile -->
      <div class="fixed z-10 bottom-0 left-0 w-full bg-sky-500 h-10  md:hidden">
        <div class="w-full bg-white h-5"></div>
      </div>
      <nav class="fixed z-20 bottom-0 left-0 w-full h-10 grid grid-cols-3 md:hidden transition-all duration-500 ease-in-out">
        <router-link to="/admin" class="text-xl flex justify-center items-center"
          :class="{ 
            'text-sky-500 bg-white rounded-br-2xl': isNavActive('/admin'), 
            'text-white bg-sky-500 rounded-tr-2xl': $route.path.startsWith('/admin/dataset-management'), 
            'text-white bg-sky-500 ': isNavActive('/admin/history-chat-process')
          }"
        >
          <i class="bi bi-speedometer2 transition-all duration-300 ease-out"
          :class="{
              'text-3xl': isNavActive('/admin')
            }"
          ></i>
        </router-link>
        <router-link to="/admin/dataset-management" class="text-xl flex justify-center items-center"
          :class="{ 
            'text-white bg-sky-500 rounded-tl-2xl ': isNavActive('/admin'), 
            'text-sky-500 bg-white rounded-b-2xl ': $route.path.startsWith('/admin/dataset-management'), 
            'text-white bg-sky-500 rounded-tr-2xl ': isNavActive('/admin/history-chat-process'),
          }"
        >
          <i class="bi bi-database transition-all duration-300 ease-out"
            :class="{
              'text-3xl': $route.path.startsWith('/admin/dataset-management')
            }"
          ></i>
        </router-link>
        <router-link to="/admin/history-chat-process" class="text-xl flex justify-center items-center"
          :class="{ 
            'text-white bg-sky-500': isNavActive('/admin'), 
            'text-white bg-sky-500 rounded-tl-2xl ': $route.path.startsWith('/admin/dataset-management'), 
            'text-sky-500 bg-white rounded-bl-2xl ': isNavActive('/admin/history-chat-process')
          }"
        >
          <i class="bi bi-chat-left-dots transition-all duration-300 ease-out"
            :class="{
              'text-3xl': isNavActive('/admin/history-chat-process')}"
          ></i>
        </router-link>
      </nav>

      <!-- Content -->
      <main class="mt-14 p-5 overflow-scroll overflow-x-hidden bg-slate-50 text-black ">
        <router-view></router-view>
      </main>
    </div>

    <!-- Jika Token Expired -->
    <div v-else-if="sessionExpired" class="text-black flex flex-col justify-center items-center h-screen">
      <span>
        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg width="100px" height="100px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet">
          <path d="M23.36 116.32v-7.42c7.4-1.9 67.86 0 81.28 0v7.42c0 4.24-18.2 7.68-40.64 7.68s-40.64-3.44-40.64-7.68z" fill="#8b5738"></path>
          <ellipse cx="64" cy="108.48" rx="40.64" ry="7.68" fill="#ffb17a"></ellipse>
          <ellipse cx="64" cy="108.48" rx="40.64" ry="7.68" fill="#cc8552"></ellipse>
          <path d="M69.96 65.49c-.75-.31-1.07-.92-1.07-1.73c0-.81.25-1.39.98-1.64c4.61-1.86 27.77-10.73 27.77-38.36l-.18-4.82l-66.98-.08l-.12 5.07c0 26.79 23.08 36.25 27.68 38.11c.75.31 1.22.82 1.22 1.73s-.39 1.39-1.13 1.64c-4.61 1.86-27.77 10.73-27.77 38.36c.12 3.12 1.6 5.57 5.34 6.5c5.03 1.25 14.38 2.57 30.53 2.57c13.91 0 21.7-1.02 26.03-2.03c4.25-.99 5.29-3.44 5.36-6.6l.01-.61c.01-26.79-23.06-36.25-27.67-38.11z" opacity=".75" fill="#81d4fa"></path>
          <path d="M97.46 18.94l-66.98-.08l-.11 4.52S37.62 27.1 64 27.1s33.63-3.72 33.63-3.72l-.17-4.44z" opacity=".39" fill="#1d44b3"></path>
          <path d="M23.36 17.94v-7.87c7.18-.96 70.91 0 81.28 0v7.87c0 3.36-18.2 6.08-40.64 6.08s-40.64-2.72-40.64-6.08z" fill="#8b5738"></path>
          <ellipse cx="64" cy="10.08" rx="40.64" ry="6.08" fill="#cc8552"></ellipse>
          <path d="M60.32 74.41c1.06-1.64 1.27-4.51 4.48-4.51c1.81 0 28.02 34.52 26.07 36.8c-.65.76-1.61 1.07-2.53 1.33c-15.38 4.34-38.86 3.26-48.98-.97c-4.03-1.68 3.51-11.33 5.39-13.63c.66-.8 12.06-13.62 15.57-19.02z" fill="#ffca28">
          </path>
          <path d="M65.45 74.21c3.76 7.16 4.89 12.49 6.53 20.58c.84 4.11 3.96 15.49 7.74 15.02c3.04-.44 5.95-1.02 8.61-1.78c.92-.26 1.88-.57 2.53-1.33c.55-.65.1-3.59-4.3-9.64c-3.77-5.17-9.14-12.39-10-14.05c-3.86-7.44-9.81-13.35-11.76-13.11c-1.39.16-.22 2.65.65 4.31z" fill="#e2a610">
          </path>
          <g opacity=".6">
          <path d="M42.9 80.6c-3.13 3.66-5.48 8.58-4.59 13.33c.94 5.01 5.6 3.63 7.22 2.36c5.16-4.05 3.75-9.24 7.74-15.07c.68-1 3.52-4.13 3.12-6.1c-.24-1.17-2.96-1.77-7.91.71c-2.18 1.1-3.97 2.9-5.58 4.77z" fill="#ffffff">
          </path>
          </g>
          <g opacity=".6">
          <path d="M45.79 37.66c1.26 2.94 3.56 9.61.56 10.75c-3 1.15-7.39-3.11-9.47-7.39s-1.89-9.96 1.25-10.05c3.14-.09 5.99 2.8 7.66 6.69z" fill="#ffffff">
          </path>
          </g>
        </svg>
      </span>
      <h1 class="text-center font-bold text-gray-900 text-2xl">Sesimu telah berakhir</h1>
      <p class="text-gray-400">Silakan login ulang</p>
    </div>

    <!-- Jika user tidak terautentikasi -->
    <div v-else-if="!isAuthenticated && isConnectedStatus === true" >
      <ForbiddenView />
    </div>

    <div v-else-if="isConnectedStatus === false" class="text-black flex flex-col justify-center items-center h-screen">
        <DisconnectIcon />
        <div class="pt-5">
          <h1 class="text-center font-semibold text-gray-500 px-12">Koneksi terputus, silakan coba lagi nanti</h1>
        </div>
    </div>

</template>

<script>
import Cookies from 'js-cookie';
import ForbiddenView from '@/views/Error/ForbiddenView.vue';
import DisconnectIcon from '@/components/icons/DisconnectIcon.vue';
import { mapState } from 'vuex';

export default {
  name: "AdminView",
  data() {
    return {
      dropdownActive: false,
      ipAddress: import.meta.env.VITE_SERVER_URL,
      isAuthenticated: false,
      sessionExpired: false
    }
  },
  components: {
    ForbiddenView,
    DisconnectIcon
  },
  async created() {
    console.log("Halaman dimuat")
    await this.connectToAdmin();
  },
  computed: {
    isConnectedStatus() {
      return this.$store.state.isConnected;
    }, 
    ...mapState(['userAuth']),
  },
  methods: {
    isNavActive(route){
      return this.$route.path === route;
    },
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive; // Toggle dropdown
    },
    async connectToAdmin() {
      console.log("Menghubungkan ke admin");
      console.log(Cookies.get("csrf_access_token"));
      try {
        const response = await fetch(this.ipAddress + "/users/admin", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': sessionStorage.getItem("token")
          },
          // body: JSON.stringify({
          //   email: this.email,
          //   password: this.password,
          // }),
          credentials: 'include',
        });

        const data = await response.json();
        console.log("Response server: ", data.status);
        if (response.ok) {
          this.isAuthenticated = data.status;
          console.log("Berhasil terhubung ke admin");
          console.log("Pesan dari server: ", data);
        } else {
          this.isAuthenticated = data.status;
          if (data.msg === "Token has expired") {
            this.sessionExpired = true;
          }
          console.log("Gagal terhubung ke admin");
          console.log("Pesan dari server: ", data);
        }
      } catch (error) {
        this.isAuthenticated = false;
        console.error("Error saat menghubungkan ke admin: ", error);
      }
    }
  },
};
</script>

<style>
/* Animasi transisi dropdown */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
