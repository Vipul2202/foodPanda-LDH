import React, { useEffect, useState } from 'react'
import "./myorder.css"
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import { format } from 'date-fns';
export default function Myorder({ setIsActive, isActive }) {
    const [order, setOrder] = useState([]);
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(sessionStorage.getItem("_id"));
        // =============order api===========
        useEffect(() => {
            setId(sessionStorage.getItem("_id"));
           
            fetchData();
        }, []);
    
        // ========order get api=========
        const fetchData = async () => {
            try {
                const response = await apiServices.getAllOrders({userId: id});
                if (response.data.success) {
                    console.log("response data", response)
                    setOrder(response.data.data);
                    setItem(response.data.data?.items);
                } else {
    
                }
            } catch (error) {
    
            } finally {
                setLoading(false);
            }
        };
    
    
      
    
     // -------------change Status api--------
     const changeStatus = (id, status) => {
        setLoading(true);
        const upstatus = status ? '0' : '1';
        const data = {
          _id: id ,
          status: upstatus,
        };
       
        apiServices.updateorderStatus(data).then((response) => {
          if (response.data.success) {
            
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          setLoading(false);
          fetchData();
        }).catch((error) => {
       
          toast.error('Something went wrong!! Try Again Later');
          setLoading(false);
        });
      };
  return (
    <>
     <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>
     {order.map((orderdata) => (
     <details className='mb-3'>
  <summary>Date:{format(new Date(orderdata.createdAt), 'MMMM d, yyyy')}</summary>
  <section class="h-100 orderdetailgradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
   
      <div class="col-lg-10 col-xl-8">
        <div class="card" style={{borderRadius: "10px"}}>
          <div class="card-header px-4 py-5">
            <h5 class="text-muted mb-0">Thanks for your Order, <span style={{color: "#7A7F34"}}>Chandan</span>!</h5>
          </div>
          <div class="card-body p-4">
            
           
            <div class="card shadow-0 border mb-4">
              <div class="card-body">
                <div class="row">

                  <div class="col-md-2">
                   Product Image
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0"></p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">Product Name</p>
                  </div>
                 
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">Quantity</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">Price</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">Total</p>
                  </div>
                </div>
               
               
              </div>
            </div>
            {orderdata?.items.map((itemdata, index) => (
            <div class="card shadow-0 border mb-4">
              <div class="card-body">
                <div class="row">

                  <div class="col-md-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                      class="img-fluid" alt="Phone"/>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0"></p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{itemdata.productId.productname}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{itemdata.quantity}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{itemdata.productId.price}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">$499</p>
                  </div>
                </div>
                <hr class="mb-4" style={{backgroundColor:" #7A7F34", opacity: "1"}} />
               
              </div>
            </div>
             ))}

            <div class="d-flex justify-content-between pt-2">
              <p class="fw-bold mb-0">Order Details</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">Total</span> $898.00</p>
            </div>

            <div class="d-flex justify-content-between pt-2">
              <p class="text-muted mb-0">Invoice Number : 788152</p>
              {/* <p class="text-muted mb-0"><span class="fw-bold me-4">Discount</span> $19.00</p> */}
            </div>

            <div class="d-flex justify-content-between">
              <p class="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
              {/* <p class="text-muted mb-0"><span class="fw-bold me-4">GST 18%</span> 123</p> */}
            </div>

            {/* <div class="d-flex justify-content-between mb-5">
              <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">Delivery Charges</span> Free</p>
            </div> */}
          </div>
          <div class="card-footer border-0 px-4 py-5"
            style={{backgroundColor: "#7A7F34", borderBottomLeftRadius: '10px', borderBottomRightRadius: "10px"}}>
            <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
              paid: <span class="h2 mb-0 ms-2">$1040</span></h5>
              <div className="d-print-none mt-4">
                            <div className="float-end">
                                <a className="btn btn-success me-1">Track</a>
                                <a  className="btn btn-success w-md">Edit</a>
                                <a  className="btn btn-danger w-md mx-2">Delete</a>
                            </div>
                        </div>
          </div>
       
        </div>
      </div>
       
    </div>
  </div>
</section>
</details>
   ))}
</main>
<ToastContainer/>
    </>
  )
}
