import React, { useState } from 'react';
import './DetailsPopup.css';
import axios from 'axios';

const DetailsPopup = ({ details, onClose }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [offerInfo, setOfferInfo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [price, setPrice] = useState('');

  const renderDetails = () => {
    if (!details) return null;

    if (details.skillName) {
      const { skillName, skillDescription, yearsOfExperience, skillLevel, languages, links, skillId, userId } = details;

      return (
        <div>
          <h3 className='HeadingUserDetails'>{skillName}</h3>
          <p><strong className='DetailsInfoUsers'>Description:</strong> {skillDescription}</p>
          <p><strong className='DetailsInfoUsers'>Years of Experience:</strong> {yearsOfExperience}</p>
          <p><strong className='DetailsInfoUsers'>Level:</strong> {skillLevel}</p>

          {languages && languages.length > 0 && (
            <div>
              <strong className='DetailsInfoUsers'>Languages</strong>
              <ul>
                {languages.map((lang, index) => (
                  <li key={index}>{lang.languageName}</li>
                ))}
              </ul>
            </div>
          )}

          {links && links.length > 0 && (
            <div>
              <strong className='DetailsInfoUsers'>Links</strong>
              <ul className='DetailsInfoUsers'>
                {links.map((link, index) => (
                  <li key={index}><a href={link.linkInformation} target="_blank" rel="noopener noreferrer">{link.linkInformation}</a></li>
                ))}
              </ul>
            </div>
          )}
<hr />
          <button className="action-button" onClick={() => handleAction('skill', null, skillId, userId)}>Send Skill Exchange</button>
        </div>
      );
    } else {
      const { requestTitle, requestDescription, userId, requestId, firstName } = details;

      return (
        <div >
          <h3 className='HeadingUserDetails'>{requestTitle}</h3>
          <p><strong className='DetailsInfoUsers'>Description:</strong> {requestDescription}</p>
          <hr className='hr' />
          <h1 className='headerSkills'>Submit Your Offer</h1>
          <p className='headerskills'>Are you sure you want to send a request offer ??</p>
          <form onSubmit={(e) => handleAction('request', e, requestId, userId)}>
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
            <button type='submit' className='headerskills'>Send Request Offer</button>
          </form>
        </div>
      );
    }
  };

  const handleAction = async (type, event, id, userId) => {
    if (event) event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (type === 'skill') {
        const response = await axios.post(`http://localhost:5105/api/Exchange/CreateExchange/${userId}/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Skill exchange request sent:', response.data);
        setSuccessMessage('Skill exchange request sent successfully!');
      } else if (type === 'request') {
        const offerData = {
          requestId: id,
          offerInfo,
          deadline,
          price
        };

        const response = await axios.post('http://localhost:5105/api/Offer/CreateOffer', offerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Offer request sent:', response.data);
        setSuccessMessage('Offer request sent successfully!');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setSuccessMessage('Failed to send request.');
    }

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="popup-overlay2">
      <div className="popup-content2">
        <h2 className='DetailsUsersss'>Details</h2>
        {renderDetails()}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailsPopup;
