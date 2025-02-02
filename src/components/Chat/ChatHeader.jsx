import React, { memo } from 'react';

const ChatHeader = memo(({ activeChat }) => (

    <div className="chat-header">
        <h2>
            Чат с{' '}
            {activeChat
                ? activeChat.senderContactName || activeChat.senderName || activeChat.chatId.replace('@c.us', '')
                : 'WhatsApp'}
        </h2>
    </div>
));

export default ChatHeader;