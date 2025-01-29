<template>
    <!-- Modal Add-->
    <Modal
        v-model:showModal="showAddModal"
        :closeModal="closeModal"
    >
        <form action="">
            <div class="bg-sky-100 p-4 rounded-lg mb-5 flex gap-3 items-center">
                <span class="text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </span>
                <h1 class="text-lg font-semibold text-sky-600">Tambah Dataset</h1>
            </div>
            <div class="mb-4">
                <label for="deskripsi" class="block">Deskripsi</label>
                <input
                    required
                    type="num"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                    :value="desc"
                    @input="$emit('update:email', $event.target.value)"
                />
            </div>
            <div class="mb-4">
                <label for="Tahun dokumen" class="block">Tahun dokumen</label>
                <input
                    required
                    type="text"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                    :value="year"
                    @input="$emit('update:year', $event.target.value)"
                />
            </div>
            <div class="border-dashed border-2 border-slate-400 p-4 rounded-lg flex flex-col items-center cursor-pointer">
                <label
                    for="fileInput"
                    class="cursor-pointer text-lg font-semibold"
                >
                    <i v-if="!fileName" class="bi bi-cloud-arrow-up-fill text-7xl text-slate-300"></i>
                    <i v-else class="bi bi-file-earmark-pdf-fill text-7xl text-slate-300"></i>
                </label>
                <!-- Custom button style untuk input file -->
                <div v-if="fileName" class="mt-4">
                    <p class="text-gray-700"><strong>File Terpilih:</strong> {{ fileName }}</p>
                </div>
                <input
                    required
                    type="file"
                    id="fileInput"
                    @change="handleFileChange"
                    accept=".pdf"
                    class="hidden"
                />
                <div class="w-full px-5 font-semibold text-slate-400 flex justify-center">
                    <p v-if="!fileName">Pilih File</p>
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
        :closeModal="closeModal"
    >
        <form action="">
            <div class="bg-yellow-100 p-4 rounded-lg mb-5 flex gap-3 items-center">
                <span class="text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </span>
                <h1 class="text-lg font-semibold text-yellow-600">Perbarui Dataset</h1>
            </div>
            <div class="mb-4">
                <label for="deskripsi" class="block">Deskripsi</label>
                <input
                    required
                    type="num"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                    :value="desc"
                    @input="$emit('update:email', $event.target.value)"
                />
            </div>
            <div class="mb-4">
                <label for="Tahun dokumen" class="block">Tahun dokumen</label>
                <input
                    required
                    type="text"
                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none"
                    :value="year"
                    @input="$emit('update:year', $event.target.value)"
                />
            </div>
            <div class="border-dashed border-2 border-slate-400 p-4 rounded-lg flex flex-col items-center cursor-pointer">
                <label
                    for="fileInput"
                    class="cursor-pointer text-lg font-semibold"
                >
                    <i v-if="!fileName" class="bi bi-cloud-arrow-up-fill text-7xl text-slate-300"></i>
                    <i v-else class="bi bi-file-earmark-pdf-fill text-7xl text-slate-300"></i>
                </label>
                <!-- Custom button style untuk input file -->
                <div v-if="fileName" class="mt-4">
                    <p class="text-gray-700"><strong>File Terpilih:</strong> {{ fileName }}</p>
                </div>
                <input
                    required
                    type="file"
                    id="fileInput"
                    @change="handleFileChange"
                    accept=".pdf"
                    class="hidden"
                />
                <div class="w-full px-5 font-semibold text-slate-400 flex justify-center">
                    <p v-if="!fileName">Pilih File</p>
                </div>
            </div>
            <button type="submit" class="bg-orange-500 w-full mt-6 py-2 rounded-md text-white font-semibold">
                Update
            </button>
        </form>
    </Modal>

    <!-- Modal Delete -->
    <Modal
        v-model:showModal="showDeleteModal"
        :closeModal="closeModal"
    >
        <div class="bg-red-100 p-4 rounded-lg mb-5 flex gap-3 items-center">
            <span class="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
            </span>
            <h1 class="text-lg font-semibold text-red-600">Hapus Dataset?</h1>
        </div>
        <p class="text-center text-gray-700">Yakin ingin menghapus data ini? Perubahan akan bersifat permanen</p>
        <div class="flex justify-around pt-4">
            <button class="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-all duration-500 ease-in-out hover:scale-105">
                Yakin
            </button>
            <button class="text-red-600 border-red-400 border-2 px-6 py-2 rounded-lg hover:scale-105 transition-all duration-500 ease-in-out">
                Batal
            </button>
        </div>
    </Modal>
  <p class="text-sm text-gray-400">Admin /</p>
  <h1 class="text-xl font-bold pb-6">Dataset Management</h1>
  <div class="relative flex gap-4 bg-white rounded-3xl shadow-lg flex-col">
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
                <th class="py-3 px-6 text-left">Deskripsi</th>
                <th class="py-3 px-6 text-left">Nama File</th>
                <th class="py-3 px-6 text-left">Timestamp</th>
                <th class="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-xs">
              <tr v-for="(file, index) in paginatedData" :key="i" class="border-b">
                <td class="py-3 px-6 text-left">{{ file.deskripsi }}</td>
                <td class="py-3 px-6 text-left">{{ file.nama_file }}</td>
                <td class="py-3 px-6 text-left">{{ file.timestamp }}</td>
                <td class="py-3 px-6 text-left flex gap-2">
                  <EditButton @button-clicked="setDataEdited(file)"/>
                  <DeleteButton @button-clicked="setDataDeleted(file)"/>
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
import EditButton from "@/components/buttons/EditButton.vue";
import SearchButton from "@/components/buttons/SearchButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import Modal from "@/components/modal/Modal.vue";
import { getPagination } from "@/scripts/Pagination";
export default {
  name: "DatasetManagementView",
  components: {
    EditButton,
    SearchButton,
    DeleteButton,
    Modal
  },
  data() {
    return {
      current_page: 1,
      desc: "",
      items_per_page: 5,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      dataEdited: {},
      dataDeleted: null,
      fileName: "",
      selectedFile: null,
      file_data: [
        {
          deskripsi: "Kalender Akademik",
          nama_file: "kalender_akademik.pdf",
          timestamp: "02-03-2023 12:00",
        },
        {
          deskripsi: "Jadwal Kuliah",
          nama_file: "jadwal_kuliah.pdf",
          timestamp: "05-03-2023 10:30",
        },
        {
          deskripsi: "Panduan Mahasiswa Baru",
          nama_file: "panduan_mahasiswa_baru.pdf",
          timestamp: "15-04-2023 08:45",
        },
        {
          deskripsi: "Laporan Keuangan",
          nama_file: "laporan_keuangan.pdf",
          timestamp: "20-04-2023 14:20",
        },
        {
          deskripsi: "Notulen Rapat",
          nama_file: "notulen_rapat.pdf",
          timestamp: "25-04-2023 16:00",
        },
        {
          deskripsi: "Pengumuman Beasiswa",
          nama_file: "pengumuman_beasiswa.pdf",
          timestamp: "30-05-2023 09:15",
        },
        {
          deskripsi: "Daftar Peserta Seminar",
          nama_file: "daftar_peserta_seminar.pdf",
          timestamp: "05-06-2023 11:45",
        },
        {
          deskripsi: "Sertifikat Kelulusan",
          nama_file: "sertifikat_kelulusan.pdf",
          timestamp: "10-06-2023 13:30",
        },
        {
          deskripsi: "Proposal Penelitian",
          nama_file: "proposal_penelitian.pdf",
          timestamp: "20-06-2023 15:00",
        },
        {
          deskripsi: "Materi Workshop",
          nama_file: "materi_workshop.pdf",
          timestamp: "25-06-2023 10:15",
        },
        {
          deskripsi: "Materi Workshop",
          nama_file: "materi_workshop.pdf",
          timestamp: "25-06-2023 10:15",
        },
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.file_data.length / this.items_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.items_per_page;
      const end = start + this.items_per_page;
      return this.file_data.slice(start, end);
    },
    visiblePages() {
      // Menggunakan fungsi getPagination
      return getPagination(this.totalPages, this.current_page)
    },
  },
  methods: {
    openAddModal() {
        this.showAddModal = true;
    },
    openEditModal() {
        this.showEditModal = true;
    },
    setDataEdited(data) {
        this.showEditModal = true;
        this.dataEdited = data;
        console.log(this.dataEdited)
    },
    setDataDeleted(data) {
        this.showDeleteModal = true;
        this.DataDeleted = data;
    },
    closeModal() {
        console.log(this.selectedFile)
        this.showAddModal = false; // Menutup modal
        this.showDeleteModal = false;
        this.showEditModal = false;
        this.selectedFile = null;
    },
    // Fungsi untuk mengubah halaman
    changePage(page) {
      if (typeof page === "number" && page > 0 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Menyimpan file yang dipilih
        this.selectedFile = file;
        // Memotong nama file untuk ditampilkan
        this.fileName = file.name.length > 20 ? file.name.slice(0, 30) + '...' : file.name;
      }
    },
    triggerFileInput() {
      // Trigger file input click programmatically
      document.getElementById('fileInput').click();
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
</style>
