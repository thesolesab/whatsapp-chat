import { saveMessageToDB } from "./indexedDb";

const fetchAndProcessNotifications = async (activeChat, idInstance, apiTokenInstance, request, setMessages) => {
    if (!activeChat?.chatId) return;

    const url = `https://api.greenapi.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    try {
        const response = await request(url);

        if (response?.body) {
            const notification = response.body;

            if (
                notification.messageData?.typeMessage === 'textMessage' &&
                notification.senderData?.chatId === activeChat.chatId
            ) {
                const newMessage = {
                    id: notification.idMessage,
                    chatId: activeChat.chatId,
                    text: notification.messageData.textMessageData.textMessage,
                    isUser: false,
                    timestamp: new Date().toISOString(),
                };

                await saveMessageToDB(newMessage);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }

            const receiptId = response.receiptId;
            if (receiptId) {
                const deleteUrl = `https://api.greenapi.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
                await request(deleteUrl, 'DELETE');
            }
        }
    } catch (error) {
        console.error('Ошибка при получении сообщения:', error);
    }
};

export default fetchAndProcessNotifications