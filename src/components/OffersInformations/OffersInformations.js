import React, { useState, useEffect } from 'react';
import './OffersInformations.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OffersInformations = ({ requestId, userId }) => {
  const [offer, setOffer] = useState({
    offerId: '',
    offerInfo: '',
    deadline: '',
    price: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`http://localhost:5105/api/Offer/GetOffers/${requestId}`)
      .then(response => {
        const userOffer = response.data.find(offer => offer.userId === userId);
        if (userOffer) {
          setOffer({
            offerId: userOffer.offerId,
            offerInfo: userOffer.offerInfo,
            deadline: userOffer.deadline,
            price: userOffer.price,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching offer:', error);
      });
  }, [requestId, userId]);

  const handleAccept = () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.patch(`http://localhost:5105/api/Offer/AcceptOffer/${offer.offerId}`)
      .then(response => {
        console.log('Offer accepted:', response.data);
        // Navigate to Messages page
        navigate('/messages');
      })
      .catch(error => {
        console.error('Error accepting offer:', error);
      });
  };

  const handleReject = () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.patch(`http://localhost:5105/api/Offer/RejectOffer/${offer.offerId}`)
      .then(response => {
        console.log('Offer rejected:', response.data);
        // Optionally update state or provide feedback to user
      })
      .catch(error => {
        console.error('Error rejecting offer:', error);
      });
  };

  return (
    <div className='offerHolder'>
      <div className='offerrerDetails'>
        <h1 className='offerDetailsHeading'>Offer Details</h1>
        <p className='offerDetailesText'>{offer.offerInfo}</p>
      </div>
      <div className='deadline'>
        <h1 className='offerDetailsHeading'>Deadline</h1>
        <h1 className='deadlineText'>{offer.deadline}</h1>
      </div>
      <div className='deadline'>
        <h1 className='offerDetailsHeading'>Offer Price</h1>
        <h1 className='deadlineText'>{offer.price}</h1>
      </div>
      <div className='buttonsOffer'>
        <button className='btnoffer buttonOfferAccept' onClick={handleAccept}>Submit</button>
        <button className='btnoffer buttonOfferReject' onClick={handleReject}>Decline</button>
      </div>
    </div>
  );
};

export default OffersInformations;
