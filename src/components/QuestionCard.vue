<template>
  <div class="items-center">
    <div
      class="grid grid-cols-2 gap-3 lg:gap-5 py-2 lg:py-5 text-white sm:grid-cols-2 md:grid-cols-4"
    >
      <button
        v-for="(question, index) in questionsList"
        :key="index"
        @click="$emit('questionSelected', question)"
        class="lg:p-4 p-2 rounded-md bg-sky-600 cursor-pointer lg:text-base text-sm transition-all duration-200 ease-in-out hover:scale-105 hover:bg-sky-700"
      >
        {{ question }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  data() {
    return {
      questionsList: [
        "Kapan jadwal KRS",
        "Cara mengakses SIAK-NG",
        "Kapan jadwal pembayaran UKT",
        "Apa persyaratan wisuda",
      ],
    };
  }
};
</script>

