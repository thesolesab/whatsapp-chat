// Функция для открытия базы данных
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ChatApp', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('messages')) {
                db.createObjectStore('messages', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Функция для сохранения сообщения в IndexedDB
export const saveMessageToDB = async (message) => {
    const db = await openDB();
    const transaction = db.transaction('messages', 'readwrite');
    const store = transaction.objectStore('messages');
    store.put(message);
};

// Функция для сохранения чата в IndexedDB
export const saveChatToDB = async (chatId) => {
    const db = await openDB();
    const transaction = db.transaction('chatId', 'readwrite');
    const store = transaction.objectStore('chatId');
    store.put(chatId);
};

// Функция для получения сообщений из IndexedDB по chatId
export const getMessagesFromDB = async (chatId) => {
    const db = await openDB();
    const transaction = db.transaction('messages', 'readonly');
    const store = transaction.objectStore('messages');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            const messages = request.result.filter((msg) => msg.chatId === chatId);
            messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            resolve(messages);
        };
        request.onerror = () => reject(request.error);
    });
};