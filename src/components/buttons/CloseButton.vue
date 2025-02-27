<template>
  <button
    class="bg-transparent rounded-full p-1 transition duration-200 ease-in-out"
    :class="`hover:${hoverColor}`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-x"
      :width="size"
      :height="size"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</template>

<script>
export default {
  name: "CloseButton",
  created() {},
  data() {
    return {};
  },
  props: {
    size: {
      type: Number,
      default: 24,
    },
    hoverColor: {
      type: String,
      default: "bg-gray-200",
    },
  },
};
</script>

<style lang="scss" scoped></style>