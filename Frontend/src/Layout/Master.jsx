import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Master() {
  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
      {/* <!-- Back to Top --> */}
      <a href="/" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>

   </>
  )
}
