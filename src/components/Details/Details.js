import React, { useState } from 'react';
import './Details.css';
import { Languges, Links } from '../../components';
import axios from 'axios';

const Details = ({ currentDetail, listing, type }) => {
  const [offerInfo, setOfferInfo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [price, setPrice] = useState('');

  const sendExchangeRequest = async () => {
    if (!listing || !listing.skillId || !listing.userId) {
      console.error('Missing required data for the exchange request.');
      return;
    }

    const userId = listing.userId;

    const skillId = listing.skillId;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5105/api/Exchange/CreateExchange/${userId}/${skillId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Exchange request sent:', response.data);
      alert('Exchange request sent successfully');
    } catch (error) {
      console.error('Error sending exchange request:', error);
      alert('Failed to send exchange request');
    }
  };

  const sendRequestOffer = async (e) => {
    e.preventDefault();
    if (!listing || !listing.requestId || !listing.userId) {
      console.error('Missing required data for the request offer.');
      return;
    }

    const userId = listing.userId;
    const requestId = listing.requestId;

    const offerData = {
      OfferInfo: offerInfo,
      Deadline: deadline,
      Price: price,
      UserId: userId,
      RequestId: requestId
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5105/api/Offer/CreateOffer', offerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Request offer sent:', response.data);
      alert('Request offer sent successfully');
    } catch (error) {
      console.error('Error sending request offer:', error);
      alert('Failed to send request offer');
    }
  };

  return (
    <div className='Details'>
      {currentDetail === 'skillDetails' && listing && (
        <>
          <h1 className='headerSkills'>{listing.skillName || listing.requestTitle}</h1>
          <h2 className='headerskills'>{listing.skillLevel || ''}</h2>
          <p className='headerskills'>{listing.skillDescription || listing.requestDescription}</p>
          <p className='headerskills'>{listing.info}</p>
        </>
      )}
      {currentDetail === 'userCertificate' && (
        <>
          <h1 className='headerSkills'>User Certificates</h1>
          <img className='userCertificate' src='images/certificate.jpg' alt='User Certificate' />
        </>
      )}
      {currentDetail === 'ShowCase' && (
        <>
          <h1 className='headerSkills'>ShowCase</h1>
          <video className='userCertificate'>
            <source src='' type='video/mp4'/>
          </video>
        </>
      )}
      {currentDetail === 'Links' && listing.links && (
        <>
          <h1 className='headerSkills'>Links</h1>
          <div>
            {listing.links.map(link => (
              <p key={link.linksId}>{link.linkInformation}</p>
            ))}
          </div>
        </>
      )}
      {currentDetail === 'Languges' && listing.languages && (
        <>
          <h1 className='headerSkills'>Languages</h1>
          <div>
            {listing.languages.map(language => (
              <p key={language.languageId}>{language.languageName}</p>
            ))}
          </div>
        </>
      )}
      {currentDetail === 'UsersFeedback' && (
        <>
          <h1 className='headerSkills'>Users Feedback</h1>
          <h1 className='headerSkills'>{listing.languageName}</h1>
        </>
      )}
   {currentDetail === 'wishlist' && listing.wishlists && (
  <>
    <h1 className='headerSkills'>Wishlist</h1>
    <div>
      {listing.wishlists.map(wishlist => (
        <p key={wishlist.wishlistId}>{wishlist.wishlistName}</p>
      ))}
    </div>
  </>
)}
      {type === 'exchange' && currentDetail === 'ExchangeButtom' && (
        <>
          <h1 className='headerSkills'>Submit Exchange</h1>
          <p className='headerskills'>Are you sure you want to send a skill exchange request {listing.firstName}?</p>
          <button className='headerskills widthos' onClick={sendExchangeRequest}>Send Exchange</button>
        </>
      )}
      {type === 'offers' && currentDetail === 'RequestOffer' && (
        <>
          <h1 className='headerSkills'>Submit Your Offer</h1>
          <p className='headerskills'>Are you sure you want to send a request offer to {listing.firstName}?</p>
          <form onSubmit={sendRequestOffer}>
            <div className='form-group'>
              <label htmlFor='offerInfo' className='labelOffer'>Offer Info:</label>
              <input
                type='text'
                id='offerInfo'
                value={offerInfo}
                onChange={(e) => setOfferInfo(e.target.value)}
                className='form-control offerInput'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='deadline'>Deadline:</label>
              <input
                type='date'
                id='deadline'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className='form-control'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price:</label>
              <input
                type='number'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='form-control'
                required
              />
            </div>
            <button type='submit' className='headerskills widthos'>Send Request Offer</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Details;
