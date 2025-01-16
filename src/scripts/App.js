import Navbar from '../components/Navbar.vue';
import UserChatBubble from '../components/chat-bubble/UserChatBubble.vue';
import BotChatBubble from '../components/chat-bubble/BotChatBubble.vue';
import QuestionCard from '../components/QuestionCard.vue';
import Header from '../components/Header.vue';
import { marked } from 'marked';
import io from 'socket.io-client';

export default {
  name: 'App',
  components: {
    Navbar,
    UserChatBubble,
    BotChatBubble,
    QuestionCard,
    Header
  },
  data() {
    return {
      isConnected: false,
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
      socket: io("http://192.168.37.52:5000"), //Diganti dengan IP server (bisa berubah-ubah)
      response: '',
      disableChatbox: false
    };
  },
  methods: {
    connectSocket() {
      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('Socket connected');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Socket disconnected');
      });
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
        console.log("Ini bot message", botMessage);
 
        this.chats.push({
          user_message: userMessage,
          bot_message: botMessage
        });
        

        console.log("Ini chat", this.chats.botMessage);

        this.question = ''; // Reset input field setelah menambahkan pesan
        this.resetTextarea();
        
        // Scroll ke bawah setelah pesan ditambahkan
        this.$nextTick(() => {
          this.scrollToBottom();
        });
    
        this.response = '';

        // Pesan ketika server tidak terhubung
        if (!this.isConnected) {
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
    // Fungsi untuk menangani event keydown pada textarea
    handleEnterKeydown(event) {
      // Cek jika tombol Enter ditekan, dan Shift tidak ditekan
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();  // Mencegah Enter membuat baris baru
        this.submitQuestion();  // Kirim pesan
      }
      // Jika Shift + Enter ditekan, biarkan textarea membuat baris baru
    }
  },
  mounted() {
    this.connectSocket();

    this.socket.on('response', (json) => {
      console.log("Hasil JSON: ",json);
      
      this.response += json.data;

      // Konversi semua data yang terkumpul ke HTML menggunakan marked
      const htmlMarked = marked(this.response);
      console.log("Ini hasil markdownnya:", htmlMarked);

      // Perbarui pesan terakhir dengan hasil HTML
      if (this.response.length > 0) {
        this.chats[this.chats.length - 1].bot_message.isTyping = true;
        this.chats[this.chats.length - 1].bot_message.content = htmlMarked;
      }

      if (!json.isTyping) {
        this.chats[this.chats.length - 1].bot_message.isTyping = false;
        this.disableChatbox = false;
        console.log("Teks berakhir")
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
};

