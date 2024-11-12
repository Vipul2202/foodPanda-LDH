

import React, { useEffect, useRef, useState } from 'react'
import "./orderTrack.css"
import { useParams } from 'react-router-dom'
import apiServices from '../../ApiServices/ApiServices'
import { toast } from 'react-toastify'
export default function OrderTrack() {

  const param=useParams()
  const id = param._id
  const [orderstatus, setOrderStatus]=useState()
const [orderinvoice, setOrderInvoice]=useState()

// ======hide/show=========
const [isVisible, setIsVisible] = useState(false);
const toggleVisibility = () => {
  setIsVisible(!isVisible);
};
// ======print========
const elementToPrint = useRef(null);

const handlePrint = () => {
  elementToPrint.current.focus();
  window.print();
};


// ========get data===========
  const fetchOrderStatus = () => {

    apiServices.Trackorder({_id:id})
      .then((data) => {
        if (data.data.success) {
          setOrderStatus(data.data.data);
          console.log(data)
        } else {
          toast.error(data.data.msg);
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };


  useEffect(() => {
    apiServices.getsingleOrder({_id:id})
    .then((data) => {
      if (data.data.success) {
        setOrderInvoice(data.data.data);
        console.log("invoice data",data)
      } else {
        toast.error(data.data.msg);
      }
    })
    .catch(() => {
      toast.error('Something went wrong');
    });
    fetchOrderStatus();
    const intervalId = setInterval(fetchOrderStatus, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Function to render status based on order status
  const renderStatus = () => {
    if (!orderstatus) {
      return <p>Loading...</p>;
    }

    const orderSteps = [
      { status: 'pending', title: 'Confirmed Order' },
      { status: 'confirm', title: 'Processing Order' },
      { status: 'processing', title: 'Quality Check' },
      { status: 'qualitycheck', title: 'Product Dispatched' },
      { status: 'shipped', title: 'Product Delivered' },
    ];

    return (
      <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between pt-5 padding-top-2x padding-bottom-1x">
        {orderSteps.map((step, index) => (
          <div key={index} className={`step ${orderstatus.orderStatus === step.status ? 'completed' : ''}`} style={{ backgroundColor: orderstatus.orderStatus === step.status ? '#4caf50' : '' }}>
            <div className="step-icon-wrap">
              <div className="step-icon">
                <i className={`fa-solid fa-${getIconByStatus(step.status)}`}></i>
              </div>
            </div>
            <h4 className="step-title">{step.title}</h4>
          </div>
        ))}
      </div>
    );
  };

  const getIconByStatus = (status) => {
    // Map status to corresponding font awesome icon
    const iconMap = {
      pending: 'cart-shopping',
      confirm: 'gear',
      processing: 'medal',
      qualitycheck: 'truck-fast', // Assuming you want the same icon for 'qualitycheck'
      shipped: 'house-chimney',
      
    };
    return iconMap[status] || 'house-chimney-user'; // Default icon for unknown status
  };


  
  return (
    <>
    <div ref={elementToPrint}>
        <div className="container trackWraper padding-bottom-3x mb-1">
        <div className="card trackcard  mb-3">
          <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Tracking Order No - </span><span className="text-medium">{orderinvoice?._id}</span></div>
          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondarycolor">
            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div>
            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> Checking Quality</div>
            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> SEP 09, 2017</div>
          </div>
          <div className="card-body">
          {renderStatus()}
          </div>
        </div>
        <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
          
          <div className="text-left text-sm-right"><a className="btn btn-orderdetail btn-rounded btn-sm" onClick={toggleVisibility}  data-toggle="modal" data-target="#orderDetails">View Order Details</a></div>
        </div>
      </div>
      {isVisible &&  <div className="container orderdatailcontainer">
<div className="row">
        <div className="col-lg-12">
            <div className="card ordercard">
                <div className="card-body">
                    <div className="invoice-title">
                        <h4 className="float-end fs-5"><span className="badge bg-success font-size-12 ms-2">{orderinvoice?.paymentStatus}</span></h4>
                        <div className="mb-4">
                           <h2 className="mb-1 text-muted">spice enlight.com</h2>
                        </div>
                        <div className="text-muted">
                            <p className="mb-1">King Edwards Road , Ruislip, London HA47AE, GB</p>
                            <p className="mb-1"><i className="uil uil-envelope-alt me-1"></i> spiceenlight@gmail.com</p>
                            <p><i className="uil uil-phone me-1"></i>+918725900068</p>
                        </div>
                    </div>

                    <hr className="my-4"/>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-muted">
                                <h5 className="font-size-16 mb-3">Billed To:</h5>
                                <h5 className="font-size-15 mb-2">{orderinvoice?.userId?.name}</h5>
                                <p className="mb-1">{orderinvoice?.billingAddress.street1},{orderinvoice?.billingAddress.city},{orderinvoice?.billingAddress.zip},{orderinvoice?.billingAddress?.state},{orderinvoice?.billingAddress?.country}</p>
                                <p className="mb-1">{orderinvoice?.userId?.email}</p>
                                <p>{orderinvoice?.userId?.contact}</p>

                            </div>
                        </div>
                        {/* <!-- end col --> */}
                        <div className="col-sm-6">
                            <div className="text-muted text-sm-end">
                                <div>
                                    <h5 className="font-size-15 mb-1">Order No:</h5>
                                    <p>#{orderinvoice?._id}</p>
                                </div>
                                <div>
                                    <h5 className="font-size-15 mb-1">Payment Method</h5>
                                    <p>#{orderinvoice?.paymentMethod}</p>
                                </div>
                                <div>
                                    <h5 className="font-size-15 mb-1">Payment Status</h5>
                                    <p>#{orderinvoice?.paymentStatus}</p>
                                </div>
                                <div className="mt-4">
                                    <h5 className="font-size-15 mb-1"> Date:</h5>
                                    <p>{orderinvoice?.createdAt} </p>
                                </div>
                               
                            </div>
                        </div>
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                    
                    <div className="py-2">
                        <h5 className="font-size-15">Order Summary</h5>

                        <div className="table-responsive">
                            <table className="table align-middle table-nowrap table-centered mb-0">
                                <thead>
                                    <tr>
                                        <th style={{width:"70px"}}>No.</th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th className="text-end" style={{width: "120px"}}>Total</th>
                                    </tr>
                                </thead>
                                {/* <!-- end thead --> */}
                               
                                <tbody>
                                {orderinvoice?.items.map((data, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <div>
                                                <h5 className="text-truncate font-size-14 mb-1">{data?.productId?.productname}</h5>
                                                {/* <p className="text-muted mb-0">{data?.productId?.productname}</p> */}
                                            </div>
                                        </td>
                                        <td>$ {data?.productId?.price}</td>
                                        <td>{data?.quantity}</td>
                                        <td className="text-end">${data?.productId?.price}*{data?.quantity}</td>
                                    </tr>
                                       ))}
                                    {/* <!-- end tr --> */}
                                    
                                    {/* <!-- end tr --> */}
                                    <tr>
                                        <th scope="row" colspan="4" className="text-end">Sub Total</th>
                                        <td className="text-end">${orderinvoice?.totalAmount}</td>
                                    </tr>
                                    {/* <!-- end tr --> */}
                                    {/* <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">
                                            Discount :</th>
                                        <td className="border-0 text-end">- $25.50</td>
                                    </tr> */}
                                    {/* <!-- end tr --> */}
                                    {/* <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">
                                            Shipping Charge :</th>
                                        <td className="border-0 text-end">$20.00</td>
                                    </tr> */}
                                    {/* <!-- end tr --> */}
                                    {/* <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">
                                            Tax</th>
                                        <td className="border-0 text-end">$12.00</td>
                                    </tr> */}
                                    {/* <!-- end tr --> */}
                                    <tr>
                                        <th scope="row" colspan="4" className="border-0 text-end">Total</th>
                                        <td className="border-0 text-end"><h4 className="m-0 fw-semibold">${orderinvoice?.totalAmount}</h4></td>
                                    </tr>
                                    {/* <!-- end tr --> */}
                                </tbody>
                              
                                {/* <!-- end tbody --> */}
                            </table>
                            {/* <!-- end table --> */}
                        </div>
                        {/* <!-- end table responsive --> */}
                        <div className="d-print-none mt-4">
                            <div className="float-end">
                                <a onClick={handlePrint} className="btn btn-success me-1"><i className="fa fa-print"></i></a>
                                <a  className="btn btn-sendbutton w-md">Send</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- end col --> */}
    </div>
</div>
}
</div>
    </>
  )
}
