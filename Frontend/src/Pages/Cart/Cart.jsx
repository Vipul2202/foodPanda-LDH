import React, { useEffect, useState } from 'react';
import "./Cart.css";
import { Link, useNavigate } from 'react-router-dom';
import apiServices, { BASE_URL_IMG } from '../../ApiServices/ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'primereact/button';

export default function Cart() {
  const nav = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [cartid, setCartId] = useState([]);
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCart = () => {
    const data = { userId: id };
    apiServices.getCart(data)
      .then((data) => {
        setCart({ items: data?.data?.items });
        setCartId(data?.data?._id);
      })
      .catch((err) => {
        toast.error("Something went wrong", err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, [id]);

  const deletecart = (itemId) => {
    const data = { productId: itemId._id, userId: id };
    apiServices.removeFromCart(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          // Remove the item from the cart locally
          setCart(prevCart => ({
            items: prevCart.items.filter(item => item.productId._id !== itemId._id)
          }));
          // Recalculate the total amount
          calculateTotalAmount();
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((error) => {
        toast.error("Failed to remove the item: " + error.message);
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.items.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: parseInt(newQuantity, 10) || 0,
        };
      }
      return item;
    });

    setCart({ items: updatedCart });
    apiServices.updateQuantity(productId, newQuantity)
      .then((response) => {
        toast.success('Quantity updated successfully:', response);
        setTimeout(() => {
          nav("/check-out");
        }, 3000);
        // Recalculate the total amount after quantity change
        calculateTotalAmount();
      })
      .catch((error) => {
        toast.error("Failed to update quantity: " + error.message);
      });
  };

  const calculateTotalAmount = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.productId.price * item.quantity;
    });
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cart]);

  return (
    <div className='cart-body'>
      <div className="container">
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-md-9">
              <div className="ibox">
                <div className="ibox-title">
                  <span className="float-end">(<strong>{cart.items && cart.items.length}</strong>) items</span>
                  <h5>Items in your cart</h5>
                </div>
                {cart && cart.items && cart.items.length > 0 ? (
                  <div className="ibox-content">
                    {cart.items.map((item) => (
                      <div key={item._id} className="table-responsive">
                        <table className="table shoping-cart-table">
                          <tbody>
                            <tr>
                              <td width="90">
                                <div className="cart-product-imitation"> <img src={BASE_URL_IMG + item.productId?.Image} alt="" className='img-fluid' /></div>
                              </td>
                              <td className="desc">
                                <h3 className='h3-text'>
                                  <Link to={`/single-product/${item.productId._id}`} className="text-navy">
                                    {item.productId.productname}
                                  </Link>
                                </h3>
                                <p className="small text-justify">
                                  {item.productId.description}
                                </p>
                              </td>
                              <td>
                                ${item.productId.price}
                                <s className="small text-muted"> ${item.productId.price}</s>
                              </td>
                              <td width="65">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                />
                              </td>
                              <td>
                                <h4>${item.productId.price * item.quantity}</h4>
                              </td>
                              <Button
                                icon="pi pi-trash"
                                className="rounded-circle p-button-danger p-mr-2"
                                onClick={() => deletecart(item.productId)}
                                tooltip="Delete"
                              />
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No items in the cart</p>
                )}

                <div className="ibox-content">
                  <Link to="/check-out">
                    <button className="btn btn-primary float-end check-out-btn">
                      <i className="fa fa fa-shopping-cart"></i> Checkout
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="btn btn-white"><i className="fa fa-arrow-left"></i> Continue shopping</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ibox">
                <div className="ibox-title">
                  <h5>Cart Summary</h5>
                </div>
                <div className="ibox-content">
                  <span>Total</span>
                  <h2 className="font-bold">${totalAmount.toFixed(2)}</h2>
                  <hr />
                  <span className="text-muted small">
                    *For United States, France and Germany applicable sales tax will be applied
                  </span>
                  <div className="m-t-sm">
                    <div className="btn-group">
                      <Link className="btn btn-primary btn-sm"><i className="fa fa-shopping-cart"></i> Checkout</Link>
                      <a href="#" className="btn btn-white btn-sm"> Cancel</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ibox">
                <div className="ibox-title">
                  <h5>Support</h5>
                </div>
                <div className="ibox-content text-center">
                  <h3 className='h3-text'><i className="fa fa-phone"></i> +43 100 783 001</h3>
                  <span className="small">
                    Please contact with us if you have any questions. We are available 24h.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
