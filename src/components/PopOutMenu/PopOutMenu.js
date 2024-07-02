import './PopOutMenu.css'
import { NavLink } from 'react-router-dom'


const PopOutMenu = ({onclose}) => {
  return (
    <div className="popout-menu">
      <div className="popout-menu-content">
      <button onClick={onclose} className="close-btn">&times;</button>
        <h1 className='miomio-haha'>Create</h1>
        <div className='noBULLETS' >
          <button className='Creates'><NavLink to="/CreateExchangePage" className="nav-link ExchangeLink">Create Exchange Skill</NavLink></button>
          <button className='Creates'><NavLink to="/CreateRequestPage" className="nav-link">Create Request</NavLink></button>
          <button className='Creates'><NavLink to="/Wishlist" className="nav-link">Create Wishlist</NavLink></button>
        </div>
      </div>
    </div>
  )
}
export default PopOutMenu