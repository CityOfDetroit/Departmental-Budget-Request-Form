function getLocalStorageSize() {
    let total = 0;

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            let keySize = key.length * 2; // each character is 2 bytes
            let valueSize = localStorage[key].length * 2; // each character is 2 bytes
            total += keySize + valueSize;
        }
    }

    return formatBytes(total);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
