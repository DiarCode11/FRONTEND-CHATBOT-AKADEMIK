<template>
  <div
    v-if="showModal"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black/50  flex items-start justify-center h-full z-50 transition-opacity duration-300 ease-in-out"
    style="z-index: 50"
    @click.self="closeModal"
    :class="{ 'opacity-0': !showModal }"
  >
    <div class="flex items-center justify-center h-full px-2">
      <div class="bg-white  rounded-lg p-2 w-96 z-50">
        <div class="flex justify-end">
          <CloseButton @click="closeModal"/>
        </div>
        <div class="pr-8 pb-8 pl-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "../buttons/CloseButton.vue";

export default {
  name: "Modal",
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
  },
  emits: ["update:showModal"],
  methods: {
    closeModal() {
      this.$emit("update:showModal", false);
    },
  },
};
</script>
