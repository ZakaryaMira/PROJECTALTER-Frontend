import './OfferUserName.css';
import OffererName from '../OffererName/OffererName';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OfferUserName = ({ requestId, onUserClick, selectedUserId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`http://localhost:5105/api/Offer/GetUsersWhoOffering/${requestId}`)
      .then(response => {
        setUsers(response.data);
        // Automatically select the first user if no user is selected
        if (response.data.length > 0 && !selectedUserId) {
          onUserClick(response.data[0].userId);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [requestId, onUserClick, selectedUserId]);

  return (
    <div className='offerUserName'>
      <div className='headingOffer'>
        <h1 className='offerUserNameHeading'>Offers</h1>
      </div>
      <OffererName users={users} onUserClick={onUserClick} selectedUserId={selectedUserId} />
    </div>
  );
};

export default OfferUserName;
