import React, { useState, useEffect } from 'react';
import './SearchBarUsers.css';

const SearchBarUsers = ({ setSearchTerm, handleSearch }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(input);
      handleSearch();
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [input, setSearchTerm, handleSearch]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
    handleSearch();
  };

  return (
    <div className=''>
      <form className='searchBar' onSubmit={handleSubmit}>
        <input 
          className='searchBarInput' 
          placeholder='Search for users you are interested in' 
          value={input}
          onChange={handleChange}
        />
        <div className='btns'>
          <button type='submit' className="SearchUsers">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarUsers;
