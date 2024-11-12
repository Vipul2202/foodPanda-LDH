const Banner = require("../Model/Bannermodel");

function addBanner(req, res) {
  var validation = "";
  // TODO fIX THE VALIDATIONS USE NULL INSTEAD IF ""

  if (req.body.description == "") {
    validation += "description is required";
  }
  if (req.body.price == "") {
    validation += "price is required";
  }
  // if (req.body.Image == "") {
  //   validation += "Image is required";
  // }
  if (req.body.image_url == null) {
    validation += "Image URL is required";
  }
  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      msg: validation,
    });
  } else {
    let bannerobj = new Banner();
    bannerobj.Image = req.body.image_url;

    bannerobj.description = req.body.description;
    bannerobj.price = req.body.price;

    // if (req.file) {
    //   bannerobj.Image = "Banner_Image/" + req.file.filename;
    // }
    bannerobj.save();
    res.json({
      status: 200,
      success: true,
      msg: "Banner inserted",
      // data: bannerobj,
      data: req.body.image_url,
    });
  }
}

// --------get all Banner start---------

getallBanner = (req, res) => {
  Banner.find(req.body)
    .exec()
    .then((bannerdata) => {
      res.json({
        status: 200,
        success: true,
        msg: "data loaded",
        data: bannerdata,
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

// ---------get single Banner-----------
getsingleBanner = (req, res) => {
  // var validate = "";
  // if (req.body._id == "") {
  //   validate += "_id is required";
  // }

  // if (!!validate) {
  //   res.json({
  //     status: 409,
  //     success: false,
  //     msg: validate,
  //   });
  // } else {
  // Banner.findOne({ _id: req.body._id })
  Banner.findOne()
    .sort({ _id: -1 })
    .limit(1)

    .exec()
    .then((Bannerdata) => {
      res.json({
        status: 200,
        success: true,
        msg: "data loaded",
        data: Bannerdata,
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
// };

// --------update Banner----------------
updateBanner = (req, res) => {
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
    Banner.findOne({ _id: req.body._id })
      .then((Bannerdata) => {
        if (Bannerdata == null) {
          res.json({
            status: 409,
            success: false,
            msg: "Data not found",
          });
        } else {
          //update
          Bannerdata.description = req.body.description;
          Bannerdata.price = req.body.price;
          if (req.file) {
            Bannerdata.Image = "Banner_Image/" + req.file.filename;
          }
          Bannerdata.save();

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

deleteBanner = (req, res) => {
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
    Banner.findOne({ _id: req.body._id })
      .then((Bannerdata) => {
        if (Bannerdata == null) {
          res.json({
            status: 409,
            success: false,
            msg: "Data not found",
          });
        } else {
          //Delete
          Banner.deleteOne({ _id: req.body._id })
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

const updateBannerStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const banner = await Banner.findOne({ _id: formData._id });

    if (!banner) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No banner Found",
      });
    }

    banner.status = formData.status;
    await banner.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "banner Status Changed Successfully",
      data: banner,
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
  addBanner,
  getallBanner,
  getsingleBanner,
  updateBanner,
  deleteBanner,
  updateBannerStatus,
};
