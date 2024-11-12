import React, { useEffect, useState } from 'react';
import "./CartSidebar.css"
import { Link } from 'react-router-dom';
import apiServices, { BASE_URL_IMG } from '../../ApiServices/ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'primereact/button';
function CartSidebar({ isOpen, onClose }) {
  const [cart, setCart] = useState({ items: [] });
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [totalAmount, setTotalAmount] = useState(0);
  const authenticate = sessionStorage.getItem('authenticate')
  // ========cart get api=========
  // useEffect(() => {
  //   setId(sessionStorage.getItem("_id"));
  //   let data = {
  //     userId: id,
  //   };
  //   // ========cart get api=========
  //   apiServices
  //     .getCart(data)
  //     .then((data) => {
  //       setCart({ items: data?.data?.items })
  //     })
  //     .catch((err) => {
  //       toast.error("Something went wrong", err);
  //     });
  // }, [id, cart]);
  const fetchCart = () => {
    const data = { userId: id };
    apiServices.getCart(data)
      .then((data) => {
        setCart({ items: data?.data?.items });
      })
      .catch((err) => {
        toast.error("Something went wrong", err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, [id]);
  // ===total============
  useEffect(() => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.productId.price * item.quantity;
    });
    setTotalAmount(total);
  }, [cart.items]);

  const handleReadMoreClick = () => {

    if (!authenticate) {
      window.location.href = '/login';
    }
  };


  const deletecart = (itemId) => {
    const data = { productId: itemId._id, userId: id };
    apiServices.removeFromCart(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message || "Product removed from cart");
          setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.filter(item => item.productId._id !== itemId._id)
          }));
          // No need to call calculateTotalAmount manually
        } else {
          toast.error(response.data.message || "Failed to remove the product");
        }
      })
      .catch((error) => {
        toast.error("Failed to remove the item: " + error.message);
      });
  };

  return (
    < div className={`cart-page ${isOpen ? 'open' : ''}`}>
      <div className="cartWraper">


        <div className="cart-content ">
          <div className='cart-header'>
            <h2>Your cart</h2>

            <button onClick={onClose} className="close-button ">
              <i className="fa-solid fa-xmark"></i> Close
            </button>

          </div>
          <hr />
          {/* Cart contents go here */}
          {cart && cart.items && cart.items.length > 0 ? (
            <div className="cart-item-Wraper">
              {cart.items.map((item) => (
                <div className="category-item">

                  <div className="category-img-box">
                    <img src={BASE_URL_IMG + item.productId?.Image} alt="dress & frock" width="30" />
                  </div>

                  <div className="category-content-box">

                    <div className="category-content-flex">
                      <h3 className="category-item-title">{item.productId.productname}</h3>

                      <p className="category-item-amount">${item.productId.price}x{item.quantity}
                        <br />
                        <span>${item.productId.price * item.quantity}</span>
                      </p>
                      <Button
                        icon="pi pi-trash"
                        className="rounded-circle p-button-danger p-mr-2"
                        onClick={() => deletecart(item.productId)}
                        tooltip="Delete"
                      />
                    </div>

                    {/* <a href="#" className="category-btn">Show all</a> */}

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        <hr className='cart_sidebar_footer_hr' />
        <div className='cart-footer'>
          {/* <span className="float-start mx-2">(<strong>{cart.items.length}</strong>) items</span> */}
          <br />
          <button onClick={onClose} className="close-button px-2">
            Total<i className="fa-solid fa-dollar-sign px-1"></i> {(totalAmount ? totalAmount : 0).toFixed(2)}
          </button>
          {authenticate ? (
            <>
              <button className="close-button  px-2" >
                <Link to="/cart" className='Proceed-button' >Proceed</Link>
              </button>
            </>
          ) : (
            <>
              <button className="close-button  px-2" onClick={handleReadMoreClick}>
                <Link className='Proceed-button' >Proceed</Link>
              </button>
            </>
          )}


        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CartSidebar;
