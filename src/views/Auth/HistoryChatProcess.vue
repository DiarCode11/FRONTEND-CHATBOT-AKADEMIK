<template>
    <!-- Retrival Modal -->
    <Modal :show-modal="isRetrivalModalActive" :size="'lg'" @close="isRetrivalModalActive = false">
        <div class="w-full">
            <h1 class="text-xl font-bold pb-6 w-full text-center">Retrieval Process</h1>
            <div class="flex justify-between items-center border-b border-gray-200 pb-2">
                <button v-for="menu in retrievalMenu"
                    @click="switchRetrivalMenu(menu)"
                    class=" text-sm w-full rounded-md px-3 py-2"
                    :class="[menu === activeRetrievalMenu ? 'bg-sky-500 text-white' : 'bg-white font-semibold text-sky-500']"
                >
                    {{ menu }}
                </button>
            </div>
            <div v-if="activeRetrievalMenu === 'Question Embedding'" class="py-4">
                <div>
                    <h2 class="font-semibold ">Pertanyaan Asli</h2>
                    <textarea readonly class="w-full h-20 bg-slate-100 shadow resize-none text-md focus:outline-none p-4  border-gray-500 rounded-lg"
                    :value="[questionSelected.expansion_result ? questionSelected.expansion_result : questionSelected.question]">
                    </textarea>
                </div>
                <div class="py-4">
                    <h2 class="font-semibold ">Embedding Pertanyaan</h2>
                    <textarea readonly class="w-full h-40 bg-slate-100 shadow resize-none text-md focus:outline-none p-4  border-gray-500 rounded-lg"
                    :value="questionSelected.vector_from_query">
                    </textarea>
                </div>
            </div>
            <div v-if="activeRetrievalMenu === 'Retrieved Chunk'" class="max-h-[70vh] overflow-y-auto">
                <table class="mt-5">
                    <thead class="sticky top-0 bg-white z-10 shadow">
                        <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                            <th class="py-3 px-6 text-left">No</th>
                            <th class="py-3 px-6 text-left">Chunk</th>
                            <th class="py-3 px-6 text-left">Vektor</th>
                            <th class="py-3 px-6 text-left">Jarak Euclidean</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(chunk, index) in questionSelected.retrieval_result" :key="index" class="border-b">
                            <td class="w-4">
                                {{ index + 1 }}
                            </td>
                            <td class="md:w-96">
                                <textarea class="w-full h-36 text-sm focus:outline-none resize-none cursor-text"
                                :value="chunk.chunk"
                                readonly
                                >
                                </textarea>
                            </td>
                            <td class="md:w-56">
                                <textarea class="w-full h-36 text-sm focus:outline-none resize-none cursor-text"
                                :value="chunk.vector"
                                readonly
                                >
                                </textarea>
                            </td>
                            <td>
                                <textarea class="w-full h-36 text-sm focus:outline-none resize-none cursor-text"
                                :value="chunk.similiarity_score"
                                readonly
                                >
                                </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Modal>

    <!-- Corrective Modal -->
    <Modal :show-modal="isCorrectiveModalActive" :size="'md'" @close="isCorrectiveModalActive = false">
        <div class="w-full">
            <h1 class="text-xl font-bold pb-6 w-full text-center">Corrective Process</h1>
            <div>
                <h2 class="font-semibold ">Prompt</h2>
                <textarea readonly class="w-full h-40 bg-slate-100 shadow resize-none text-md focus:outline-none p-4  border-gray-500 rounded-lg"
                :value="questionSelected.corrective_prompt">
                </textarea>
            </div>
            <div class="py-4">
                <h2 class="font-semibold ">Hasil Koreksi</h2>
                <textarea readonly class="w-full h-40 bg-slate-100 shadow resize-none text-md focus:outline-none p-4  border-gray-500 rounded-lg"
                :value="questionSelected.corrective_result">
                </textarea>
            </div>
        </div>
    </Modal>

    <!-- Generator Modal -->
    <Modal :show-modal="isGeneratorModalActive" :size="'md'" @close="isGeneratorModalActive = false">
        <div class="w-full">
            <h1 class="text-xl font-bold pb-6 w-full text-center">Generator Process</h1>
            <div>
                <h2 class="font-semibold ">Prompt</h2>
                <textarea readonly class="w-full h-40 bg-slate-100 shadow resize-none text-md focus:outline-none p-4 border-gray-500 rounded-lg"
                :value="questionSelected.generator_prompt">
                </textarea>
            </div>
            <div class="py-4">
                <h2 class="font-semibold ">Hasil Akhir</h2>
                <textarea readonly class="w-full h-40 bg-slate-100 shadow resize-none text-md focus:outline-none p-4  border-gray-500 rounded-lg"
                :value="questionSelected.final_result">
                </textarea>
            </div>
        </div>
    </Modal>

    <SuccessAlert :show_alert="showSuccessAlert" :message="successMessage" @close="showSuccessAlert = false" />
    <p class="text-sm text-gray-400">Admin /</p>
    <h1 class="text-xl font-bold pb-6">History Chat</h1>

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
          </div>
          <div class="pb-10">
            <div class="overflow-x-auto w-full">
              <div class="flex flex-col gap-2 w-max md:w-full h-max px-4 shadow-lg">
                <table v-if="showChatHistory" class="min-w-full w-max bg-white" id="chat-history-table">
                  <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                      <th class="py-3 px-6 text-center">No</th>
                      <th class="py-3 px-6 text-center">Mode</th>
                      <th class="py-3 px-6 text-center">Question</th>
                      <th class="py-3 px-6 text-center">Query Expansion</th>
                      <th class="py-3 px-6 text-center">Retrieval</th>
                      <th class="py-3 px-6 text-center">Corrective</th>
                      <th class="py-3 px-6 text-center">Generation</th>
                      <th class="py-3 px-6 text-center">Time</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-xs">
                    <tr v-for="(data, index) in chatHistoryData" :key="index" class="border-b">
                      <td class="py-3 px-6 text-left">{{ (current_page - 1) * items_per_page + index + 1 }}</td>
                      <td>
                        <span v-if="data.expansion_result === null ">Naive-RAG</span>
                        <span v-else>Corrective-RAG</span>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="w-32 overflow-hidden text-wrap text-ellipsis">
                          {{ data.question }}
                        </div>
                      </td>
                      <!-- {{ /*file.filename.length > 20 ? file.filename.substring(0, 20) + "..." : file.filename*/ file.filename  }}</td> -->
                      <td class="py-3 px-6 text-center w-48 ">
                        <p v-if="data.expansion_result" class="text-left">{{ data.expansion_result }}</p>
                        <span v-else>-----</span>
                      </td>
                      <td>
                        <div class="w-32 overflow-hidden text-wrap text-ellipsis">
                          <button @click="showRetrivalModal(data)" class="bg-red-500 hover:scale-110 transition-all ease-in-out duration-200 text-white rounded-md w-20 py-1">
                            Lihat Detail
                          </button>
                        </div>
                      </td>
                      <td>
                        <div class="w-32 overflow-hidden text-wrap text-ellipsis">
                          <button v-if="data.expansion_result" @click="showCorrectiveModal(data)" class="bg-sky-500 hover:scale-110 transition-all ease-in-out duration-200 text-white rounded-md w-20 py-1">
                            Lihat Detail
                          </button>
                          <span v-else>-----</span>
                        </div>
                      </td>
                      <td>
                        <div class="w-32 overflow-hidden text-wrap text-ellipsis">
                          <button @click="showGeneratorModal(data)" class="bg-green-500 hover:scale-110 transition-all ease-in-out duration-200 text-white rounded-md w-20 py-1">
                            Lihat Detail
                          </button>
                        </div>
                      </td>
                      <td>
                        {{ data.created_at }}
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div v-if="chatHistoryData.length == 0" class="flex justify-center items-center py-10 md:py-32 px-10 text-center">
                <p class="text-gray-400">Data tidak ditemukan</p>
              </div>
            </div>

            <!-- Paginasi -->
            <div v-if="showChatHistory" class="flex justify-center gap-2 mt-4">
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
          <label for="chunk-size" class="block text-gray-600">Kandidat</label>
          <input
            name="chunk-size"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            placeholder="cth. 10"
            v-model="candidateSize"
            class="w-1/2 px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          />
        </div>
        <div class="my-3">
          <label for="embedder" class="block text-gray-600 pb-2">Model LLM</label>
          <div class="relative">
            <div @click.stop="toggleLLMSelector" :class="[!selectedLLM ? 'text-gray-400' : '']" class="text-sm cursor-pointer  select-none w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none">
              {{ selectedLLM ? selectedLLM : "Pilih Embedder" }}
            </div>
            <transition name="fade-slide">
              <div v-if="isShowLLMSelector === true" ref="embedderModal" class="absolute left-1/2 bottom-10 -translate-x-1/2 transform  flex flex-col gap-2 w-full bg-white rounded-lg shadow-lg border px-2 py-3 text-sm">
                <div v-for="item in LLM" @click="selectEmbedder(item)" class="w-full relative hover:bg-slate-400 rounded-md px-2 cursor-pointer">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-400 transform duration-500 ease-in-out" :class="{ 'transform rotate-180': isShowLLMSelector }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>
        <button @click="setLLMSetting" 
            class="text-white rounded-md w-full mt-5 py-2" 
            :class="[isSettingChanges  ? 'bg-sky-500' : 'bg-gray-300' ]"
            :disabled="!isSettingChanges"
        >
            Perbarui Konfigurasi
        </button>
      </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { getPagination } from '@/scripts/Pagination';
import Modal from '@/components/modal/Modal.vue';
import SuccessAlert from '@/components/alert/SuccessAlert.vue';

export default {
    name: 'HistoryChatProcessView',
    data() {
        return {
            selectedLLM: "",
            candidateSize: 0,
            isShowLLMSelector: false,
            LLM: ["gpt-3.5-turbo", "gpt-4", "gpt-4o", "gpt-4o-mini"],
            ipAddress: import.meta.env.VITE_SERVER_URL,
            total_chunk: 0,
            chatHistoryData: [],
            current_page: 1,
            items_per_page: 0,
            total_pages: 1,
            isRetrivalModalActive : false,
            isCorrectiveModalActive : false,
            isGeneratorModalActive : false,
            retrievalMenu: ["Question Embedding", "Retrieved Chunk"],
            questionSelected: null,
            activeRetrievalMenu: "Question Embedding",
            currentLLM: null,
            currentCandidateSize: null,
            errorMessage: "",
            createNewSetting: false,
            showSuccessAlert: false,
            successMessage: "",
        };
    },
    components: {
        Modal,
        SuccessAlert
    },
    mounted() {
        document.addEventListener("click", this.closeModal);
    },
    computed: {
        visiblePages() {
            return getPagination(this.total_pages, this.current_page);
        },
        showChatHistory() {
            return this.chatHistoryData.length > 0;
        },
        retrievalModalSize() {
            return this.activeRetrievalMenu === "Question Embedding" ? "md" : "lg";
        },
        isSettingChanges () {
            return (this.selectedLLM !== this.currentLLM) || 
                (Number(this.candidateSize) !== this.currentCandidateSize)
        }
    },
    async created() {
        await this.getLLMSetting();
        await this.getChatHistory();
    },
    methods: {
        async getLLMSetting() {
            try {
                const response = await fetch(this.ipAddress + "/chat-history/setting", {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': sessionStorage.getItem("token")
                    },
                    credentials: 'include',
                });

                const data_json = await response.json();

                if (response.ok) {
                    console.log(data_json);
                    this.currentLLM = data_json['data']['llm']
                    this.currentCandidateSize = data_json['data']['candidate_size']
                    this.selectedLLM = data_json['data']['llm']
                    this.candidateSize = data_json['data']['candidate_size']
                } else {
                    console.log("Error: ", data_json);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getChatHistory() {
            try {
                const response = await fetch(this.ipAddress + "/chat-history/chat?page=1", {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': sessionStorage.getItem("token")
                    },
                    credentials: 'include',
                });

                const data_json = await response.json();

                if (response.ok) {
                    console.log(data_json);
                    this.chatHistoryData = data_json['data'];
                    this.current_page = data_json['current_page']
                    this.items_per_page = data_json['items_per_page']
                    this.total_pages = data_json['total_page']
                    console.log("Isi this.HistoryData: ", this.chatHistoryData.length);
                } else {
                    this.chatHistoryData = [];
                    console.log("Error: ", data_json);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async changePage(page) {
            try {
                const response = await fetch(this.ipAddress + "/chat-history/chat?page=" + page, {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': sessionStorage.getItem("token")
                    },
                    credentials: 'include',
                });

                const data_json = await response.json();

                if (response.ok) {
                    console.log(data_json);
                    this.chatHistoryData = data_json['data'];
                    this.current_page = data_json['current_page']
                    this.items_per_page = data_json['items_per_page']
                    this.total_pages = data_json['total_page']
                    console.log("Isi this.HistoryData: ", this.chatHistoryData.length);
                } else {
                    this.chatHistoryData = [];
                    console.log("Error: ", data_json);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async setLLMSetting() {
            console.log("selected LLM: ", this.selectedLLM);
            console.log("candidate size: ", this.candidateSize);
            try {
                const response = await fetch(this.ipAddress + "/chat-history/setting", {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': sessionStorage.getItem("token"),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        llm: this.selectedLLM,
                        candidate_size: this.candidateSize
                    }),
                    credentials: 'include',
                });

                const data_json = await response.json();

                if (response.ok) {
                    console.log(data_json);
                    this.currentLLM = data_json['data']['llm']
                    this.currentCandidateSize = data_json['data']['candidate_size']
                    this.selectedLLM = data_json['data']['llm']
                    this.candidateSize = data_json['data']['candidate_size']
                    this.createNewSetting = true
                    this.showSuccessAlert = true
                    this.successMessage = data_json['message']
                } else {
                    console.log("Error: ", data_json);
                    this.errorMessage = data_json['message']
                }
            } catch (error) {
                console.log(error);
            }
        },
        closeModal() {
            this.isRetrivalModalActive = false;
            this.activeRetrievalMenu = "Question Embedding"
            this.isCorrectiveModalActive = false;
            this.isGeneratorModalActive = false;
        },
        switchRetrivalMenu(menu) {
            console.log(this.retrievalModalSize)
            this.activeRetrievalMenu = menu
        },
        showRetrivalModal(data) {
            this.questionSelected = data;
            this.isRetrivalModalActive = true;
        },
        showCorrectiveModal(data) {
            this.questionSelected = data;
            this.isCorrectiveModalActive = true;
        },
        showGeneratorModal(data) {
            this.questionSelected = data;
            this.isGeneratorModalActive = true;
        },
        toggleLLMSelector() {
            this.isShowLLMSelector = !this.isShowLLMSelector;
        },
        selectEmbedder(item) {
            this.selectedLLM = item;
            this.isShowLLMSelector = false;
        },
        closeModal(event) {
            if (this.$refs.embedderModal && !this.$refs.embedderModal.contains(event.target)) {
                this.isShowLLMSelector = false;
            }
            if (this.$refs.LlmModal && !this.$refs.LlmModal.contains(event.target)) {
                this.isLlmModalOpen = false;
            }
        },
    }
}
</script>

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
</style>