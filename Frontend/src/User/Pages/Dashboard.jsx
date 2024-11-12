import React from 'react';
export default function UserDashboard({ setIsActive, isActive }) {
     // const [isActive, setIsActive]= useState(false)
  return (
    <div>
          <main id="main" className={`main mainWrapper userMainWraper ${isActive === true && 'active'}`} >

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
        <div className="col-lg-4 col-md-6">
          <div className="card info-card sales-card">

          

            <div className="card-body text-start">
              <h5 className="card-title"> Order History </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cart"></i>
                </div>
                <div className="ps-3">
                  <h6>10</h6>

                </div>
              </div>
            </div>

          </div>
        </div>
        {/* <!-- End Sales Card --> */}

        {/* <!-- Revenue Card --> */}
        <div className="col-lg-4 col-md-6">
          <div className="card info-card revenue-card">

            

            <div className="card-body text-start">
              <h5 className="card-title">Cancel</h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="ps-3">
                  <h6>2</h6>
                
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* <!-- End Revenue Card --> */}
        {/* <!-- Revenue Card --> */}
        <div className="col-lg-4 col-md-6">
          <div className="card info-card revenue-card">

            <div className="card-body text-start">
              <h5 className="card-title">In Process </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="ps-3">
                  <h6>2</h6>
                 
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* <!-- End Revenue Card --> */}

        

       

        


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
