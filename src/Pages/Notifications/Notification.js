// Notification.js
import React from 'react';
import { NotificationMessages } from '../../components';
import { HeaderMain } from '../../Section';
import './Notifications.css';

const Notification = () => {
  return (
    <>
      <HeaderMain/>
      <div className='NotificationBox'>
        <div>
          <h1 className='notificationHeading'>Notifications</h1>
          <NotificationMessages/>
        </div>
      </div>
    </>
  );
};

export default Notification;
