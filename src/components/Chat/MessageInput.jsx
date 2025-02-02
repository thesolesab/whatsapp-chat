import React, { memo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const MessageInput = memo(({ message, setMessage, handleSendMessage, loadingSend }) => {

    return (
        <div className='addMessage'>
            <TextareaAutosize
                placeholder="Введите сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minRows={1}
                maxRows={7}
            />
            <button onClick={handleSendMessage} disabled={loadingSend}>
                {loadingSend ? 'Отправка...' : 'Отправить'}
            </button>
        </div>
    )
});

export default MessageInput;