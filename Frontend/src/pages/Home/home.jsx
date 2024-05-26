import React, { useState } from 'react'
import './Home.css'
import Heder from '../../components/Navbar/Header/Heder'
import ExploreMenu from '../../components/Navbar/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownload from '../../components/AppDownload/Appdownload'
const home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
    <Heder/>
    <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodDisplay category={category}/>
    <Appdownload/>
    </div>
  )
}

export default home
