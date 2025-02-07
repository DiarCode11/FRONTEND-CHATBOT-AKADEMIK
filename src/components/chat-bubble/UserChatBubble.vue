<template>
	<div class="flex justify-end bubble-chat pb-4" >
		<span class="w-20">
		</span>
		<div class="bg-sky-500 text-white rounded-l-2xl rounded-br-2xl shadow-md break-words whitespace-pre-wrap max-w-full overflow-hidden lg:max-w-xl">
			<div class="flex  p-3 gap-3 justify-end">
				<!-- Menambahkan kelas untuk membatasi panjang bubble dan menangani teks panjang -->
				<p v-text="message" class="text-white text-sm lg:text-base pr-1 max-w-full overflow-hidden font-montserrat"></p>
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