<template>
    <transition name="slide-fade">
        <div v-if="show_alert" class="fixed top-5 left-0 right-0 mx-auto transform  bg-green-50 text-green-600 rounded-sm shadow-lg z-40 text-sm md:w-1/3 w-[90%] transition-all duration-300 ">
            <div class="px-5 py-5 flex gap-4">
                <div class="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-green-600">
                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h1 class="font-bold text-lg text-green-600">Berhasil</h1>
                    <p>{{ message }}</p>
                </div>
            </div>
            <!-- Progress Bar -->
            <div class="h-0.5 rounded-full bg-green-600 absolute bottom-0 left-0 transition-all" :style="{ width: progressWidth }"></div>
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
