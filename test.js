const text = `
Untuk mengakses Sistem Informasi Akademik (SIAK), berikut adalah langkah-langkah yang perlu dilakukan:

. **Buka Browser**: Gunakan perangkat digital seperti komputer atau telepon genggam yang terhubung dengan internet dan memiliki web browser yang terinstal (misalnya Firefox, Google Chrome, atau lainnya).

. **Masukkan Alamat URL**: Ketikkan \`sso.undiksha.ac.id\` pada address bar browser dan tekan enter.

. **Login**: Setelah halaman awal website muncul, masukkan username dan password SSO yang telah diberikan kepada mahasiswa. Setelah menginput username dan password, klik tombol login.

. **Akses SIAK-NG**: Setelah berhasil login, silakan klik pada sistem SIAK-NG untuk melakukan proses akademik.

. **Menu yang Tersedia**: Di dalam SIAK-NG, terdapat beberapa menu yang bisa diakses, seperti Dashboard, Biodata, Kartu Rencana Studi (KRS), dan Kartu Hasil Studi (KHS).

Langkah-langkah ini diambil dari data terbaru yang tersedia pada tahun 2023. Jika ada pertanyaan lebih lanjut, silakan tanyakan!
`;

// Mengganti **...** dengan <b>...</b>
const htmlText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

console.log(htmlText);
