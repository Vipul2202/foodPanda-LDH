import React from 'react'

export default function Footer() {
  return (
    <>
        {/* <!-- Footer Start --> */}
    <div className="container-fluid bg-dark text-light footer my-6 mb-0 py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Office Address</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                    <div className="d-flex pt-2 pl-4">
    <a className="btn btn-square btn-outline-light rounded-circle me-1" href=""><i className="fab fa-facebook-f"></i></a>
    <a className="btn btn-square btn-outline-light rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
</div>

                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Quick Links</h4>
                    <a className="btn btn-link" href="/about">About Us</a>
                    <a className="btn btn-link" href="">Contact Us</a>
                    <a className="btn btn-link" href="/service">Our Services</a>
                    <a className="btn btn-link" href="">Terms & Condition</a>
                    <a className="btn btn-link" href="">Support</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Quick Links</h4>
                    <a className="btn btn-link" href="/about">About Us</a>
                    <a className="btn btn-link" href="">Contact Us</a>
                    <a className="btn btn-link" href="/service">Our Services</a>
                    <a className="btn btn-link" href="">Terms & Condition</a>
                    <a className="btn btn-link" href="">Support</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Photo Gallery</h4>
                    <div className="row g-2">
                        <div className="col-4">
                            <img className="img-fluid bg-light rounded p-1" src="./assets/img/product-1.jpg" alt="Image"/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light rounded p-1" src="./assets/img/product-2.jpg" alt="Image"/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light rounded p-1" src="./assets/img/product-3.jpg" alt="Image"/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light rounded p-1" src="./assets/img/product-2.jpg" alt="Image"/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light rounded p-1" src="./assets/img/product-3.jpg" alt="Image"/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light rounded p-1" src="./assets/img/product-1.jpg" alt="Image"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End -->


    <!-- Copyright Start --> */}
    <div className="container-fluid copyright text-light py-4 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a href="#/">Shree Krishna Bakers</a>, All Right Reserved.
                </div>
                <div className="col-md-6 text-center text-md-end">

                    Designed By <a href="https://htmlcodex.com">Shree Krishna Bakers</a>
                     {/* <br/>Distributed By: <a className="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>  */}
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Copyright End --> */}


 
    </>
  )
}
