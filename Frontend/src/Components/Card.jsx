import React from 'react'

export default function Card() {
  return (
    <div>
        <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
    
    

    <div className="productproductcard">
        <div className="productinner-card"> <img src="https://i.imgur.com/4qXhMAM.jpg" className="img-fluid rounded"/>
            <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                <h4>Worksheet chair </h4> <span className="productheart"><i className="fa fa-heart"></i></span>
            </div>
            <div className="mt-2 px-2"> <small>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</small> </div>
            <div className="px-2">
                <h3>$500</h3>
            </div>
            <div className="px-2 mt-3"> <button className="btn-product btn-primary px-3">Buy Now</button> <button className="btn btn-outline-primary px-3">Add to cart</button> </div>
        </div>
    </div>
    
    </div>
    </div>
  )
}
