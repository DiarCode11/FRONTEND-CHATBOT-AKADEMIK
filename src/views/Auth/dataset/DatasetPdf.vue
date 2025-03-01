<template>
  <router-view></router-view>

    <!-- Modal Add-->
    <Modal
        v-model:showModal="showAddModal"
        @close="closeModal"
        :size="'sm'"
    >
        <form action="" @submit.prevent="sendData">
            <div class="flex justify-center pb-4">
              <h1 class="text-xl font-semibold text-sky-600">Tambah Dataset</h1>
            </div>

            <!-- Alert Error -->
            <div v-if="errorMessage" class="bg-red-100 p-4 rounded-lg mb-5 flex gap-3 items-center">
                <span class="text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </span>
                <p class="text-base font-semibold text-red-600">{{ errorMessage }}</p>
            </div>
            <div class="my-4">
                <label for="deskripsi" class="block">Deskripsi</label>
                <input
                    required
                    type="text"
                    v-model="desc"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                />
            </div>
            <div class="mb-4">
                <label for="Tahun dokumen" class="block">Tahun dokumen</label>
                <input
                    required
                    type="text"
                    inputmode="numeric"
                    v-model="year"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                />
            </div>
            <div @click.self="triggerFileInput" class="border-dashed border-2 border-slate-400 p-4 rounded-lg flex flex-col items-center cursor-pointer">
                <button v-if="selectedFile != null" @click.stop="handleDeleteFile" class="flex justify-end w-full">
                  <CloseIcon />
                </button>
                <label
                    for="fileInput"
                    class="cursor-pointer text-lg font-semibold"
                >
                  <i v-if="selectedFile == null" class="bi bi-cloud-arrow-up-fill text-7xl text-slate-300"></i>
                  <i v-else class="bi bi-file-earmark-pdf-fill text-7xl text-red-500"></i>
                </label>
                <!-- Custom button style untuk input file -->
                <div v-if="selectedFile != null" class="mt-4 px-2">
                    <div class="text-gray-700 w-full text-wrap text-sm px-2"><strong>File Terpilih:</strong> {{ fileName }}</div>
                </div>
                <input
                    name="fileAdd"
                    type="file"
                    ref="fileInputAdd"
                    id="fileInput"
                    @change="handleAddFile"
                    accept=".pdf"
                    class="hidden"
                />
                <div class="w-full px-5 font-semibold text-slate-400 flex justify-center">
                    <p v-if="selectedFile == null">Pilih File</p>
                </div>
            </div>
            <button type="submit" class="bg-sky-500 w-full mt-6 py-2 rounded-md text-white font-semibold">
                Submit
            </button>
        </form>
    </Modal>

    <!-- Modal Edit -->
    <Modal
        v-model:showModal="showEditModal"
        @close="closeModal"
        :size="'sm'"
    >
        <form action="" @submit.prevent="updateData">
            <div class="flex justify-center pb-4">
              <h1 class="text-xl font-semibold text-yellow-600">Update Dataset</h1>
            </div>

            <!-- Alert Error -->
            <div v-if="errorMessage" class="bg-red-100 p-4 rounded-lg mb-5 flex gap-3 items-center">
                <span class="text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </span>
                <p class="text-base font-semibold text-red-600">{{ errorMessage }}</p>
            </div>
            <div class="my-4">
                <label for="deskripsi" class="block">Deskripsi</label>
                <input
                    required
                    type="text"
                    v-model="dataEdited.description"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                />
            </div>
            <div class="mb-4">
                <label for="Tahun dokumen" class="block">Tahun dokumen</label>
                <input
                    required
                    type="text"
                    inputmode="numeric"
                    v-model="dataEdited.year"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                />
            </div>
            <div @click.self="triggerFileInput" class="border-dashed border-2 border-slate-400 p-4 rounded-lg flex flex-col items-center cursor-pointer">
                <button v-if="selectedFile != null" @click.stop="handleDeleteFile" class="flex justify-end w-full">
                  <CloseIcon />
                </button>
                <label
                    for="fileInput"
                    class="cursor-pointer text-lg font-semibold"
                >
                  <i v-if="selectedFile == null" class="bi bi-cloud-arrow-up-fill text-7xl text-slate-300"></i>
                  <i v-else class="bi bi-file-earmark-pdf-fill text-7xl text-red-500"></i>
                </label>
                <!-- Custom button style untuk input file -->
                <div v-if="selectedFile != null" class="mt-4">
                    <p class="text-gray-700 w-full text-ellipsis">
                      <strong>File Terpilih:</strong> 
                      {{ fileName }}
                    </p>
                </div>
                <input
                    name="fileAdd"
                    type="file"
                    ref="fileInputAdd"
                    id="fileInput"
                    @change="handleAddFile"
                    accept=".pdf"
                    class="hidden"
                />
                <div class="w-full px-5 font-semibold text-slate-400 flex justify-center">
                    <p v-if="selectedFile == null">Pilih File</p>
                </div>
            </div>
            <button type="submit" class="bg-sky-500 w-full mt-6 py-2 rounded-md text-white font-semibold">
                Submit
            </button>
        </form>
    </Modal>

    <!-- Modal Delete -->
    <Modal
        v-model:showModal="showDeleteModal"
        :size="'sm'"
        :closeModal="closeModal"
    >
      <span class="text-red-600 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-20">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        </span>
      <h1 class="text-xl font-bold py-6 text-center">Hapus dataset</h1>
      <p class="text-center text-gray-700">
        Yakin ingin menghapus dataset {{ dataDeleted.filename }}? Perubahan akan bersifat permanen
      </p>
      <div class="flex justify-center gap-7 pt-4">
          <button @click="deleteData" class="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-all duration-500 ease-in-out hover:scale-105">
              Yakin
          </button>
          <button @click="closeModal" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-500 ease-in-out">
              Batal
          </button>
      </div>
    </Modal>

  <SuccessAlert :show_alert="showSuccessAlert" :message="successMessage" @close="showSuccessAlert = false" />
  <WarningStaticAlert :is-active="showWarningAlert" @close="showWarningAlert = false">
    <div class="p-6">
      <div class="flex pb-2 gap-x-3 items-center text-lg font-bold text-orange-600">
        <WarningIcon :size="6" />
        <h2>Perbarui Basis Data Vektor</h2>
      </div>
      <div class="flex flex-col gap-1 pr-3">
        <p>Terdeteksi modifikasi pada dataset PDF namun basis data vektor belum diperbarui</p>
        <p><strong>Modifikasi: </strong> {{ not_updated_pdf }}</p>
      </div>
    </div>
  </WarningStaticAlert>
  <p class="text-sm text-gray-400">Admin /</p>
  <h1 class="text-xl font-bold pb-6">Dataset Management/PDF</h1>
  <div v-if="dataStatus == undefined" class="relative flex bg-white rounded-3xl shadow-lg justify-center items-center h-1/2">
    <span class="loader"></span>
  </div>
  <div v-else  class="relative flex gap-4 bg-white rounded-3xl shadow-lg flex-col">
    <span class="bg-gradient-to-r from-white to-transparent w-5 h-[calc(100%-100px)] absolute mt-10 left-0"></span>
		<span class="bg-gradient-to-r from-transparent to-white w-5 h-[calc(100%-120px)] absolute mt-10 right-0"></span>
    <div class="w-full flex justify-between items-center px-6 pb-2 pt-7 gap-3">
      <div class="">
        <button
          @click="openAddModal()"
          class="w-9 h-9 md:w-full md:h-full md:px-3 md:py-1 justify-center items-center bg-sky-500 text-white rounded-lg flex gap-2 hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <i class="bi bi-file-earmark-plus"></i>
          <p class="md:block hidden">Tambah</p>
        </button>
      </div>
      <div class="relative ">
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
          <table v-if="checkData" class="min-w-full w-max bg-white">
            <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                <th class="py-3 px-6 text-left">No</th>
                <th class="py-3 px-6 text-left">Nama File</th>
                <th class="py-3 px-6 text-left ">Deskripsi</th>
                <th class="py-3 px-6 text-left">Tahun</th>
                <th class="py-3 px-6 text-left">Dibuat</th>
                <th class="py-3 px-6 text-left">Update terakhir</th>
                <th class="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-xs">
              <tr v-for="(file, index) in paginatedData" :key="file.id" class="border-b">
                <td class="py-3 px-6 text-left">{{ (current_page - 1) * items_per_page + index + 1 }}</td>
                <td class="py-3 px-6 text-left">
                  <div class="w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                    {{ file.filename }}
                  </div>
                </td>
                <!-- {{ /*file.filename.length > 20 ? file.filename.substring(0, 20) + "..." : file.filename*/ file.filename  }}</td> -->
                <td class="py-3 px-6 text-left">{{ file.description }}</td>
                <td class="py-3 px-6 text-left">{{ file.year }}</td>
                <td class="py-3 px-6 text-left">{{ file.created_at }}</td>
                <td class="py-3 px-6 text-left">{{ file.updated_at }}</td>
                <td class="py-3 px-6 text-left flex gap-2">
                  <EditButton @button-clicked="setDataEdited(file)"/>
                  <DeleteButton @button-clicked="setDataDeleted(file)"/>
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
import { getPagination } from "@/scripts/Pagination";
import Cookies from "js-cookie";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import CloseButton from "@/components/buttons/CloseButton.vue";
import WarningStaticAlert from "@/components/alert/WarningStaticAlert.vue";

export default {
  name: "DatasetManagementView",
  components: {
    EditButton,
    SearchButton,
    DeleteButton,
    Modal,
    CloseIcon,
    WarningIcon,
    SuccessAlert,
    CloseButton,
    WarningStaticAlert
  },
  data() {
    return {
      current_page: 1,
      desc: "",
      year: "",
      items_per_page: 5,
      dataStatus: undefined,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      dataEdited: null,
      dataDeleted: null,
      fileName: "",
      selectedFile: null,
      file_data: [],
      ipAddress: import.meta.env.VITE_SERVER_URL,
      errorMessage: "",
      showAlert: true,
      showSuccessAlert: false,
      successMessage: "",
      search_query: "",
      not_updated_pdf: "",
      showWarningAlert: false
    };
  },
  async created() {
    await this.getData();
    console.log("Data: ", this.file_data);
  },
  mounted() {
    console.log(this.year)
  },
  computed: {
    searchData() {
      return this.file_data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(this.search_query.toLowerCase())
        )
      )
    },
    checkData() {
      return this.file_data.length > 0;
    },
    totalPages() {
      if (this.search_query === "") {
        console.log("Total pages: ", Math.ceil(this.file_data.length / this.items_per_page));
        return Math.ceil(this.file_data.length / this.items_per_page);
      }
      return Math.ceil(this.searchData.length / this.items_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.items_per_page;
      const end = start + this.items_per_page;
      if (this.search_query === "") {
        return this.file_data.slice(start, end);
      }
      return this.searchData.slice(start, end);
    },
    visiblePages() {
      // Menggunakan fungsi getPagination
      return getPagination(this.totalPages, this.current_page)
    },
  },
  methods: {
    async getData() {
      try {
        const response = await fetch(this.ipAddress + "/datasets/pdf", {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': sessionStorage.getItem("token"),
          },
          credentials: 'include',
        });

        const data_json = await response.json();

        if (response.ok) {
          console.log("Data JSON yang diterima: ", data_json.data);
          if (data_json.not_updated_pdf.length > 0) {
            this.not_updated_pdf = this.pdf_not_updated_msg(data_json.not_updated_pdf);
            this.showWarningAlert = true
          }
          if (data_json.data.length > 0) {
            this.file_data = data_json.data;
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
      const formData = new FormData();
      
      formData.append("file", this.selectedFile);
      formData.append("description", this.desc);
      formData.append("year", this.year);

      try {
        const response = await fetch(this.ipAddress + "/datasets/pdf", {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': sessionStorage.getItem("token"),
          },
          body: formData,
          credentials: 'include',
        });

        const data_json = await response.json();

        console.log("Response server saat mengambil data JSON: ", data_json);

        if (response.ok) {
            this.closeModal();
            this.file_data.unshift(data_json.data);
            this.showSuccessAlert = true;
            this.successMessage = "Data berhasil ditambahkan";
            this.not_updated_pdf = this.pdf_not_updated_msg(data_json.not_updated_pdf);
            this.showWarningAlert = true;
            console.log("Data JSON yang dikirim: ", data_json.data);
        } else {
            this.errorMessage = data_json.message;
            console.log("Response server saat mengambil data JSON: ", data_json);
        }
      } catch (error) {
        this.errorMessage = "Gagal terhubung ke server";
        console.error("Error saat mengambil data JSON: ", error);
        console.log("Gagal terhubung ke server");
        this.closeModal();
      }
    },
    async updateData() {
      const formData = new FormData();

      console.log("Data yang akan di update", this.dataEdited);

      formData.append("file", this.selectedFile);
      formData.append("description", this.dataEdited.description);
      formData.append("year", this.dataEdited.year);

      try {
        const response = await fetch(this.ipAddress + "/datasets/pdf/" + this.dataEdited.id, {
          method: 'PATCH',
          headers: {
            'X-CSRF-TOKEN': sessionStorage.getItem("token"),
          },
          body: formData,
          credentials: 'include',
        });

        const data_json = await response.json();

        console.log("Response server saat mengambil data JSON: ", data_json);

        if (response.ok) {
          this.closeModal();
          console.log("Data JSON sebelumnya: ", this.file_data[0]);
          console.log("Data JSON yang diterima: ", data_json.data_updated.id);
          this.showSuccessAlert = true;
          this.successMessage = "Data berhasil diperbarui";
          this.not_updated_pdf = this.pdf_not_updated_msg(data_json.not_updated_pdf);
          this.showWarningAlert = true;

          let newData = data_json.data_updated;

          this.file_data = this.file_data.map(item => {
            if (item.id === newData.id) {
              return { ...item, ...newData }; 
            }
            return item;
          })

          console.log("Data JSON setelah di update: ", this.file_data);

        } else {
          this.errorMessage = data_json.message;
          console.log("Response server saat mengambil data JSON: ", data_json);
        }

        console.log("Response server saat mengambil data JSON: ", data_json);
      } catch (error) {
        this.errorMessage = "Gagal terhubung ke server";
        console.error("Error saat mengambil data JSON: ", error);
        console.log("Gagal terhubung ke server");
        this.closeModal();
      }
    },
    async deleteData() {
      try {
        const response = await fetch(this.ipAddress + "/datasets/pdf/" + this.dataDeleted.id, {
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': sessionStorage.getItem("token"),
          },
          credentials: 'include',
        });

        const data_json = await response.json();

        console.log("Response server saat akan menghapus data JSON: ", data_json);

        if (response.ok) {
          this.file_data = this.file_data.filter(item => item.id !== this.dataDeleted.id);
          this.showSuccessAlert = true;
          this.successMessage = "Data berhasil dihapus";
          this.closeModal();
          this.not_updated_pdf = this.pdf_not_updated_msg(data_json.not_updated_pdf);
          this.showWarningAlert = true;
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
    pdf_not_updated_msg(data){
      if (data.length > 0) {
        const actionLabels = {
          delete: "dihapus",
          add: "ditambahkan",
          update: "diperbarui"
        };
        
        const formattedFiles = data.map(file => `${file.title} (${actionLabels[file.action] || 'diproses'})`);
        
        const output = formattedFiles.length > 1
          ? formattedFiles.slice(0, -1).join(', ') + ' dan ' + formattedFiles.slice(-1)
          : formattedFiles[0] || '';
  
        return output;
      } else {
        return "";
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
        this.dataEdited = Object.assign({}, data);
        console.log("Data yang akan di update", this.dataEdited)
    },
    setDataDeleted(data) {
      this.dataDeleted = Object.assign({}, data);
      this.showDeleteModal = true;
      console.log("Data yang akan di delete", this.DataDeleted)
    },
    closeModal() {
        this.errorMessage = "";
        this.desc = "";
        this.year = "";
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
        this.fileName = file.name.length > 20 ? file.name.slice(0, 30) + '...' : file.name;

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
