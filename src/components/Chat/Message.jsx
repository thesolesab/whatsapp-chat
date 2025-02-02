import React, { memo } from 'react';

const Message = memo(({ text, isUser }) => {
    return (
        <div className={`message ${isUser ? 'user' : 'recipient'}`}>
            <p>{text}</p>
        </div>
    );
});

export default Message;