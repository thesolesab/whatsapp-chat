import React, { useState, useEffect, useCallback } from 'react';
import useHttp from '../../hooks/useHTTP';
import { getMessagesFromDB, saveMessageToDB } from '../../services/indexedDb';
import fetchAndProcessNotifications from '../../services/fetchAndProcessNotifications';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = ({ idInstance, apiTokenInstance, activeChat }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { loadingSend, request, error } = useHttp();

    // Загрузка сообщений из IndexedDB при монтировании или смене активного чата
    useEffect(() => {
        if (activeChat?.chatId) {
            getMessagesFromDB(activeChat.chatId).then((savedMessages) => {
                setMessages(savedMessages);
            });
        } else {
            setMessages([]); // Если активного чата нет, очищаем сообщения
        }
    }, [activeChat]);

    // Отправка сообщения
    const handleSendMessage = useCallback(async () => {
        if (!activeChat?.chatId || !message) return;

        const url = `https://api.greenapi.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
        const payload = {
            chatId: activeChat.chatId,
            message: message,
        };

        const response = await request(url, 'POST', payload);

        if (!loadingSend && !error && response?.idMessage) {
            const newMessage = {
                id: response.idMessage,
                chatId: activeChat.chatId,
                text: message,
                isUser: true,
                timestamp: new Date().toISOString(),
            };

            // Сохраняем сообщение в IndexedDB
            await saveMessageToDB(newMessage);

            // Обновляем состояние
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    }, [activeChat?.chatId, apiTokenInstance, error, idInstance, loadingSend, message, request]);

    // Получение новых сообщений только для активного чата
    useEffect(() => {
        let timeoutId;

        const fetchMessages = async () => {
            if (activeChat?.chatId) {
                await fetchAndProcessNotifications(activeChat, idInstance, apiTokenInstance, request, setMessages);
            }
            timeoutId = setTimeout(fetchMessages, 5000); // Рекурсивный вызов через 5 секунд
        };

        fetchMessages();

        return () => clearTimeout(timeoutId); // Очистка таймера при размонтировании
    }, [activeChat, apiTokenInstance, idInstance, request]);

    return (
        <div className="chat">
            <ChatHeader activeChat={activeChat} />
            <MessageList messages={messages} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <MessageInput
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
                loadingSend={loadingSend}
            />
        </div>
    );
};

export default Chat;