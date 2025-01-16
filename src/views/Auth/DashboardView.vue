<template>
    <p class="text-sm text-gray-400">Admin /</p>
    <h1 class="text-xl font-bold pb-6">Dashboard</h1>
    <div class="grid md:grid-cols-4 gap-4 mb-5 grid-cols-2">
        <div class="bg-gradient-to-br shadow-xl from-sky-500 to-sky-600 text-white p-4 rounded-xl ">
            <div class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl">
                <i class="bi bi-person-circle text-gray-800 "></i>
            </div>
            <h1 class="pt-4 text-lg font-bold">800</h1>
            <p>User Online</p>
        </div>
        <div class="bg-gradient-to-br shadow-xl from-green-500 to-green-600 text-white p-4 rounded-xl ">
            <div class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl">
                <i class="bi bi-chat-dots-fill text-gray-800"></i>
            </div>
            <h1 class="pt-4 text-lg font-bold">1000</h1>
            <p>Chat Hari ini</p>
        </div>
        <div class="bg-gradient-to-br shadow-xl from-orange-500 to-orange-600 text-white p-4 rounded-xl ">
            <div class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl">
                <i class="bi bi-chat-right-heart-fill text-gray-800 translate-y-0.5"></i>
            </div>
            <h1 class="pt-4 text-lg font-bold">50</h1>
            <p>Feedback</p>
        </div>
        <div class="bg-gradient-to-br shadow-xl from-slate-500 to-slate-600 text-white p-4 rounded-xl ">
            <div class="bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl">
                <i class="bi bi-hand-thumbs-up-fill text-gray-800"></i>
            </div>
            <h1 class="pt-4 text-lg font-bold">100</h1>
            <p>Like</p>
        </div>
        
    </div>
    <div class="flex gap-4 bg-white rounded-3xl shadow-lg flex-col ">
        <h1 class="text-lg font-semibold pt-4 pl-4">Log Aktivitas</h1>
        <div class="overflow-x-auto w-full">
            <div class="flex flex-col gap-2 w-max md:w-full h-max px-4 pb-10 rounded-3xl shadow-lg">
                <table class="min-w-full w-max bg-white">
                    <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-xs">
                            <th class="py-3 px-6 text-left">IP Address</th>
                            <th class="py-3 px-6 text-left">Endpoint</th>
                            <th class="py-3 px-6 text-left">Status</th>
                            <th class="py-3 px-6 text-left">Timestamp</th>
                            <th class="py-3 px-6 text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-xs">
                        <tr v-for="i in 10" :key="i" class=" border-b">
                            <td class="py-3 px-6 text-left">192.168.1.1</td>
                            <td class="py-3 px-6 text-left">/admin</td>
                            <td class="py-3 px-6 text-left">200</td>
                            <td class="py-3 px-6 text-left">02-03-2023 12:00</td>
                            <td class="py-3 px-6 text-left">OK</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'DashboardView'
}
</script>

<style scoped>
table {
  border-collapse: collapse; /* Menghilangkan garis antara border */
  border: none; /* Menghilangkan garis pada tabel */
}

table th, table td {
  border: none; /* Menghilangkan garis pada header dan sel */
  padding: 12px; /* Memberikan padding untuk ruang antar konten */
}

table thead tr {
  border-bottom: none; /* Menghilangkan garis bawah pada header */
}
</style>