import React from 'react';
import './Contacts.css';

const Contacts = ({ users, setSelectedUserName, setSelectedUserUsername, setSelectedUserId, selectedUserUsername }) => {
  const handleClick = (user) => {
    setSelectedUserName(user.username); 
    setSelectedUserUsername(user.username); 
    setSelectedUserId(user.userId); // Set the receiver ID (userId) when a user is clicked
  };

  return (
    <div className='contacts'>
      {users.length > 0 ? (
        users.map(user => (
          <div 
            key={user.username} 
            className={`contact ${user.username === selectedUserUsername ? 'selected' : ''}`} 
            onClick={() => handleClick(user)}
          >
            <h1 className='contactName'>{user.firstName + ' ' + user.lastName}</h1>
          </div>
        ))
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};

export default Contacts;
