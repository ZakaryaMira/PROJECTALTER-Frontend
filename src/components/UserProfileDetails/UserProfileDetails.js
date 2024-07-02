import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfileDetails.css';

const UserProfileDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const userResponse = await axios.get(`http://localhost:5105/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);

        const skillsResponse = await axios.get(`http://localhost:5105/api/User/getSkills/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSkills(skillsResponse.data);

        const requestsResponse = await axios.get(`http://localhost:5105/api/User/getRequests/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(requestsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-details">
      <div className="user-info">
        <img className="profile-image" src={user.picture ? `data:image/png;base64,${user.picture}` : 'default-image-url'} alt="Profile"/>
        <h2>{user.username}</h2>
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </div>
      <div className="user-skills">
        <h3>Skills</h3>
        {skills.length > 0 ? (
          skills.map(skill => (
            <div key={skill.skillId}>
              <h4>{skill.skillName}</h4>
              <p>{skill.skillDescription}</p>
            </div>
          ))
        ) : (
          <p>No skills found</p>
        )}
      </div>
      <div className="user-requests">
        <h3>Requests</h3>
        {requests.length > 0 ? (
          requests.map(request => (
            <div key={request.requestId}>
              <h4>{request.requestTitle}</h4>
              <p>{request.requestDescription}</p>
            </div>
          ))
        ) : (
          <p>No requests found</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileDetails;
