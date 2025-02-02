import React, { memo, useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = memo(({ messages }) => {
    const messagesRef = useRef(null)

    useEffect(
        () => {
            if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
        }, [messages]
    )

    return (
        <div className="messages" ref={messagesRef}>
            {messages.map((msg) => (
                <Message key={msg.id} text={msg.text} isUser={msg.isUser} />
            ))}
        </div>
    );
});

export default MessageList;