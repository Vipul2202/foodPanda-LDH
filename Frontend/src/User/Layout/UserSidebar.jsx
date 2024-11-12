import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserSidebar({ setIsActive, isActive }) {
    // const [isActive, setIsActive]= useState(false)
  return (
    <div>
          {/* <!-- ======= Sidebar ======= --> */}

  <aside id="sidebar" className={`adminsidebar usersidebarWraper  ${isActive === true && 'active'}` }>

<ul className="adminsidebar-nav usersidebar-nav" id="sidebar-nav">

  <li className="nav-item">
    <Link className="nav-link " to="/admin">
      <i className="bi bi-grid"></i>
      <span>Dashboard</span>
    </Link>
  </li>
  {/* <!-- End Dashboard Nav --> */}

  {/* <!-- End Icons Nav --> */}

  <li className="nav-item">
    <Link className="nav-link collapsed" to="/user/my-order">
    <i class="fa-solid fa-bag-shopping"></i>
      <span>My Order</span>
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link collapsed" to="/cart">
    <i class="fa-solid fa-cart-arrow-down"></i>
      <span>My Cart</span>
    </Link>
  </li>

  {/* <!-- End Profile Page Nav --> */}

  <li className="nav-item">
    <Link className="nav-link collapsed" to="/user/profile">
    <i class="fa-solid fa-gears"></i>
      <span>Profile Setting</span>
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link collapsed" to="/contact">
    <i class="fa-solid fa-gears"></i>
      <span>Help</span>
    </Link>
  </li>
  {/* <!-- End Profile Page Nav --> */}





  


</ul>

</aside>

{/* <!-- End Sidebar--> */}
    </div>
  )
}
