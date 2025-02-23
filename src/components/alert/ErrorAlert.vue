<template>
    <transition name="slide-fade">
        <div v-if="show_alert" class="fixed top-5 left-0 right-0 mx-auto transform  bg-red-50 text-red-600 rounded-sm shadow-lg z-40 text-sm md:w-1/3 w-[90%] transition-all duration-300 ">
            <div class="px-5 py-5 flex gap-4">
                <div class="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-red-600">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h1 class="font-bold text-lg text-red-600">Error</h1>
                    <p>{{ message }}</p>
                </div>
            </div>
            <!-- Progress Bar -->
            <div class="h-0.5 rounded-full bg-red-600 absolute bottom-0 left-0 transition-all" :style="{ width: progressWidth }"></div>
        </div>
    </transition>
</template>
  
<script>
export default {
    data() {
        return {
            progressWidth: '100%'
        };
    },
    props: {
        message: String,
        show_alert: Boolean,
    },
    watch: {
        show_alert(newVal) {
            if (newVal) {
                this.progressWidth = '100%';
                this.startProgress();
            }
        }
    },
    methods: {
        startProgress() {
            let duration = 3000;
            let interval = 50;
            let step = 100 / (duration / interval);

            let timer = setInterval(() => {
                let currentWidth = parseFloat(this.progressWidth);
                if (currentWidth <= 0) {
                    clearInterval(timer);
                    this.$emit('close'); // Hanya emit event, tidak mengubah prop langsung
                } else {
                    this.progressWidth = `${currentWidth - step}%`;
                }
            }, interval);
        }
    }
};
</script>

<style scoped>
/* Animasi kemunculan dari atas */
.slide-fade-enter-active {
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.slide-fade-leave-active {
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.slide-fade-enter-from {
    transform: translateY(-100px);
}
.slide-fade-leave-to {
    transform: translateY(-100px);
}
</style>
