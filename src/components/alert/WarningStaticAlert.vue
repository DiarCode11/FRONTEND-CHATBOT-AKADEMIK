<template>
  <div v-if="isActive" class="w-full bg-amber-50 flex shadow mb-4 relative">
    <span class="bg-orange-500 w-2 h-full absolute left-0 top-0"></span>
    <div class="flex flex-col justify-center pl-5 text-sm gap-3">
      <slot></slot>
    </div>
    <div class="absolute top-2 right-2" @click="handleClick">
      <CloseButton :size="20" />
    </div>
  </div>
</template>

<script>
import CloseButton from '../buttons/CloseButton.vue';
export default {
  name: "WarningStaticAlert",
  created() {},
  data() {
    return {};
  },
  components: {
    CloseButton
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleClick() {
      this.$emit("close")
    }
  },
};
</script>

<style lang="scss" scoped></style>