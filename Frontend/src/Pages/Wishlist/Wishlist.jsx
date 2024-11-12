import React, { useEffect, useState } from 'react'
import "./wishlist.css"
import apiServices, { BASE_URL_IMG } from '../../ApiServices/ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
export default function Wishlist() {

 
  const [wishlist, setWishlist] = useState({ items: [] });
  const [id, setId] = useState(sessionStorage.getItem("_id"));

  useEffect(() => {
    setId(sessionStorage.getItem("_id"));
    let data = {
      userId: id,
    };
    // ========cart get api=========
    apiServices
      .getWishlist(data)
      .then((data) => {
        setWishlist({ items: data?.data?.items })
      
      })
      .catch((err) => {
        toast.error("Something went wrong", err);
      });
  }, [id]);

  return (
    <>
        <section className=" h-custom" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 ">
    <div className="row d-flex justify-content-center align-items-center  wishlistWraper">
      <div className="col">
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

              <div className="col-lg-12">
                <h5 className="mb-3"><a href="#!" className="text-body"><i
                      className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Wishlist</p>
                    <p className="mb-0">You have {wishlist.items && wishlist.items.length ||"0"} items in your wishlist</p>
                  </div>
                  
                </div>
                {wishlist && wishlist.items && wishlist.items.length > 0 ? (
                <div className="card mb-3">
                     {wishlist.items.map((item) => (
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                           src={BASE_URL_IMG + item.productId?.Image}
                            className="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}}/>
                        </div>
                        <div className="ms-3">
                        <Link to={`/single-product/${item.productId._id}`} className="text-navy">  <h5> {item.productId.productname}</h5></Link>
                          {/* <p className="small mb-0">256GB, Navy Blue</p> */}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 className="fw-normal mb-0">{item.quantity}</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 className="mb-0">${item.productId.price}</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i className="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                    ))}
                </div>
                ) : (
                    <p>No items in the cart</p>
                  )}
                

              </div>
             

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
