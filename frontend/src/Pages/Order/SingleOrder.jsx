import React, { useEffect, useState } from 'react'
import "../CheckOut/CheckOut.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiServices, { BASE_URL_IMG } from '../../ApiServices/ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Order() {
    const param = useParams()
    const nav = useNavigate()
    const id = param._id
    const [name, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [zip, setZip] = useState()
    const [street1, setStreet1] = useState()
    const [phone, setPhoneNumber] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [productdata, setProductdata] = useState([]);
    const [cartid, setCartId] = useState([])
    const [userid, setId] = useState(sessionStorage.getItem("_id"));
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        setId(sessionStorage.getItem("_id"));
        let data = {
            userId: userid,
        };
        let iddata={
            _id: id
          }
        // ========cart get api=========
        apiServices.getsingleProduct(iddata)
            .then((data) => {
                setProductdata(data.data.data)
                setTotalAmount(data.data.data.price.toFixed(2));
            })
            .catch((err) => {
                toast.error("Something went wrong", err);
            });

    }, [userid]);

    const handleData = async (e) => {
        e.preventDefault();

        // if (!fullName || !addressLine1 || !addressLine2 || !city || !state || !postalCode || !country || !phoneNumber ) {
        //   toast.error("Please fill in all fields.");
        //   return;
        // }
       const products= {
        productId:id,
        quantity: 1,
       }

       
        let data = {
           
            products: [products],
           
            billingAddress: {
                name: name,
                email: email,
                phone: phone,
                street1: street1,
                city: city,
                state: state,
                zip: zip,
                country: country
            },
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
        }

        try {
            const response = await apiServices.placeOrders(data);
            if (response.data.success) {
                toast.success(response.data.msg);
                setTimeout(() => {
                    nav("/payment-form");
                }, 3000);
            } else {
                toast.success("order place successfully");
                setTimeout(() => {
                    nav("/payment-form");
                }, 3000);
            }
        } catch (error) {
            toast.error("Something went wrong" + error);
        }
    };


   

    return (
        <div className='checkout-body'>

            <div className="container">

                <div className="row checkoutWraper">
                    <div className="col-xl-8">

                        <div className="checkout-card">
                            <div className="card-body">
                                <ol className="activity-checkout mb-0 px-4 mt-3">
                                    <li className="checkout-item">
                                        <div className="avatar checkout-icon p-1">
                                            <div className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bxs-receipt text-white font-size-20"></i>
                                            </div>
                                        </div>
                                        <div className="feed-item-list">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Billing Info</h5>
                                                {/* <p className="text-muted text-truncate mb-4">Sed ut perspiciatis unde omnis iste</p> */}
                                                <div className="mb-3">
                                                    <form >
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" for="billing-name">Name</label>
                                                                        <input type="text" className="form-control" id="billing-name" placeholder="Enter name" value={name}
                                                                            onChange={(e) => setFullName(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" for="billing-email-address">Email Address</label>
                                                                        <input type="email" className="form-control" id="billing-email-address" placeholder="Enter email" value={email}
                                                                            onChange={(e) => setEmail(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" for="billing-phone">Phone</label>
                                                                        <input type="number" className="form-control" id="billing-phone" placeholder="Enter Phone no." value={phone}
                                                                            onChange={(e) => setPhoneNumber(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="form-label" for="billing-address">Address</label>
                                                                <textarea className="form-control" id="billing-address" rows="3" placeholder="Enter full address" value={street1}
                                                                    onChange={(e) => setStreet1(e.target.value)}></textarea>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="mb-4 mb-lg-0">
                                                                        <label className="form-label">Country</label>
                                                                        <select className="form-control form-select" title="Country" value={country}
                                                                            onChange={(e) => setCountry(e.target.value)}>
                                                                            <option value="0">Select Country</option>
                                                                            <option value="AF">Afghanistan</option>
                                                                            <option value="AL">Albania</option>
                                                                            <option value="DZ">Algeria</option>
                                                                            <option value="AS">American Samoa</option>
                                                                            <option value="AD">Andorra</option>
                                                                            <option value="AO">Angola</option>
                                                                            <option value="AI">Anguilla</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-4">
                                                                    <div className="mb-4 mb-lg-0">
                                                                        <label className="form-label" for="billing-city">City</label>
                                                                        <input type="text" className="form-control" id="billing-city" placeholder="Enter State" value={state}
                                                                            onChange={(e) => setState(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-4 mb-lg-0">
                                                                        <label className="form-label" for="billing-city">City</label>
                                                                        <input type="text" className="form-control" id="billing-city" placeholder="Enter City" value={city}
                                                                            onChange={(e) => setCity(e.target.value)} />
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-4">
                                                                    <div className="mt-4 mb-lg-0">
                                                                        <label className="form-label" for="zip-code">Zip / Postal code</label>
                                                                        <input type="text" className="form-control" id="zip-code" placeholder="Enter Postal code" value={zip}
                                                                            onChange={(e) => setZip(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                  
                                    <li className="checkout-item">
                                        <div className="avatar checkout-icon p-1">
                                            <div className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bxs-wallet-alt text-white font-size-20"></i>
                                            </div>
                                        </div>
                                        <div className="feed-item-list">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Payment Info</h5>
                                                {/* <p className="text-muted text-truncate mb-4">Duis arcu tortor, suscipit eget</p> */}
                                            </div>
                                            <div>
                                                <h5 className="font-size-14 mb-3">Payment method :</h5>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div data-bs-toggle="collapse">
                                                            <label className="card-radio-label">
                                                                <input type="radio" name="pay-method" id="pay-methodoption1" className="card-radio-input" value="creditCard"
                                                                    onChange={(e) => setPaymentMethod(e.target.value)} />
                                                                <span className="card-radio py-3 text-center text-truncate">
                                                                    <i className="bx bx-credit-card d-block h2 mb-3"></i>
                                                                    Credit / Debit Card
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3 col-sm-6">
                                                        <div>
                                                            <label className="card-radio-label">
                                                                <input type="radio" name="pay-method" id="pay-methodoption2" className="card-radio-input" value="paypal"
                                                                    onChange={(e) => setPaymentMethod(e.target.value)} />
                                                                <span className="card-radio py-3 text-center text-truncate">
                                                                    <i className="bx bxl-paypal d-block h2 mb-3"></i>
                                                                    Paypal
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6 ">
                                                        <div>
                                                            <label className="card-radio-label">
                                                                <input
                                                                    type="radio"
                                                                    name="pay-method"
                                                                    id="pay-methodoption3"
                                                                    className="card-radio-input"
                                                                    value="cash"
                                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                                />
                                                                <span className="card-radio py-3 text-center text-truncate">
                                                                    <i className="bx bx-money d-block h2 mb-3"></i>
                                                                    Cash on Delivery
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <div className="row my-4">
                            <div className="col">
                                <a href="ecommerce-products.html" className="btn btn-link text-muted">
                                    <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping </a>
                            </div>
                            {/* <!-- end col --> */}
                            <div className="col">
                                <div className="text-end mt-2 mt-sm-0">
                                    <button type='submit' className="btn btn-success" onClick={handleData}>
                                        <i className="mdi mdi-cart-outline me-1"></i>
                                        Proceed
                                    </button>
                                </div>
                            </div>
                            {/* <!-- end col --> */}
                        </div>
                        {/* <!-- end row--> */}
                    </div>
                    <div className="col-xl-4">
                        <div className="card checkout-order-summary ibox-content">
                            <div className="card-body">
                                <div className="p-3 bg-light mb-3">
                                    <h5 className="font-size-16 mb-0">Order Summary <span className="float-start ">#{id}</span></h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-centered mb-0 table-nowrap">
                                        <thead>
                                            <tr>
                                                <th className="border-top-0" style={{ width: "110px" }} scope="col">Product</th>
                                                <th className="border-top-0" scope="col">Product Desc</th>
                                                <th className="border-top-0" scope="col">Price</th>
                                            </tr>
                                        </thead>

                                    </table>
                                   
                                        <table className="table table-centered mb-0 table-nowrap">

                                            <tbody>

                                                <tr>
                                                    <th scope="row checkout-img">
                                                        <img src={BASE_URL_IMG + productdata.Image} alt="product-img" title="product-img" className="avatar-lg rounded" />
                                                    </th>
                                                    <td>
                                                        <h5 className="font-size-16 text-truncate"><a href="#" className="text-dark">{productdata.productname}</a></h5>
                                                        <p className="text-muted mb-0">
                                                            <i className="bx bxs-star text-warning"></i>
                                                            <i className="bx bxs-star text-warning"></i>
                                                            <i className="bx bxs-star text-warning"></i>
                                                            <i className="bx bxs-star text-warning"></i>
                                                            <i className="bx bxs-star-half text-warning"></i>
                                                        </p>
                                                        {/* <p className="text-muted mb-0 mt-1">$ {productdata.price} x {productdata.quantity}</p> */}
                                                    </td>
                                                    <td>$ {totalAmount}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                   
                                    <table className="table table-centered mb-0 table-nowrap">

                                        <tbody>


                                            <tr>
                                                <td colspan="2">
                                                    <h5 className="font-size-14 m-0">Sub Total :</h5>
                                                </td>
                                                <td>
                                                    ${totalAmount}
                                                </td>
                                            </tr>

                                            {/* <tr>
                                                <td colspan="2">
                                                    <h5 className="font-size-14 m-0">Discount :</h5>
                                                </td>
                                                <td>
                                                    - $ 78
                                                </td>
                                            </tr> */}

                                            {/* <tr>
                                                <td colspan="2">
                                                    <h5 className="font-size-14 m-0">Shipping Charge :</h5>
                                                </td>
                                                <td>
                                                    $ 25
                                                </td>
                                            </tr> */}
                                            <tr>
                                                <td colspan="2">
                                                    <h5 className="font-size-14 m-0">Estimated Tax :</h5>
                                                </td>
                                                <td>
                                                    $ 18
                                                </td>
                                            </tr>

                                            <tr className="bg-light">
                                                <td colspan="2">
                                                    <h5 className="font-size-14 m-0">Total:</h5>
                                                </td>
                                                <td>
                                                    ${(parseFloat(totalAmount) + 18).toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end row --> */}

            </div>
            <ToastContainer />
        </div>
    )
}