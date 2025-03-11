import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import './index.css'
import '../../admin/vite-project/src/index.css'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from "./Components/Footer/Footer";
import { useState } from "react"
import Loginpopup from "./Components/LoginPopup/Loginpopup"
import Singlepage from "./SinglePage/Singlepage"
import Admin from '../../admin/vite-project/src/App'
import Add from '../../admin/vite-project/src/pages/Add/Add'
import List from '../../admin/vite-project/src/pages/List/List'
import Orders from "../../admin/vite-project/src/pages/Orders/Orders"
import Fitness from "../../admin/vite-project/src/pages/AddFitnessPlan/Fitness"
import Meals from "../../admin/vite-project/src/pages/AddMeals/Meals"
import Registerhotel from '../../admin/vite-project/src/pages/RegisterHotel/Registerhotel';
import Adminfitness from "./Components/AdminFitnessPlans/Adminfitness"
import Dietcard from './Components/DietCard/Dietcard'
import Adminmeals from "./Components/AdminMeals/Adminmeals"
import Mealdietcard from "./Components/DietCard/Mealdietcard"
import Planpurchase from "./Components/PlanPurchase/Planpurchase"

const App = () => {
  const [islogin, setislogin] = useState(false);
  return (
    <>
    {islogin ? <Loginpopup setislogin = {setislogin}/>:<></>}
    <div className="app">
      <Navbar setislogin = {setislogin}/>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/cart" element = {<Cart/>} />
        <Route path="/order" element = {<Placeorder/>} />
        <Route path="/food/:id" element={ <Singlepage/>} />
        <Route path="/admin" element ={<Admin/>}/>
        <Route path="/add" element = {<Add/>}/>
        <Route path="/list" element = {<List/>}/>
        <Route path="/orders" element = {<Orders/>}/>
        <Route path="/admin/addfitnessplan" element = {<Fitness/>}/>
        <Route path="/admin/addmeal" element={<Meals/>}/> 
        <Route path="/registerHotel" element = {<Registerhotel/>}/>
        <Route path="/adminFitnessplan" element = {<Adminfitness/>}/>
        <Route path="/dietCard" element ={<Dietcard/>} />
        <Route path="/Adminmonthlyplanpage" element = {<Adminmeals/>}/>
        <Route path="/mealDiets" element = {<Mealdietcard/>}/>
        <Route path="/planpurchase" element= {<Planpurchase/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
