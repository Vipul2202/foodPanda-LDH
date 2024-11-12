const Product = require("../Model/Productmodel");

// -------Check Validation and add Product -------

function addProduct(req, res) {
  var validation = "";

  if (req.body.productname == "") {
    validation += "productname is required";
  }
  if (req.body.description == "") {
    validation += "description is required";
  }
  if (req.body.userId == "") {
    validation += "userId is required";
  }
  if (req.body.price == "") {
    validation += "price is required";
  }
  if (req.body.countInStock == "") {
    validation += "countInStock is required";
  }
  if (req.body.Image == "") {
    validation += "Image is required";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      msg: validation,
    });
  } else {
    let Productobj = new Product();
    Productobj.productname = req.body.productname;
    Productobj.description = req.body.description;
    Productobj.price = req.body.price;
    Productobj.countInStock = req.body.countInStock;
    Productobj.status = req.body.status;
    if (req.file) {
      Productobj.Image = "Product_Image/" + req.file.filename;
    }
    Productobj.save();
    res.json({
      status: 200,
      success: true,
      msg: "Product inserted",
      data: Productobj,
    });
  }
}

// --------get all Product start-----------

getallProduct = (req, res) => {
  Product.find(req.body)
    .exec()
    .then((Productdata) => {
      res.json({
        status: 200,
        success: true,
        msg: "data loaded",
        data: Productdata,
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

// ---------get single Product-----------
getsingleProduct = (req, res) => {
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
    Product.findOne({ _id: req.body._id })
      .exec()
      .then((Productdata) => {
        res.json({
          status: 200,
          success: true,
          msg: "data loaded",
          data: Productdata,
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

// --------update Product-----------
updateProduct = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required \n";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      msg: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Product.findOne({ _id: req.body._id })
      .then((Productdata) => {
        if (Productdata == null) {
          res.json({
            status: 409,
            success: false,
            msg: "Data not found",
          });
        } else {
          //update
          Productdata.productname = req.body.productname;
          Productdata.description = req.body.description;
          Productdata.price = req.body.price;
          Productdata.countInStock = req.body.countInStock;
          Productdata.status = req.body.status;

          if (req.file) {
            Productdata.Image = "Product_Image/" + req.file.filename;
          }
          Productdata.save();

          res.json({
            status: 200,
            success: true,
            msg: "Record updated",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          msg: "Error",
          error: String(err),
        });
      });
  }
};

deleteProduct = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required \n";
  }
  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      msg: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Product.findOne({ _id: req.body._id })
      .then((Productdata) => {
        if (Productdata == null) {
          res.json({
            status: 409,
            success: false,
            msg: "Data not found",
          });
        } else {
          //Delete
          Product.deleteOne({ _id: req.body._id })
            .then((data) => {
              res.json({
                status: 200,
                success: true,
                msg: "Record Deleted",
              });
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                msg: "Error",
                error: String(err),
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          msg: "Error",
          error: String(err),
        });
      });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const product = await Product.findOne({ _id: formData._id });

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No product Found",
      });
    }

    product.status = formData.status;
    await product.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "product Status Changed Successfully",
      data: product,
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
  addProduct,
  getallProduct,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus,
};
