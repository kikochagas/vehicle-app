import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home'
import { VehicleModelList } from '../components/vehicleModel/VehicleModelList'
import { NavBar } from '../components/ui/NavBar'
import { VehicleList } from '../components/vehicle/VehicleList'

export const DashboardRoutes = () => {
  return (
    <>
       <NavBar />
       <div className='container'>
        <Routes>
              <Route path="home" element={<Home />} />
              <Route path="modellist" element={<VehicleModelList />} />
              <Route path="vehiclelist" element={<VehicleList />} />
              <Route path="/" element={<Home />} />
        </Routes>
       </div>
    </>
  )
}
