import Navbar from '../components/Navbar.vue';
import UserChatBubble from '../components/UserChatBubble.vue';
import BotChatBubble from '../components/BotChatBubble.vue';
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
      chat: {},
      question: '',
      messages: [], // Array untuk menyimpan pesan
      items: [],
      socket: io("http://192.168.150.52:5000"), //Diganti dengan IP server (bisa berubah-ubah)
      response: ''
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
    receiveStreamingResponse() {
      this.socket.on('streaming_response', (data) => {
        this.isTyping = false
        console.log('Potongan pesan diterima: ', data);

        // Menambahkan potongan kalimat atau kata baru ke bot_message
        const lastMessage = this.messages[this.messages.length - 1];
        lastMessage.bot_message += data.data; // Menambahkan potongan ke pesan yang ada

        // Scroll ke bawah setiap kali ada update
        this.$nextTick(() => {
          this.scrollToBottom();
        });
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
    
        // Menambahkan pertanyaan ke array messages
        this.messages.push({
          user_message: this.question,  // Menambahkan pesan user
          bot_message: '', // Pesan sementara hingga bot merespon
        });
    
        this.question = ''; // Reset input field setelah menambahkan pesan
        this.resetTextarea();
        
        // Scroll ke bawah setelah pesan ditambahkan
        this.$nextTick(() => {
          this.scrollToBottom();
        });
    
        // Set status mengetik
        this.isTyping = true;

        // Pesan ketika server tidak terhubung
        if (!this.isConnected) {
          const errorText = "Maaf sepertinya server Akasha sedang gangguan, mohon menunggu beberapa saat";
          this.messages[this.messages.length - 1].bot_message = ""; // Awal teks kosong
          this.isTyping = false;
        
          let currentIndex = 0;
        
          const interval = setInterval(() => {
            // Tambahkan 5 karakter ke pesan
            this.messages[this.messages.length - 1].bot_message += errorText.slice(currentIndex, currentIndex + 5);
            currentIndex += 5;
        
            // Jika sudah selesai menampilkan seluruh teks, hentikan interval
            if (currentIndex >= errorText.length) {
              clearInterval(interval);
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
        } catch (error) {
          this.messages[this.messages.length - 1].bot_message = "Maaf sepertinya server Akasha sedang gangguan, mohon menunggu beberapa saat";
          console.error('Terjadi kesalahan saat mengirim permintaan:', error);
          this.isTyping = false;
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
      console.log(json.data);
      
      this.response += json.data;

      console.log("Ini hasil mardownnya" + marked(this.response));

      // Konversi semua data yang terkumpul ke HTML menggunakan marked
      const htmlMarked = marked(this.response);
      console.log("Ini hasil markdownnya:", htmlMarked);

      // Perbarui pesan terakhir dengan hasil HTML
      if (this.messages.length > 0) {
        this.messages[this.messages.length - 1].bot_message = htmlMarked;
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

