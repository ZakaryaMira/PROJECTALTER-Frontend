import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { HeaderMain, SearchBarUsers } from '../../Section';
import { Container, UsersList } from '../../components';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5105/api/User/getAllUser')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSearch = useCallback(() => {
    axios.get('http://localhost:5105/api/User/searchUser', { params: { query: searchTerm } })
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error searching users:', error);
      });
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm, handleSearch]);

  return (
    <>
      <HeaderMain />
      <SearchBarUsers setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      <Container>
        <UsersList users={users} />
      </Container>
    </>
  );
};

export default Users;
