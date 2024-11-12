import { Link, useParams } from "react-router-dom"
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../../ApiServices/ApiServices";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import "./singleproduct.css"
import { format } from 'date-fns';
import { Rating } from "primereact/rating";
export default function SingleProduct() {
  const param = useParams()
  const id = param._id
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true);
  const authenticate = sessionStorage.getItem('authenticate')
  const [ids, setId] = useState(sessionStorage.getItem("_id"));
  const [reviews, setReviews] = useState([]);
  const [newreview, setNewReview] = useState("");
  const [rating, setRating] = useState(null);

  const handleReadMoreClick = () => {

    if (!authenticate) {
      window.location.href = '/login';
    }
  };

  const handleAddToCart = () => {
    if (!authenticate) {
      window.location.href = '/login';
      return;
    }

    const data = {
      productId: id,
      quantity: 1,
      userId: ids,
    };

    apiServices.addToCart(data)
      .then(data => {
        if (data.data.success) {
          toast.success("product added in cart");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch(error => {

        toast.error('Failed to add to cart. Please try again.');
      });
  };
  const handleAddToWishlist = () => {
    if (!authenticate) {
      window.location.href = '/login';
      return;
    }

    const data = {
      productId: id,
      userId: ids,
    };

    apiServices.addToWishlist(data)
      .then(data => {


        if (data.data.success) {
          toast.success("product added in cart");
        } else {
          toast.error(data.data.message);
        }
      })
      .catch(error => {

        toast.error('Failed to add to cart. Please try again.');
      });
  };




  const override = {
    display: "block",
    // "margin":"0 auto",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    let data = {
      _id: id
    }
    apiServices.getsingleProduct(data).then(data => {
      if (data.data.success) {
        setProduct(data.data.data);
      } else {
        toast.error(data.data.msg);
      }
    }).catch(err => {
      toast.error("Something went wrong");
    });

    apiServices.getReviewsByProduct({
      productId: id,
    }).then(data => {
      console.log("review data",data.data);
        setReviews(data.data);
    }).catch(err => {
      toast.error("Something went wrong");
    });
  }, []);


  const createReview = (e) => {
    e.preventDefault();
  
    if (!newreview || !rating) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    let data = {
      comment: newreview,
      rating: rating,
      productId: id,
    };
  
    apiServices
      .addReview(data)
      .then((response) => {
        const responseData = response.data;
  
        if (responseData.success) {
          toast.success("Review added successfully");
        } else {
          toast.error(responseData.message);
        }
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        toast.error("You already review this product Failed to add review. Please try again.");
      });
  };
  


  return (
    <>
      <div className="singleproductWraper">
        <ScaleLoader loading={loading} cssOverride={override} size={70} />
        <div className={loading ? "disable-full-screen" : ""}>
          {/* <!-- course Details Section Begin --> */}
          <section className="">
            <div className="container mt-5 ">
              <div className="row ">
                <div className="col-lg-6 col-md-6 book-container article">
                  <div className="">
                    <div className="">
                      <img className="img-fluid"
                        src={BASE_URL_IMG + product?.Image} alt="book image" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 text-start">
                  <div className="">
                    <h3 className="fs-1 fw-bold productname text-start pt-3">{product?.productname}
                    </h3>

                    <div className="">
                      <i className="fa fa-star text-warning"></i>
                      <i className="fa fa-star text-warning"></i>
                      <i className="fa fa-star text-warning"></i>
                      <i className="fa fa-star text-warning"></i>
                      <i className="fa fa-star-half-o text-warning"></i>
                      <span className=" fw-bolder px-2">(18 reviews)</span>
                    </div>
                    <div className="fw-bolder">&#8377;{product?.price}</div>
                    <div className="bookcontent-container">
                      <p className="bookcontent fs-6">
                        {product?.description}
                      </p>
                    </div>

                    {authenticate ? (
                      <>
                        <Link className="  mt-4 login-button" to={"/single-order/" + `${id}`}>Order Now</Link>
                        <Link className="mx-3  mt-4 login-button" onClick={handleAddToCart}>Add to cart</Link>
                    
                      </>
                    ) : (
                      <>
                        <div className="butonWraper">
                          <button className="  mt-4 login-button" onClick={handleReadMoreClick}>
                            Order Now
                          </button>
                          <button className=" mx-3 mt-4 login-button" onClick={handleReadMoreClick}>
                            Add to cart
                          </button>
                        
                        </div>


                      </>
                    )}
                    {/* <Link to={"/payment-form/"+`${book?._id}`} className="  mt-4 login-button">Book Now</Link> */}


                    {/* <Link to='/login'><a className="site-btn link-light">Enroll Now</a></Link> */}
                    <div className="text-start pt-3">

                      <li><b>Availability:</b> <span className=" text-end">In Stock</span></li>
                      <li><b>purches:</b> <span className=" text-end"> {product?.countInStock}</span></li>

                      {/* <b className="">Share on</b>
                      <div className="mt-3 text-start d-flex singleProduct_icon">
                        <a href="#"><i className="fa fa-facebook mx-2 fs-3"></i></a>
                        <a href="#"><i className="fa fa-twitter mx-2 fs-3"></i></a>
                        <a href="#"><i className="fa fa-instagram mx-2 fs-3"></i></a>

                      </div> */}


                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section profile">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body pt-3">
                    {/* <!-- Bordered Tabs --> */}
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button type="submit"
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-overview"
                        >
                          Description<i className="fa-regular fa-address-card mx-1"></i>
                        </button>
                      </li>

                      <li className="nav-item">
                        <button type="button"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-edit "
                        >
                          Review <i className="fa-solid fa-user-pen px-5 "></i>
                        </button>
                      </li>


                    </ul>
                    <div className="tab-content pt-2">
                      <div
                        className="tab-pane fade show active profile-overview"
                        id="profile-overview"
                      >
                        <div className="course__details__tab__desc">
                          <h6>Product Infomation</h6>
                          {product?.description}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade pt-3 " id="profile-edit">
                        <div className="course__details__tab__desc">
                          
                          {authenticate ? (
                            <>
                              <section className="">
                                <div className="container my-5 py-5">
                                  <h2 className="comments-title text-start"> <i className="fa fa-comments fa-fw fa-lg m-r-3"></i>Reviews</h2>


                                  <div className="card">
                                    <div className="card-body p-4">
                                      <div className=" d-flex justify-content-start">
                                        <Rating value={rating} onChange={(e) => setRating(e.value)} cancel={false} className="reviewstart" />
                                      </div>
                                      <div className=" my-3 d-flex flex-row gap-2 comment-textarea">
                                        <textarea
                                          className=" form-control col-9"
                                          placeholder="Write a comment..."
                                          value={newreview}
                                          onChange={(e) => setNewReview(e.target.value)}
                                        />
                                        <button className="replybutton "
                                          onClick={createReview}>
                                          <div className="svg-wrapper-1">
                                            <div className="svg-wrapper">
                                              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                              </svg>
                                            </div>
                                          </div>
                                          <span>Send</span>
                                        </button>

                                      </div>
                                      {/* ==================start review main map================ */}
                                      {reviews && reviews.length > 0 ? (
                                        reviews.map((review) => (

                                          <div className="row mt-5" key={review._id}>
                                            <div className="col">
                                              {/* ==================start review content================ */}
                                              <div className="d-flex flex-start">
                                                <img className="rounded-circle shadow-1-strong me-3"
                                                  src={BASE_URL_IMG + review?.user?.Image || "/assets/images/avtar.png"} alt="avatar" width="65"
                                                  height="65"
                                                  onError={(e) => {
                                                    e.target.src = "/assets/images/avtar.png";
                                                  }}
                                                />
                                                <div className="flex-grow-1 flex-shrink-1">
                                                  <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                      <p className="mb-1 text-capitalize">
                                                        <Link >{review.user.name} </Link>
                                                        <span className="small"> {format(new Date(review.createdAt), 'MMMM d, yyyy')}</span>
                                                      </p>
                                                      {/* ==================end review content================ */}


                                                    </div>
                                                    <p className="small mb-0">
                                                    <Rating value={review.rating} readOnly cancel={false} />
                                                      {review.comment}
                                                    </p>
                                                  </div>



                                                  {/* </div>
             )} */}
                                                  {/* ==================end togel for show hide  replies================ */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))

                                      ) : (

                                        <p>No reviews available</p>
                                      )}
                                      {/* ==================end review main map================ */}
                                    </div>
                                  </div>
                                </div>

                              </section>
                            </>
                          ) : (
                            <>
                              <section className="">
                                <div className="container my-5 py-5">
                                  <h2 className="comments-title text-start"> <i className="fa fa-comments fa-fw fa-lg m-r-3"></i>Reviews</h2>


                                  <div className="card">
                                    <div className="card-body p-4">
                                      <div className=" my-3 d-flex flex-row gap-2 comment-textarea">
                                        <textarea
                                          className=" form-control col-9"
                                          placeholder="Write a comment..."
                                          value={newreview}
                                          onChange={(e) => setNewReview(e.target.value)}
                                        />
                                        <button className="replybutton "
                                          onClick={handleReadMoreClick}>
                                          <div className="svg-wrapper-1">
                                            <div className="svg-wrapper">
                                              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                              </svg>
                                            </div>
                                          </div>
                                          <span>Send</span>
                                        </button>

                                      </div>
                                      {/* ==================start review main map================ */}
                                      {reviews && reviews.length > 0 ? (
                                        reviews.map((review) => (

                                          <div className="row mt-5" key={review._id}>
                                            <div className="col">
                                              {/* ==================start review content================ */}
                                              <div className="d-flex flex-start">
                                                <img className="rounded-circle shadow-1-strong me-3"
                                                  src={BASE_URL_IMG + review?.user?.Image || "/assets/images/avtar.png"} alt="avatar" width="65"
                                                  height="65"
                                                  onError={(e) => {
                                                    e.target.src = "/assets/images/avtar.png";
                                                  }}
                                                />
                                                <div className="flex-grow-1 flex-shrink-1">
                                                  <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                      <p className="mb-1 text-capitalize">
                                                        <Link >{review.user.name}</Link>
                                                        <span className="small">{format(new Date(review.createdAt), 'MMMM d, yyyy')}</span>
                                                      </p>
                                                      {/* ==================end review content================ */}


                                                    </div>
                                                    <p className="small mb-0">
                                                    <Rating value={review.rating} readOnly cancel={false} />
                                                      {review.comment}
                                                    </p>
                                                  </div>


                                                  {/* ==================end togel for show hide  replies================ */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))

                                      ) : (

                                        <p>No reviews available</p>
                                      )}
                                      {/* ==================end review main map================ */}
                                    </div>
                                  </div>
                                </div>

                              </section>

                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Bordered Tabs --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}