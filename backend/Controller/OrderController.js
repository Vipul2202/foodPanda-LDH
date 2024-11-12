
const Order = require('../Model/Ordermodel');
const PRODUCT = require('../Model/Productmodel');
const Cart = require('../Model/Cartmodel');


/* get monthly income (only admin) */
async function get_income(req, res) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: previousMonth
                    },
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json({
            type: "success",
            income
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        });
    }
}


Trackorder = (req,res)=>{
  Order.find({ _id:req.body._id })
  .select("orderStatus")
  .then(data=>{
      res.json({
          status:200,success:true, message:" track order  API",
          data:data
      })
  })
  .catch(err=>{
      res.json({
          status:400,success:false, message:"Error ",err:err
      })
  })
  
}
/* get user's orders */
getsingleOrder = (req, res) => {
  var validate = "";
  if (req.body._id == "") {
    validate += "_id is required";
  }

  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    });
  } else {
    Order.findOne({ _id: req.body._id })
    .populate('items.productId')
  .populate('userId')
  .populate('cartId')
      .exec()
      .then((orderdata) => {
        res.json({
          status: 200,
          success: true,
          msg: "data loaded",
          data: orderdata,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          msg: "Error Occur",
          error: String(err),
        });
      });
  }
};



/* get all orders (only admin) */

getAllOrders = (req, res) => {
  Order.find(req.body)
  .populate('items.productId')
  .populate('userId')
  .populate('cartId')
    .exec()
    .then((orderdata) => {
      res.json({
        status: 200,
        success: true,
        msg: "data loaded",
        data: orderdata,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        msg: "Error Occur",
        error: String(err),
      });
    });
};
//  get a specific order by ID
getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id; 

    const order = await Order.findOne({ _id: orderId, user: userId }).populate('products.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





const MakeOrder = async (req, res) => {
  try {
    const userId = req.decoded;
    const billingAddressData = req.body.billingAddress;
    const {  products, totalAmount, paymentMethod, paymentStatus, cartId } = req.body;

    // Check if products array is empty
    if (!products || products.length === 0) {
      console.log('Empty Products Array:', products);
      return res.status(400).json({ error: 'Products array is empty' });
    }

    // Check existence of products and stock availability
    for (const productInfo of products) {
      const product = await PRODUCT.findById(productInfo.productId);
      if (!product || product.countInStock < productInfo.quantity) {
        return res.status(400).json({ error: `Product ${productInfo.productId} not found or insufficient stock` });
      }
    }


    // Create a new order
    const newOrder = new Order({
      userId,
      cartId,
      items: products,
      // products: req.body.productId,
      billingAddress: {
        name: billingAddressData.name,
        email: billingAddressData.email,
        phone: billingAddressData.phone,
        street1: billingAddressData.street1,
        city: billingAddressData.city,
        state: billingAddressData.state,
        zip: billingAddressData.zip,
        country: billingAddressData.country,
      },
      orderStatus: req.body.orderStatus , 
      totalAmount,
      paymentMethod,
      paymentStatus , 
      status: true, 
    });

    // Update stock for each product
    for (const productInfo of products) {
      const product = await PRODUCT.findById(productInfo.productId);
      product.countInStock -= productInfo.quantity;
      await product.save();
    }

    // Save the new order to the database
    await newOrder.save();
    if (cartId) {
      await Cart.findByIdAndUpdate(cartId, { $set: { items: [] } });
    }
    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const placeOrders = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const userId = req.decoded;
    const billingAddressData = req.body.billingAddress;
    const { products, totalAmount, paymentMethod, paymentStatus } = req.body;

    const product = products[0];
    console.log('Product:', product);

    // Check existence of the product and stock availability
    const existingProduct = await PRODUCT.findById(product.productId);
    console.log('Existing Product:', existingProduct);

    if (!existingProduct || existingProduct.stock < product.quantity) {
      return res.status(400).json({ error: `Product ${product.productId} not found or insufficient stock` });
    }


    // Create a new order
    const newOrder = new Order({
      userId,
      items: [{ productId: product.productId, quantity: product.quantity }],
      billingAddress: {
        name: billingAddressData.name,
        email: billingAddressData.email,
        phone: billingAddressData.phone,
        street1: billingAddressData.street1,
        city: billingAddressData.city,
        state: billingAddressData.state,
        zip: billingAddressData.zip,
        country: billingAddressData.country,
      },
      orderStatus: req.body.orderStatus,
      totalAmount,
      paymentMethod,
      paymentStatus,
      status: true,
    });

    // Update stock for each product
    existingProduct.countInStock -= product.quantity;
    await existingProduct.save();
    // Save the new order to the database
    await newOrder.save();

    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







// delete an order
deleteOrder = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    for (const productInfo of order.products) {
      const product = await Product.findById(productInfo.product);
      product.stock += productInfo.quantity;
      await product.save();
    }

    await order.remove();

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update orderStatus
const updateTrackingStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // Validate orderStatus value
    if (!['pending', 'processing', 'shipped', 'delivered'].includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid orderStatus value' });
    }

    // Find the order and update orderStatus
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// =============update order=============
updateOrder=async (req, res) => {
  try {
    
    const { orderStatus, totalAmount, paymentMethod, paymentStatus, quantity } = req.body;

    // Check if order exists
    const existingOrder = await Order.findById({ _id: req.body._id });
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order fields
    if (orderStatus) {
      existingOrder.orderStatus = orderStatus;
    }
    if (totalAmount) {
      existingOrder.totalAmount = totalAmount;
    }
    if (paymentMethod) {
      existingOrder.paymentMethod = paymentMethod;
    }
    if (paymentStatus) {
      existingOrder.paymentStatus = paymentStatus;
    }

    // Update quantity for each product in the order
    if (quantity) {
      for (const productInfo of existingOrder.items) {
        const productId = productInfo.productId;
        const product = await PRODUCT.findById(productId);
        product.countInStock += productInfo.quantity; 
        if (quantity[productId]) {
          product.countInStock -= quantity[productId]; 
          productInfo.quantity = quantity[productId]; 
        }
        await product.save();
      }
    }

    // Save the updated order to the database
    await existingOrder.save();

    res.json(existingOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateorderStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const order = await Order.findOne({ _id: formData._id });

    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No order Found",
      });
    }

    order.status = formData.status;
    await order.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "order Status Changed Successfully",
      data: order,
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
    getOrderById,
    getsingleOrder,
    get_income,
    getAllOrders,
    deleteOrder,
    placeOrders,
    updateTrackingStatus,
    MakeOrder,
    updateOrder,
    updateorderStatus,
    Trackorder

};
