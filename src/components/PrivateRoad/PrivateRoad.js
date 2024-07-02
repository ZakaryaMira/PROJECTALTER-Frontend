import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return <Navigate to="/Signup" replace />; // Immediate redirection on missing token
    }
    setIsLoading(false); // Set loading to false after checking token
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Outlet /> // Render children component
  );
};

export default PrivateRoute;
