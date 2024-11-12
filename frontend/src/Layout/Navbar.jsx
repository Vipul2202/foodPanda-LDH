import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import Cart from '../Pages/Cart/Cart';
import logo from "../assets/img/logo.jpg"
import CartSidebar from '../Pages/CartSidebar/CartSidebar';
import { ZIndexUtils } from 'primereact/utils';
export default function Navbar() {
  const user_type = sessionStorage.getItem("user_type");
  const authenticate = sessionStorage.getItem("authenticate");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [userDetail, setUserDetail] = useState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const cart = { items: [] };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setId(sessionStorage.getItem("_id"));
    let data = { userId: id };
    apiServices.getsinglecustomer(data)
      .then(data => {
        if (data.data.success) {
          setUserDetail(data.data.data);
        } else {
          toast.error(data.data.msg);
        }
      })
      .catch(err => toast.error("Something went wrong"));
  }, [id]);

  const logout = () => {
    sessionStorage.clear();
    setTimeout(() => navigate("/login"), 500);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    setIsScrolling(position > 50);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      {authenticate && user_type === "2" ? (
        <>
          <div
            className={`MnlomainHeaderwrap1 ${
              isScrolling ? "headerScrolled" : ""
            }`}
          >
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top z-40 py-lg-0 px-lg-5" style={{zIndex:99}}>
              <a href="/" className="navbar-brand ms-4 ms-lg-0">
                <img
                  src="./assets/img/lgg.png"
                  alt="Logo"
                  style={{ width: "160px", height: "100px" }}
                />
              </a>
              <button
                className="navbar-toggler me-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto p-4 p-lg-0">
                  <Link to="/" className="nav-item nav-link active">
                    Home
                  </Link>
                  <Link to="/about" className="nav-item nav-link">
                    About
                  </Link>
                  <Link to="/service" className="nav-item nav-link">
                    Services
                  </Link>
                  <Link to="/products" className="nav-item nav-link">
                    Products
                  </Link>
                  <Link to="/Testmonial" className="nav-item nav-link">
                    Testimonial
                  </Link>
                  <Link to="/contact" className="nav-item nav-link">
                    Contact
                  </Link>
                </div>
                <div className="d-none d-lg-flex align-items-center gap-3">
                  <a
                    className="nav-link nav-profile d-flex align-items-center pe-0 rounded-full overflow-hidden h-9 w-9"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={
                        userDetail?.Image
                          ? BASE_URL_IMG + userDetail.Image
                          : logo
                      }
                      alt="Profile"
                      className=" user-Herder-profile w-full "
                    />
                    <span className="d-none d-md-block dropdown-toggle float-end ps-2"></span>
                  </a>
                  {/* <!-- End Profile Iamge Icon --> */}

                  <ul className="dropdown-menu  dropdown-menu-end dropdown-menu-arrow profile" style={{
                    right: "296px",
                    top: "87px"
}}>
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

                  {/* <Link
                    to="/wishlist"
                    className="btn-lg-square border border-light rounded-circle"
                  >
                    <i className="fa fa-heart text-primary"></i>
                  </Link> */}
                  <div className="btn-lg-square border border-light rounded-circle cursor-pointer">
                    <i
                      className="fa fa-shopping-cart text-primary "
                      onClick={openCart}
                    ></i>
                    <span className="count">{cart.items.length}</span>
                  </div>
                  <div className="ps-3">
                    <small className="text-primary mb-0">Call Us</small>
                    <p className="text-light fs-5 mb-0">+91 95689-81068</p>
                  </div>
                </div>
              </div>
            </nav>
            {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={closeCart} />}
          </div>
        </>
      ) : (
        <div
          className={`MnlomainHeaderwrap1 ${
            isScrolling ? "headerScrolled" : ""
          }`}
        >
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-lg-0 px-lg-5">
            <a href="/" className="navbar-brand ms-4 ms-lg-0">
              <img
                src="./assets/img/lgg.png"
                alt="Logo"
                style={{ width: "160px", height: "100px" }}
              />
            </a>
            <button
              className="navbar-toggler me-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto p-4 p-lg-0">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/about" className="nav-item nav-link">
                  About
                </Link>
                <Link to="/service" className="nav-item nav-link">
                  Services
                </Link>
                <Link to="/products" className="nav-item nav-link">
                  Products
                </Link>
                <Link to="/Testmonial" className="nav-item nav-link">
                  Testimonial
                </Link>
                <Link to="/contact" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="d-none d-lg-flex align-items-center gap-3">
                <Link
                  to="/login"
                  className="btn-lg-square border border-light rounded-circle"
                >
                  <i className="fa fa-user text-primary"></i>
                </Link>
                {/* <Link
                  to="/wishlist"
                  className="btn-lg-square border border-light rounded-circle"
                >
                  <i className="fa fa-heart text-primary"></i>
                </Link> */}
                <div
                  className="btn-lg-square border border-light rounded-circle"
                  onClick={openCart}
                >
                  icon
                </div>
                <div className="ps-3">
                  <small className="text-primary mb-0">Call Us</small>
                  <p className="text-light fs-5 mb-0">+91 95689-81068</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
      {/* {isCartOpen && <Cart isOpen={isCartOpen} onClose={closeCart} />} */}
    </>
  );
}
