import React from 'react';
import MessageContainer from '../MessageContainer/MessageContainer';
import SendMessageFrom from '../SendMessageForm/SendMessageFrom';

const Chat = ({ messages, sendMessage }) => { // Fix the prop name to `sendMessage`
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h2>ChatRoom</h2>
      </div>
      <div style={{ padding: '20px' }}>
        <MessageContainer messages={messages} />
      </div>
      <div style={{ padding: '20px' }}>
        <SendMessageFrom sendMessage={sendMessage} /> {/* Pass the `sendMessage` prop */}
      </div>
    </div>
  );
};

export default Chat;
