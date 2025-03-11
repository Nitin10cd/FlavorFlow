import "./index.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Admin = () => {
  return (
    <div>
      <ToastContainer/>
      <hr />
      <div className="app-content">
        <Sidebar/>
      </div>
    </div>
  )
}

export default Admin
