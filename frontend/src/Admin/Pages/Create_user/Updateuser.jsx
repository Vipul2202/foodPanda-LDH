import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices';
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateUser({ setIsActive, isActive }) {
    const param = useParams()
    const nav = useNavigate()
    const id = param._id
    const [customerData, setcustomerData] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();
    const [newpassword, setNewPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [contact, setContact] = useState();
    const [Image, setImage] = useState();

    const changeimage = (e) => {
       
        setImage(e.target.files[0]);
      };
      useEffect(() => {
      
        let data = {
          userId: id,
        };
       
        apiServices
          .getsinglecustomer(data)
          .then((data) => {
            if (data.data.success) {
              setcustomerData(data.data.data);
              setName(data.data.data.name);
              setEmail(data.data.data.email);
              setAddress(data.data.data.address);
              setContact(data.data.data.contact);
           
            } else {
              toast.error(data.data.msg);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.error("Something went wrong");
          });
    
         
        
      }, []);
    
      const handleupdateData = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("address", address);
        data.append("contact", contact);
        data.append("Image", Image);
        data.append("_id", id);
    
        apiServices
          .updateuser(data)
          .then((data) => {
            if (data.data.success) {
              toast.success(data.data.msg);
              setTimeout(() => {
                nav("/admin/manage-user");
                }, 3000);
            } else {
              toast.error(data.data.msg);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.error("Something went wrong");
          });
    
        
      };
    
      const handlepassword = (e) => {
        e.preventDefault();
        let data = {
          oldpassword: password,
          newpassword: newpassword,
          confirmpassword: confirmpassword,
          userId: id,
        };
    
        apiServices
          .changepassword(data)
          .then((data) => {
            if (data.data.success) {
              toast.success(data.data.msg);
              setTimeout(() => {
                nav("admin/manage-user");
                }, 3000);
            } else {
              toast.error(data.data.msg);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.error("Something went wrong");
          });
      };


  return (
    <div>
    <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>

<div class="adminpagetitle">
<h1 className='text-start'>Profile</h1>
<nav>
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="index.html">Home</a></li>
<li class="breadcrumb-item">Users</li>
<li class="breadcrumb-item active">Profile</li>
</ol>
</nav>
</div>
{/* <!-- End Page Title --> */ }

<section class="section adminprofile text-start">
<div class="row">
<div class="col-xl-4">

<div class="card">
  <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

    <img  src={BASE_URL_IMG + customerData?.Image} alt="Profile" class="rounded-circle"/>
    <h2>{customerData?.name}</h2>
    <h5>{customerData?._id}</h5>
    
    <div class="social-links mt-2">
      <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
      <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
      <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
      <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
    </div>
  </div>
</div>

</div>

<div class="col-xl-8">

<div class="card">
  <div class="card-body pt-3">
    {/* <!-- Bordered Tabs --> */}
    <ul class="nav nav-tabs nav-tabs-bordered">

      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
      </li>

      <li class="nav-item">
        < button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
      </li>

   

      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
      </li>

    </ul>
    <div class="tab-content pt-2">

      <div class="tab-pane fade show active profile-overview" id="profile-overview">
       

        <h5 class="card-title">Profile Details</h5>

        <div class="row">
          <div class="col-lg-3 col-md-4 label ">Full Name</div>
          <div class="col-lg-9 col-md-8">{customerData?.name}</div>
        </div>


        <div class="row">
          <div class="col-lg-3 col-md-4 label">Address</div>
          <div class="col-lg-9 col-md-8">{customerData?.address}</div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-4 label">Phone</div>
          <div class="col-lg-9 col-md-8"> {customerData?.contact}</div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-4 label">Email</div>
          <div class="col-lg-9 col-md-8">{customerData?.email}</div>
        </div>

      </div>

      <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

        {/* <!-- Profile Edit Form --> */}
        <form onSubmit={handleupdateData}>
          <div class="row mb-3">
            <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
            <div class="col-md-8 col-lg-9">
              <img src={BASE_URL_IMG + customerData?.Image}alt="Profile" className="img-fluid"/>
              <div class="pt-2">
                <a  class="btn btn-primary btn-sm" title="Upload new profile image"><input type='file' className='upload_profile_img' onChange={(e) => { changeimage(e); }}/>
                <i class="bi bi-upload"></i></a>
                
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
            <div class="col-md-8 col-lg-9">
              <input name="fullName" type="text" class="form-control" id="fullName" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

        
          <div class="row mb-3">
            <label for="Address" class="col-md-4 col-lg-3 col-form-label">Address</label>
            <div class="col-md-8 col-lg-9">
              <input name="address" type="text" class="form-control" id="Address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
            <div class="col-md-8 col-lg-9">
              <input name="phone" type="text" class="form-control" id="Phone"
               value={contact}
               onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
            <div class="col-md-8 col-lg-9">
              <input name="email" type="email" class="form-control" id="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
        {/* <!-- End Profile Edit Form --> */}

      </div>

     

      <div class="tab-pane fade pt-3" id="profile-change-password">
        {/* <!-- Change Password Form --> */}
        <form onSubmit={handlepassword}>

          <div class="row mb-3">
            <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
            <div class="col-md-8 col-lg-9">
              <input name="password" type="password" class="form-control" id="currentPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
            <div class="col-md-8 col-lg-9">
              <input name="newpassword" type="password" class="form-control" id="newPassword"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
            <div class="col-md-8 col-lg-9">
              <input name="renewpassword" type="password" class="form-control" id="renewPassword"
              value={confirmpassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              />
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Change Password</button>
          </div>
        </form>
        {/* <!-- End Change Password Form --> */}

      </div>

    </div>
    {/* <!-- End Bordered Tabs --> */}

  </div>
</div>

</div>
</div>
</section>

</main>
{/* <!-- End #main --> */}
<ToastContainer/>
</div>
  )
}
