// controllers/cartController.js

const Cart = require('../Model/Cartmodel');
const Product = require('../Model/Productmodel');

//  get the user's cart
getCart = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get all the user's cart
getallCart = (req,res)=>{
  
  Cart.find(req.body)
  .populate("userId")
  .populate('items.productId')
  .then(data=>{
      res.json({
          'status':200,
          'success':true,
          'msg':'data loaded',
          'data':data
      })
  })
  .catch(err=>{
      res.json({
          status:500,
          success:false,
          msg : 'Error Occur',
          error : String(err)
      })
  })
  
}

getallmore = (req,res)=>{
  
  Cart.find({_id:req.body._id})

  .populate('items.productId')
  .then(data=>{
      res.json({
          'status':200,
          'success':true,
          'msg':'data loaded',
          'data':data
      })
  })
  .catch(err=>{
      res.json({
          status:500,
          success:false,
          msg : 'Error Occur',
          error : String(err)
      })
  })
  
}

// Controller to add a product to the cart
addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.body.userId;

    //  exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

  
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // doesn't have a cart, create a new one
      cart = new Cart({ userId, items: [] });
    }

    //  already in the cart
    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      // update the quantity
      existingItem.quantity += quantity || 1;
    } else {
      // add it
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json({
      status:200,
      success:true,
      massage:"Product added in Cart",
      data:cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

updateQuantity= async (req, res) => {
  const { productId, newQuantity } = req.body;

  try {
    const userId = req.body.userId;
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ error: 'User cart not found' });
    }

    // Find the item in the cart
    const cartItem = userCart.items.find(item => item.productId.equals(productId));

    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    cartItem.quantity = parseInt(newQuantity, 10) || 1;

    await userCart.save();

    res.json({ message: 'Quantity updated successfully', updatedCart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Validate input
    if (!productId || !userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product ID and User ID are required",
      });
    }

    // Find the cart for the given user
    const cart = await Cart.findOne({ userId });

    // If no cart found for the user
    if (!cart) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out the product to remove it from the cart
    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    // If no items were removed (e.g., product not found in cart)
    if (cart.items.length === initialItemCount) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found in cart",
      });
    }

    // Save the updated cart
    await cart.save();

    // Respond with success
    res.json({
      status: 200,
      success: true,
      message: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



// =======delete cart===========
deletecart =async (req, res) => {
    try {
      // Find and delete the user's cart
      const deletedCart = await Cart.findOneAndDelete({});
  
      if (!deletedCart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };




// =======change cart status===========
  const updatecartStatus = async (req, res) => {
    try {
      const formData = req.body;
  
      if (!formData._id || !formData.status) {
        return res.status(422).json({
          success: false,
          status: 422,
          message: "Both _id and status are required",
        });
      }
  
      const cart = await Cart.findOne({ _id: formData._id });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No cart Found",
        });
      }
  
      cart.status = formData.status;
      await cart.save();
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: "cart Status Changed Successfully",
        data: cart,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: err.message || "Internal Server Error",
      });
    }
  };

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  deletecart,
  updatecartStatus,
  getallCart,
  updateQuantity,
  getallmore

}