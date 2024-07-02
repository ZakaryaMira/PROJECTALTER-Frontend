import './Offers.css';
import OfferUserName from '../../components/OfferUserName/OfferUserName';
import OffersInformations from '../../components/OffersInformations/OffersInformations';
import HeaderMain from '../../Section/HeaderMain/HeaderMain';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Offers = () => {
  const { requestId } = useParams();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    // Fetch the first user's ID when the component mounts
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(`http://localhost:5105/api/Offer/GetUsersWhoOffering/${requestId}`)
      .then(response => {
        if (response.data.length > 0) {
          setSelectedUserId(response.data[0].userId);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [requestId]);

  return (
    <>
      <HeaderMain />
      <div className='offersBox'>
        <OfferUserName requestId={requestId} onUserClick={handleUserClick} selectedUserId={selectedUserId} />
        {selectedUserId && (
          <OffersInformations requestId={requestId} userId={selectedUserId} />
        )}
      </div>
    </>
  );
};

export default Offers;
