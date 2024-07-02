import React from 'react';
import './AllUserInfromation.css';

const AllUserInfromation = ({ setSelectedSection }) => {
  return (
    <div className='informations'>
      <h1 className='EditProfiless'>Edit Profile</h1>
      <button className='info-button' onClick={() => setSelectedSection('Basic Information')}>Basic Information</button>
      <button className='info-button' onClick={() => setSelectedSection('Password')}>Password</button>
      <button className='info-button' onClick={() => setSelectedSection('My Skills')}>My Skills</button>
      <button className='info-button' onClick={() => setSelectedSection('My Requests')}>My Requests</button>
    </div>
  );
};

export default AllUserInfromation;
