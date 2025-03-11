// import React from 'react'
import { menu_list } from "../../../public/importantsvg/frontend_assets/assets"
import './exploremenu.css';

const Exploremenu = ({category , setcategory}) => {

  return (
    <div id="explore" className="explore-menu">
    <h1>Explore Our Menu </h1>
    <p className="explore-menu-text">Menu aisa ke har dish line maar Ek bite le lo, deewane ho jaoge Zayka itna bechain, plates bhi cheekh rahi—Aa jao, mujhe explore karo!</p>
    <div className="explore-menu-list">
        {
            menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className= {category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })
        }
    </div>
    <hr />
    </div> 
  
  )
}

export default Exploremenu
