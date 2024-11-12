import React, { useState } from 'react'
import "../Create_user/create_user.css"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import apiServices from '../../../ApiServices/ApiServices';
import { Textarea } from '@mui/joy';
export default function Addproduct({ setIsActive, isActive }) {
  const nav = useNavigate();
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // Changed "Image" to "image"
  const [countInStock, setCountInStock] = useState("");
  const [status, setStatus] = useState("");





  const handleproductData = async (e) => {
    e.preventDefault();

    if (!productname || !price || !description || !countInStock || !Image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("status", status);
    formData.append("Image", Image);

    try {
      const response = await apiServices.addProduct(formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        // console.log(response)
        setTimeout(() => {
          nav("/admin/manage-product");
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
    <div>
      <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

        <div className="adminpagetitle">
          <h1 className='text-start'>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
              <li className="breadcrumb-item active">Create New Product</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}
        <div className="container-fluid">

          <div className="container">
            {/* <!-- Title --> */}
            <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
              <h2 className="h5 mb-3 mb-lg-0 d-flex"><Link to="/admin" className="text-muted"><i className="bi bi-arrow-left-square me-2"></i></Link> Create new Product</h2>
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
                  <form onSubmit={handleproductData}>
                    <div className="card-body product_Form_card-body">

                      <h3 className="h6 mb-4">Product information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Product name</label>
                            <input type="text" className="form-control" value={productname}
                              onChange={(e) => setProductname(e.target.value)} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Product Description</label>
                            <Textarea type="text" className="form-control" value={description}
                              onChange={(e) => setDescription(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="number" className="form-control" value={price}
                              onChange={(e) => setPrice(e.target.value)} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input type="number" className="form-control" value={countInStock}
                              onChange={(e) => setCountInStock(e.target.value)} />
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
                      <option value="draft" selected="">Draft</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
                {/* <!-- Avatar --> */}
                <div className="card product_form_card mb-4">
                  <div className="card-body product_Form_card-body">
                    <h3 className="h6">Image</h3>
                    <input className="form-control" type="file" accept="Image/*"
                      onChange={(e) => setImage(e.target.files[0])} />
                  </div>
                </div>


              </div>
            </div>
          </div>

        </div>
      </main>
      <ToastContainer />
    </div>
  )
}
