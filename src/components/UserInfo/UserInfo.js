import React, { useEffect, useState } from 'react';
import './UserInfo.css';
import IMAGE from '../../SVG/undraw_pic_profile_re_7g2h.svg';
import Edit from '../Edit/Edit';
import Feedback from '../Feedback/Feedback';
import CertificationUpload from '../CertificationUpload/CertificationUpload';
import axios from 'axios';

const UserInfo = ({ userId, showEdit = true, showFeedback = true }) => {
  const [user, setUser] = useState(null);
  const [isCertificationPopupVisible, setIsCertificationPopupVisible] = useState(false);

  const fetchUser = async () => {
    try {
      let response;
      if (userId) {
        // Fetch user data by userId
        response = await axios.get(`http://localhost:5105/api/User/GetUserById/${userId}`);
      } else {
        // Fetch current user data
        const token = localStorage.getItem('token');
        response = await axios.get('http://localhost:5105/api/User/getUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setUser(response.data);
      console.log('User fetched:', response.data); // Debug log
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleImageChange = async (e) => {
    // Add this condition
    if (userId) {
      console.log('Only the current user can change the profile picture.');
      return;
    }

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1]; // Remove the data:image/png;base64, part

        try {
          const token = localStorage.getItem('token');
          await axios.post('http://localhost:5105/api/User/AddPicture', JSON.stringify(base64Image), {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          // Update user picture locally
          setUser((prevUser) => ({
            ...prevUser,
            picture: base64Image
          }));
          console.log('Image uploaded and user updated:', base64Image); // Debug log
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificationClick = () => {
    setIsCertificationPopupVisible(true);
  };

  const handleCloseCertificationPopup = () => {
    setIsCertificationPopupVisible(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='user'>


      {/* 1 */}
      <div className='userImage' onClick={() => { if (!userId) document.getElementById('fileInput').click() }}>
        <img className="profileImage" src={user.picture ? `data:image/png;base64,${user.picture}` : IMAGE} alt="Profile" />
      </div>

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageChange}
      />
      {/* 2 */}
      <div className='userInfo'>
        <div className='userInfoOne'>
          <h2 className='font-outline'>{user.username}</h2>
        </div>
        <div className='userDescription'>
          <p className='font-outline'>{`${user.firstName} ${user.lastName}`}</p>
        </div>
        {!userId && showEdit && <Edit onCertificationClick={handleCertificationClick} />}
        {userId && showFeedback && <Feedback userId={userId} />}
      </div>

      {isCertificationPopupVisible && <CertificationUpload onClose={handleCloseCertificationPopup} />}
    </div>
  );
};

export default UserInfo;
