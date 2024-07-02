import { useContext } from 'react';
import { authContext } from '../../Context/AuthContext'; // Import your AuthContext
import Profile from './Profile';

const AuthorizedProfile = () => {
  const { token, handleError } = useContext(authContext); // Include handleError prop

  return <Profile token={token} handleError={handleError} />; // Pass token and handleError prop
};

export default AuthorizedProfile;
