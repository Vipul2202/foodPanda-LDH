import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ApiServices, { BASE_URL_IMG } from '../../ApiServices/ApiServices';
import { toast } from 'react-toastify';

export default function UserHeader({ setIsActive, isActive }) {
  const user_type = sessionStorage.getItem("user_type");
  const authenticate = sessionStorage.getItem("authenticate");
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [userDetail, setUserDetail] = useState();
    // const [isActive, setIsActive]= useState(false)
    const navigate=useNavigate()
  const logout=()=>{
      
      sessionStorage.clear()
      setTimeout(()=>{
         
          navigate("/login")
      },500)
  }

  useEffect(() => {
    setId(sessionStorage.getItem("_id"));
    let data = { userId: id };
    ApiServices.getsinglecustomer(data)
      .then(data => {
        if (data.data.success) {
          setUserDetail(data.data.data);
        } else {
          toast.error(data.data.msg);
        }
      })
      .catch(err => toast.error("Something went wrong"));
  }, [id]);
  return (
    <div>
         {/* <!-- ======= Header ======= --> */}
  <header id="header" className="adminheader fixed-top d-flex align-items-center userHeaderWraper">

<div className="d-flex align-items-center justify-content-between">
  <a href="index.html" className="adminlogo d-flex align-items-center">
    <img src="/assets/images/logo/logopng.png" alt=""/>
    <span className="d-none d-lg-block userlogo_name">bakers</span>
  </a>
  <i className="bi bi-list toggle-sidebar-btn userlogo_name" onClick={()=> setIsActive(!isActive)}></i>
</div>
{/* <!-- End Logo --> */}



<nav className="adminheader-nav ms-auto">
  <ul className="d-flex align-items-center">

    <li className="nav-item d-block d-lg-none">
      <a className="nav-link nav-icon search-bar-toggle " href="#">
        <i className="bi bi-search "></i>
      </a>
    </li>
    {/* <!-- End Search Icon--> */}

    <li className="nav-item dropdown">

      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell userlogo_name"></i>
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

    

    <li className="nav-item dropdown pe-3">

      {/* <a className="nav-link nav-profile d-flex align-items-center pe-0" >
        <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
        <Link to="/"><i class="fa-solid fa-right-from-bracket mx-2 fs-3 outbuton userlogo_name"></i></Link>
      </a> */}
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0 rounded-full overflow-hidden h-9 w-9"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={BASE_URL_IMG + userDetail?.Image}
                  alt="Profile"
                  className=" user-Herder-profile w-full "
                />
                <span className="d-none d-md-block dropdown-toggle float-end ps-2"></span>
              </a>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul className="dropdown-menu  dropdown-menu-end dropdown-menu-arrow profile" >
                <li className="dropdown-header text-start">
                  <h6>{userDetail?.name}</h6>

                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/user"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/user"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/user"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li onClick={logout}>
                  <a
                    className="dropdown-item d-flex align-items-center"

                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
      {/* <!-- End Profile Iamge Icon --> */}


    </li>
    {/* <!-- End Profile Nav --> */}

  </ul>
</nav>
{/* <!-- End Icons Navigation --> */}

</header>
{/* <!-- End Header --> */}
    </div>
  )
}
