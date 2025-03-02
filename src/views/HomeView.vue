<script>
import Header from '@/components/Header.vue';
import UserChatBubble from '@/components/chat-bubble/UserChatBubble.vue';
import BotChatBubble from '@/components/chat-bubble/BotChatBubble.vue';
import QuestionCard from '@/components/QuestionCard.vue';
import { marked } from 'marked';
import { configDotenv } from 'dotenv';
import io from 'socket.io-client';
import MarkdownIt from 'markdown-it';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'HomeView',
    props: {
      socket: Object,
    },
    computed: {
      isConnectedStatus() {
        return this.$store.state.isConnected;
      },  
    },
    components: {
        Header,
        UserChatBubble,
        BotChatBubble,
        QuestionCard
    },
    data() {
      return {
        deleteChatModalStatus: false,
        isTyping: false,
        chats: [],
        Message: {
          'id': null,
          'content': '',
          'timestamp': null,
          'isTyping': false,
          'isError': null,
          'isLike': false,
          'isDislike': false
        },
        question: '',
        messages: [], // Array untuk menyimpan pesan
        items: [],
        response: '',
        disableChatbox: false,
        questionFromChild: '',
        email: '',
        password: '',
        textareaHeight: 40, // Tinggi awal (1 baris)
        maxHeight: 80, // Maksimum 3 baris (sekitar 80px)
    };
  },
  methods:{
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = "auto"; // Reset tinggi sebelum dihitung ulang
      const newHeight = Math.min(textarea.scrollHeight, this.maxHeight); // Maksimal 3 baris
      this.textareaHeight = newHeight;
    },
    handleQuestionSelected(question) {
      this.question = question;
      this.submitQuestion();
    },
    resetTextarea() {
      const textarea = document.getElementById('message');
      textarea.style.height = 'auto'; // Reset tinggi ke default
      textarea.style.overflowY = 'hidden'; // Pastikan overflow disembunyikan
    },
    scrollToBottom() {
      const bottomPage = document.getElementById('bottomPage');
      if (bottomPage) {
        bottomPage.scrollIntoView({ behavior: 'smooth' });
      }
    },
    async submitQuestion() {
      console.log("Status koneksi: ", this.isConnectedStatus)
      // Cek apakah pertanyaan tidak kosong dan bukan hanya spasi
      if (this.question.trim()) {
        
        // Simpan pertanyaan yang asli ke dalam variabel sementara
        const questionToSend = this.question;

        const userMessage = { ...this.Message };
        userMessage.id = this.chats.length + 1;
        userMessage.content = questionToSend;
        userMessage.timestamp = new Date().toISOString();
        console.log("Ini user message", userMessage);

        const botMessage = { ...this.Message };
        botMessage.id = this.chats.length + 1;
        console.log("Ini message", botMessage);
 
        this.chats.push({
          user_message: userMessage,
          bot_message: botMessage
        });
        
        console.log("Hasil chat", this.chats);

        console.log("Ini chat", this.chats.botMessage);

        this.question = ''; // Reset input field setelah menambahkan pesan
        this.resetTextarea();
        
        // Scroll ke bawah setelah pesan ditambahkan
        this.$nextTick(() => {
          this.scrollToBottom();
        });
    
        this.response = '';

        // Pesan ketika server tidak terhubung
        if (!this.isConnectedStatus) {
          const errorText = "Maaf sepertinya server Akasha sedang gangguan, mohon menunggu beberapa saat";

          let currentIndex = 0;
          const botMessageIndex = this.chats.length - 1;
          this.chats[botMessageIndex].bot_message.isTyping = true; // Reset teks pesan bot
          this.disableChatbox = true; // Menonaktifkan textarea selama bot mengetik
          const interval = setInterval(() => {
            // Tambahkan 5 karakter ke pesan bot
            const chunkLength = 3;
            this.chats[botMessageIndex].bot_message.content += errorText.slice(currentIndex, currentIndex + chunkLength);
            currentIndex += chunkLength;

            console.log("Pesan bot selesai:", JSON.stringify(this.chats[botMessageIndex].bot_message));

            // Jika sudah selesai menampilkan seluruh teks, hentikan interval
            if (currentIndex >= errorText.length) {
              clearInterval(interval);

              // Atur isTyping menjadi false setelah selesai mengetik
              this.chats[botMessageIndex].bot_message.isTyping = false;
              this.disableChatbox = false; // Aktifkan textarea setelah bot selesai mengetik

              // Pastikan UI diperbarui
              this.$nextTick(() => {
                console.log("isTyping sudah menjadi false:", this.chats[botMessageIndex].bot_message.isTyping);
              });
            }

            // Scroll ke bawah setiap kali teks diperbarui
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          }, 100); // Interval waktu dalam milidetik (100ms = 0.1 detik)
          

          return;
        }
        
        try {
          // Kirimkan pesan ke server
          this.socket.emit('send_message', {"message": questionToSend});
          const botMessageIndex = this.chats.length - 1;
          this.chats[botMessageIndex].bot_message.isTyping = true; // Reset teks pesan bot
          this.disableChatbox = true; // Menonaktifkan textarea selama bot mengetik
        } catch (error) {
          this.messages[this.messages.length - 1].bot_message = "Maaf sepertinya server Akasha sedang gangguan, mohon menunggu beberapa saat";
          console.error('Terjadi kesalahan saat mengirim permintaan:', error);
        }
      } else {
        // Tampilkan pesan error atau beri tahu pengguna bahwa input tidak boleh kosong
        alert("Pertanyaan tidak boleh kosong!");
      }
    },        
    handleEnterKeydown(event) {
      // Cek jika tombol Enter ditekan, dan Shift tidak ditekan
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();  // Mencegah Enter membuat baris baru
        this.submitQuestion();  // Kirim pesan
      }
      // Jika Shift + Enter ditekan, biarkan textarea membuat baris baru
    },
    toggleDeleteChatModal() {
      this.deleteChatModalStatus = !this.deleteChatModalStatus
      console.log(this.deleteChatModalStatus)
    },
    closeDeleteChatModal() {
      this.deleteChatModalStatus = false
    },
    handleDeleteChat() {
      this.chats = []
      localStorage.removeItem('chatData')
      this.deleteChatModalStatus = false
    },
    handleExplore() {
      // window.location.href = "https://undiksha.ac.id";
      this.deleteChatModalStatus = false
    },
    closeDeleteChatModal(event) {
      if (this.$refs.deleteChatModal && !this.$refs.deleteChatModal.contains(event.target)) {
        this.deleteChatModalStatus = false
      }
    }
  },
  mounted() {
    // Tutup modal jika diklik di luar modal
    document.addEventListener('click', this.closeDeleteChatModal);

    // Ambil data dari Local
    const storedChatData = localStorage.getItem('chatData')
    if (storedChatData) {
      this.chats = JSON.parse(storedChatData)
      console.log("Data chat sebelumnya telah ditemukan");
    } else {
      console.log("Tidak ada data chat sebelumnya")
    }

    const md = new MarkdownIt();

    this.socket.on('response', (json) => {
      console.log("Hasil JSON: ",json);
      
      this.response += json.chunk;

      // Konversi semua data yang terkumpul ke HTML menggunakan marked
      
      // Konversi ke tag <b> jika ada ** di dalam teks
      const htmlText = this.response
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" class="bg-gray-500 text-white font-mono px-2 rounded-xl hover:bg-gray-600">$1</a>');
      
      const htmlMarked = md.render(htmlText);

      // const htmlMarked = marked(this.response);
      console.log("Ini hasil markdownnya:", this.response);

      // Perbarui pesan terakhir dengan hasil HTML
      if (this.response.length > 0) {
        if (this.chats.length == 0) {
          this.chats[0].bot_message.isTyping = true;
          this.chats[0].bot_message.content = htmlText;
        } else {
          this.chats[this.chats.length - 1].bot_message.isTyping = true;
          // this.chats[this.chats.length - 1].bot_message.content = htmlMarked;
          this.chats[this.chats.length - 1].bot_message.content = htmlText;
        }
      }

      if (!json.isTyping) {
        this.chats[this.chats.length - 1].bot_message.isTyping = false;
        this.disableChatbox = false;
        console.log("Teks berakhir")
        console.log("Isi chat: ", [...this.chats])
        const currect_chat = [...this.chats]
        localStorage.setItem('chatData', JSON.stringify(currect_chat))
      }

      // Scroll ke bawah setiap kali teks diperbarui
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
    });

    const textarea = document.getElementById('message');
    document.scrollTop = document.scrollHeight

    textarea.addEventListener('input', () => {
      // Hanya lakukan penyesuaian jika scrollHeight tidak sama dengan clientHeight
      if (textarea.scrollHeight !== textarea.clientHeight) {
        textarea.style.height = 'auto'; // Reset tinggi
        textarea.style.height = `${textarea.scrollHeight}px`; // Set tinggi sesuai konten
      }

      // Pastikan max-height tetap diterapkan
      if (textarea.scrollHeight > parseInt(window.getComputedStyle(textarea).maxHeight)) {
        textarea.style.overflowY = 'scroll'; // Aktifkan scroll jika melebihi max-height
      } else {
        textarea.style.overflowY = 'hidden'; // Sembunyikan overflow jika tidak
      }

      // Scroll ke bagian bawah
      textarea.scrollTop = textarea.scrollHeight;
    });
  }
}
</script>

<template>
    <!-- Untuk menampung page Home -->
    <div class="bottom-0 left-0 right-0 flex-grow  h-screen">
      <div class="min-h-screen">
        <!-- Container responsif -->
        <div class="max-w-4xl w-full mx-auto px-2 lg:px-8 h-full flex flex-col items-center pt-3 mt-10">
            <!-- Hero -->
            <Header
              :title="'AKASHA'"
              :subtitle="'Layanan AI Generatif untuk akses informasi Akademik Undiksha'"
              :version="'ALPHA'"
              :isConnected="isConnectedStatus"
            />

            <!-- Content -->
            <div class="p-4 flex flex-col w-full lg:px-10 md:max-w-3xl lg:max-w-4xl h-full bg-white border border-gray-300 rounded-xl shadow-2xl">
              <QuestionCard @questionSelected="handleQuestionSelected" />
              <h1>{{ questionFromChild }}</h1>

              <div class="pb-28 flex flex-col"> <!-- Perbaikan: padding bawah lebih besar -->
                <!-- Menampilkan chat bubbles untuk setiap pesan -->
                <div class="flex flex-col gap-y-4 pt-4">
                  <!-- Bubble Chat dari AI -->
                  <BotChatBubble :message="'Salam Harmoni🙏 <br><br>Saya merupakan Chatbot Akademik Undiksha, <strong>ada yang bisa saya bantu?</strong>'" :showAction="true"/>
                  <div v-for="(message, index) in chats" :key="index" class="flex flex-col gap-y-3">
                    <UserChatBubble :message="message.user_message.content"/>
                    <BotChatBubble :message="message.bot_message.content" :showAction="!message.bot_message.isTyping"/>
                  </div>
                </div>
                <span id="bottomPage" class="h-10"></span>
              </div>
            </div>
          </div>
      </div>
    </div>

    <!-- Fixed Footer -->
    <!-- <div class="fixed bg-white/20 h-full w-full top-0 left-0 z-40"></div> -->
    <footer class="max-w-4xl w-full mx-auto px-2  flex items-center pt-3 mt-10 fixed bottom-0 left-0 right-0">
    <div
      class="flex justify-center items-end gap-2 md:gap-3 w-full shadow-sm"
      :class="[disableChatbox ? 'bg-gray-200' : 'bg-white']"
    >
      <div class="w-full relative pb-4">
        <!-- Input Textarea -->
        <div class="w-full rounded-xl lg:rounded-3xl relative">
          <textarea
            v-model="question"
            id="message"
            class="resize-none w-full px-4 py-2 border-l border-t border-r h-10 border-gray-300 text-black rounded-tl-3xl rounded-tr-3xl focus:outline-none text-base overflow-y-auto absolute bottom-0 left-0"
            placeholder="Ketik pertanyaanmu..."
            :style="{ height: textareaHeight + 'px', maxHeight: maxHeight + 'px' }"
            rows="1"
            @input="autoResize"
            @keydown.enter="handleEnterKeydown"
            :disabled="disableChatbox"
          ></textarea>
        </div>

        <div class="flex justify-between border-b border-l border-r border-gray-300 rounded-b-3xl px-3 pb-3 pt-1">
          <!-- Tombol Menu -->
          <button
            @click.stop="toggleDeleteChatModal()"
            class="z-10 relative flex items-end justify-center p-2 bg-sky-600 text-white rounded-full shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-600"
            aria-label="Kirim"
          >
            <!-- Icon Close -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
          </button>

          <!-- Tombol Kirim -->
          <button
            @click="submitQuestion"
            class="flex items-end justify-center p-2 bg-sky-600 text-white rounded-full shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-600"
            aria-label="Kirim"
            :disabled="disableChatbox"
          >
            <!-- Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>

</template>

<style scoped>
textarea:disabled {
  background-color: #f0f0f0; /* Warna latar belakang yang lebih terang */
  border-color: #f0f0f0; /* Border yang lebih terang */
  color: #f0f0f0; /* Teks yang lebih gelap */
  cursor: not-allowed; /* Mengubah kursor menjadi tanda tidak diizinkan */
}

table {
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, sans-serif;
  font-size: 18px;
  text-align: left;
  overflow: auto;
}

/* Header Tabel */
thead tr {
  background-color: #009879;
  color: white;
  text-align: center;
}

/* Header dan Cell Padding */
th, td {
  padding: 12px 15px;
}

/* Styling Baris Tabel */
tbody tr {
  border-bottom: 1px solid #0e0c0c;
}

/* Baris Genap dengan Warna Berbeda */
tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

/* Warna Khusus Baris Terakhir */
tbody tr:last-of-type {
  border-bottom: 2px solid #000000;
}

/* Hover Effect untuk Baris */
tbody tr:hover {
  background-color: #f1f1f1;
}

/* Styling Khusus untuk Baris Aktif */
tbody tr.active-row {
  font-weight: bold;
  color: #000000;
}
  
.custom-link {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

</style>
