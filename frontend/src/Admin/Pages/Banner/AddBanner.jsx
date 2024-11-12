import React, { useEffect, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
function AddBanner({ setIsActive, isActive }) {
  const nav = useNavigate();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Changed "Image" to "image"


  const handlebannerData = async (e) => {
    e.preventDefault();

    if (!description || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("price", price);
    formData.append("Image", image);


    try {
      const response = await apiServices.addBanner(formData);
      if (response.data.success) {
        // console.log(response)
        toast.success(response.data.msg);
        setTimeout(() => {
          nav("/admin/manage-banner");
        }, 3000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
<main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

<div className="adminpagetitle">
  <h1 className='text-start'>Dashboard</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
      <li className="breadcrumb-item active">Create New Banner</li>
    </ol>
  </nav>
</div>
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Add Banner</h2>
              <form className="mt-5" onSubmit={handlebannerData}>

               
              
                {/* Blog input */}
                <div className="form-outline mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Description </label>
                  <textarea
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
               
          
               
                {/* Blog image */}
                <div className="mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Price </label>
                  <input
                    className="form-control"
                    type="text"
                    id="formFile"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Upload Image (size:2520x1110pxl)</label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Post
                </button>
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default AddBanner;
