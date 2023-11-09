import React, { useState } from 'react';

function MessageHome() {
  const [text, setText] = useState('');
  const [messageLink, setMessageLink] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = {text}

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json();
    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setText('')
      setError(null)
      console.log('response: ', response)
      console.log('New Message Added', json.link)
      setMessageLink('/api/messages/'+json.link)
    }    
  };

  return (
    <div className="message_home">
      <div>
          <input
            type="text"
            placeholder="Enter your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSubmit}>Generate Link</button>
      </div>
      
      {messageLink && 
          <div className='message_link'>
            <p>Your unique message link:</p>
            <a href={messageLink}>http://localhost:3000{messageLink}</a>
          </div>
      }

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default MessageHome;
