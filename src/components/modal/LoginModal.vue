<template>
  <div
    v-if="showModal"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-[30px] flex items-start justify-center h-full z-50 transition-opacity duration-300 ease-in-out"
    style="z-index: 50"
    @click.self="closeModal"
    :class="{ 'opacity-0': !showModal }"
  >
    <div class="flex items-center justify-center h-full px-2">
      <div class="bg-white rounded-lg p-2 md:w-96 z-50">
        <div class="flex justify-end">
          <CloseButton @click="closeModal"/>
        </div>
        <div class="pr-8 pb-8 pl-8">
          <h2 class="text-2xl font-bold mb-4 text-center">Masuk</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="email" class="block">Email</label>
              <input
                type="email"
                id="email"
                class="w-full px-4 py-2 rounded-lg border-2 border-gray-300"
                :value="email"
                @input="$emit('update:email', $event.target.value)"
              />
            </div>
            <div class="mb-4">
              <label for="password" class="block">Password</label>
              <input
                type="password"
                id="password"
                class="w-full px-4 py-2 rounded-lg border-2 border-gray-300"
                :value="password"
                @input="$emit('update:password', $event.target.value)"
              />
            </div>
            <button
              type="submit"
              class="bg-sky-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:bg-sky-700 transition duration-200 ease-in-out w-full"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "../buttons/CloseButton.vue";

export default {
  name: "LoginModal",
  components:{
    CloseButton
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    closeModal: {
      type: Function,
      default: () => {},
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
  },
  emits: ["update:showModal", "update:email", "update:password", "submit"],
  methods: {
    closeModal() {
      this.closeModal();
    },
    handleSubmit() {
      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
