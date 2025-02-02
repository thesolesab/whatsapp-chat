import React, { useState } from 'react'
import ChatList from '../components/ChatList'
import Chat from '../components/Chat/Chat'

const Messenger = (props) => {
    const [activeChat, setActiveChat] = useState(null); // Активный чат

    return (
        <div
            className='messenger'
        >
            <ChatList {...props} setActiveChat={setActiveChat} activeChat={activeChat} />
            {
                activeChat ?
                    <Chat {...props} activeChat={activeChat} />
                    :
                    <div className="w-logo">
                        <img src="https://static.whatsapp.net/rsrc.php/v4/y6/r/wa669aeJeom.png" alt="WhatsApp logo" />
                    </div>
            }
        </div>
    )
}

export default Messenger