
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import apiServices from '../../../ApiServices/ApiServices';

export default function UpdateMyOrder({ setIsActive, isActive }) {
    const param = useParams()
    const nav = useNavigate()
    const id = param._id
    const [orderStatus, setOrderStatus] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [paymentMethod, setPaymentMethod] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const [quantity, setQuantity] = useState({});
    const [products, setProducts] = useState([]);



    useEffect(() => {
        let data = {
            _id: id,
        };

        apiServices.getsingleOrder(data)
            .then((data) => {
                if (data.data.success) {
                    setOrderStatus(data.data.data.orderStatus);
                    setTotalAmount(data.data.data.totalAmount);
                    setPaymentMethod(data.data.data.paymentMethod);
                    setPaymentStatus(data.data.data.paymentStatus);
                    setProducts(data.data.data.items || []);
                } else {
                    toast.error(data.data.msg);
                }
            })
            .catch((err) => {
                toast.error("Something Went wrong");
            });
    }, [id]);


    const handleData = (e) => {
        e.preventDefault();

        let data = {
            orderStatus,
            totalAmount,
            paymentMethod,
            paymentStatus,
            quantity: {},
            _id: id,
        };

        products.forEach((productInfo) => {
            const productId = productInfo.productId;
            const inputQuantity = quantity[productId];

            if (inputQuantity !== undefined) {
                data.quantity[productId] = inputQuantity;
            }
        });

        apiServices.updateOrder(data)
            .then((data) => {
                toast.success("Successfully Updated");
                setTimeout(() => {
                    nav("/admin/manage-order");
                }, 2000);
            })
            .catch((err) => {
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
                            <li className="breadcrumb-item active">Update Order</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <div className="container-fluid">

                    <div className="container">
                        {/* <!-- Title --> */}
                        <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                            <h2 className="h5 mb-3 mb-lg-0 d-flex"><Link to="/user" className="text-muted"><i className="bi bi-arrow-left-square me-2"></i></Link> Update order</h2>
                            <div className="hstack gap-3">
                                <Link to="/user"> <button className="btn btn-light btn-sm btn-icon-text"><i className="bi bi-x"></i> <span className="text">Cancel</span></button></Link>
                                {/* <button className="btn btn-primary btn-sm btn-icon-text"><i className="bi bi-save"></i> <span className="text">Save</span></button> */}
                            </div>
                        </div>

                        {/* <!-- Main content --> */}
                        <div className="row">
                            {/* <!-- Left side --> */}
                            <div className="col-lg-12">
                                {/* <!-- Basic information --> */}
                                <div className="card product_form_card mb-4">
                                    <form onSubmit={handleData}>
                                        <div className="card-body product_Form_card-body">

                                            <h3 className="h6 mb-4">Update Order Information</h3>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Order Status</label>
                                                        <select
                                                            className="form-select"
                                                            value={orderStatus || ''}
                                                            onChange={(e) => setOrderStatus(e.target.value)}
                                                        >
                                                            <option value="">Select Order Status</option>
                                                            <option value="pending">Pending</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Total Amount</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={totalAmount || ''}
                                                            onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    {products.map((productInfo) => (
                                                        <div key={productInfo.productId} className="mb-3">
                                                            <label className="form-label">{`Quantity for Product ${productInfo.productId}`} {productInfo.productId?.productname}</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={quantity[productInfo.productId] || ''}
                                                                onChange={(e) => {
                                                                    const updatedQuantity = parseInt(e.target.value, 10);
                                                                    setQuantity((prevQuantity) => ({
                                                                        ...prevQuantity,
                                                                        [productInfo.productId]: updatedQuantity,
                                                                    }));
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Payment Method</label>
                                                        <select
                                                            className="form-select"
                                                            value={paymentMethod || ''}
                                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                                        >
                                                            <option value="">Select Payment Method</option>
                                                            <option value="creditCard">Credit Card</option>
                                                            <option value="paypal">PayPal</option>
                                                            <option value="cash">Cash</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Payment Status</label>
                                                        <select
                                                            className="form-select"
                                                            value={paymentStatus || ''}
                                                            onChange={(e) => setPaymentStatus(e.target.value)}
                                                        >
                                                            <option value="">Select Payment Status</option>
                                                            <option value="pending">Pending</option>
                                                            <option value="completed">Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                               


                                            </div>


                                        </div>
                                        <div className="form_button_Wraper d-flex justify-content-center alin-item-center mb-3">
                                            <button className="btn btn-primary btn-sm btn-icon-text" type='submit'><i className="bi bi-save"></i> <span className="text">Save</span></button>
                                        </div>

                                    </form>
                                </div>
                                {/* <!-- Address --> */}

                            </div>
       
                        </div>
                    </div>

                </div>
            </main>
            <ToastContainer />
        </>
    )
}
