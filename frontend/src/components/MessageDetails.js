import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MessageDetails = () => {
    const [message, setMessage] = useState('')
    const { id } = useParams()

    useEffect(() => {
        const fetchMessage = async () => {
            const response = await fetch('/api/messages/'+ id)
            const json = await response.json()

            if (response.ok) {
                setMessage(json.msg)
            }
        };
        fetchMessage();
    });

    return (

        <div className='message-details'>
            {message && 
                <div className='message_container'>
                <h3>This is your message: </h3>
                
                <div className='message_text'>
                <p>"{message}"</p>
                </div>
                </div>
            }
            {!message &&
            <div className='message_container'>
                <h3>Message not found :(</h3>
                </div>
            }            
        </div>
    )
}

export default MessageDetails