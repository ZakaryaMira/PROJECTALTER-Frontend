import React, { useState } from 'react';
import './Messages.css';
import { HeaderMain } from '../../Section';
import ContactsList from '../../components/ContactList/ContactList';
import MessageBox from '../../components/MessageBox/MessageBox';

const Messages = () => {
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserUsername, setSelectedUserUsername] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // Receiver ID

  return (
    <>
      <HeaderMain />
      <div className='Messages'>
        <ContactsList 
          setSelectedUserName={setSelectedUserName}
          setSelectedUserUsername={setSelectedUserUsername}
          setSelectedUserId={setSelectedUserId}
          selectedUserUsername={selectedUserUsername}
        />
        <MessageBox 
          selectedUserName={selectedUserName} 
          selectedUserId={selectedUserId} // Pass the receiver ID
        />
      </div>
    </>
  );
};

export default Messages;
