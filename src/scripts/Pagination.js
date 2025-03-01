export function getPagination(total_page, current_page) {
    console.log("Page saat ini:", current_page);
    const pages = [];
    
    // Jika jumlah halaman kurang dari atau sama dengan 5, tampilkan semua halaman
    if (total_page <= 4) {
        console.log("Fungsi pertama dieksekusi");
        for (let i = 1; i <= total_page; i++) {
            pages.push(i);
        }
    } else {
        // Jika berada di awal rentang halaman
        if (current_page < 4) {
            console.log("Fungsi kedua dieksekusi");
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total_page);
        } 
        // Jika berada di akhir rentang halaman
        else if (current_page > total_page - 5) {
            console.log("Fungsi ketiga dieksekusi");
            pages.push(1);
            pages.push('...');
            for (let i = total_page - 4; i <= total_page; i++) {
                pages.push(i);
            }
        } 
        // Jika berada di tengah rentang halaman
        else {
            console.log("Fungsi keempat dieksekusi");
            pages.push(1);
            pages.push('...');
            for (let i = current_page - 1; i <= current_page + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total_page);
        }
    }
    
    return pages;
}

// Contoh penggunaan
console.log(getPagination(11, 6));