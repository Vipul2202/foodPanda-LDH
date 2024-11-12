const Comment = require("../Model/Commentodel");

// Create a new comment on a blog post
async function createblogComment(req, res) {
  // const { text, authorId, blogId } = req.body;

  var validation = ""
  if (req.body.text=="" ) {
    validation += "Comment text is required "
  }
  if (req.body.authorId =="" ) {
    validation += "Author ID is required "
  }
  if (req.body.blogId =="" ) {
    validation += "Blog ID is required "
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      msg: validation,
    });
  } else {
    let commentobj = new Comment()
    commentobj.text = req.body.text
    commentobj.userId = req.decoded
    commentobj.blogId = req.body.blogId

    await commentobj.save()
      .then(() => {
        res.json({
          status: 200,
          success: true,
          msg: "Comment   inserted",
          data: req.body,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          msg: "Error Occurred",
          error: String(err),
        });
      });
  }
}

getAllComments = (req, res) => {
  Comment.find({ blogId: req.body.blogId })
    .select({})
    .populate("blogId")
    .populate("userId")
    .then((blogByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all comment by blog id ",
        data: blogByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all comment by blog id ",
        error: err,
      });
    });
};

getallcomment = (req, res) => {
    Comment.find(req.body)
    .populate("blogId")
    .populate("userId")
      .exec()
      .then((commentdata) => {
        res.json({
          status: 200,
          success: true,
          msg: "data loaded",
          data: commentdata,
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

  deleteComment = (req, res) => {
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
      Comment.findOne({ _id: req.body._id })
        .then((commentdata) => {
          if (commentdata == null) {
            res.json({
              status: 409,
              success: false,
              msg: "Data not found",
            });
          } else {
            //Delete
            Comment.deleteOne({ _id: req.body._id })
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
  
  const updateCommentStatus = async (req, res) => {
      try {
        const formData = req.body;
    
        if (!formData._id || !formData.status) {
          return res.status(422).json({
            success: false,
            status: 422,
            message: "Both _id and status are required",
          });
        }
    
        const comment = await Comment.findOne({ _id: formData._id });
    
        if (!comment) {
          return res.status(404).json({
            success: false,
            status: 404,
            message: "No comment Found",
          });
        }
    
        comment.status = formData.status;
        await comment.save();
    
        return res.status(200).json({
          success: true,
          status: 200,
          message: "comment Status Changed Successfully",
          data: comment,
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
    createblogComment,
     getAllComments,
     getallcomment,
     deleteComment,
     updateCommentStatus
     };
