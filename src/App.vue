<template>
  <div class="relative">
    <!-- Header
    <div class="fixed top-0 left-0 w-full text-white p-6 z-10 bg-sky-600">
      <h1 class="text-center font-bold text-2xl">AKASHA</h1>
    </div> -->

    <!-- Hero -->
    <div class="flex justify-center flex-col lg:pt-10 pt-3">
      <h1 class="pt-10 text-sky-600 lg:text-6xl text-5xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent ">AKASHA</h1>
      <p class="text-gray-800 pt-2 text-center lg:text-xl text-sm px-10 font-light">Layanan AI Generatif untuk akses informasi Akademik Undiksha</p>
      <div class="flex justify-center gap-4 pt-5 text-lg font-bold">
        <div class="bg-sky-600 text-white px-6 uppercase py-2 rounded-full lg:text-base text-xs">Versi 1.0.1</div>
        <div class="bg-green-600 text-white px-9 uppercase py-2 rounded-full lg:text-base text-xs">Online</div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex justify-center h-screen pt-5">
      <div class="w-full px-4 sm:px-10 md:max-w-3xl lg:max-w-4xl h-full bg-white border-2 border-sky-600 mx-3 rounded-xl shadow-2xl">
        <div class=" items-center pb-60">
          <div class="grid grid-cols-2 gap-3 lg:gap-5 py-5 lg:py-10 text-white sm:grid-cols-2 md:grid-cols-4">
            <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Kapan jadwal KRS</div>
            <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Cara mengakses SIAK-NG</div>
            <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Kapan jadwal pembayaran UKT</div>
            <div class="lg:p-4 p-2 rounded-md bg-sky-600 lg:text-base text-sm">Apa persyaratan wisuda</div>
          </div>

          <div class="w-full bg-slate-200 mt-5 rounded-r-2xl rounded-bl-2xl">
            <div class="flex text-white p-2">
              <span class="bg-sky-600 rounded-md p-2 mt-2 flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                  <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
                  <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
                </svg>
              </span>
              
              <p class="ml-2 text-black text-sm pr-1 py-2">Selamat datang di layanan AI Generatif Akasha, saya siap menjawab berbagai pertanyaan seputar akademik Undiksha🙏</p>
            </div>
          </div>
      </div>
        </div>
        <!-- Chat -->
        
    </div>

    <!-- Form Input -->
    <div class="fixed bottom-0 left-0 w-full p-4 bg-blue-200 z-20">
      <div class="flex justify-center items-center gap-3">
        <!-- Input Textarea -->
        <textarea
          class="w-full  md:w-3/4 lg:max-w-2xl  text-gray-800 p-4 bg-white rounded-lg shadow-md focus:outline-none focus:bg-none focus:ring-sky-600 resize-none overflow-hidden"
          rows="1"
          placeholder="Ketik pertanyaan Anda di sini..."
        ></textarea>
        
        <!-- Submit Button -->
        <button
          class="flex items-center justify-center p-5 bg-sky-600 text-white rounded-full shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-600"
          aria-label="Kirim"
        >
          <!-- Icon Pesawat Kertas -->
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

</template>



<!-- Script untuk mengakses  -->
<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'App',
  data() {
    return {
      markdown: "# Hello World",
      md: new MarkdownIt({
        html: true,        // Enable HTML tags
        breaks: true,      // Convert '\n' to <br>
        linkify: true,     // Auto-convert URLs to links
        typographer: true  // Enable smartquotes and other typographic replacements
      })
    };
  },
  computed: {
    markdownToHtml() {
      return this.md.render(this.markdown);
    },
  },
};
</script>

