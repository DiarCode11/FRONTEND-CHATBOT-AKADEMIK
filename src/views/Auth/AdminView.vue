<template>
    <div v-if="isAuthenticated && isConnectedStatus" class="grid md:grid-cols-[280px_1fr] grid-cols-[1fr] h-screen ">
      <!-- Navbar Desktop -->
      <aside class="bg-sky-500 p-4 overflow-auto hidden md:block">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
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

    <!-- Jika user tidak terautentikasi -->
    <div v-if="!isAuthenticated && isConnectedStatus === true" >
      <ForbiddenView />
    </div>

    <div v-if="isConnectedStatus === false" class="text-black flex flex-col justify-center items-center h-screen">
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
            'X-CSRF-TOKEN': Cookies.get("csrf_access_token"),
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
