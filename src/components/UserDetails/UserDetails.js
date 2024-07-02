import React, { useState } from 'react';
import { Details, UserSkillInfo } from '..';
import './UserDetails.css';
import Informations from '../Informations/Informations';

const UserDetails = ({ skillId, listing, requestId }) => {
  const [currentDetail, setCurrentDetail] = useState('skillDetails');

  const handleButtonClick = (detailType) => {
    setCurrentDetail(detailType);
  };

  console.log('UserDetails skillId:', skillId); // Add log to check if skillId is passed correctly
  console.log('UserDetails REQUESTid:', requestId); // Add log to check if skillId is passed correctly

  return (
    <div className="user-details-content">
      <UserSkillInfo skillId={skillId} type={listing.type} requestId={requestId} />
      <div className="userInfrmations">
        <Informations 
          onButtonClick={handleButtonClick} 
          currentDetail={currentDetail} 
          type={listing.type} // Pass listing type to Informations
        />
        <Details 
          currentDetail={currentDetail} 
          listing={listing} 
          type={listing.type} // Pass listing type to Details
        />
      </div>
    </div>
  );
};

export default UserDetails;
