<template>
  <div class="flex flex-col relative">
    <!-- Fixed Navbar -->
    <Navbar />
    
    <!-- Content area -->
    <div class="bottom-0 left-0 right-0 flex-grow  h-screen">
      <div class="min-h-screen">
        <!-- Container responsif -->
        <div class="max-w-4xl w-full mx-auto px-2 lg:px-8 h-full flex flex-col pt-3">
            <!-- Hero -->
            <Header
              :title="'AKASHA'"
              :subtitle="'Layanan AI Generatif untuk akses informasi Akademik Undiksha'"
              :version="'Versi 1.0.0'"
              :isConnected="isConnected"
            />

            <!-- Content -->
            <div class="p-4 flex-1 w-full lg:px-10 md:max-w-3xl lg:max-w-4xl h-full bg-white border border-gray-300 rounded-xl shadow-2xl">
              <QuestionCard />

              <div class="pb-28 flex flex-col"> <!-- Perbaikan: padding bawah lebih besar -->
                <!-- Menampilkan chat bubbles untuk setiap pesan -->
                <div class="flex flex-col gap-y-4 pt-4">
                  <!-- Bubble Chat dari AI -->
                  <BotChatBubble :message="'Salam Harmoni🙏 <br><br>Saya merupakan Chatbot Akademik Undiksha, <strong>ada yang bisa saya bantu?</strong>'"/>

                  <div v-for="(message, index) in messages" :key="index" class="flex flex-col gap-y-3">
                    <UserChatBubble :message="message.user_message" />
                    <BotChatBubble :message="message.bot_message" />
                  </div>
                </div>
                <span id="bottomPage" class="h-10"></span>
              </div>
            </div>
          </div>
      </div>
    </div>
    
    <!-- Fixed Footer -->
    <div class="fixed bottom-0 left-0 right-0 bg-blue-200 text-white p-4 text-center z-10">
      <div class="flex justify-center items-center gap-3">
        <!-- Menu -->
        <button
          @click="submitQuestion"
          class="hidden lg:flex items-end justify-center p-2 bg-sky-600 text-white rounded-full shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-600"
          aria-label="Kirim"
        >
          <!-- Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
          </svg>
        </button>

        <!-- Input Textarea -->
        <div class="w-full rounded-xl lg:rounded-3xl lg:max-w-[60%]">
          <textarea
            v-model="question"
            id="message"
            class="resize-none w-full p-2 text-black rounded-lg border-white border-4 overflow-y-auto focus:outline-none"
            placeholder="Ketik pertanyaanmu disini..."
            style="line-height: 1.5rem; max-height: 6rem;" 
            @keydown="handleEnterKeydown"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          @click="submitQuestion"
          class="flex items-end justify-center p-2 bg-sky-600 text-white rounded-full shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-600"
          aria-label="Kirim"
        >
          <!-- Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./scripts/App.js"></script>
