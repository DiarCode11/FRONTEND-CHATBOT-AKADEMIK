<template>
    <div class="flex justify-center flex-col pb-5 pt-10">
        <h1 class="text-sky-600 lg:text-6xl text-5xl font-extrabold text-center bg-gradient-to-r from-sky-500 to-green-600 bg-clip-text text-transparent">{{ title }}</h1>
        <p class="text-gray-800 pt-2 text-center lg:text-lg text-sm font-light">{{ subtitle }}</p>
        <div class="flex justify-center gap-4 pt-2 text-lg font-bold">
            <div class="bg-sky-600 text-white px-6 uppercase py-2 rounded-full lg:text-base text-xs">{{ version }}</div>
            <div :class="`text-white  px-9 uppercase py-2 rounded-full lg:text-base text-xs `+ (isConnected ? 'bg-green-600' : 'bg-red-600')">{{ isConnected ? 'Online' : 'Offline' }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        },
        version: {
            type: String,
            required: true
        },
        isConnected: {
            type: Boolean,
            required: true
        },
    }
}
</script>