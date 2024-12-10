import axios from "axios"
// const apiUrl = process.env.REACT_APP_API_URL;
const BASE_URL=`${apiUrl}/admin/`
const token = sessionStorage.getItem('token');
const header = {
  Accept: "application/json",
  Authorization: sessionStorage.getItem("token"),
};
const apiUrl = process.env.REACT_APP_API_URL;
export const BASE_URL_IMG=`${apiUrl}`
// const token=sessionStorage.getItem("token")
// const header={
//     Authorization:"application/json "+token
// }
class apiServices {
  // ---------------user Register Apis------------
  register(data) {
    console.log(data);
    return axios.post(BASE_URL + "register", data,{ headers: header });
  }

  // ---------------user Login Apis------------
  login(data) {
    //   console.log(data)
    return axios.post(BASE_URL + "login", data,{ headers: header });
  }

  adduser(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(data);
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    console.log(data);
    return axios.post(BASE_URL + "adduser", data, { headers: header });
  }

  updateuser(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateuser", data, { headers: header });
  }

  changeStatus(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(data);
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    console.log(data);
    return axios.post(BASE_URL + "changeStatus", data, { headers: header });
  }

  getsinglecustomer(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(data);
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    console.log(data);
    return axios.post(BASE_URL + "getsinglecustomer", data, {
      headers: header,
    });
  }

  getallcustomer(data) {
    const token = sessionStorage.getItem("token");
    // console.log(token)
    //
    const header = {
      Accept: "application/json",
      Authorization: token,
    };

    return axios.post(BASE_URL + "getallcustomer", data, { headers: header });
  }

  getalluser(data) {
    const token = sessionStorage.getItem("token");
    // console.log(token)
    //
    const header = {
      Accept: "application/json",
      Authorization: token,
    };

    return axios.post(BASE_URL + "getalluser", data, { headers: header });
  }

  getsingleuser(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);

    const header = {
      Accept: "application/json",
      Authorization: token,
    };

    return axios.post(BASE_URL + "getsingleuser", data, { headers: header });
  }

  deletecustomer(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);

    const header = {
      Accept: "application/json",
      Authorization: token,
    };

    return axios.post(BASE_URL + "deletecustomer", data, { headers: header });
  }

  //  ================product Api===============================
  addProduct(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "add-Product", data, { headers: header });
  }

  getallProduct(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getallProduct", data, { headers: header });
  }

  getsingleProduct(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getsingle-Product", data, {
      headers: header,
    });
  }

  updateProductStatus(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "update-Product-Status", data, {
      headers: header,
    });
  }

  updateProduct(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "updateProduct", data, { headers: header });
  }
  deleteProduct(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "delete-Product", data, { headers: header });
  }

  // =======order api=================
  MakeOrder(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "MakeOrder", data, { headers: header });
  }
  placeOrders(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "placeOrders", data, { headers: header });
  }
  getAllOrders(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getAllOrders", data, { headers: header });
  }
  updateOrder(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "updateOrder", data, { headers: header });
  }
  getsingleOrder(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getsingleOrder", data, { headers: header });
  }
  updateorderStatus(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "updateorderStatus", data, {
      headers: header,
    });
  }
  Trackorder(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "Trackorder", data, { headers: header });
  }
  get_income(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get_income", data, { headers: header });
  }

  // =========banner api==========
  // addBanner(data) {
  //   const token = sessionStorage.getItem("token");
  //   const header = {
  //     Accept: "application/json",
  //     Authorization: token,
  //   };
  //   return axios.post(BASE_URL + "addBanner", data,);
  // }
  // getsingleBanner(data) {
  //   const token = sessionStorage.getItem("token");
  //   const header = {
  //     Accept: "application/json",
  //     Authorization: token,
  //   };
  //   return axios.post(BASE_URL + "getsingleBanner", data,);
  // }
  // updateBanner(data) {
  //   const token = sessionStorage.getItem("token");
  //   const header = {
  //     Accept: "application/json",
  //     Authorization: token,
  //   };
  //   return axios.post(BASE_URL + "updateBanner", data, );
  // }
  // getallBanner(data) {
  //   const token = sessionStorage.getItem("token");
  //   const header = {
  //     Accept: "application/json",
  //     Authorization: token,
  //   };
  //   return axios.post(BASE_URL + "getallBanner", data, );
  // }
  // deleteBanner(data) {
  //   const token = sessionStorage.getItem("token");
  //   const header = {
  //     Accept: "application/json",
  //     Authorization: token,
  //   };
  //   return axios.post(BASE_URL + "deleteBanner", data, );
  // }
  // updateBannerStatus(data) {
  //   const token = sessionStorage.getItem("token");
  //   const header = {
  //     Accept: "application/json",
  //     Authorization: token,
  //   };
  //   return axios.post(BASE_URL + "updateBannerStatus", data, {
  //     headers: header,
  //   });
  // }
  // ====================Address Api==================
  addaddress(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "addaddress", data, { headers: header });
  }

  updateAddress(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "update-Address", data, { headers: header });
  }
  getAllAddresses(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get-All-Addresses", data, {
      headers: header,
    });
  }
  getSingleAddresses(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get-Single-Addresses", data, {
      headers: header,
    });
  }
  updateAddressStatus(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "updateAddressStatus", data, {
      headers: header,
    });
  }
  deleteAddress(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "delete-Address", data, { headers: header });
  }
  // =============cart apis===========
  // add cart
  addToCart(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "add-cart", data, { headers: header });
  }

  // get user cart
  getCart(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get-Cart", data, { headers: header });
  }

  // get all cart
  getallCart(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get-all-cart", data, { headers: header });
  }
  updateQuantity(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "updateQuantity", data, { headers: header });
  }
  removeFromCart(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "removeFromCart", data, { headers: header });
  }

  // =========Review Apis============
  getallReview(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get-all-Review", data,);
  }

  deleteReview(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "delete-Review", data, { headers: header });
  }

  updateReviewStatus(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "update-Review-Status", data, {
      headers: header,
    });
  }
  addReview(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "addReview", data, );
  }

  getReviewsByProduct(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getReviewsByProduct", data, {
      headers: header,
    });
  }

  // ======================Contact api===============================
  contact(data) {
    return axios.post(BASE_URL + "contact", data);
  }

  getallcontacts(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "get-all-contacts", data, { headers: header });
  }

  deleteContact(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: token,
    };

    return axios.post(BASE_URL + "deleteContact", data, { headers: header });
  }

  latestContact(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: token,
    };

    return axios.post(BASE_URL + "latestContact", data, { headers: header });
  }

  // ======================Contact api===============================

  // ==============testimonial api start=================
  addTestimonial(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addTestimonial", data, );
  }
  getallTestimonial(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallTestimonial", data, {
      headers: header,
    });
  }
  getsingleTestimonial(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleTestimonial", data, {
      headers: header,
    });
  }

  updateTestimonial(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateTestimonial", data, {
      headers: header,
    });
  }
  updatetestimonialStatus(data) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updatetestimonialStatus", data, {
      headers: header,
    });
  }
  // ==============testimonial api end=================
  // ====comment api=============
  getAllComments(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getAllComments", data, { headers: header });
  }

  createblogComment(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "createblogComment", data, {
      headers: header,
    });
  }
  getallcomment(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getallcomment", data, { headers: header });
  }
  deleteComment(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "deleteComment", data, { headers: header });
  }
  updateCommentStatus(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "updateCommentStatus", data, {
      headers: header,
    });
  }

  // =======wishlist api==========
  getWishlist(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "getWishlist", data, { headers: header });
  }
  addToWishlist(data) {
    const token = sessionStorage.getItem("token");
    const header = {
      Accept: "application/json",
      Authorization: token,
    };
    return axios.post(BASE_URL + "addToWishlist", data, { headers: header });
  }
}

export default new apiServices()