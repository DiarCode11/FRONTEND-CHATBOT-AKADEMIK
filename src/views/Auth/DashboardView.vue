<template>
  <p class="text-sm text-gray-400">Admin /</p>
  <h1 class="text-xl font-bold pb-6">Dashboard</h1>
  <div class="grid md:grid-cols-4 gap-4 mb-5 grid-cols-2">
    <div
      class="bg-gradient-to-br shadow-xl from-sky-500 to-sky-600 text-white p-4 rounded-xl"
    >
      <div
        class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl"
      >
        <i class="bi bi-person-circle text-gray-800"></i>
      </div>
      <h1 class="pt-4 text-lg font-bold">{{ userCount }}</h1>
      <p>User Online</p>
    </div>
    <div
      class="bg-gradient-to-br shadow-xl from-green-500 to-green-600 text-white p-4 rounded-xl"
    >
      <div
        class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl"
      >
        <i class="bi bi-chat-dots-fill text-gray-800"></i>
      </div>
      <h1 class="pt-4 text-lg font-bold">1000</h1>
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
      <h1 class="pt-4 text-lg font-bold">50</h1>
      <p>Feedback</p>
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
          @click=""
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
                <th class="py-3 px-6 text-left">Status</th>
                <th class="py-3 px-6 text-left">Timestamp</th>
                <th class="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-xs">
              <tr v-for="i in 7" :key="i" class="border-b">
                <td class="py-3 px-6 text-left">{{ i }}</td>
                <td class="py-3 px-6 text-left">Diar</td>
                <td class="py-3 px-6 text-left">gdsudiartika@gmail.com</td>
                <td class="py-3 px-6 text-left">Online</td>
                <td class="py-3 px-6 text-left">10-10-2025</td>
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

export default {
  name: "DashboardView",
  components: {
    EditButton,
    DeleteButton
  },
  computed: {
    userCount() {
      return this.$store.state.userCount;
    }
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
</style>
