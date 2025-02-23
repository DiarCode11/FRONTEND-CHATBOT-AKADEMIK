export function search(query, data) {
    return data.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(query.toLowerCase())
        )
    );
}