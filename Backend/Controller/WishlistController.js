// controllers/wishlistController.js

const Wishlist = require('../Model/Wishlistmodel');
const Product = require('../Model/Productmodel');

//  get the user's wishlist
getWishlist = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const wishlist = await Wishlist.findOne({ userId }).populate('items.product');
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get all the Wishlist
getallWishlist = (req,res)=>{
  
  Wishlist.find(req.body)
  .populate("userId")
  .populate('items.product')
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

//  add a product to the wishlist
addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.body.userId; 

    // Check  product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const existingItem = wishlist.items.find(item => String(item.product) === String(productId));

    if (!existingItem) {
      // not exist  add it
      wishlist.items.push({ product: productId });
    }

 
    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//  remove a product from the wishlist
removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.body.userId; 

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(item => !item.product.equals(productId));

    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    getallWishlist
  }