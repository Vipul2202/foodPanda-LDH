import React from 'react'
import "./FullpageProduct.css"
export default function FullpageProduct() {
  return (
    <div className='fullpageproductbody'>
        <div className="container-fluid">
    {/* <!-- start event block --> */}
    <div className="row align-items-center event-block no-gutters margin-40px-bottom">
        <div className="col-lg-5 col-sm-12">
            <div className="position-relative event-image">
                <img src="/assets/images/logo/left.png" alt=""/>
              
            </div>
        </div>
        <div className="col-lg-7 col-sm-12">
            <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 "><a href="event-details.html" className="text-theme-color"> Wishing You Well Tea</a></h5>
                <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li><i className="fa-solid fa-dollar-sign"></i> 49</li>
                    
                </ul>
                <p className='right-product-p'>Would you like a hug? This tea blend is for anyone who needs a little support from a friend. The tea has a rich yellow shimmer like a warm ray of sunshine.</p>
                <img src='/assets/images/cartoon/Layer_x0020_1-4.png' />
                <a className="butn small margin-10px-top md-no-margin-top " href="#">Read More <i className="fas fa-long-arrow-alt-right margin-10px-left"></i></a>
            </div>
        </div>
    </div>
    {/* <!-- end event block --> */}

    {/* <!-- start event block --> */}
    <div className="row align-items-center event-block no-gutters margin-40px-bottom ">
        <div className="col-lg-7 order-2 order-lg-1">
            <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 rightcardmargin"><a href="event-details.html" className="text-theme-color">Don't Worry, Tea Happy</a></h5>
                <ul className="event-time margin-10px-bottom md-margin-5px-bottom ">
                    <li><i className="fa-solid fa-dollar-sign"></i>50</li>
                    
                </ul>
                <p className='right-product-p'>Gloomy thoughts? Not our cup of tea! Our cup is filled with this joyous yellow tea blend. The complex blend with fruit and spice notes perfectly accompanies merry whistling and jumping with joy.</p>
                <div className="row">
                    <div className="">

                    </div>
                    <div className="">
                    <img src='/assets/images/cartoon/Layer_x0020_1-4.png' />
                <a className="butn small margin-10px-top md-no-margin-top " href="#">Read More <i className="fas fa-long-arrow-alt-right margin-10px-left"></i></a>
                    </div>
                </div>
               
            </div>
        </div>
        <div className="col-lg-5 order-1 order-lg-2">
            <div className="position-relative event-image">
                <img src="/assets/images/logo/right.png" alt=""/>
                
            </div>
        </div>
    </div>
    {/* <!-- end event block --> */}


</div>
    </div>
  )
}
