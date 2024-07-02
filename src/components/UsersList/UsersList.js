import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersList.css';
import IMAGE from '../../SVG/undraw_pic_profile_re_7g2h.svg';

const UsersList = ({ users }) => {
  const navigate = useNavigate();

  const handleShowUserDetails = (userId) => {
    navigate('/ProfileUsers', { state: { userId } });
  };

  return (
    <div className='UsersList'>
      {users.map((user) => (
        <div key={user.userId} className='userss'>
          <h1 className='usernameUser'>{user.username}</h1>
          <h2 className='firstNameALastName'>{user.firstName} {user.lastName}</h2>
          <img 
            className="profileImageUsersPage" 
            src={user.picture ? `data:image/png;base64,${user.picture}` : IMAGE} 
            alt="Profile" 
          />
          <button 
            className='buttonShowUserDetails' 
            onClick={() => handleShowUserDetails(user.userId)}
          >
            Show User Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;

