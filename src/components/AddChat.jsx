import React, { useState } from 'react'

const AddChat = ({ chats, setChats, getContact }) => {
    const [newChatPhoneNumber, setNewChatPhoneNumber] = useState(''); // Номер для нового чата

    // Создание нового чата
    const handleCreateChat = async () => {
        if (!newChatPhoneNumber) return;

        const newChatId = `${newChatPhoneNumber}@c.us`;

        if (!chats.find(el => el.chatId === newChatId)) {
            const contact = await getContact(newChatId)

            const updatedChats = [...chats, { senderName: contact.contactName, chatId: newChatId, }];
            setChats(updatedChats);
            setNewChatPhoneNumber('');
        }
    };

    return (
        <div className="new-chat">
            <input
                type="text"
                placeholder="Введите номер телефона"
                value={newChatPhoneNumber}
                onChange={(e) => setNewChatPhoneNumber(e.target.value)}
            />
            <button onClick={handleCreateChat}>Создать чат</button>
        </div>
    )
}

export default AddChat