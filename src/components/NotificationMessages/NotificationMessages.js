import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationMessages.css';
import IMAGE from '../../SVG/undraw_pic_profile_re_7g2h.svg';
const NotificationMessages = () => {
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5105/api/exchange/ExchangeNotification', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (exchangeId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5105/api/exchange/AcceptExchange/${exchangeId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(notifications.filter(notification => notification.exchangeId !== exchangeId));
      setUserInfo(null);  // Clear user information
      setUserSkills([]);  // Clear user skills
      setUserFeedbacks([]);  // Clear user feedbacks
    } catch (error) {
      console.error('Error accepting notification:', error);
    }
  };

  const handleDecline = async (exchangeId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5105/api/exchange/RefuseExchange/${exchangeId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(notifications.filter(notification => notification.exchangeId !== exchangeId));
      setUserInfo(null);  // Clear user information
      setUserSkills([]);  // Clear user skills
      setUserFeedbacks([]);  // Clear user feedbacks
    } catch (error) {
      console.error('Error declining notification:', error);
    }
  };

  const handleViewUserInfo = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const [userResponse, skillsResponse, feedbackResponse] = await Promise.all([
        axios.get(`http://localhost:5105/api/User/getAllUser`),
        axios.get(`http://localhost:5105/api/Skill/getSkillsByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`http://localhost:5105/api/Feedback/getUserFeedbacks/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      
      const user = userResponse.data.find(user => user.userId === userId);
      setUserInfo(user);
      setUserSkills(skillsResponse.data);
      setUserFeedbacks(feedbackResponse.data);
    } catch (error) {
      console.error('Error fetching user info, skills, or feedback:', error);
    }
  };

  return (
    <div className='NotificationMessagesbox'>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.exchangeId} className='NotificationMessage'>
            <h1 className='NotificationMessage2'>{`${notification.senderFirstName} ${notification.senderLastName} sent you a skill exchange request`}</h1>
            <button className='notificationInput' onClick={() => handleAccept(notification.exchangeId)}>Accept</button>
            <button className='notificationInput' onClick={() => handleDecline(notification.exchangeId)}>Decline</button>
            <button className='notificationInput' onClick={() => handleViewUserInfo(notification.senderId)}>View User Info</button>
          </div>
        ))
      )}
      {userInfo && (
        <div className='UserInfo'>
          {/* UserInfo */}
          <h2 className='HeadingUserDetails'>User Information</h2>
          <div className='infoSenderSection'>
              <img className="senderPhoto" src={userInfo.picture ? `data:image/png;base64,${userInfo.picture}` : IMAGE} alt="Profile" />
              <div>
                <p className='DetailsInfoUsers'>Name: {`${userInfo.firstName} ${userInfo.lastName}`}</p>
                <p className='DetailsInfoUsers'>Username: {userInfo.username}</p>
              </div>
          </div>

          <hr className='lineToBlack'/>

          {/* Skill info */}
          <h3 className='HeadingUserDetails'> His available Skills</h3>
          {userSkills.length > 0 ? (
            <div className=''>
              {userSkills.map(skill => (
                <div key={skill.skillId} className='SkillBox'>
                  <h4>{skill.skillName}</h4>
                  <p className='DetailsInfoUsers'><strong>Description:</strong> {skill.skillDescription}</p>
                  <p className='DetailsInfoUsers'><strong>Experience:</strong> {skill.yearsOfExperience} years</p>
                  <p className='DetailsInfoUsers'><strong>Level:</strong> {skill.skillLevel}</p>
                  <p className='DetailsInfoUsers'><strong>Type:</strong> {skill.skillType}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className='noAvailable'>No skills available.</p>
          )}

          <hr className='lineToBlack'/>
          <h3 className='HeadingUserDetails'>Feedback</h3>
          {userFeedbacks.length > 0 ? (
            <div className='FeedbackContainer'>
              {userFeedbacks.map(feedback => (
                <div key={feedback.id} className='FeedbackBox'>
                  <p>{feedback.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className='noAvailable2'>No feedback available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationMessages;
