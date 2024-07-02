import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MessageHolder.css';

const MessageHolder = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const currentUserId = localStorage.getItem('token');

  useEffect(() => {
    if (receiverId) {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`http://localhost:5105/api/Message/GetAllMessages/${receiverId}`)
        .then(response => {
          setMessages(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [receiverId]);

  return (
    <div className='messageHolder'>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className='message'>
            <p>
              <strong>{message.senderId === currentUserId ? message.receiverName  : message.senderName}</strong>: {message.content}
            </p>
          </div>
        ))
      ) : (
        <h1 className='SelectAChatToStart'>Select a chat to start</h1>
      )}
    </div>
  );
};

export default MessageHolder;
