import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to set the token (e.g., after login)
  const setAuth = (newToken) => setToken(newToken);

  useEffect(() => {
    // Check for token in localStorage on component mount
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
