<script>
import Cookies from 'js-cookie';
import { getPagination } from "@/scripts/Pagination";
import Modal from '@/components/modal/Modal.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningStaticAlert from '@/components/alert/WarningStaticAlert.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';

export default {
  name: "Test",
  created() {},
  data() {
    return {
      Embedder_model: ['text-embedding-ada-002', 'text-embedding-3-small', 'text-embedding-3-large'],
      selectedEmbedder: "",
      selected_chunk: null,
      selected_vector: null,
      isLlmModalOpen: false,
      isEmbedderModalOpen: false,
      chunk_size : null,
      chunk_overlap : null,
      chunks_data : null,
      total_chunk : null,
      total_pages : null,
      current_page : 1,
      items_per_page : null,
      error_message : "",
      ipAddress: import.meta.env.VITE_SERVER_URL,
      isChunkModalOpen: false,
      isVectorModalOpen: false,
      show_alert: false,
      current_setting: {
        chunk_size: null,
        chunk_overlap: null,
        embedder: null
      },
      showWarningAlert: false,
    };
  },
  components: {
    Modal,
    ErrorAlert,
    WarningStaticAlert,
    WarningIcon
  },
  async created() {
    await this.getChunk(1)
  },
  methods: {
    async downloadExcel() {
      try {
        const response = await fetch(this.ipAddress + "/vectordb/download");
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
  
        link.href = url;
        link.setAttribute('download', 'dataset.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.log("Download failed: ", error);
      }
    },
    async getChunk(index) {
      try {
        const response = await fetch(this.ipAddress + "/vectordb/" + index, {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': sessionStorage.getItem("token"),
          },
          credentials: 'include',
        });

        console.log(response);

        const data_json = await response.json();

        if (response.ok) {
          console.log("Isi JSON: ", data_json);
          this.chunks_data = data_json['data'];
          this.total_chunk = data_json['total_chunk'];
          this.total_pages = data_json['pages'];
          this.items_per_page = data_json['items_per_page'];
          this.current_setting = data_json['setting'];
          this.chunk_size = data_json['setting']['chunk_size'];
          this.chunk_overlap = data_json['setting']['chunk_overlap'];
          this.selectedEmbedder = data_json['setting']['embedder'];
          this.showWarningAlert = !data_json['is_latest_db'];
          this.is_latest_db = data_json['is_latest_db'];
          console.log("Isi Show Warning: ", this.showWarningAlert);
        } else {
          this.error_message = data_json['message'];
          this.chunks_data = false;
        }

      } catch (error) {
        console.log(error);
      }
    },
    async generateVectorDB() {
      console.log("Tombol generate db ditekan");
      const current_chunks = this.chunks_data
      this.chunks_data = null;
      try {
        const response = await fetch(this.ipAddress + "/vectordb/generate", {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chunk_size: this.chunk_size,
            chunk_overlap: this.chunk_overlap,
            embedder: this.selectedEmbedder
          }),
          credentials: 'include',
        });
        const data_json = await response.json();
        console.log(data_json)
        this.isCreateDB = false

        if (response.ok) {
          this.current_page = 1
          this.chunks_data = data_json['data'];
          this.current_setting = data_json['setting'];
          this.chunk_size = data_json['setting']['chunk_size'];
          this.chunk_overlap = data_json['setting']['chunk_overlap'];
          this.selectedEmbedder = data_json['setting']['embedder'];
          this.total_chunk = data_json['total_chunk'];
          this.is_latest_db = data_json['is_latest_db'];
        } else {
          console.log("Client error: ", data_json);
          this.chunks_data = current_chunks
          this.error_message = data_json.message
          this.show_alert = true
        }

        console.log(data_json)
      } catch(error) {
        this.chunks_data = current_chunks
        console.log(error)
      }
    },
    async changePage(page) {
      await this.getChunk(page);
      this.current_page = page;
    },
    getDocumentPage(metadata) {
      if ("page" in metadata) {
        return metadata.page + 1
      } else {
        return "Tidak ada"
      }
    },
    closeModal() {
      this.isChunkModalOpen = false;
      this.isVectorModalOpen = false;
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
    },
    ShowChunkModal(item) {
      this.isChunkModalOpen = true;
      this.selected_chunk = item
    }
  },
  mounted() {
    document.addEventListener("click", this.closeModal);
  },
  computed: {
    visiblePages() {
      return getPagination(this.total_pages, this.current_page);
    },
    isSettingChanges() {
      return this.current_setting['chunk_size'] != this.chunk_size || this.current_setting['chunk_overlap'] != this.chunk_overlap || this.current_setting['embedder'] != this.selectedEmbedder || !this.is_latest_db
    }
  }
};
</script>

<template>
  <ErrorAlert :message="error_message" :show_alert="show_alert" @close="show_alert = false"/>
  <WarningStaticAlert :isActive="showWarningAlert" @close="showWarningAlert = false">
    <div class="p-6">
      <div class="flex pb-2 gap-x-3 items-center text-lg font-bold text-orange-600">
        <WarningIcon :size="6" />
        <h2>Update Basis Data Vektor diperlukan</h2>
      </div>
      <div class="flex flex-col gap-1 pr-3">
        <p>Lakukan pembaruan pada basis data vektor</p>
      </div>
    </div>
  </WarningStaticAlert>
    <div>
    <p class="text-sm text-gray-400">Admin /</p>
    <h1 class="text-xl font-bold pb-6">Dataset Management/Vector Database</h1>

    <!-- Modal Show Chunk -->
    <Modal v-model:show-modal="isChunkModalOpen" @close="closeModal">
      <h1 class="w-full text-center text-lg font-bold pb-5 text-sky-600">Chunk {{ selected_chunk.index + 1 }}</h1>
      <h2 class="break-words"><strong>Sumber:</strong> {{ selected_chunk.metadata['sumber data'] }}</h2>
      <h2 class="font-bold py-2">Isi Chunk:</h2>
      <textarea readonly class="w-full h-36 resize-none focus:outline-none border-2 p-2 text-sm border-gray-500 rounded-lg" name="" id="">{{ selected_chunk.chunk }}</textarea>
      <h2><strong>Overlap:</strong> <p v-if="!selected_chunk.overlap">Tidak ada</p></h2>
      <textarea v-if="selected_chunk.overlap" readonly class="w-full h-20 resize-none focus:outline-none border-2 p-2 text-sm border-gray-500 rounded-lg" name="" id="">{{ selected_chunk.overlap }}</textarea>
      <h2 class="font-bold py-2">Representasi vektor:</h2>
      <textarea readonly class="w-full h-28 resize-none focus:outline-none border-2 p-2 text-sm border-gray-500 rounded-lg" name="" id="">{{ selected_chunk.vector }}</textarea>
    </Modal>

    <!-- Tampilan Mobile -->
    <div class="flex flex-col-reverse md:flex-row gap-5">
      <div class="md:w-2/3 w-full">
        <div class="relative flex gap-4 bg-white rounded-3xl shadow-lg flex-col">
          <span
            class="bg-gradient-to-r from-white to-transparent w-5 h-[calc(100%-100px)] absolute mt-10 left-0"
          ></span>
          <span
            class="bg-gradient-to-r from-transparent to-white w-5 h-[calc(100%-120px)] absolute mt-10 right-0"
          ></span>
          <div class="w-full flex justify-between items-center px-6 pb-2 pt-7">
            <div>Total Chunk : {{ total_chunk }}</div>
            <button @click="downloadExcel" class="bg-green-600 text-white rounded-md py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          </div>
          <div class="pb-10">
            <div class="overflow-x-auto w-full">
              <div class="flex flex-col gap-2 w-max md:w-full h-max px-4 shadow-lg">
                <table v-if="chunks_data" class="min-w-full w-max bg-white">
                  <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                      <th class="py-3 px-6 text-left">No</th>
                      <th class="py-3 px-6 text-left">Sumber</th>
                      <th class="py-3 px-6 text-left">Chunk</th>
                      <th class="py-3 px-6 text-left">Halaman</th>
                      <th class="py-3 px-6 text-left">Tahun</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-xs">
                    <tr v-for="(file, index) in chunks_data" :key="file.id" class="border-b">
                      <td class="py-3 px-6 text-left">{{ (current_page - 1) * items_per_page + index + 1 }}</td>
                      <td class="py-3 px-6 text-left">
                        <div class="w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                          {{ file.metadata['sumber data'] }}
                        </div>
                      </td>
                      <!-- {{ /*file.filename.length > 20 ? file.filename.substring(0, 20) + "..." : file.filename*/ file.filename  }}</td> -->
                      <td class="py-3 px-6 text-left">
                        <button @click="ShowChunkModal(file)" class="bg-sky-500 text-white px-2 py-1 rounded-md">
                          Lihat chunk
                        </button>
                      </td>
                      <td>{{ getDocumentPage(file.metadata) }}</td>
                      <td class="py-3 px-6 text-left">{{ file.metadata.tahun }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="chunks_data == false" class="flex justify-center items-center py-10 md:py-32 px-10 text-center">
                <p class="text-gray-400">Data tidak ditemukan, mohon tambahkan konfigurasi untuk membuat database vektor yang baru</p>
              </div>
              <div v-if="chunks_data == null" class="flex justify-center items-center py-10 md:py-32 px-10 text-center">
                <div class="loader"></div>
              </div>
            </div>
            <!-- Paginasi -->
            <div v-if="chunks_data" class="flex justify-center gap-2 mt-4">
              <button
                @click="changePage(current_page - 1)"
                :disabled="current_page === 1"
                class="bg-gray-200 w-6 h-6 md:w-8 md:h-8 py-1 text-sm rounded-md"
              >
                <<
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="changePage(page)"
                :class="{
                  'bg-blue-500 text-white text-sm': current_page === page,
                  'cursor-default': page === '...',
                }"
                :disabled="page === '...'"
                class="w-6 h-6 md:w-8 md:h-8 rounded-md text-sm"
              >
                {{ page }}
              </button>
              <button
                @click="changePage(current_page + 1)"
                :disabled="current_page === total_pages"
                class="bg-gray-200 p-2 w-6 h-6 md:w-8 md:h-8 py-0.5 px-0.5 rounded-md"
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
            inputmode="numeric"
            pattern="[0-9]*"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
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
            inputmode="numeric"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            pattern="[0-9]*"
            placeholder="cth. 500"
            v-model="chunk_overlap"
            :disabled="scrapLoading"
            :class="[submitLoading ? 'text-gray-400' : '']"
            class="w-1/2 px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          />
        </div>
        <div class="my-3">
          <label for="embedder" class="block text-gray-600 pb-2">Embedder</label>
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
        <button @click="generateVectorDB()" 
        class="text-white rounded-md w-full mt-5 py-2" 
        :class="[isSettingChanges ? 'bg-sky-500' : 'bg-gray-300' ]"
        :disabled="!isSettingChanges"
        >
          Perbarui Dataset
        </button>
      </div>
    </div>
  </div>
  
  
</template>

<style scoped>
/* Animasi Modal */
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