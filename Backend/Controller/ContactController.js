const Contact = require("../Model/Contactmodel")

contact = (req, res) => {
    
    let validation = ""
    if (req.body.name == "") {
        validation += "Enter Name"
    }
    if (req.body.email == "") {
        validation += "Enter Email"
    }
    if (req.body.subject == "") {
        validation += "Enter Subject"
    } 
    if (req.body.contact == "") {
        validation += "Enter Contact"
    } 
    if (req.body.message == "") {
        validation += "Enter Message"
    } 
    if (req.body.subject == "") {
        validation += "Enter Subject"
    }
    if (!!validation) {
        res.json({
            status: 400,
            success: false,
            msg: validation
        })
    }
    else{
        let contactobj=new Contact
        contactobj.name=req.body.name
        contactobj.subject=req.body.subject
        contactobj.email=req.body.email
        contactobj.message=req.body.message
        contactobj.contact=req.body.contact
        contactobj.user_type=2
        contactobj.save()
        res.json({
            status:200,
                    success:true,
                    msg:"Message Delivered",
                    data:req.body
        })
    }
    
}

getallcontacts = (req,res)=>{
  
    Contact.find(req.body)
    .exec()
    .then(contactdata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':contactdata
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

getsinglecontacts = (req,res)=>{
  
    Contact.find({_id:req.body._id})
    .exec()
    .then(contactdata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':contactdata
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


  deleteContact = (req, res) => {
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
      Contact.findOne({ _id: req.body._id })
        .then((contactdata) => {
          if (contactdata == null) {
            res.json({
              status: 409,
              success: false,
              msg: "Data not found",
            });
          } else {
            //Delete
            Contact.deleteOne({ _id: req.body._id })
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

  latestContact= (req, res) => {
    Contact.find()
      .sort({ created_at: -1 }) 
      .limit(3) 
      .exec()
      .then((latestmsg) => {
        res.json({
          status: 200,
          success: true,
          msg: "Latest Message loaded",
          data: latestmsg,
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
  };
module.exports = {
    contact,
    getallcontacts,
    deleteContact,
    getsinglecontacts,
    latestContact

}