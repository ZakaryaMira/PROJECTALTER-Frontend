import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageUserName from '../MessageUserName/MessageUserName';
import './MessageBox.css';
import MessageInput from '../MessageInput/MessageInput';

const MessageBox = ({ selectedUserName, selectedUserId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let intervalId;

        const fetchMessages = () => {
            if (selectedUserId) {
                axios.get(`http://localhost:5105/api/Message/GetAllMessages/${selectedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
            }
        };

        fetchMessages(); // Fetch messages initially

        intervalId = setInterval(fetchMessages, 1000); // Fetch messages every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [selectedUserId]);

    return (
        <div className='messageBox'>
            <MessageUserName userName={selectedUserName} />
            <div className='messageHolder'>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index} className='message'>
                            <p>
                                <strong>{message.senderId === localStorage.getItem('token') ? message.receiverName : message.senderName}</strong>: {message.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <h1 className='SelectAChatToStart'>Select a chat to start</h1>
                )}
            </div>
            <MessageInput receiverId={selectedUserId} />
        </div>
    );
};

export default MessageBox;
