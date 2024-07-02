import {NavLink } from 'react-router-dom'
import './Header.css'
import NavItem , {NavItemDropDown} from '../../components/NavItem/NavItem'
const Header = () => {
  return (
<nav className="navbar navbar-expand-lg container">
  <div className="container-fluid collapse navbar-collapse justify-content-around">
    <a className="navbar-brand" href="#">ALTER</a>
    
    <div className="" id="navbarNavAltMarkup">
      <div className="navbar-nav">

      <NavItem>
        <NavLink to="/Topics" className="nav-link about" aria-current="page" >About</NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/Signin" className="nav-link" >Sign Up</NavLink>
      </NavItem> 

      <NavItem className="hover-effect">
              <NavLink to="/Signup" className="nav-link button-main hover-effect">Sign in</NavLink>
      </NavItem>
      </div>
    </div>
  </div>
</nav>

  )
}

export default Header