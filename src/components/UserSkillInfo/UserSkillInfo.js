import React, { useEffect, useState } from 'react';
import './UserSkillInfo.css';
import IMAGE from '../../SVG/undraw_pic_profile_re_7g2h.svg';
import axios from 'axios';

const UserSkillInfo = ({ skillId, type, requestId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        let response;

        if (type === 'exchange') {
          response = await axios.get(`http://localhost:5105/api/User/getUserBySkillId/${skillId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (type === 'offers') {
          response = await axios.get(`http://localhost:5105/api/Request/GetUserRequest/${requestId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        if (response.data) {
          setUser(response.data);
        } else {
          console.error('User data is empty');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (type === 'exchange' && skillId) {
      fetchUser();
    } else if (type === 'offers' && requestId) {
      fetchUser();
    }
  }, [skillId, requestId, type]);

  if (!user) {
    return <div>Loading...</div>;
  }
console.log(user);
  return (
    <div className='userSkill'>
      <div className='userImageSkill'>
      <img className="profileImageTwo" src={user.picture ? `data:image/png;base64,${user.picture}` : IMAGE} alt="Profile"/>
      </div>
      <div className='userInfo'>
        <div className='userInfoOne'>
          <h2 className='font-outline'>{user.username}</h2>
        </div>
        <div className='userDescription'>
          <p className='font-outline'>{`${user.firstName} ${user.lastName}`}</p>
        </div>
      </div>
    </div>
  );
};

export default UserSkillInfo;
