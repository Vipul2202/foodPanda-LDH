import React from 'react'

export default function extras({ setIsActive, isActive }) {
  return (
    <div>
            <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

<div className="adminpagetitle">
  <h1 className='text-start'>Dashboard</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
      <li className="breadcrumb-item active">Create New User</li>
    </ol>
  </nav>
</div>
{/* <!-- End Page Title --> */}
<div className="container-fluid">

<div className="container">
  {/* <!-- Title --> */}
  <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
    <h2 className="h5 mb-3 mb-lg-0"><Link to="/admin" className="text-muted"><i className="bi bi-arrow-left-square me-2"></i></Link> Create new customer</h2>
    <div className="hstack gap-3">
     <Link to="/admin"> <button className="btn btn-light btn-sm btn-icon-text"><i className="bi bi-x"></i> <span className="text">Cancel</span></button></Link>
      <button className="btn btn-primary btn-sm btn-icon-text"><i className="bi bi-save"></i> <span className="text">Save</span></button>
    </div>
  </div>

  {/* <!-- Main content --> */}
  <div className="row">
    {/* <!-- Left side --> */}
    <div className="col-lg-8">
      {/* <!-- Basic information --> */}
      <div className="card product_form_card mb-4">
        <div className="card-body product_Form_card-body">
          <h3 className="h6 mb-4">Basic information</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">First name</label>
                <input type="text" className="form-control"/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control"/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Phone number</label>
                <input type="text" className="form-control"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Address --> */}
      <div className="card product_form_card mb-4">
        <div className="card-body product_Form_card-body">
          <h3 className="h6 mb-4">Address</h3>
          <div className="mb-3">
            <label className="form-label">Address Line 1</label>
            <input type="text" className="form-control"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Address Line 2</label>
            <input type="text" className="form-control"/>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Country</label>
                <select className="select2 form-control select2-hidden-accessible" data-select2-placeholder="Select country" data-select2-id="select2-data-1-gy14" tabindex="-1" aria-hidden="true">
                  <option data-select2-id="select2-data-3-ibs9"></option>
                  <option value="AF">Afghanistan</option>
                  <option value="BS">Bahamas</option>
                  <option value="KH">Cambodia</option>
                  <option value="DK">Denmark</option>
                  <option value="TL">East Timor</option>
                  <option value="GM">Gambia</option>
                </select><span className="select2 select2-container select2-container--bootstrap-5" dir="ltr" data-select2-id="select2-data-2-46y9" style={{width: "391px;"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-vp8l-container" aria-controls="select2-vp8l-container"><span className="select2-selection__rendered" id="select2-vp8l-container" role="textbox" aria-readonly="true" title="Select country"><span className="select2-selection__placeholder">Select country</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">State</label>
                <select className="select2 form-control select2-hidden-accessible" data-select2-placeholder="Select state" data-select2-id="select2-data-4-680y" tabindex="-1" aria-hidden="true">
                  <option data-select2-id="select2-data-6-cshs"></option>
                  <option value="AL">Alabama</option>
                  <option value="CA">California</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="KS">Kansas</option>
                </select><span className="select2 select2-container select2-container--bootstrap-5" dir="ltr" data-select2-id="select2-data-5-np4c" style={{width: "391px;"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-2fn7-container" aria-controls="select2-2fn7-container"><span className="select2-selection__rendered" id="select2-2fn7-container" role="textbox" aria-readonly="true" title="Select state"><span className="select2-selection__placeholder">Select state</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">City</label>
                <select className="select2 form-control select2-hidden-accessible" data-select2-placeholder="Select city" data-select2-id="select2-data-7-809c" tabindex="-1" aria-hidden="true">
                  <option data-select2-id="select2-data-9-k35n"></option>
                  <option value="b">Bangkok</option>
                  <option value="d">Dubai</option>
                  <option value="h">Hong Kong</option>
                  <option value="k">Kuala Lumpur</option>
                  <option value="l">London</option>
                  <option value="n">New York City</option>
                  <option value="m">Macau</option>
                  <option value="p">Paris</option>
                </select><span className="select2 select2-container select2-container--bootstrap-5" dir="ltr" data-select2-id="select2-data-8-3peu" style={{width: "391px;"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jdfi-container" aria-controls="select2-jdfi-container"><span className="select2-selection__rendered" id="select2-jdfi-container" role="textbox" aria-readonly="true" title="Select city"><span className="select2-selection__placeholder">Select city</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">ZIP code</label>
                <input type="text" className="form-control"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Right side --> */}
    <div className="col-lg-4">
      {/* <!-- Status --> */}
      <div className="card product_form_card mb-4">
        <div className="card-body product_Form_card-body">
          <h3 className="h6">Status</h3>
          <select className="form-select">
            <option value="draft" selected="">Draft</option>
            <option value="active">Active</option>
            <option value="active">Inactive</option>
          </select>
        </div>
      </div>
      {/* <!-- Avatar --> */}
      <div className="card product_form_card mb-4">
        <div className="card-body product_Form_card-body">
          <h3 className="h6">Avatar</h3>
          <input className="form-control" type="file"/>
        </div>
      </div>
      {/* <!-- Notes --> */}
      {/* <div className="card product_form_card mb-4">
        <div className="card-body product_Form_card-body">
          <h3 className="h6">Notes</h3>
          <textarea className="form-control" rows="3"></textarea>
        </div>
      </div> */}
      {/* <!-- Notification settings --> */}
      {/* <div className="card product_form_card mb-4">
        <div className="card-body product_Form_card-body">
          <h3 className="h6">Notification Settings</h3>
          <ul className="list-group list-group-flush mx-n2">
            <li className="list-group-item px-0 d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <h6 className="mb-0">News and updates</h6>
                <small>News about product and feature updates.</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch"/>
              </div>
            </li>
            <li className="list-group-item px-0 d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <h6 className="mb-0">Tips and tutorials</h6>
                <small>Tips on getting more out of the platform.</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" checked=""/>
              </div>
            </li>
            <li className="list-group-item px-0 d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <h6 className="mb-0">User Research</h6>
                <small>Get involved in our beta testing program.</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch"/>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  </div>
</div>

  </div>
</main>
    </div>
  )
}
