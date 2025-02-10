<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {
      LLM_model: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o-mini'],
      Embedder_model: ['text-embedder-ada-002', 'text-embedding-3-small', 'text-embedding-3-large'],
      selectedLLM: "",
      selectedEmbedder: "",
      isLlmModalOpen: false,
      isEmbedderModalOpen: false
    };
  },
  props: {},
  methods: {
    selectLLM(item) {
      this.selectedLLM = item;
      this.isLlmModalOpen = false;
    },
    selectEmbedder(item) {
      this.selectedEmbedder = item;
      this.isEmbedderModalOpen = false;
    },
    toggleLlmModal() {
      this.isLlmModalOpen = !this.isLlmModalOpen;
    },
    toggleEmbedderModal() {
      console.log(this.isEmbedderModalOpen)
      this.isEmbedderModalOpen = !this.isEmbedderModalOpen
    },
    closeModal(event) {
      if (this.$refs.embedderModal && !this.$refs.embedderModal.contains(event.target)) {
        this.isEmbedderModalOpen = false;
      }
      if (this.$refs.LlmModal && !this.$refs.LlmModal.contains(event.target)) {
        this.isLlmModalOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.closeModal);
  }
};
</script>

<template>
  <div>
    <p class="text-sm text-gray-400">Admin /</p>
    <h1 class="text-xl font-bold pb-6">Dataset Management/Vector Database</h1>

    <!-- Tampilan Mobile -->
    <div class="flex flex-col md:flex-row gap-5">
      <div class="md:w-2/3 w-full">
        <div class="relative flex gap-4 bg-white rounded-3xl shadow-lg flex-col">
          <span
            class="bg-gradient-to-r from-white to-transparent w-5 h-[calc(100%-100px)] absolute mt-10 left-0"
          ></span>
          <span
            class="bg-gradient-to-r from-transparent to-white w-5 h-[calc(100%-120px)] absolute mt-10 right-0"
          ></span>
          <div class="w-full flex justify-between items-center px-6 pb-2 pt-7">
            <div class="">
              <button
                @click="openAddModal()"
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
                <table v-if="checkData" class="min-w-full w-max bg-white">
                  <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                      <th class="py-3 px-6 text-left">No</th>
                      <th class="py-3 px-6 text-left">Judul</th>
                      <th class="py-3 px-6 text-left">Link</th>
                      <th class="py-3 px-6 text-left">Tahun</th>
                      <th class="py-3 px-6 text-left">Hasil ekstrak</th>
                      <th class="py-3 px-6 text-left">Dibuat</th>
                      <th class="py-3 px-6 text-left">Update terakhir</th>
                      <th class="py-3 px-6 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-xs">
                    <tr v-for="(file, index) in paginatedData" :key="file.id" class="border-b">
                      <td class="py-3 px-6 text-left">
                        {{ (current_page - 1) * items_per_page + index + 1 }}
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                          {{ file.title }}
                        </div>
                      </td>
                      <!-- {{ /*file.filename.length > 20 ? file.filename.substring(0, 20) + "..." : file.filename*/ file.filename  }}</td> -->
                      <td class="py-3 px-6 text-left">{{ file.url }}</td>
                      <td class="py-3 px-6 text-left">{{ file.year }}</td>
                      <td class="py-3 px-6 text-left">
                        <button
                          class="bg-sky-500 w-full py-1 px-2 rounded-md text-white font-semibold"
                        >
                          Lihat detail
                        </button>
                      </td>
                      <td class="py-3 px-6 text-left">{{ file.created_at }}</td>
                      <td class="py-3 px-6 text-left">{{ file.updated_at }}</td>
                      <td class="py-3 px-6 text-left flex gap-2">
                        <EditButton @button-clicked="setDataEdited(file)" />
                        <DeleteButton @button-clicked="setDataDeleted(file)" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="!checkData" class="flex justify-center items-center py-10">
                  <p class="text-gray-400">Data tidak ditemukan, mohon tambahkan dataset</p>
                </div>
              </div>
            </div>
            <!-- Paginasi -->
            <div v-if="checkData" class="flex justify-center gap-2 mt-4">
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
      </div>

      <!-- Tempat untuk sidebar kanan -->
      <div class="md:w-1/3 w-full bg-white rounded-3xl shadow-lg p-10">
        <h1 class="font-bold text-lg">Ubah Konfigurasi</h1>
        <div class="mb-3 mt-5 flex justify-between items-center gap-2">
          <label for="chunk-size" class="block text-gray-600">Chunk Size</label>
          <input
            name="chunk-size"
            type="text"
            placeholder="cth. 500"
            v-model="chunk_size"
            :disabled="scrapLoading"
            :class="[submitLoading ? 'text-gray-400' : '']"
            class="w-1/2 px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          />
        </div>
        <div class="my-3 flex justify-between items-center gap-2">
          <label for="chunk-overlap" class="block text-gray-600">Chunk Overlap</label>
          <input
            name="chunk-overlap"
            type="text"
            placeholder="cth. 500"
            v-model="chunk_overlap"
            :disabled="scrapLoading"
            :class="[submitLoading ? 'text-gray-400' : '']"
            class="w-1/2 px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          />
        </div>
        <div class="my-3">
          <label for="embedder" class="block text-gray-600">Model LLM</label>
          <div class="relative">
            <div @click.stop="toggleLlmModal" :class="[!selectedLLM ? 'text-gray-400' : '']" class="text-sm cursor-pointer  select-none w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none">
              {{ selectedLLM ? selectedLLM : "Pilih Embedder" }}
            </div>
            <transition name="fade-slide">
              <div v-if="isLlmModalOpen === true" ref="LlmModal" class="absolute left-1/2 bottom-10 -translate-x-1/2 transform  flex flex-col gap-2 w-full bg-white rounded-lg shadow-lg border px-2 py-3 text-sm">
                <div v-for="item in LLM_model" @click="selectLLM(item)" class="w-full relative hover:bg-slate-400 rounded-md px-2 cursor-pointer">
                  {{ item }}
                  <span class="absolute top-1/2 right-3 transform -translate-y-1/2" v-if="selectedLLM === item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                </div>
              </div>
            </transition>
            <span class="absolute top-3 right-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-400 transform duration-500 ease-in-out" :class="{ 'transform rotate-180': isEmbedderModalOpen }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>
        <div class="my-3">
          <label for="embedder" class="block text-gray-600">Embedder</label>
          <div class="relative">
            <div @click.stop="toggleEmbedderModal" :class="[!selectedEmbedder ? 'text-gray-400' : '']" class="text-sm cursor-pointer  select-none w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none">
              {{ selectedEmbedder ? selectedEmbedder : "Pilih Embedder" }}
            </div>
            <transition name="fade-slide">
              <div v-if="isEmbedderModalOpen === true" ref="embedderModal" class="absolute left-1/2 bottom-10 -translate-x-1/2 transform  flex flex-col gap-2 w-full bg-white rounded-lg shadow-lg border px-2 py-3 text-sm">
                <div v-for="item in Embedder_model" @click="selectEmbedder(item)" class="w-full relative hover:bg-slate-400 rounded-md px-2 cursor-pointer">
                  {{ item }}
                  <span class="absolute top-1/2 right-3 transform -translate-y-1/2" v-if="selectedEmbedder === item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                </div>
              </div>
            </transition>
            <span class="absolute top-3 right-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-400 transform duration-500 ease-in-out" :class="{ 'transform rotate-180': isEmbedderModalOpen }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>
        <button class="bg-sky-500 text-white rounded-md w-full mt-5 py-2">
          Perbarui Dataset
        </button>
      </div>
    </div>
  </div>
  
  
</template>

<style scoped>
/* Animasi Modal */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 0%) scale(0.8);
}
</style>