
import React, { useEffect, useState } from 'react'
import "../../../Admin/Pages/Create_user/create_user.css"
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import apiServices from '../../../ApiServices/ApiServices';

export default function Updateaddress({ setIsActive, isActive }) {
  const param = useParams()
  const nav = useNavigate()
  const id = param._id
    const [fullName, setfullName] = useState();
    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [postalCode, setPostalCode] = useState();
    const [country, setCountry] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [isDefault, setIsDefault] = useState();
  
  
    useEffect(() => {
      let data = {
          _id: id
      }
  
      apiServices.getSingleAddresses(data).then(data => {
          if (data.data.success) {
            setfullName(data.data.data.fullName)
            setAddressLine1(data.data.data.addressLine1)
            setAddressLine2(data.data.data.addressLine2)
            setCity(data.data.data.city)
            setState(data.data.data.state)
            setPostalCode(data.data.data.postalCode)
            setCountry(data.data.data.country)
            setPhoneNumber(data.data.data.phoneNumber)
            setIsDefault(data.data.data.isDefault)
          }
          else {
              toast.error(data.data.msg)
          }
      }).catch(err => {
  
          toast.error("Something Went wrong")
      })
  
  
  }, []);
   
  
    const handleData =  (e) => {
      e.preventDefault();
  
      let data = {
        fullName:fullName,
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        city:city,
        state:state,
        postalCode:postalCode,
        country:country,
        phoneNumber:phoneNumber,
        isDefault:isDefault,
        _id:id
        }
        apiServices.updateAddress(data)
        .then((data) => {
            
                toast.success("Successfully Updated");
                setTimeout(() => {
                    nav("/admin/manage-address")
                }, 2000)
            
        })
        .catch((err) => {
            // console.log(err);
            toast.error("Something went wrong");
        });
};
  return (
  <>
      <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

<div className="adminpagetitle">
  <h1 className='text-start'>Dashboard</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/user">Home</Link></li>
      <li className="breadcrumb-item active">Create New Product</li>
    </ol>
  </nav>
</div>
{/* <!-- End Page Title --> */}
<div className="container-fluid">

<div className="container">
  {/* <!-- Title --> */}
  <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
    <h2 className="h5 mb-3 mb-lg-0 d-flex"><Link to="/user" className="text-muted"><i className="bi bi-arrow-left-square me-2"></i></Link> Create new Address</h2>
    <div className="hstack gap-3">
     <Link to="/user"> <button className="btn btn-light btn-sm btn-icon-text"><i className="bi bi-x"></i> <span className="text">Cancel</span></button></Link>
      {/* <button className="btn btn-primary btn-sm btn-icon-text"><i className="bi bi-save"></i> <span className="text">Save</span></button> */}
    </div>
  </div>

  {/* <!-- Main content --> */}
  <div className="row">
    {/* <!-- Left side --> */}
    <div className="col-lg-8">
      {/* <!-- Basic information --> */}
      <div className="card product_form_card mb-4">
      <form onSubmit={handleData}>
        <div className="card-body product_Form_card-body">
     
          <h3 className="h6 mb-4">Address information</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Fullname</label>
                <input type="text" className="form-control"  value={fullName}
                    onChange={(e) => setfullName(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="number" className="form-control"  value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}/>
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">State</label>
                <input type="text" className="form-control"  value={state}
                    onChange={(e) => setState(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control"  value={country}
                    onChange={(e) => setCountry(e.target.value)}/>
              </div>
            </div>
            
          </div>
          <div className="row">
          <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control"  value={city}
                    onChange={(e) => setCity(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Postal Code</label>
                <input type="number" className="form-control"  value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}/>
              </div>
            </div>
         
          </div>
          <div className="row">
          <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">AddressLine 1</label>
                <input type="text" className="form-control"  value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}/>
              </div>
            </div>
         
          </div>
          <div className="row">
          <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">AddressLine 2</label>
                <input type="text" className="form-control"  value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}/>
              </div>
            </div>
            
         
          </div>
          
        </div>
        <div className="form_button_Wraper d-flex justify-content-center alin-item-center mb-3">
        <button className="btn btn-primary btn-sm btn-icon-text"  type='submit'><i className="bi bi-save"></i> <span className="text">Save</span></button>
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
          <h3 className="h6">Is Default</h3>
          <select className="form-select"  value={isDefault === true ? "1" : "0"} 
   onChange={(e) => setIsDefault(e.target.value === "1")}>
            <option >select one</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>
    


    </div>
  </div>
</div>

  </div>
</main>
<ToastContainer />
  </>
  )
}
