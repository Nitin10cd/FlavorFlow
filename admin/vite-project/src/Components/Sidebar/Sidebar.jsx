import './Sidebar.css';
import addicon from '../../assets/admin_assets/add_icon.png';
import ordericon from '../../assets/admin_assets/order_icon.png'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to= '/add' className="sidebar-option">
            <img src= {addicon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src= {ordericon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src= {ordericon} alt="" />
            <p>Orders</p>
        </NavLink>
        <NavLink to='addfitnessplan' className='sidebar-option'>
          <img src= {addicon} alt="" />
          <p>Add FitnessPlan</p>
        </NavLink>
        <NavLink to='addmeal' className='sidebar-option'>
          <img src= {addicon} alt="" />
          <p>Add Monthly Plan</p>
        </NavLink>
        <NavLink to='/adminFitnessplan' className= 'sidebar-option'>
        <img src= {addicon} alt="" />
        <p>view Fitnessplan</p>
        </NavLink>
        <NavLink to='/Adminmonthlyplanpage' className= 'sidebar-option'>
        <img src= {addicon} alt="" />
        <p>view monthlyPlans</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
