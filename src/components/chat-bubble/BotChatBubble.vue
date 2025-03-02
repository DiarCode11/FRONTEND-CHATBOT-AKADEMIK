<template>
  <div class="flex justify-start bubble-chat gap-2">
    <span
      class="bg-sky-600 text-white rounded-md px-1 flex items-center justify-center h-6 w-6 lg:w-8 lg:h-8 translate-y-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-robot"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"
        />
        <path
          d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"
        />
      </svg>
    </span>
    <div class="flex flex-col gap-3">
      <div
        class="bg-slate-200 text-white py-2 px-4 rounded-r-2xl rounded-bl-2xl shadow-md break-words whitespace-pre-wrap max-w-full overflow-hidden lg:max-w-xl"
      >
        <div class="flex py-1 justify-end">
          <!-- Menambahkan kelas untuk membatasi panjang bubble dan menangani teks panjang -->
          <div
            v-html="message"
            class="text-gray-600 text-sm lg:text-base pr-1 max-w-full overflow-hidden font-montserrat text-wrap "
            :class="{
              'loader': message === ''
            }"
          ></div>
        </div>
      </div>
      <!-- <div v-if="showAction" class="flex gap-3">
        <LikeButton :size="6" :isActive="isLikeActive" :activeColor="`text-blue-500`" inactiveColor="text-slate-500 w-6" @click="toggleLike()"/>
        <DislikeButton :size="6" :isActive="isDislikeActive" :activeColor="`text-blue-500`" inactiveColor="text-slate-500 w-6" @click="toggleDislike()"/>
      </div> -->
    </div>
  </div>
</template>

<script>
import LikeButton from '../buttons/LikeButton.vue';
import DislikeButton from '../buttons/DislikeButton.vue';

export default {
  components: {
    LikeButton,
    DislikeButton,
  },
  name: "BotChatBubble",
  props: {
    message: {
      type: String,
      required: true,
    },
    showAction:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isLikeActive: false,
      isDislikeActive: false
    };
  },
  methods: {
    toggleLike() {
      // Toggle Like and disable Dislike if Like is activated
      this.isLikeActive = !this.isLikeActive;
      console.log("Kondisi like: ", this.isLikeActive)
      if (this.isLikeActive) {
        this.isDislikeActive = false; // Nonaktifkan Dislike
      }
    },
    toggleDislike() {
      // Toggle Dislike and disable Like if Dislike is activated
      this.isDislikeActive = !this.isDislikeActive;
      if (this.isDislikeActive) {
        this.isLikeActive = false; // Nonaktifkan Like
      }
    },
  },
};
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 30px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side,#5e5e5e 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 100%;
  animation: l7 1s infinite linear;
}
@keyframes l7 {
    33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
    50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
    66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
}

</style>

