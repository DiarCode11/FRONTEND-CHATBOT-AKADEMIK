export async function checkConnection(url) {
    try {
      const response = await fetch(url); // Menggunakan fetch untuk mengambil data dari server
      
      // Kondisi jika koneksi berhasil, maka kembalikan hasil responnya
      if (response.ok) {
        const data = await response.json(); // await : menunggu respon selesai
        console.log('Koneksi ke server berhasil'); // Tampilkan di cmd bahwa koneksi berhasil
        console.log(data);
        return data; // Kembalikan data

      } 
      else {
        console.log('Server tidak dapat dijangkau');
        return {'message': 'Server tidak dapat dijangkau', 'status': 'failed'}
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Timeout: Koneksi terlalu lama');
            return {'message': 'Koneksi terlalu lama', 'status': 'failed'}
        } else {
            // console.log('Tidak ada koneksi internet atau server tidak tersedia', error);
            return {'message': 'Server tidak dapat dijangkau', 'status': 'failed'}
        }
    } 
}

export async function sendPostRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST', // Metode request yang digunakan
            headers: {
            'Content-Type': 'application/json', // Menentukan bahwa body request berupa JSON
            },
            body: JSON.stringify(data), // Mengubah objek JavaScript menjadi JSON string
        });

        console.log(data);
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const responseData = await response.json(); // Mengambil response dalam bentuk JSON
        console.log('Response from server:', responseData);
        return responseData; // Mengembalikan response server

    } catch (error) {
      console.error('Error:', error);
    }
}

// // Testing POST
// async function main() {
//     const data = await sendPostRequest('http://localhost:5000/api', {'query': 'apa syarat wisuda'});
//     console.log(data);  // Menampilkan hasil setelah fungsi selesai
// }

// main();

// Panggil fungsi di dalam fungsi async
async function main() {
    const data = await checkConnection('http://localhost:5001/api/dataset-management');
    console.log(data);  // Menampilkan hasil setelah fungsi selesai
}

main();  // Panggil fungsi utama
