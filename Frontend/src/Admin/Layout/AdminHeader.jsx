import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ApiServices from '../../ApiServices/ApiServices'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment';
export default function AdminHeader({ setIsActive, isActive }) {
    const [message, setMessage]= useState([])
    const [loading, setLoading]= useState(true)
    const navigate=useNavigate()
  const logout=()=>{
      
      sessionStorage.clear()
      setTimeout(()=>{
         
          navigate("/login")
      },500)
  }

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ApiServices.latestContact();
      
        setMessage(response.data.data);
      
    } catch (error) {
     toast.error(error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
         {/* <!-- ======= Header ======= --> */}
  <header id="header" className="adminheader fixed-top d-flex align-items-center">

<div className="d-flex align-items-center justify-content-between">
  <a href="index.html" className="adminlogo d-flex align-items-center">
    {/* <img src="/assets/img/logo.png" alt=""/> */}
    <span className="d-none d-lg-block">Backers</span>
  </a>
  <i className="bi bi-list toggle-sidebar-btn" onClick={()=> setIsActive(!isActive)}></i>
</div>
{/* <!-- End Logo --> */}

<div className="search-bar">
  <form className="search-form d-flex align-items-center" method="POST" action="#">
    <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
  </form>
</div>
{/* <!-- End Search Bar --> */}

<nav className="adminheader-nav ms-auto">
  <ul className="d-flex align-items-center">

    <li className="nav-item d-block d-lg-none">
      <a className="nav-link nav-icon search-bar-toggle " href="#">
        <i className="bi bi-search"></i>
      </a>
    </li>
    {/* <!-- End Search Icon--> */}

    <li className="nav-item dropdown">

      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-primary badge-number">4</span>
      </a>
      {/* <!-- End Notification Icon --> */}

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications dropdown-notification">
        <li className="dropdown-header d-flex ">
          You have 4 new notifications
          <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr className="dropdown-divider"/>
        </li>

        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>30 min. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider"/>
        </li>

        <li className="notification-item">
          <i className="bi bi-x-circle text-danger"></i>
          <div>
            <h4>Atque rerum nesciunt</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>1 hr. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider"/>
        </li>

        <li className="notification-item">
          <i className="bi bi-check-circle text-success"></i>
          <div>
            <h4>Sit rerum fuga</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>2 hrs. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider"/>
        </li>

        <li className="notification-item">
          <i className="bi bi-info-circle text-primary"></i>
          <div>
            <h4>Dicta reprehenderit</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>4 hrs. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li className="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>

      </ul>
      {/* <!-- End Notification Dropdown Items --> */}

    </li>
    {/* <!-- End Notification Nav --> */}

    <li className="nav-item dropdown">

      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-chat-left-text"></i>
        <span className="badge bg-success badge-number">{message ? message.length : 0}</span>
      </a>
      {/* <!-- End Messages Icon --> */}

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages dropdown-messages">
        <li className="dropdown-header d-flex">
          You have {message ? message.length : 0} new messages
          <Link to="/admin/manage-contact"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
        </li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
{
  message.map((data,index)=>(
    <li className="message-item">
    <a href="#">
      <img src="/assets/img/messages-1.jpg" alt="" className="rounded-circle"/>
      <div>
        <h4>{data.name}</h4>
        <p>{data.message}</p>
        <p>{moment(data.created_at).fromNow()}</p>
      </div>
    </a>
  </li>
  ))
}
       
        <li>
          <hr className="dropdown-divider"/>
        </li>


        <li className="dropdown-footer">
          <Link to="/admin/manage-contact">Show all messages</Link>
        </li>

      </ul>
      {/* <!-- End Messages Dropdown Items --> */}

    </li>
    {/* <!-- End Messages Nav --> */}

    <li className="nav-item dropdown pe-3">

      <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
        <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
        <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
      </a>
      {/* <!-- End Profile Iamge Icon --> */}

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header text-start">
          <h6>Admin</h6>
          <span>Spice enlight</span>
        </li>
        <li>
          <hr className="dropdown-divider"/>
        </li>

       
        
        <li>
          <hr className="dropdown-divider"/>
        </li>

        <li onClick={logout}>
          <a className="dropdown-item d-flex align-items-center" href="/">
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>

      </ul>
      {/* <!-- End Profile Dropdown Items --> */}
    </li>
    {/* <!-- End Profile Nav --> */}

  </ul>
</nav>
{/* <!-- End Icons Navigation --> */}

</header>
{/* <!-- End Header --> */}
<ToastContainer/>
    </div>
  )
}
