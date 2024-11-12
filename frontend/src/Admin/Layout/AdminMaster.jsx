import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import AdminFooter from './AdminFooter'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
export default function AdminMaster({ isActive, setIsActive }) {
  // const [isActive, setIsActive] = useState(false)
  return (
    <>
   <div className="">
       
        <AdminHeader isActive={isActive} setIsActive={setIsActive} />
        <div>
          <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
          
          <Outlet isActive={isActive} setIsActive={setIsActive} />
        </div>
        <AdminFooter isActive={isActive} setIsActive={setIsActive} />
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      </div>
    </>
  )
}
