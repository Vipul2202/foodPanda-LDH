import React, { useEffect, useState } from 'react'
import "../Create_user/create_user.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { ToastContainer, toast } from 'react-toastify'
import { Textarea } from '@mui/joy'
export default function Updateproduct({ setIsActive, isActive }) {
  const param = useParams()
  const nav = useNavigate()
  const id = param._id
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // Changed "Image" to "image"
  const [countInStock, setCountInStock] = useState("");
  const [status, setStatus] = useState("");
  const [allproductData, setAllproductData] = useState()

  const changeimage = (e) => {
    setImage(e.target.files[0]);
  };

  // ---------------Add blog start----------

  useEffect(() => {
    let data = {
      _id: id
    }

    apiServices.getsingleProduct(data).then(data => {
      if (data.data.success) {
        setAllproductData(data.data.data)
        setProductname(data.data.data.productname)
        setPrice(data.data.data.price)
        setDescription(data.data.data.description)
        setCountInStock(data.data.data.countInStock)
        setStatus(data.data.data.status)
      }
      else {
        toast.error(data.data.msg)
      }
    }).catch(err => {

      toast.error("Something Went wrong")
    })


  }, []);

  let data = {
    _id: id
  }

  const handleproductData = (x) => {
    x.preventDefault();
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("status", status);
    formData.append("Image", Image);
    formData.append("_id", id)
    apiServices.updateProduct(formData)
      .then((data) => {
        // console.log(data);
        if (data.data.success) {
          toast.success(data.data.msg);
          setTimeout(() => {
            nav("/admin/manage-product")
          }, 2000)
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
      <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

        <div className="adminpagetitle">
          <h1 className='text-start'>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
              <li className="breadcrumb-item active">Update  Product</li>
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
                    <img
                      src={BASE_URL_IMG + allproductData?.Image}
                      alt="uprofile"
                      className="img-fluid"
                      style={{ height: "150px" }}
                    />
                    <input className="form-control" type="file" accept="Image/*"
                      onChange={(e) => {
                        changeimage(e);
                      }} />
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
