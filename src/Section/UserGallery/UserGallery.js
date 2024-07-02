import React, { useEffect, useState } from 'react';
import { Listinings, DetailsPopup } from '../../components';
import './UserGallery.css';
import axios from 'axios';
import IMAGE from '../../SVG/undraw_pic_profile_re_7g2h.svg';
const UserGallery = ({ userId }) => {
  const [skills, setSkills] = useState([]);
  const [offers, setOffers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [popupDetails, setPopupDetails] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        let skillResponse, offerResponse, feedbackResponse, usersResponse;

        if (userId) {
          // other users 
          skillResponse = await axios.get(`http://localhost:5105/api/Skill/getSkillsByUserId/${userId}`);
          offerResponse = await axios.get(`http://localhost:5105/api/Request/getUserRequests/${userId}`);
          feedbackResponse = await axios.get(`http://localhost:5105/api/Feedback/getUserFeedbacks/${userId}`);
          setIsCurrentUser(false);
        } else {
          // current user
          skillResponse = await axios.get('http://localhost:5105/api/skill/getSkill', {
            headers: { Authorization: `Bearer ${token}` }
          });
          offerResponse = await axios.get('http://localhost:5105/api/Request/getRequest', {
            headers: { Authorization: `Bearer ${token}` }
          }); 
          feedbackResponse = await axios.get('http://localhost:5105/api/Feedback/getOwnFeedbacks', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsCurrentUser(true);
        }

        usersResponse = await axios.get('http://localhost:5105/api/User/getAllUser', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setSkills(skillResponse.data);
        setOffers(offerResponse.data);
        setFeedbacks(feedbackResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [userId]);

  const handleDetailsClick = (details) => {
    setPopupDetails(details);
  };

  const closePopup = () => {
    setPopupDetails(null);
  };

  const getUserInfo = (userId) => {
    return users.find(user => user.userId === userId);
  };

  return (
    <div className='userGallery'>
      {popupDetails && <DetailsPopup details={popupDetails} onClose={closePopup} />}
      <div className='gallerySections'>
        <button className='gallerySectionsBtns'>Skills</button>
        <button className='gallerySectionsBtns'>Requests</button>
        <button className='gallerySectionsBtns'>User Feedback</button>
      </div>
      <h1 className='gallerySectionsheadig'>{isCurrentUser ? 'Your skills' : 'His skills'}</h1>
      <div className='galleryListinings'>
        {skills.map((skill, index) => (
          <Listinings
            key={index}
            listing={skill}
            type="exchange"
            isCurrentUser={isCurrentUser}
            onDetailsClick={handleDetailsClick}
          />
        ))}
      </div>
      <h1 className='gallerySectionsheadig'>{isCurrentUser ? 'Your Requests' : 'His Requests'}</h1>
      <div className='galleryListinings'>
        {offers.map((offer, index) => (
          <Listinings
            key={index}
            listing={offer}
            type="request"
            isCurrentUser={isCurrentUser}
            onDetailsClick={handleDetailsClick}
          />
        ))}
      </div>
      <h1 className='gallerySectionsheadig'>{isCurrentUser ? 'What people wrote in their feedback about You' : ' What people wrote in their feedback about him'}</h1>
      
      <div className='galleryListinings'>
        {feedbacks.map((feedback, index) => {
          const sender = getUserInfo(feedback.senderId);
          return (
            <div key={index} className='feedbackItem'>
              
              {sender && (
                <div className='senderInfo'>
                  <p className='Detailsfnl'>From: {sender.firstName} {sender.lastName}</p>
                  <p className='DetailsUsername'>{sender.username}</p>
                  <img className="senderPhotoTwo" src={sender.picture ? `data:image/png;base64,${sender.picture}` : IMAGE} alt="Profile" />
                </div>
              )}
              <h5> his feedback :</h5>
              <p> {feedback.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserGallery;
