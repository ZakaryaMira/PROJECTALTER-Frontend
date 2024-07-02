import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contacts from '../Contacts/Contacts';
import './ContactList.css';

const ContactsList = ({ setSelectedUserName, setSelectedUserUsername, setSelectedUserId, selectedUserUsername }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const [exchangesResponse, offersResponse1, offersResponse2] = await Promise.all([
          axios.get('http://localhost:5105/api/Exchange/GetUsersExchanges'),
          axios.get('http://localhost:5105/api/Offer/GetUsersOffers'),
          axios.get('http://localhost:5105/api/Offer/GetUsersOffers2')
        ]);

        const exchanges = exchangesResponse.data;
        const offers1 = offersResponse1.data;
        const offers2 = offersResponse2.data;

        // Combine the results
        const combinedUsers = [...exchanges, ...offers1, ...offers2];

        // Remove duplicates (if any) based on UserId
        const uniqueUsers = combinedUsers.reduce((acc, user) => {
          if (!acc.some(existingUser => existingUser.userId === user.userId)) {
            acc.push(user);
          }
          return acc;
        }, []);

        setUsers(uniqueUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='contactList'>
      <h1 className='MessageHeading'>Messages</h1>
      <Contacts 
        users={users}
        setSelectedUserName={setSelectedUserName}
        setSelectedUserUsername={setSelectedUserUsername}
        setSelectedUserId={setSelectedUserId} // Pass the setSelectedUserId function
        selectedUserUsername={selectedUserUsername}
      />
    </div>
  );
};

export default ContactsList;
