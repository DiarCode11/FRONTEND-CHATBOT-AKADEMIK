function dynamicPagination(range, input) {
    // Membagi input dengan 3 dan menggunakan Math.floor untuk mendapatkan kelipatan 3 terdekat
    const start = Math.floor((input - 1) / range) * range + 1;
    const end = start + range - 1;
    const pages = [];

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
    
}

function getPagination(total_page, current_page) {
    const pages = [];
    
    // Jika jumlah halaman kurang dari atau sama dengan 5, tampilkan semua halaman
    if (total_page <= 5) {
        for (let i = 1; i <= total_page; i++) {
            pages.push(i);
        }
    } else {
        // Jika berada di awal rentang halaman
        if (current_page <= 5) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total_page);
        } 
        // Jika berada di akhir rentang halaman
        else if (current_page > total_page - 5) {
            pages.push(1);
            pages.push('...');
            for (let i = total_page - 4; i <= total_page; i++) {
                pages.push(i);
            }
        } 
        // Jika berada di tengah rentang halaman
        else {
            pages.push(1);
            pages.push('...');
            for (let i = current_page - 2; i <= current_page + 2; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total_page);
        }
    }
    
    return pages;
}


// Contoh penggunaan
console.log(getPagination(11, 9));
console.log(dynamicPagination(5 ,12));

