import './Navbar.css';
import logo from '../../../public/importantsvg/frontend_assets/logo.png';
import searchicon from '../../../public/importantsvg/frontend_assets/search_icon.png';
import basket from '../../../public/importantsvg/frontend_assets/basket_icon.png';
import { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../../Context/Storecontext';
import profile_icon from '../../../public/importantsvg/frontend_assets/profile_icon.png';
import bagIcon from '../../../public/importantsvg/frontend_assets/bag_icon.png';
import logoutIcon from '../../../public/importantsvg/frontend_assets/logout_icon.png';
import Registerhotel from '../../../../admin/vite-project/src/pages/RegisterHotel/Registerhotel';

const Navbar = ({ setislogin }) => {
  const [menu, setmenu] = useState("home");
  const { getTotalCartAmount, token, settoken } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    settoken(null);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <Link to='/'><h2 alt="Logo" className='logo'>FlavorFlow</h2></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <NavLink to= '/registerhotel'>Register Hotel</NavLink>
        <a href='#foot' onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
        <NavLink to='/admin'>Admin</NavLink>
      </ul>

      <div className="navbar-right">
        <img src={searchicon} alt="Search" />
        
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={basket} alt="Cart" /></Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setislogin(true)}>Sign-In</button>
        ) : (
          <div className='navbar-profile' ref={dropdownRef}>
            <img 
              src={profile_icon} 
              alt="Profile" 
              onClick={() => setShowDropdown(!showDropdown)} 
              className="profile-icon"
            />
            {showDropdown && (
              <ul className="navbar-profile-dropdown">
                <li>
                  <img src={bagIcon} alt="Orders" />
                  My Orders
                </li>
                <hr />
                <li onClick={handleLogout} className="logout">
                  <img src={logoutIcon} alt="Logout" />
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
