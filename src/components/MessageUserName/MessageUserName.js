import React from 'react';
import './MessageUserName.css';

const MessageUserName = ({ userName }) => {
  return (
    <div className='MessageUserName'>
      <h1 className='messageUserNameHeading'>{userName || 'UserName'}</h1>
    </div>
  );
};

export default MessageUserName;
