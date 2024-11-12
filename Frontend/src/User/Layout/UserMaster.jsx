import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserFooter from './UserFooter';
export default function UserMaster({ isActive, setIsActive }) {
  // const [isActive, setIsActive] = useState(false)
  return (
    <>
   <div className="">
       
        <UserHeader isActive={isActive} setIsActive={setIsActive} />
        <div>
          <UserSidebar isActive={isActive} setIsActive={setIsActive} />
          
          <Outlet isActive={isActive} setIsActive={setIsActive} />
        </div>
        <UserFooter isActive={isActive} setIsActive={setIsActive} />
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      </div>
    </>
  )
}
