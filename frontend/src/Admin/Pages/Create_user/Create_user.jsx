import React from 'react'
import "./create_user.css"
import { Link } from 'react-router-dom'
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../../../ApiServices/ApiServices";
import { useNavigate } from 'react-router-dom';
export default function Create_user({ setIsActive, isActive }) {
  const nav = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [contact, setContact] = useState()
  const [address, setAddress] = useState()
  const [Image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading]= useState(true)
  const handleForm = (e) => {
    // setLoading(true)
    e.preventDefault();

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("contact", contact)
    data.append("address", address)
    data.append("Image", Image);
    apiServices.adduser(data)
        setTimeout(()=>{
          setLoading(false)
      },1000)
      .then((x) => {
        
        if (x.data.success) {
          // console.log(x)
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/admin/manage-user");
          }, 3000);
        } else {
          toast.error(x.data.msg);
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong!! Try again later.");
      });
  };




  // ----------special character restricted------
  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;
    // Allow letters, numbers, and underscore
    if (
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122) || // a-z
      (charCode >= 48 && charCode <= 57) || // 0-9
      charCode === 95 // Underscore
    ) {
      return true; // Allow the key press
    }
    event.preventDefault(); // Prevent the key press
  };
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
                {/* <button className="btn btn-primary btn-sm btn-icon-text"><i className="bi bi-save"></i> <span className="text">Save</span></button> */}
              </div>
            </div>

            {/* <!-- Main content --> */}
            <div className="row">
              {/* <!-- Left side --> */}
              <div className="col-lg-8">
                {/* <!-- Basic information --> */}
                <div className="card product_form_card mb-4">
                  <form onSubmit={handleForm}>
                    <div className="card-body product_Form_card-body">
                      <h3 className="h6 mb-4">Basic information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name}
                              onChange={(e) => setName(e.target.value)}
                              onKeyPress={handleKeyPress} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email}
                              onChange={(e) => setEmail(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">

                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" value={address}
                              onChange={(e) => setAddress(e.target.value)} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Phone number</label>
                            <input type="text" className="form-control" value={contact}
                              onChange={(e) => setContact(e.target.value)} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form_button_Wraper d-flex justify-content-center alin-item-center mb-3">
                      <button className="btn btn-primary btn-sm btn-icon-text" type='submit'><i className="bi bi-save"></i> <span className="text">Save</span></button>
                    </div>
                    
                  </form>
                </div>
                {/* <!-- Address --> */}

              </div>
              {/* <!-- Right side --> */}
              <div className="col-lg-4">
                {/* <!-- Status --> */}
                <div className="card product_form_card mb-4">
                  <div className="card-body product_Form_card-body">
                    <h3 className="h6">Status</h3>
                    <select className="form-select" value={status}
                      onChange={(e) => setStatus(e.target.value)}>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
                {/* <!-- Avatar --> */}
                <div className="card product_form_card mb-4">
                  <div className="card-body product_Form_card-body">
                    <h3 className="h6">Avatar</h3>
                    <input className="form-control" type="file" accept="Image/*"
                      onChange={(e) => setImage(e.target.files[0])} />
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
      <ToastContainer />
    </div>
  )
}
