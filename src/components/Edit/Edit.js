import React from 'react';
import './Edit.css';

const Edit = ({ onCertificationClick }) => {
  return (
    <div className='userBtns'>
      <button className='font-outline greenBtn EditProfile'>Edit Profile</button>
      <button className='font-outline greenBtn' onClick={onCertificationClick}>User Certification</button>
    </div>
  );
};

export default Edit;
