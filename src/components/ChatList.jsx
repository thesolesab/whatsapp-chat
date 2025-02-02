import React, { useState, useEffect, useCallback } from 'react';
import useHttp from '../hooks/useHTTP';
import Spinner from './Spinner';
import AddChat from './AddChat';
import getUrl from '../services/getUrl';

const ChatList = ({ idInstance, apiTokenInstance, activeChat, setActiveChat }) => {
    const [chats, setChats] = useState([]); // Список чатов

    const { request, loading, error } = useHttp()

    useEffect(
        () => {
            const url = `https://api.green-api.com/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}?minutes=1440`;

            request(url)
                .then(
                    data => {
                        const chatList = new Map()
                        data.forEach(
                            ({ senderName, senderId, chatId, senderContactName }) => {
                                const chat = { senderName, senderId, senderContactName, chatId }
                                chatList.set(chatId, chat)
                            }
                        )
                        setChats(Array.from(chatList.values()))
                    }
                )
                .catch(error => console.error('Ошибка при получении сообщения:', error));
        }
        , [apiTokenInstance, idInstance, request]
    )

    const getContact = async (chatId) => {
        const url = getUrl(idInstance, apiTokenInstance, 'GetContactInfo')

        const contact = await request(url, 'post', { "chatId": "71234567890@c.us" })
        return contact
    }

    // Выбор активного чата
    const handleSelectChat = useCallback((chatId) => {
        setActiveChat(chats.find(el => el.chatId === chatId));
        console.log(activeChat?.chatId, chatId);

    }, [activeChat?.chatId, chats, setActiveChat]);

    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <h2>Список чатов</h2>
            </div>
            <div className="chats">
                {error && <p>Произошла ошибка</p>}
                {
                    loading && !error
                        ?
                        <Spinner />
                        :
                        chats.map(
                            ({ chatId, senderContactName, senderName }) => (
                                <div
                                    key={chatId}
                                    className={`chat-item ${activeChat?.chatId === chatId ? 'active' : ''}`}
                                    onClick={() => handleSelectChat(chatId)}
                                >
                                    {senderContactName || senderName || chatId.replace('@c.us', '')}
                                </div>
                            )
                        )
                }
            </div>
            <AddChat getContact={getContact} chats={chats} setChats={setChats} />
        </div>
    );
};

export default ChatList;