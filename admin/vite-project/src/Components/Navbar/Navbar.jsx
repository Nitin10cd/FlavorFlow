import './Navbar.css'
import logo from '../../assets/admin_assets/logo.png';
import profile from '../../assets/admin_assets/profile_image.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src= {logo} alt="" className='logo' />
      <img src={profile} alt= "" className='profile' />
    </div>
  )
}

export default Navbar
