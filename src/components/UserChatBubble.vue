<template>
    <div class="flex justify-end">
        <div class="bg-sky-600 mt-5 rounded-l-2xl rounded-br-2xl shadow max-w-xl">
            <div class="flex p-4 gap-3 justify-end">
                <!-- Menambahkan kelas untuk membatasi panjang bubble dan menangani teks panjang -->
                <p class="text-white text-sm lg:text-base pr-1 max-w-full break-words overflow-hidden ">
                    {{ message }}
                </p>
                <span class="bg-white rounded-md text-sky-600 p-2 flex items-center justify-center w-8 h-8 translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserChatBubble',
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>