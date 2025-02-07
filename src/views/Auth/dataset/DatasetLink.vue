<template>
  <router-view></router-view>

  <!-- Modal Add-->
  <Modal v-model:showModal="showAddModal" @close="closeModal">
    <form action="" @submit.prevent="sendData">
      <div class="flex justify-center">
        <h1 class="text-xl font-semibold text-sky-600">Tambah Dataset</h1>
      </div>

      <!-- Alert Error -->
      <div
        v-if="errorMessage"
        class="bg-red-100 p-4 rounded-lg my-5 flex gap-3 items-center"
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
        <p class="text-sm font-semibold text-red-600">{{ errorMessage }}</p>
      </div>
      <div class="my-3">
        <label for="title" class="block">Judul</label>
        <input
          name="title"
          type="text"
          v-model="title"
          :disabled="scrapLoading"
          :class="[submitLoading ? 'text-gray-400' : '']"
          class="w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
        />
      </div>
      <div class="mb-3">
        <label for="tahun" class="block">Tahun</label>
        <input
          name="tahun"
          type="text"
          v-model="year"
          :disabled="scrapLoading"
          :class="[submitLoading ? 'text-gray-400' : '']"
          class="w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
        />
      </div>
      <div class="mb-3">
        <label for="link" class="block">Link</label>
        <div class="flex flex-row gap-x-3">
          <input
            name="link"
            type="text"
            v-model="link"
            :disabled="scrapLoading"
            :class="[submitLoading ? 'text-gray-400' : '']"
            class="w-5/6 px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          />
          <div
            @click.stop="startScraping"
            :class="[
              link
                ? 'bg-sky-500 cursor-pointer hover:bg-sky-600 active:bg-sky-700 transition-colors duration-200'
                : 'bg-gray-400',
            ]"
            class="w-1/6 px-2 py-1 text-white rounded-md flex justify-center items-center"
          >
            <span v-if="!scrapLoading">
              <ArrowRightIcon />
            </span>
            <div v-if="scrapLoading" class="absolute translate-y-1">
              <span class="lds-dual-ring"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showScrapingResult">
        <label for="result_scraping" class="block" :class="[scrapLoading ? 'text-gray-400' : '']">Hasil Scraping</label>
        <textarea
          v-model="textScraped"
          name="result_scraping"
          id=""
          :disabled="scrapLoading || submitLoading"
          :class="{ 'text-gray-400': scrapLoading || submitLoading }"
          class="w-full h-40 px-2 py-2 resize-none text-sm rounded-lg border-2 border-gray-300 focus:outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-sky-500 w-full mt-8 py-2 rounded-md text-white font-semibold"
      >
        <div class="flex items-center justify-center gap-2">
          <div v-if="submitLoading" class="lds-dual-ring"></div>
          <p>Submit</p>
        </div>
      </button>
    </form>
  </Modal>

  <!-- Modal Edit -->
  <Modal v-model:showModal="showEditModal" @close="closeModal">
    <form action="" @submit.prevent="updateData">
      <div class="flex justify-center pb-4">
        <h1 class="text-xl font-semibold text-yellow-600">Update Dataset</h1>
      </div>

      <!-- Alert Error -->
      <div
        v-if="errorMessage"
        class="bg-red-100 p-4 rounded-lg mb-5 flex gap-3 items-center"
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
        <p class="text-base font-semibold text-red-600">{{ errorMessage }}</p>
      </div>
      <div class="my-3">
        <label for="title" class="block">Judul</label>
        <input
          name="title"
          type="text"
          v-model="title"
          class="w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
        />
      </div>
      <div class="mb-3">
        <label for="tahun" class="block">Tahun</label>
        <input
          name="tahun"
          type="text"
          v-model="year"
          class="w-full px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
        />
      </div>
      <div class="mb-3">
        <label for="link" class="block">Link</label>
        <div class="flex flex-row gap-x-3">
          <input
            name="link"
            type="text"
            v-model="link"
            class="w-5/6 px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          />
          <div
            @click.stop="startScraping"
            :class="[
              link
                ? 'bg-sky-500 cursor-pointer hover:bg-sky-600 active:bg-sky-700 transition-colors duration-200'
                : 'bg-gray-400 overflow-y-hidden',
            ]"
            class="w-1/6 px-2 py-1 text-white rounded-md flex justify-center items-center relative"
          >
            <span v-if="!scrapLoading">
              <ArrowRightIcon />
            </span>
            <div v-if="scrapLoading" class="absolute translate-y-1">
              <span class="lds-dual-ring"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showScrapingResult">
        <label
          for="result_scraping"
          class="block"
          :class="[scrapLoading ? 'text-gray-400' : '']"
          >Hasil Scraping</label
        >
        <textarea
          v-model="textScraped"
          :disabled="scrapLoading"
          name="result_scraping"
          id=""
          :class="[scrapLoading ? 'text-gray-400' : '']"
          class="w-full h-40 px-2 py-2 resize-none text-sm rounded-lg border-2 border-gray-300 focus:outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-sky-500 w-full mt-6 py-2 rounded-md text-white font-semibold"
      >
        <div class="flex items-center justify-center gap-2">
          <div v-if="submitLoading" class="lds-dual-ring"></div>
          <p>Submit</p>
        </div>
      </button>

    </form>
  </Modal>

  <!-- Modal Delete -->
  <Modal v-model:showModal="showDeleteModal" :closeModal="closeModal">
    <div class="bg-red-100 p-4 rounded-lg mb-5 flex gap-3 items-center">
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
      <h1 class="text-lg font-semibold text-red-600">Hapus Dataset?</h1>
    </div>
    <p class="text-center text-gray-700">
      Yakin ingin menghapus dataset {{ dataDeleted.filename }}?. Perubahan akan bersifat
      permanen
    </p>
    <div class="flex justify-around pt-4">
      <button
        @click="deleteData"
        class="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-all duration-500 ease-in-out hover:scale-105"
      >
        Yakin
      </button>
      <button
        @click="closeModal"
        class="text-red-600 border-red-400 border-2 px-6 py-2 rounded-lg hover:scale-105 transition-all duration-500 ease-in-out"
      >
        Batal
      </button>
    </div>
  </Modal>

  <div v-if="showAlert">
    <div
      class="bg-yellow-50 border-2 border-yellow-500 rounded-lg mb-5 gap-3 items-center text-yellow-600"
    >
      <div
        @click.stop="showAlert = false"
        class="w-full flex justify-end pr-2 pt-2 cursor-pointer"
      >
        <CloseIcon />
      </div>
      <div class="flex gap-4 pb-4 pl-4">
        <span>
          <WarningIcon />
        </span>
        <div class="text-xs">
          <h1 class="text-sm font-semibold pb-1">Sinkronisasi dengan database vektor</h1>
          Sinkronisasi diperlukan agar chatbot mengetahui informasi terbaru dari dataset.
          Silahkan sinkronisasi terlebih dahulu melalui menu basis data vektor.
        </div>
      </div>
    </div>
  </div>
  <p class="text-sm text-gray-400">Admin /</p>
  <h1 class="text-xl font-bold pb-6">Dataset Management/Link</h1>
  <div
    v-if="dataStatus == undefined"
    class="relative flex bg-white rounded-3xl shadow-lg justify-center items-center h-1/2"
  >
    <span class="loader"></span>
  </div>
  <div v-else class="relative flex gap-4 bg-white rounded-3xl shadow-lg flex-col">
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
</template>

<script>
import EditButton from "@/components/buttons/EditButton.vue";
import SearchButton from "@/components/buttons/SearchButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import Modal from "@/components/modal/Modal.vue";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.vue";
import { getPagination } from "@/scripts/Pagination";
import Cookies from "js-cookie";

export default {
  name: "DatasetManagementView",
  components: {
    EditButton,
    SearchButton,
    DeleteButton,
    Modal,
    CloseIcon,
    WarningIcon,
    ArrowRightIcon,
  },
  data() {
    return {
      current_page: 1,
      desc: "",
      id: "",
      title: "",
      year: "",
      link: "",
      items_per_page: 5,
      dataStatus: undefined,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      dataEdited: null,
      dataDeleted: null,
      fileName: "",
      selectedFile: null,
      file_data_link: [],
      ipAddress: import.meta.env.VITE_SERVER_URL,
      errorMessage: "",
      textScraped: "",
      showAlert: true,
      submitLoading: false,
      scrapLoading: false,
    };
  },
  async created() {
    await this.getData();
    console.log("Data: ", this.file_data_link);
  },
  mounted() {
    console.log(this.year);
  },
  computed: {
    showScrapingResult() {
      return this.textScraped != "";
    },
    checkData() {
      return this.file_data_link.length > 0;
    },
    totalPages() {
      return Math.ceil(this.file_data_link.length / this.items_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.items_per_page;
      const end = start + this.items_per_page;
      return this.file_data_link.slice(start, end);
    },
    visiblePages() {
      // Menggunakan fungsi getPagination
      return getPagination(this.totalPages, this.current_page);
    },
  },
  methods: {
    async getData() {
      try {
        const response = await fetch(this.ipAddress + "/url-datasets/link", {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
          },
          credentials: "include",
        });

        const data_json = await response.json();

        if (response.ok) {
          console.log("Data JSON yang diterima: ", data_json.data);
          if (data_json.data.length > 0) {
            this.file_data_link = data_json.data;
            this.dataStatus = true;
          } else {
            console.log("Data JSON kosong");
            this.dataStatus = false;
          }
        } else {
          console.log("Response server saat mengambil data JSON: ", data_json);
        }

        console.log("Response server saat mengambil data JSON: ", data_json);
      } catch (error) {
        console.error("Error saat mengambil data JSON: ", error);
        console.log("Gagal terhubung ke server");
      }
    },
    async sendData() {
      try {
        this.submitLoading = true;
        const response = await fetch(this.ipAddress + "/url-datasets/link", {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.title,
            year: this.year,
            link: this.link,
            text_scraped: this.textScraped,
          }),
          credentials: "include",
        });

        const data_json = await response.json();
        this.submitLoading = false;
        console.log("Response server saat mengambil data JSON: ", data_json);

        if (response.ok) {
          // this.closeModal();
          this.file_data_link.push(data_json.data);
          console.log("Data JSON yang dikirim: ", data_json.data);
          closeModal();
        } else {
          this.errorMessage = data_json.message;
          console.log("Response server saat mengambil data JSON: ", data_json);
        }
      } catch (error) {
        this.submitLoading = false;
        this.errorMessage = "Gagal terhubung ke server";
        console.error("Error saat mengambil data JSON: ", error);
        console.log("Gagal terhubung ke server");
        this.closeModal();
      }
    },
    async updateData() {
      try {
        this.submitLoading = true;
        const response = await fetch(this.ipAddress + "/url-datasets/link/" + this.id,
          {
            method: "PATCH",
            headers: {
              "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: this.title,
              year: this.year,
              link: this.link,
              extracted_text: this.textScraped
            }),
            credentials: "include",
          }
        );

        const data_json = await response.json();
        this.submitLoading = false;

        console.log("Response server setelah data diupdate: ", data_json);

        if (response.ok) {
          this.closeModal();

          let newData = data_json.data_updated;

          this.file_data_link = this.file_data_link.map((item) => {
            if (item.id === newData.id) {
              return { ...item, ...newData };
            }
            return item;
          });

          console.log("Data JSON setelah di update: ", this.file_data_link);
        } else {
          this.errorMessage = data_json.message;
          console.log("Response server saat mengambil data JSON: ", data_json);
        }

        console.log("Response server saat mengambil data JSON: ", data_json);
      } catch (error) {
        this.submitLoading = false;
        this.errorMessage = "Gagal terhubung ke server";
        console.error("Error saat mengambil data JSON: ", error);
        console.log("Gagal terhubung ke server");
        this.closeModal();
      }
    },
    async deleteData() {
      try {
        const response = await fetch(
          this.ipAddress + "/url-datasets/link/" + this.dataDeleted.id,
          {
            method: "DELETE",
            headers: {
              "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
            },
            credentials: "include",
          }
        );

        const data_json = await response.json();

        console.log("Response server saat akan menghapus data JSON: ", data_json);

        if (response.ok) {
          this.file_data_link = this.file_data_link.filter(
            (item) => item.id !== this.dataDeleted.id
          );
          this.closeModal();
        } else {
          this.errorMessage = data_json.message;
          console.log("Response server saat mengambil data JSON: ", data_json);
        }
      } catch (error) {
        this.errorMessage = "Gagal terhubung ke server";
        console.error("Error saat mengambil data JSON: ", error);
        console.log("Gagal terhubung ke server");
      }
    },
    async startScraping() {
      if (this.link) {
        try {
          this.scrapLoading = true;
          const response = await fetch(this.ipAddress + "/datasets/link/scrap", {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              link: this.link,
            }),
            credentials: "include",
          });

          const data_json = await response.json();
          this.scrapLoading = false;
          console.log(data_json);

          if (response.ok) {
            this.textScraped = data_json.data;
            this.errorMessage = "";
          } else {
            this.errorMessage = data_json.message;
            this.textScraped = "";
          }
        } catch {
          this.errorMessage = "Gagal terhubung ke server";
          console.log("gagal terhubung ke ");
          this.scrapLoading = false;
          this.textScraped = "";
        }
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    openEditModal() {
      this.showEditModal = true;
    },
    setDataEdited(data) {
      this.showEditModal = true;
      const json_data = Object.assign({}, data);
      this.id = json_data.id;
      this.title = json_data.title;
      this.year = json_data.year;
      this.link = json_data.url;
      this.textScraped = json_data.extracted_text;
      console.log("Data yang akan di update", json_data);
    },
    setDataDeleted(data) {
      this.dataDeleted = Object.assign({}, data);
      this.showDeleteModal = true;
      console.log("Data yang akan di delete", this.DataDeleted);
    },
    closeModal() {
      this.submitLoading = false;
      this.scrapLoading = false;
      this.errorMessage = "";
      this.id = "";
      this.desc = "";
      this.year = "";
      this.title = "";
      this.link = "";
      this.textScraped = "";
      this.dataEdited = null;
      this.dataDeleted = null;
      this.selectedFile = null;
      this.showAddModal = false; // Menutup modal
      this.showDeleteModal = false;
      this.showEditModal = false;
    },
    // Fungsi untuk mengubah halaman
    changePage(page) {
      if (typeof page === "number" && page > 0 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    handleAddFile(event) {
      const file = event.target.files[0];
      if (file) {
        // Menyimpan file yang dipilih
        this.selectedFile = file;
        // Memotong nama file untuk ditampilkan
        this.fileName =
          file.name.length > 20 ? file.name.slice(0, 30) + "..." : file.name;

        // Hapus input file menggunakan ref
        this.$refs.fileInputAdd.value = null;
      }
    },
    handleDeleteFile() {
      this.selectedFile = null;
    },
    handleSwitchFile() {
      this.dataEdited.filename = null;
    },
    triggerFileInput() {
      if (!this.selectedFile) {
        this.$refs.fileInputAdd.click();
      }
    },
    handleSubmit() {
      if (this.selectedFile) {
        console.log("File submitted:", this.selectedFile);
        // Proses file (misalnya upload ke server)
      } else {
        console.log("No file selected.");
      }
    },
  },
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

/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 6px solid #0284c7;
  animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;
}
@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  62.5% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}
@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}

.lds-dual-ring,
.lds-dual-ring:after {
  box-sizing: content-box;
}
.lds-dual-ring {
  display: inline-block;
}
.lds-dual-ring:after {
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  margin: 0px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
