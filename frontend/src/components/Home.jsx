import React from 'react'
import Navbar from '../sharedComp/Navbar'
import Dashboard from '../sharedComp/Dashboard'
import Products from '../sharedComp/Products'

const Home = () => {
  
  return (
    <div>
        <Navbar />
        {/* <Dashboard /> */}
        <Products />
    </div>
  )
}

export default Home