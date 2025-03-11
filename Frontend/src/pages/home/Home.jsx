import Header from "../../Components/Header/Header"
import Exploremenu from "../../Components/Exploremenu/Exploremenu"
import { useState } from "react"
import Fooddisplay from "../../Components/Fooddisplay/Fooddisplay"
import Appdownload from "../../Components/Appdownload/Appdownload"
import Planpage from "../../Components/PlansPage/Planpage"

const Home = () => {
  const [category, setcategory] = useState("All")
  return (
    <div>
      <Header/>
      <Exploremenu category ={category} setcategory={setcategory}/>
      <Fooddisplay category = {category}/>
       <br /><br /><br />
      <Planpage/>
      <Appdownload/>
    </div>
  )
}

export default Home
