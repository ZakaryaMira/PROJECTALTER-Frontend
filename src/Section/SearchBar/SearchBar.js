import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onListingTypeChange, activeListingType }) => {
  const [input, setInput] = useState('');
/* Updates the input state when the user types in the search input field. */
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <div className=''>
      <form className='searchBar' onSubmit={handleSubmit}>
        <input  className='searchBarInput'  placeholder='Search for a skill you are interested in'  value={input}  onChange={handleChange}/>
        <div className='btns'>
          <div className='Serach'>
            <button  type='submit'  className='button'>Search</button>
          </div>
          <div className='exchangeOffer'>

            <button
              type='button'
              className={`ExchangeButton button ${activeListingType === 'exchange' ? 'active' : ''}`}
              onClick={() => onListingTypeChange('exchange')}
            >Exchange</button>
            
            <button
              type='button'
              className={`OffersButton button ${activeListingType === 'offers' ? 'active' : ''}`}
              onClick={() => onListingTypeChange('offers')}
            >Requests</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
