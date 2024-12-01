<template>
  <div class="flex flex-col">
    <!-- Fixed Header -->
    <div class="fixed top-0 left-0 right-0 bg-transparent p-4 text-center z-10">
        <div class="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-xl"></h1>
        </div>
    </div>

    <!-- Content area -->
    <div class=" fixed top-0 bottom-0 left-0 right-0 overflow-auto">
        <!-- Container responsif -->
        <div class="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col pt-3">
            <!-- Hero -->
            <div class="flex justify-center flex-col pb-5">
              <h1 class="pt-10 text-sky-600 lg:text-6xl text-5xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent ">AKASHA</h1>
              <p class="text-gray-800 pt-2 text-center lg:text-xl text-sm font-light">Layanan AI Generatif untuk akses informasi Akademik Undiksha</p>
              <div class="flex justify-center gap-4 pt-5 text-lg font-bold">
                <div class="bg-sky-600 text-white px-6 uppercase py-2 rounded-full lg:text-base text-xs">Versi 1.0.1</div>
                <div :class="`text-white px-9 uppercase py-2 rounded-full lg:text-base text-xs `+ checkConnection">{{ status }}</div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 flex-1 w-full px-4 sm:px-10 md:max-w-3xl lg:max-w-4xl h-full bg-white border-2 border-blue-400 rounded-xl shadow-2xl">
              <div class=" items-center">
                <div class="grid grid-cols-2 gap-3 lg:gap-5 py-2 lg:py-5 text-white sm:grid-cols-2 md:grid-cols-4">
                  <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Kapan jadwal KRS</div>
                  <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Cara mengakses SIAK-NG</div>
                  <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Kapan jadwal pembayaran UKT</div>
                  <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Apa persyaratan wisuda</div>
                </div>
              </div>
              
              <div class="pb-20 flex flex-col">
                <!-- Bubble Chat dari AI -->
                <div class="w-full bg-slate-200 mt-5 rounded-r-2xl rounded-bl-2xl shadow max-w-lg">
                  <div class="flex text-white p-4 gap-3">
                    <span class="bg-sky-600 rounded-md p-2 flex items-center justify-center w-8 h-8 translate-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
                      </svg>
                    </span>
                    <p class="text-black text-sm lg:text-base pr-1">Selamat datang di layanan AI Generatif Akasha, saya siap menjawab berbagai pertanyaan seputar akademik Undiksha🙏</p>
                  </div>
                </div>

                <!-- Menampilkan chat bubbles untuk setiap pesan -->
                <div class="pb-80">
                  <div v-for="(message, index) in messages" :key="index">
                    <UserChatBubble :message="message" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
    </div>
    
    <!-- Fixed Footer -->
    <div class="fixed bottom-0 left-0 right-0 bg-blue-200 text-white p-4 text-center z-10">
      <div class="flex justify-center items-center gap-3">
        <!-- Input Textarea -->
        <textarea
          v-model="question"
          class="w-full  md:w-3/4 lg:max-w-2xl  text-gray-800 p-4 bg-white rounded-lg shadow-md focus:outline-none focus:bg-none focus:ring-sky-600 resize-none overflow-hidden"
          rows="1"
          placeholder="Ketik pertanyaan Anda di sini..."
        ></textarea>
        
        <!-- Submit Button -->
        <button
          @click="submitQuestion"
          class="flex items-center justify-center p-3 bg-sky-600 text-white rounded-full shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-600"
          aria-label="Kirim"
        >
          <!-- Icon Pesawat Kertas -->
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l5.056 2.021-2.014 5.075a.5.5 0 0 0 .639.639l5.071-2.016 2.014-5.06a.5.5 0 0 0-.885-.083l-.18.451L15.964.686z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UserChatBubble from './components/UserChatBubble.vue';

export default {
  name: 'App',
  components: {
    UserChatBubble
  },
  data() {
    return {
      isConnected: true,
      question: '',
      messages: [], // Array untuk menyimpan pesan
      status: 'Online', // Status koneksi
    };
  },
  methods: {

    scrollToBottom() {
      const bottomPage = document.getElementById('bottomPage');
      bottomPage.scrollIntoView({ behavior: 'smooth' });
    },
    submitQuestion() {
      if (this.question.trim()) {
        // Menambahkan pertanyaan ke array messages
        this.messages.push(this.question);
        this.question = ''; // Reset input field
      }
      this.scrollToBottom();
    }
  },
  computed: {
    checkConnection() {
      if (this.isConnected) {
        this.status = "Online";
        return "bg-green-500"; // Menambahkan kelas warna hijau jika online
      } else {
        this.status = "Offline";
        return "bg-red-500"; // Menambahkan kelas warna merah jika offline
      }
    }
  },
};
</script>

