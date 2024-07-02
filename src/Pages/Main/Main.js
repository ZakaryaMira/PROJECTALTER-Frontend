import React, { useState, useEffect } from 'react';
import './Main.css';
import { HeaderMain, SearchBar } from '../../Section/index';
import { Container, Listinings, PopOutComponent, UserDetails } from '../../components';
import Topics from '../Topics/Topics';
import axios from 'axios';

const Main = () => {
  // state variables for each activity in the main component:
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpContent, setPopUpContent] = useState('');
  const [activeListingType, setActiveListingType] = useState('exchange');
  const [exchangeListings, setExchangeListings] = useState([]);
  const [offerListings, setOfferListings] = useState([]);
  const [currentSkillId, setCurrentSkillId] = useState(null);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedSkillType, setSelectedSkillType] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card
  
  /* 01 use effect for Exchange listining */

  useEffect(() => {
    const fetchExchangeListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5105/api/skill/getSkills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // data transformation from fetch , updating state , ... to not modify the original listining
        setExchangeListings(response.data.map(listing => ({ ...listing, type: 'exchange' })));
      } catch (error) {
        console.error('Error fetching exchange listings:', error);
      }
    };

    if (activeListingType === 'exchange') {
      fetchExchangeListings();
    }
//  code will refetch exchange listings whenever the activeListingType state value changes.
  }, [activeListingType]);


   /* 02  use effect for request listining */

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5105/api/Request/getRequests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOfferListings(response.data.map(listing => ({ ...listing, type: 'offers' })));
      } catch (error) {
        console.error('Error fetching offer listings:', error);
      }
    };

    if (activeListingType === 'offers') {
      fetchOfferListings();
    }
  }, [activeListingType]);




  /* 03: fetching the endpoints of skill exchange and offers filtered by selectedSkillType */
  useEffect(() => {
    if (selectedSkillType) {
      const fetchListingsByType = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log('Fetching listings by type:', selectedSkillType);

          const endpoint = activeListingType === 'exchange'
            ? 'http://localhost:5105/api/Skill/getSkills1' // endpoint of fetching skills based on skill type
            : 'http://localhost:5105/api/Request/getRequestsBySkillType';

          const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            params: {
              skillType: selectedSkillType
            }
          });

          console.log('Listings by Type Response:', response.data);

          if (activeListingType === 'exchange') {
            setExchangeListings(response.data.map(listing => ({ ...listing, type: 'exchange' })));
          } else {
            setOfferListings(response.data.map(listing => ({ ...listing, type: 'offers' })));
          }
        } catch (error) {
          if (error.response) {
            console.error('Error Response:', {
              data: error.response.data,
              status: error.response.status,
              headers: error.response.headers,
            });
          } else if (error.request) {
            console.error('Error Request:', error.request);
          } else {
            console.error('Error Message:', error.message);
          }
          console.error('Error Config:', error.config);
        }
      };

      fetchListingsByType();
    }
  }, [selectedSkillType, activeListingType]);

  /* 04 Search listings based type:*/

  const handleSearch = async (searchTerm) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = activeListingType === 'exchange'
        ? 'http://localhost:5105/api/Skill/SearchSkillByName'
        : 'http://localhost:5105/api/Request/searchRequest';

      const params = activeListingType === 'exchange'
        ? { skillName: searchTerm }
        : { search: searchTerm };

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params
      });

      if (activeListingType === 'exchange') {
        setExchangeListings(response.data.map(listing => ({ ...listing, type: 'exchange' })));
      } else {
        setOfferListings(response.data.map(listing => ({ ...listing, type: 'offers' })));
      }
    } catch (error) {
      console.error('Error searching listings:', error);
    }
  };

  /* 05 when you click on details, its shows details of a specific listing in a pop-up: */ 
  const handleDetailsClick = (listing) => {
    setCurrentSkillId(listing.skillId);
    setCurrentRequestId(listing.requestId);
    setSelectedListing(listing);
    setIsPopUpVisible(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
    setPopUpContent('');
  };

// Change the type of listings displayed:
  const handleListingTypeChange = (type) => {
    setActiveListingType(type);
    setSelectedSkillType(null); // Reset selected skill type when listing type changes 
    setSelectedCard(null); // Reset selected card when listing type changes
  };
// Select a skill type to filter listings:
  const handleSkillTypeSelect = (skillType) => {
    setSelectedSkillType(skillType);
    setSelectedCard(skillType); // Set selected card
  };

// determines what is tha listings to display based on the current value of activeListingType.
  const listings = activeListingType === 'exchange' ? exchangeListings : offerListings;

  return (
    <>
      <HeaderMain />
      {/* passing props to these component  propname = {propvalue} */}
      <SearchBar onSearch={handleSearch} onListingTypeChange={handleListingTypeChange} activeListingType={activeListingType} />
      <Topics onSkillTypeSelect={handleSkillTypeSelect} activeListingType={activeListingType} />
      <Container>
        {listings.map((listing, index) => (
          <Listinings
            key={index}
            listing={listing}
            type={activeListingType}
            onDetailsClick={handleDetailsClick}
            isSelected={selectedCard === listing.skillType} // Pass isSelected prop
          />
        ))}
      </Container>
      {isPopUpVisible && (
        <PopOutComponent onClose={handleClosePopUp}>
          <UserDetails skillId={currentSkillId} requestId={currentRequestId} listing={selectedListing} onClose={handleClosePopUp} />
        </PopOutComponent>
      )}
    </>
  );
};

export default Main;
