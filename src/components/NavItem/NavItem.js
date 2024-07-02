import './NavItem.css'

const NavItem = (props) => {
  return (
    <a className='nav-link'>
        {props.children}
    </a>
  )
}


const NavItemDropDown = (props) => {
    return (
      <a className='dropdown-item'>
          {props.children}
      </a>
    )
  }

export default NavItem
export {NavItemDropDown}