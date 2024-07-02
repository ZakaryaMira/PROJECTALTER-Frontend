import './HeaderMain.css';
import { NavLink } from 'react-router-dom';
import NavItem from '../../components/NavItem/NavItem';
import { useState } from 'react';
import { PopOutMenu } from '../../components';

const HeaderMain = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const handleCreateClick = (e) => {
    e.preventDefault();
    setIsPopUpVisible(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-white container">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Main">ALTER</a>

        <div className="collapse navbar-collapse justify-content-around" id="navbarNavAltMarkup">
          <div className="navbar-nav">

            <NavItem>
              <NavLink to="/Profile" className="nav-link about" aria-current="page">Profile</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/" className="nav-link" onClick={handleCreateClick}>Create</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/Notification" className="nav-link">Notifications</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/Messages" className="nav-link">Messages</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/Users" className="nav-link">Users</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/" className="nav-link" onClick={handleLogout}>Logout</NavLink>
            </NavItem>

          </div>
        </div>
      </div>
      {isPopUpVisible && <PopOutMenu onclose={handleClosePopUp} />}
    </nav>
  );
};

export default HeaderMain;
