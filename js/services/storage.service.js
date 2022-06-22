export const storageService = {
    save: saveToStorage,
    load: loadFromStorage
}

function saveToStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
}

function loadFromStorage(key) {
    const item = localStorage.getItem(key)
    return JSON.parse(item)
}