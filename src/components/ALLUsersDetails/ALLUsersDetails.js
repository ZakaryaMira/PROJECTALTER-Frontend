import React, { useState } from 'react';
import axios from 'axios';
import './ALLUsersDetails.css';

const ALLUsersDetails = ({ selectedSection, userData, userSkills, userRequests, setUserData, setUserSkills, setUserRequests }) => {
  const [editSkill, setEditSkill] = useState(null);
  const [editRequest, setEditRequest] = useState(null);
  const [basicInfo, setBasicInfo] = useState({ ...userData });
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (event, endpoint, data, updateState) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Form submit triggered for endpoint:', endpoint);
    console.log('Data being submitted:', data);
    try {
      const response = await axios.patch(endpoint, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response from server:', response.data);
      updateState(response.data); // Update the local state with the response data
      showSuccessMessage('Changes saved successfully');
    } catch (error) {
      console.error('Error updating data', error.response ? error.response.data : error.message);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'Basic Information':
        return (
          <div className="container">
            <h2>Basic Information</h2>
            {basicInfo && (
              <form onSubmit={(e) => handleFormSubmit(e, 'http://localhost:5105/api/User/updateUser', basicInfo, setUserData)}>
                <label>First Name:
                  <input 
                    type="text" 
                    value={basicInfo.firstName} 
                    onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
                  />
                </label>
                <label>Last Name:
                  <input 
                    type="text" 
                    value={basicInfo.lastName} 
                    onChange={(e) => setBasicInfo({ ...basicInfo, lastName: e.target.value })}
                  />
                </label>
                <label>Username:
                  <input 
                    type="text" 
                    value={basicInfo.username} 
                    onChange={(e) => setBasicInfo({ ...basicInfo, username: e.target.value })}
                  />
                </label>
                <button type="submit">Save Changes</button>
              </form>
            )}
          </div>
        );
      case 'Password':
        return (
          <div className="container">
            <h2>Password</h2>
            <form>
              <label>New Password:
                <input type="password" />
              </label>
              <label>Confirm Password:
                <input type="password" />
              </label>
              <button type="submit">Change Password</button>
            </form>
          </div>
        );
      case 'My Skills':
        return (
          <div className="container">
            <h2>My Skills</h2>
            {userSkills.map(skill => (
              <div key={skill.skillId} className="skill">
                <h3>{skill.skillName}</h3>
                <p>{skill.skillDescription}</p>
                <button onClick={() => setEditSkill(skill)}>Edit Skill</button>
                {editSkill && editSkill.skillId === skill.skillId && (
                  <form className="edit-form" onSubmit={(e) => handleFormSubmit(e, `http://localhost:5105/api/Skill/UpdateSkill/${skill.skillId}`, editSkill, (updatedSkill) => {
                    setUserSkills(userSkills.map(s => s.skillId === updatedSkill.skillId ? updatedSkill : s));
                    setEditSkill(null); // Close the edit form
                    showSuccessMessage('Skill updated successfully');
                  })}>
                    <label>Skill Name:
                      <input 
                        type="text" 
                        value={editSkill.skillName} 
                        onChange={(e) => setEditSkill({ ...editSkill, skillName: e.target.value })} 
                      />
                    </label>
                    <label>Skill Description:
                      <input 
                        type="text" 
                        value={editSkill.skillDescription} 
                        onChange={(e) => setEditSkill({ ...editSkill, skillDescription: e.target.value })} 
                      />
                    </label>
                    <label>Years of Experience:
                      <input 
                        type="number" 
                        value={editSkill.yearsOfExperience} 
                        onChange={(e) => setEditSkill({ ...editSkill, yearsOfExperience: parseInt(e.target.value, 10) })} 
                      />
                    </label>
                    <label>Skill Level:
                      <input 
                        type="text" 
                        value={editSkill.skillLevel} 
                        onChange={(e) => setEditSkill({ ...editSkill, skillLevel: e.target.value })} 
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </form>
                )}
              </div>
            ))}
          </div>
        );
      case 'My Requests':
        return (
          <div className="container">
            <h2>My Requests</h2>
            {userRequests.map(request => (
              <div key={request.requestId} className="request">
                <h3>{request.requestTitle}</h3>
                <p>{request.requestDescription}</p>
                <button onClick={() => setEditRequest(request)}>Edit Request</button>
                {editRequest && editRequest.requestId === request.requestId && (
                  <form className="edit-form" onSubmit={(e) => handleFormSubmit(e, `http://localhost:5105/api/Request/updateRequest/${request.requestId}`, editRequest, (updatedRequest) => {
                    setUserRequests(userRequests.map(r => r.requestId === updatedRequest.requestId ? updatedRequest : r));
                    setEditRequest(null); // Close the edit form
                    showSuccessMessage('Request updated successfully');
                  })}>
                    <label>Request Title:
                      <input 
                        type="text" 
                        value={editRequest.requestTitle} 
                        onChange={(e) => setEditRequest({ ...editRequest, requestTitle: e.target.value })} 
                      />
                    </label>
                    <label>Request Description:
                      <input 
                        type="text" 
                        value={editRequest.requestDescription} 
                        onChange={(e) => setEditRequest({ ...editRequest, requestDescription: e.target.value })} 
                      />
                    </label>
                    {/* Add more fields as necessary */}
                    <button type="submit">Save Changes</button>
                  </form>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {successMessage && <div className="success-message2">{successMessage}</div>}
      {renderSection()}
    </div>
  );
};

export default ALLUsersDetails;
