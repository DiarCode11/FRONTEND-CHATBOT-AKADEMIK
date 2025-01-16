<template>
    <div class="grid md:grid-cols-[280px_1fr] grid-cols-[1fr] h-screen ">
      <!-- Navbar Desktop-->
      <aside class="bg-sky-500 p-4 overflow-auto hidden md:block">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <ul class="space-y-4">
            <li><router-link to="/admin" class="block py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out" :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin'), 'text-white': !isNavActive('/admin')}"><i class="bi bi-speedometer2 pr-2"></i> Dashboard</router-link></li>
            <li><router-link to="/admin/dataset-management" class="block py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out" :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin/dataset-management'), 'text-white': !isNavActive('/admin/dataset-management')}"><i class="bi bi-database pr-3"></i>Manajemen Dataset</router-link></li>
            <li><router-link to="/admin/history-chat-process" class="block py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out" :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin/history-chat-process'), 'text-white': !isNavActive('/admin/history-chat-process')}"><i class="bi bi-chat-left-dots pr-3"></i>History Chat Procces</router-link></li>
            <li><router-link to="/admin/feedback" class="block py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out" :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin/feedback'), 'text-white': !isNavActive('/admin/feedback')}"><i class="bi bi-chat-right-heart pr-3"></i>Feedback</router-link></li>
            <li><router-link to="/admin/logout" class="block py-2 px-4 rounded hover:font-semibold transition-all duration-200 ease-in-out" :class="{ 'text-sky-500 font-semibold bg-white': isNavActive('/admin/logout'), 'text-white': !isNavActive('/admin/logout')}"><i class="bi bi-box-arrow-left pr-3"></i>Logout</router-link></li>
          </ul>
        </nav>
      </aside>

      <!-- Navbar Mobile -->
      <div class="fixed z-10 bottom-0 left-0 w-full bg-sky-500 h-10  md:hidden">
        <div class="w-full bg-white h-5"></div>
      </div>
      <nav class="fixed z-20 bottom-0 left-0 w-full h-10 grid grid-cols-4 md:hidden transition-all duration-500 ease-in-out">
        <router-link to="/admin" class="text-xl flex justify-center items-center"
          :class="{ 
            'text-sky-500 bg-white rounded-br-2xl': isNavActive('/admin'), 
            'text-white bg-sky-500 rounded-tr-2xl': isNavActive('/admin/dataset-management'), 
            'text-white bg-sky-500 ': isNavActive('/admin/history-chat-process'),
            'text-white bg-sky-500': isNavActive('/admin/feedback'),
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
            'text-sky-500 bg-white rounded-b-2xl ': isNavActive('/admin/dataset-management'), 
            'text-white bg-sky-500 rounded-tr-2xl ': isNavActive('/admin/history-chat-process'),
            'text-white bg-sky-500 ': isNavActive('/admin/feedback'),
          }"
        >
          <i class="bi bi-database transition-all duration-300 ease-out"
            :class="{
              'text-3xl': isNavActive('/admin/dataset-management')
            }"
          ></i>
        </router-link>
        <router-link to="/admin/history-chat-process" class="text-xl flex justify-center items-center"
          :class="{ 
            'text-white bg-sky-500': isNavActive('/admin'), 
            'text-white bg-sky-500 rounded-tl-2xl ': isNavActive('/admin/dataset-management'), 
            'text-sky-500 bg-white rounded-b-2xl ': isNavActive('/admin/history-chat-process'),
            'text-white bg-sky-500 rounded-tr-2xl': isNavActive('/admin/feedback'),
          }"
        >
          <i class="bi bi-chat-left-dots transition-all duration-300 ease-out"
            :class="{
              'text-3xl': isNavActive('/admin/history-chat-process')}"
          ></i>
        </router-link>
        <router-link to="/admin/feedback" class="text-xl flex justify-center items-center"
          :class="{ 
            'text-white bg-sky-500 ': isNavActive('/admin'), 
            'text-white bg-sky-500': isNavActive('/admin/dataset-management'), 
            'text-white bg-sky-500 rounded-tl-2xl ': isNavActive('/admin/history-chat-process'),
            'text-sky-500 bg-white rounded-bl-2xl': isNavActive('/admin/feedback'),
          }"
        >
          <i class="bi bi-chat-right-heart transition-all duration-300 ease-out"
            :class="{
              'text-3xl': isNavActive('/admin/feedback')
            }"
          ></i>
        </router-link>
      </nav>

      <!-- Content -->
      <main class="mt-14 p-5 overflow-scroll overflow-x-hidden bg-slate-50 text-black ">
        <router-view></router-view>
      </main>
    </div>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
        auth_status: false
    };
  },
  methods: {
    isNavActive(route){
      return this.$route.path === route;
    }
  }
};
</script>
