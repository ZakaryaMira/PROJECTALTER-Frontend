import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderMain } from '../../Section';
import { AllUserInfromation, ALLUsersDetails } from '../../components';

const EditInfromations = () => {
  const [userData, setUserData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [selectedSection, setSelectedSection] = useState('Basic Information');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5105/api/User/getUser', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    const fetchUserSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5105/api/skill/getSkill', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserSkills(response.data);
      } catch (error) {
        console.error('Error fetching user skills', error);
      }
    };

    const fetchUserRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5105/api/Request/getRequest', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserRequests(response.data);
      } catch (error) {
        console.error('Error fetching user requests', error);
      }
    };

    fetchUserData();
    fetchUserSkills();
    fetchUserRequests();
  }, []);

  return (
    <>
      <HeaderMain />
      <div className='userInfrmations'>
        <AllUserInfromation setSelectedSection={setSelectedSection} />
        <ALLUsersDetails 
          selectedSection={selectedSection}
          userData={userData}
          userSkills={userSkills}
          userRequests={userRequests}
        />
      </div>
    </>
  );
};

export default EditInfromations;
