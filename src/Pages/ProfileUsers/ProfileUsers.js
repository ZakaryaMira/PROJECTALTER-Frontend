import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderMain, UserGallery } from '../../Section';
import { UserInfo } from '../../components';

const ProfileUsers = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const location = useLocation();
  const { userId } = location.state;

  return (
    <>
      <HeaderMain />
      <UserInfo userId={userId} showEdit={false} />
      <UserGallery userId={userId} />
    </>
  );
};

export default ProfileUsers;
