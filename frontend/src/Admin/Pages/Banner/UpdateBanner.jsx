import React, { useEffect } from "react";
import { useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateBanner({ setIsActive, isActive }) {
    const param = useParams()
    const nav = useNavigate()
    const id = param._id
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [Image, setImage] = useState();
    const [allBannerData, setallBannerData] = useState();
    const changeimage = (e) => {
        setImage(e.target.files[0]);
    };

    // ---------------Add blog start----------

    useEffect(() => {
        let data = {
            _id: id
        }

        apiServices.getsingleBanner(data).then(data => {
            if (data.data.success) {
                setDescription(data.data.data.description)
                setPrice(data.data.data.price)
                setallBannerData(data.data.data)
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
    
    const handleblogData = (x) => {
        x.preventDefault();
        let data = new FormData();
        data.append("description", description);
        data.append("price", price);
        data.append("Image", Image);
        data.append("_id", id)
        apiServices.updateBanner(data)
            .then((data) => {
                // console.log(data);
                if (data.data.success) {
                    toast.success(data.data.msg);
                    setTimeout(() => {
                        nav("/admin/manage-banner")
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
    // ---------------Add blog start----------
    return (
        <>
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
                <div className="container">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col article">
                            <h2 className="text-dark">Update Blog</h2>
                            <form className="mt-5"   >

                                {/* <!-- blog input --> */}
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

                                    <img
                                        src={BASE_URL_IMG + allBannerData?.Image}
                                        alt="uprofile"
                                        className="img-fluid"
                                        style={{ height: "150px" }}
                                    />
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFile"
                                        onChange={(e) => {
                                            changeimage(e);
                                        }}
                                    />
                                </div>

                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="btn btn-primary-1 btn-block mb-4"
                                    onClick={handleblogData}
                                >
                                    Save Changes
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

export default UpdateBanner;
