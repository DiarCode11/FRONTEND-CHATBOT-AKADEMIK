<template>
  <!-- Add User Modal -->
  <Modal v-model:show-modal="isShowAddModal" :size="'sm'" @close="closeModal">
    <form @submit.prevent="createUserByAdmin">
      <div class="flex justify-center pb-4">
        <h1 class="text-xl font-semibold">Buat User Baru</h1>
      </div>

      <!-- Alert Error -->
      <div
        v-if="errorMessages"
        class="bg-red-100 p-4 rounded-lg mb-2 flex gap-3 items-center"
      >
        <span class="text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <p class="text-sm font-semibold text-red-600 text-wrap">{{ errorMessages }}</p>
      </div>
      <div class="my-3 relative">
        <label for="name" class="block">Nama Lengkap</label>
        <input
          name="name"
          placeholder="Masukkan nama lengkap"
          type="text"
          v-model="name"
          class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300 focus:outline-none text-sm"
        />
        <span class="absolute top-1/2 right-3">
          <PersonIcon />
        </span>
      </div>
      <div class="my-3 relative">
        <label for="title" class="block">Email</label>
        <input
          name="email"
          placeholder="Masukkan email"
          type="email"
          v-model="email"
          class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300 focus:outline-none text-sm"
        />
        <span class="absolute top-1/2 right-3">
          <EmailIcon />
        </span>
      </div>
      <div class="my-3">
          <label for="embedder" class="block">Role</label>
          <div class="relative">
            <div @click.stop="toggleRoleModal" :class="[!selectedRole ? 'text-gray-400' : '']" class="text-sm cursor-pointer  select-none w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none">
              {{ selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1): "Pilih Embedder" }}
            </div>
            <transition name="fade-slide">
              <div v-if="isShowRoleModal === true" ref="roleModal" class="absolute left-1/2 bottom-10 -translate-x-1/2 transform  flex flex-col gap-2 w-full bg-white rounded-lg shadow-lg border px-2 py-3 text-sm">
                <div v-for="item in role" @click="selectRole(item)" class="w-full relative hover:bg-slate-400 rounded-md px-2 cursor-pointer">
                  {{ item.charAt(0).toUpperCase() + item.slice(1) }}
                  <span class="absolute top-1/2 right-3 transform -translate-y-1/2" v-if="selectedRole === item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                </div>
              </div>
            </transition>
            <span class="absolute top-3 right-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-400 transform duration-500 ease-in-out" :class="{ 'transform rotate-180': isShowRoleModal }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>
      <div class="mb-4 relative">
        <label for="password" class="block">Password</label>
        <input
          :type="showPassword ? 'text': 'password'"
          placeholder="Masukkan password"
          id="password"
          min="8"
          class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300 text-sm focus:outline-none"
          v-model="password"
        />
        <span class="absolute top-1/2 right-3 cursor-pointer" @click="showPassword = !showPassword">
          <EyeButton :show-eye="showPassword" />
        </span>
      </div>
      <div class="mb-4 relative">
        <label for="confirm-password" class="block">Konfirmasi Password</label>
        <input
          :type="showConfirmedPassword ? 'text': 'password'"
          placeholder="Ulangi password"
          id="confirm-password"
          autocomplete="confirm-password"
          min="8"
          class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300 text-sm focus:outline-none"
          v-model="confirmedPassword"
        />
        <span class="absolute top-1/2 right-3 cursor-pointer" @click="showConfirmedPassword = !showConfirmedPassword">
          <EyeButton :show-eye="showConfirmedPassword" />
        </span>
      </div>
      
      <button
        type="submit"
        class=" w-full mt-2 py-2 rounded-md text-white font-semibold"
        :class="[ isFormFilled ? 'bg-sky-500' : 'bg-gray-400 cursor-not-allowed' ]"
        :disabled="!isFormFilled"
      >
        <div class="flex items-center justify-center gap-2">
          <div v-if="submitLoading" class="lds-dual-ring"></div>
          <p>Submit</p>
        </div>
      </button>

    </form>
  </Modal>
  <p class="text-sm text-gray-400">Admin /</p>
  <h1 class="text-xl font-bold pb-6">Dashboard</h1>
  <div class="grid md:grid-cols-4 gap-4 mb-5 grid-cols-2">
    <div
      class="bg-gradient-to-br shadow-xl text-white p-4 rounded-xl"
      :class="{ 
        'from-gray-300 to-gray-400': isConnectedStatus == false,
        'from-sky-500 to-sky-600': isConnectedStatus == true 
        }"
    >
      <div
        class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl"
      >
        <i class="bi bi-person-circle text-gray-800"></i>
      </div>
      <h1 class="pt-4 text-lg font-bold">{{ userCount }}</h1>
      <p v-if="isConnectedStatus == false">Server Offline</p>
      <p v-else>Pengguna Online</p>
    </div>
    <div
      class="bg-gradient-to-br shadow-xl from-green-500 to-green-600 text-white p-4 rounded-xl"
    >
      <div
        class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl"
      >
        <i class="bi bi-chat-dots-fill text-gray-800"></i>
      </div>
      <h1 class="pt-4 text-lg font-bold">{{ chatCount }}</h1>
      <p>Chat Hari ini</p>
    </div>
    <div
      class="bg-gradient-to-br shadow-xl from-orange-500 to-orange-600 text-white p-4 rounded-xl"
    >
      <div
        class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl"
      >
        <i class="bi bi-chat-right-heart-fill text-gray-800 translate-y-0.5"></i>
      </div>
      <h1 class="pt-4 text-lg font-bold">{{ newUsersLogin }}</h1>
      <p>Pengguna Baru</p>
    </div>
    <div
      class="bg-gradient-to-br shadow-xl from-slate-500 to-slate-600 text-white p-4 rounded-xl"
    >
      <div
        class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl"
      >
        <i class="bi bi-hand-thumbs-up-fill text-gray-800"></i>
      </div>
      <h1 class="pt-4 text-lg font-bold">100</h1>
      <p>Like</p>
    </div>
  </div>
  <div class="relative flex gap-4 bg-white rounded-3xl shadow-lg flex-col">
		<span class="bg-gradient-to-r from-white to-transparent w-5 h-[calc(100%-100px)] absolute mt-10 left-0"></span>
		<span class="bg-gradient-to-r from-transparent to-white w-5 h-[calc(100%-120px)] absolute mt-10 right-0"></span>
    <div class="w-full flex justify-between items-center px-6 pb-2 pt-7 gap-3">
      <div class="">
        <button
          @click="showAddUserModal"
          class="w-9 h-9 md:w-full md:h-full md:px-3 md:py-1 justify-center items-center bg-sky-500 text-white rounded-lg flex gap-2 hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <i class="bi bi-file-earmark-plus"></i>
          <p class="md:block hidden">Tambah</p>
        </button>
      </div>
      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          v-model="search_query"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full pl-10 p-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
    <div class="pb-10">
      <div class="overflow-x-auto w-full">
        <div class="flex flex-col gap-2 w-max md:w-full h-max px-4 shadow-lg">
          <table class="min-w-full w-max bg-white">
            <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                <th class="py-3 px-6 text-left">No</th>
                <th class="py-3 px-6 text-left">Username</th>
                <th class="py-3 px-6 text-left">Email</th>
                <th class="py-3 px-6 text-left">Role</th>
                <th class="py-3 px-6 text-left">Dibuat</th>
                <th class="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-xs">
              <tr v-for="(user, index) in paginatedData" :key="user.id" class="border-b">
                <td class="py-3 px-6 text-left">{{ (current_page - 1) * items_per_page + index + 1 }}</td>
                <td class="py-3 px-6 text-left">{{ user.username }}</td>
                <td class="py-3 px-6 text-left">{{ user.email }}</td>
                <td class="py-3 px-6 text-left">{{ user.role }}</td>
                <td class="py-3 px-6 text-left">{{ user.created_at }}</td>
                <td class="py-3 px-6 text-left flex gap-2">
                  <EditButton @button-clicked="" />
                  <DeleteButton @button-clicked="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Paginasi -->
      <div class="flex justify-center gap-2 mt-4">
        <button
          @click="changePage(current_page - 1)"
          :disabled="current_page === 1"
          class="bg-gray-200 w-8 h-8 py-1 text-sm rounded-md"
        >
          <<
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="{
            'bg-blue-500 text-white': current_page === page,
            'cursor-default': page === '...',
          }"
          :disabled="page === '...'"
          class="w-8 h-8 rounded-md"
        >
          {{ page }}
        </button>
        <button
          @click="changePage(current_page + 1)"
          :disabled="current_page === totalPages"
          class="bg-gray-200 p-2 w-8 h-8 py-1 rounded-md"
        >
          >>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EditButton from '@/components/buttons/EditButton.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import Modal from '@/components/modal/Modal.vue';
import EyeButton from '@/components/buttons/EyeButton.vue';
import PersonIcon from '@/components/icons/PersonIcon.vue';
import EmailIcon from '@/components/icons/EmailIcon.vue';
import { getPagination } from '@/scripts/Pagination';
import Cookies from 'js-cookie';

export default {
  name: "DashboardView",
  components: {
    EditButton,
    DeleteButton,
    Modal,
    EyeButton,
    PersonIcon,
    EmailIcon
  },
  data() {
    return {
      ipAddress: import.meta.env.VITE_SERVER_URL,
      allUsers: [],
      newUsersLogin: 0,
      isShowAddModal: false,
      isShowEditModal: false,
      isShowDeleteModal: false,
      showPassword: false,
      showConfirmedPassword: false,
      role: ["admin", "user"],
      name : "",
      email: "",
      password: "",
      confirmedPassword: "",
      isShowRoleModal: false,
      selectedRole: "",
      isLoading: false,
      errorMessages: "",
      search_query: "",
      current_page: 1,
      items_per_page: 5,
    }
  },
  computed: {
    searchData() {
      console.log(this.search_query)
      return this.allUsers.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(this.search_query.toLowerCase())
        )
      )
    },
    totalPages() {
      if (this.search_query === "") {
        console.log("Total pages: ", Math.ceil(this.allUsers.length / this.items_per_page));
        return Math.ceil(this.allUsers.length / this.items_per_page);
      }
      return Math.ceil(this.searchData.length / this.items_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.items_per_page;
      const end = start + this.items_per_page;
      if (this.search_query === "") {
        return this.allUsers.slice(start, end);
      }
      return this.searchData.slice(start, end);
    },
    visiblePages() {
      // Menggunakan fungsi getPagination
      return getPagination(this.totalPages, this.current_page)
    },
    isFormFilled() {
      return this.name !== '' && this.email !== '' && this.password !== '' && this.confirmedPassword !== '' && this.selectedRole !== ''
    },
    userCount() {
      return this.$store.state.userCount;
    },
    chatCount() {
      return this.$store.state.totalChat;
    },
    isConnectedStatus() {
      return this.$store.state.isConnected;
    },  
  },
  async created() {
    await this.getAllUsers();
  },
  methods: {
    closeModal() {
      console.log("Modal closed");
      this.isShowAddModal = false;
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirmedPassword = "";
      this.isShowRoleModal = false;
      this.selectedRole = "";
      this.errorMessages = "";
    },
    toggleRoleModal() {
      this.isShowRoleModal = !this.isShowRoleModal;
    },
    showAddUserModal() {
      this.isShowAddModal = true;
    },
    selectRole(role) {
      this.isShowRoleModal = false;
      this.selectedRole = role;
    },
    changePage(page) {
      if (typeof page === "number" && page > 0 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    async getAllUsers() {
      try {
          const response = await fetch(this.ipAddress + "/users/all", {
              method: 'GET',
              headers: {
                  'X-CSRF-TOKEN': sessionStorage.getItem("token")
              },
              credentials: 'include',
          });

          const data_json = await response.json();

          if (response.ok) {
              console.log(data_json);
              console.log(data_json.data);
              this.allUsers = data_json.data;
              this.newUsersLogin = data_json.new_users_login;
          } else {
              console.log("Error: ", data_json);
          }
      } catch (error) {
          console.log(error);
      }
    },
    async createUserByAdmin() {
      try {
        this.isLoading = true;
        const response = await fetch(this.ipAddress + "/users/add", {
          method: 'POST',
          headers: {
              'X-CSRF-TOKEN': sessionStorage.getItem("token"),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            confirmedPassword: this.confirmedPassword,
            role: this.selectedRole
          }),
          credentials: 'include',
        });

        const data_json = await response.json();
        this.isLoading = false;
        if (response.ok) {
          console.log(data_json);
          this.closeModal();
          this.allUsers = data_json.data;
          this.newUsersLogin = data_json.new_users_login;
        } else {
          console.error(data_json);
          this.errorMessages = data_json.message;
        }
      } catch (error) {
        this.errorMessages = "Terjadi kesalahan saat mengakses server"
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse; /* Menghilangkan garis antara border */
  border: none; /* Menghilangkan garis pada tabel */
}

table th,
table td {
  border: none; /* Menghilangkan garis pada header dan sel */
  padding: 12px; /* Memberikan padding untuk ruang antar konten */
}

table thead tr {
  border-bottom: none; /* Menghilangkan garis bawah pada header */
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 0%) scale(0.8);
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 6px solid #0284c7;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
</style>
