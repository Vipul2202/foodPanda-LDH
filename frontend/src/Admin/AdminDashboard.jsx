import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import apiServices from "../ApiServices/ApiServices";
export default function AdminDashboard({ setIsActive, isActive }) {


  return (
    <div>
          <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

<div className="adminpagetitle">
  <h1 className='text-start'>Dashboard</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="index.html">Home</a></li>
      <li className="breadcrumb-item active">Dashboard</li>
    </ol>
  </nav>
</div>
{/* <!-- End Page Title --> */}

<section className="section admindashboard">
  <div className="row">

    {/* <!-- Left side columns --> */}
    <div className="col-lg-12">
      <div className="row">

        {/* <!-- Sales Card --> */}
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">

            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}

            <div className="card-body text-start">
              <h5 className="card-title">Sales <span>| Today</span></h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cart"></i>
                </div>
                <div className="ps-3">
                  <h6>145</h6>
                  <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                </div>
              </div>
            </div>

          </div>
        </div>
        {/* <!-- End Sales Card --> */}

        {/* <!-- Revenue Card --> */}
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card revenue-card">

            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}

            <div className="card-body text-start">
              <h5 className="card-title">Revenue <span>| This Month</span></h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="ps-3">
                  <h6>$40</h6>
                  <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                </div>
              </div>
            </div>

          </div>
        </div>
        {/* <!-- End Revenue Card --> */}

        {/* <!-- Customers Card --> */}
        <div className="col-xxl-4 col-xl-12">

          <div className="card info-card customers-card">

            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}

            <div className="card-body text-start">
              <h5 className="card-title">Customers <span>| This Year</span></h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-people"></i>
                </div>
                <div className="ps-3">
                  <h6>1244</h6>
                  <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                </div>
              </div>

            </div>
          </div>

        </div>
        {/* <!-- End Customers Card --> */}


      </div>
    </div>
    {/* <!-- End Left side columns --> */}


  </div>
</section>

</main>
{/* <!-- End #main --> */}

    </div>
  )
}
