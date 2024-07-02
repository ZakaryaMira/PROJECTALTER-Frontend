import React, { useState } from 'react';
import axios from 'axios';
import { Forms } from '../../components';
import { Forminput } from '../../components';
import './WishList.css';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistName, setWishlistName] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setWishlistName(e.target.value);
  };

  const handleAddItem = () => {
    if (wishlistName.trim() !== '') {
      setWishlistItems((prevItems) => [...prevItems, wishlistName]);
      setWishlistName('');
    }
  };

  const handleDeleteItem = (index) => {
    setWishlistItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5105/api/Wishlist/CreateWishlist', 
        { WishlistName: wishlistName }, // Ensure the payload matches the expected format
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token if required by the API
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log('Wishlist created:', response.data);
        navigate('/Main'); // Navigate to the Main page after successful wishlist creation
      } else {
        console.error('Failed to create wishlist:', response);
      }
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
  };

  return (
    <div className="centreTwo">
      <Forms heading="Create Wishlist" onSubmit={handleSubmit}>
        <p className="wishlistinfo">What programming skills are you interested in learning in the future?</p>
        <div className="form-row">
          <Forminput
            label="Wishlist Name"
            type="text"
            id="wishlistName"
            name="wishlistName"
            placeholder="Enter wishlist name"
            value={wishlistName}
            onChange={handleChange}
          />
          <button type="button" className='btn-additem' onClick={handleAddItem}>
            Add Item
          </button>
        </div>
        {wishlistItems.map((item, index) => (
          <div key={index} className="form-row newLink">
            <span className='yoyo'>{item}</span>
            <button type="button" className='btnDelete' onClick={() => handleDeleteItem(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="submit" className='btn-form-two'>Next Step</button>
      </Forms>
    </div>
  );
};

export default Wishlist;
