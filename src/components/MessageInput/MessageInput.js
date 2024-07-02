import React, { useState } from 'react';
import axios from 'axios';
import './MessageInput.css';

const MessageInput = ({ receiverId }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim() || !receiverId) return;

    try {
      await axios.post(`http://localhost:5105/api/Message/send/${receiverId}`, {
        content: message,
      });

      setMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='messageInput'>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type your message...'
        className='inputField'
      />
      <button onClick={handleSend} className='sendButton'>Send</button>
    </div>
  );
};

export default MessageInput;
