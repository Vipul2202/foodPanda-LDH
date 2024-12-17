//mongodb customer model
const Customer =require("../Model/Customermodel")
//mongodb user model
const User = require('../Model/Usermodel')
//hash password
const bcrypt = require('bcrypt')
const saltround = 15
//token generate
const jwt = require('jsonwebtoken')
const secretkey = "Project12345#@"
//google captcha secretkey
const SECRETKEY =`6LeHHjspAAAAAOTsyIFI2gLT5TKsafPhP-ZLwcMp`

//axios verifie google captcha
const axios = require('axios')
adduser = (req, res) => {
    var validator = '';
  
    if (req.body.name == '') validator += 'Name is required';
    if (req.body.email == '') validator += 'Email is required';
    if (req.body.password == '') validator += 'Password is required';
    if (req.body.contact == '') validator += 'Contact is required';
    if (req.body.address == '') validator += 'Address is required';
    if (req.body.Image == '') validator += 'Image is required';
  
    if (!!validator) {
      res.json({
        status: 409,
        success: false,
        msg: validator,
      });
    } else {
      // Duplicacy
      User.findOne({ email: req.body.email }).then((udata) => {
        if (udata == null) {
          // Insert
          let userobj = new User();
          userobj.name = req.body.name;
          userobj.email = req.body.email;
          userobj.password = bcrypt.hashSync(req.body.password, saltround);
          if (req.file) {
            userobj.Image = 'Customer_photo/' + req.file.filename;
          }
          userobj.save()
          .then((userdata) => {
            let customerobj = new Customer();
            customerobj.name = req.body.name;
            customerobj.email = req.body.email;
            customerobj.password = bcrypt.hashSync(req.body.password, saltround);
            customerobj.contact = req.body.contact;
            customerobj.address = req.body.address;
            customerobj.userId = userdata._id;
            if (req.file) {
              customerobj.Image = 'Customer_photo/' + req.file.filename;
            }
            customerobj.save().then((user) => {
              res.status(200).json({ message: 'User registered, verification email sent.', data: customerobj });
            }).catch((error) => {
              console.error('Error saving customer:', error);
              res.status(500).json({ message: 'Internal server error' });
            });
          });
        } else {
          res.json({
            status: 409,
            success: false,
            msg: 'User already exists',
          });
        }
      });
    }
  };
  
  
  
  register = (req, res) => {
      var validator = '';
    
      // const recaptchaResponse = req.body.recaptchaValue;
    
      // axios({
      //   url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRETKEY}&response=${recaptchaResponse}`,
      //   method: 'post',
      // })
      //   .then((recaptchaResponse) => {
          // if (recaptchaResponse.data.success) {
            if (req.body.name == '') validator += 'Name is required';
            if (req.body.email == '') validator += 'Email is required';
            if (req.body.password == '') validator += 'Password is required';
            if (req.body.contact == '') validator += 'Contact is required';
            if (req.body.address == '') validator += 'Address is required';
            // if (req.body.Image == '') validator += 'Image is required';
    
            if (!!validator) {
              res.json({
                status: 409,
                success: false,
                message: validator,
              });
            } else {
              // Check for duplicacy
              User.findOne({ email: req.body.email })
              // User.findOne({ email: req.body.email })
              .then((udata) => {
                if (udata == null) {
                  const userobj = new User();
                  userobj.name = req.body.name;
                  userobj.email = req.body.email;
                  userobj.contact = req.body.contact;
                  userobj.password = bcrypt.hashSync(req.body.password, saltround);
                  if (req.file) {
                    userobj.Image = 'Customer_photo/' + req.file.filename;
                  }
                  userobj.save()
                  
                  .then((userdata) => {
                    const customerobj = new Customer();
                    customerobj.name = req.body.name;
                    customerobj.email = req.body.email;
                    customerobj.password = bcrypt.hashSync(req.body.password, saltround);
                    customerobj.contact = req.body.contact;
                    customerobj.address = req.body.address;
                    customerobj.userId = userdata._id;
    
                    if (req.file) {
                      customerobj.Image = 'Customer_photo/' + req.file.filename;
                    }
    
                    customerobj.save()
                    .then(user => {
                    
  
                      res.status(200).json({ 
                        status:200,
                        success: true,
                        message: 'User registered, verification email sent.' });
                    })
                    .catch(error => {
                     
                      res.status(500).json({ message: 'Internal server error' });
                    });
                });
                } else {
                  res.json({
                    status: 409,
                    success: false,
                    message: 'User with the same email already exists',
                  });
                }
              });
            }
          // } else {
          //   res.json({
          //     status: 400,
          //     success: false,
          //     message: 'reCAPTCHA verification failed',
          //   });
          // }
        // }
      // )
      //   .catch((error) => {
      //     console.log('Recaptcha error:', error);
      //     res.status(500).json({
      //       status: 500,
      //       success: false,
      //       message: 'Internal server error',
      //     });
      //   });
    };


    // ----------updateuser---------------------
updateuser = (req,res)=>{
    var validator = ""
    if (req.body._id == "") {
        validation += "ID is required "
    }
   
    if(!!validator)
    {
        res.json({
            status:409,success:false,msg:validator
        })
    }
    else{
        //check whether data exists or not wrt particular id
        User.findOne({_id:req.body._id})
        .then(ucustomerobj=>{
            if(ucustomerobj == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                ucustomerobj.name = req.body.name
                ucustomerobj.email = req.body.email
                ucustomerobj.contact = req.body.contact
                if(req.file )
                        {
                          ucustomerobj.Image = "customer_photo/" + req.file.filename
                        }
                ucustomerobj.save()
                .then(async ustu=>{
                    Customer.findOne({userId:req.body._id})
                    .then(customerObj =>{
                        // console.log(customerObj)
                        customerObj.name = req.body.name
                        customerObj.email = req.body.email
                        customerObj.contact = req.body.contact
                        customerObj.address = req.body.address
                        customerObj.userId = ustu._id
                        if(req.file)
                        {
                            customerObj.Image = "customer_photo/" + req.file.filename
                        }
                        customerObj.save()
                        res.json({
                            status:200,success:true,msg:'User updated'
                        })
                    })
                })
               
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg:'Error',
                error:String(err)
            })
        }) 
    }
}

// ------------change pass--------------
changepassword = (req,res)=>{
    validator = ""
    if(req.body.oldpassword == "")
        validator += "Old password is required"
    if(req.body.newpassword == "")
        validator += "New password is required"
    if(req.body.confirmpassword == "")
        validator += "Confirm password is required"
    if(req.body.userId == "")
        validator += "User Id  is required"

    if(!!validator)
    {
        res.json({
            status: 409,
            success:false,
            msg:validator
        })
    }
    else{
        //compare new password with confirm password
        if(req.body.newpassword == req.body.confirmpassword)
        {
            //check user existance
            User.findOne({_id:req.body.userId})
            .then(userdata=>{
                if(userdata != null)
                {
                    //compare old password with database password
                    bcrypt.compare(req.body.oldpassword,userdata.password,(err,data)=>{
                        if(data)
                        {
                            //update code
                            userdata.password = bcrypt.hashSync(req.body.newpassword,saltround)
                            userdata.save()
                            res.json({
                                status:200,
                                success:true,
                                msg:'password updated' 
                            })   
                        }
                        else{
                            res.json({
                                status:409,
                                success:false,
                                msg:'old password do not matched' 
                            })
                        }
                    })
                }
                else{
                    res.json({
                        status:409,
                        success:false,
                        msg:'User does not exists' 
                    })
                }
            })
        }
        else{
            res.json({
                status:409,
                success:false,
                msg:'new password and confirm password do not match'
            })
        }
    }
}



login = (req, res) => {
  // console.log(req.body)
  let validator = "";

  // const recaptchaResponse = req.body.recaptchaValue;

  // axios({
  //   url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRETKEY}&response=${recaptchaResponse}`,
  //   method: "post",
  // })
    // .then((recaptchaResponse) => {
    //   if (recaptchaResponse.data.success) {
        // CAPTCHA verification successful, continue with login validation
        if (req.body.email === "") validator += "Email is required";
        if (req.body.password === "") validator += "Password is required";

        if (!!validator) {
          res.json({
            status: 409,
            success: false,
            msg: validator,
          });
        } else {
          // Check the existence of the email
          User.findOne({ email: req.body.email }).then((userdata) => {
            if (userdata === null) {
              res.json({
                status: 404,
                success: false,
                msg: "User not found",
              });
            } else {
              // Compare the password with the user's hashed password
              bcrypt.compare(
                req.body.password,
                userdata.password,
                (err, data) => {
                  if (!data) {
                    res.json({
                      status: 409,
                      success: false,
                      msg: "Invalid password",
                    });
                  } else {
                    // Generate a JWT token for successful login
                    const payload = {
                      _id: userdata._id,
                      name: userdata.name,
                      email: userdata.email,
                      userType: userdata.userType,
                    };
                    const token = jwt.sign(payload, secretkey, {
                      // expiresIn: 60*30
                    });
                    res.json({
                      status: 200,
                      success: true,
                      msg: "Login successful",
                      data: userdata,
                      token: token,
                    });
                  }
                }
              );
            }
          });
        }
      // } 
      // else {
      //   res.json({
      //     status: 400,
      //     success: false,
      //     msg: "reCAPTCHA verification failed",
      //   });
      // }
    // })
    // .catch((error) => {
    //   console.log("reCAPTCHA error:", error);
    //   res.status(500).json({
    //     status: 500,
    //     success: false,
    //     msg: "Internal server error",
    //   });
    // });
};


// --------get all  start-----------

getalluser = (req,res)=>{
    User.find(req.body)
    // .populate("userId")
    .then(udata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':udata
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



// ---------get single User-----------
getsingleuser = (req,res)=>{
    var validate = ""
    if(req.body._id == "")
    {
        validate += "_id is required"
    }

    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            msg:validate
        })
    }
    else{
        User.findOne({_id:req.body._id})
        .then(udata=>{
            res.json({
                'status':200,
                'success':true,
                'msg':'data loaded',
                'data':udata
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
}

// -----------delete user------------
deleteuser = (req,res)=>{
    // console.log(req,res)
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required \n"
    }
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        //check whether data exists or not wrt particular id
        User.findOne({_id:req.body._id})
        .then(Userdata=>{
            if(Userdata == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                //Delete 
                User.deleteOne({_id:req.body._id})
                .then(data=>{
                    res.json({
                        status:200,success:true,msg:'Record Deleted'
                    })
                })
                .catch(err=>{
                    res.json({
                        status:500,
                        success:false,
                        msg:'Error',
                        error:String(err)
                    })
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg:'Error',
                error:String(err)
            })
        }) 
    }
}


deletecustomer = (req,res)=>{
    // console.log(req,res)
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required \n"
    }
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        //check whether data exists or not wrt particular id
        Customer.findOne({_id:req.body._id})
        .then(custdata=>{
            if(custdata == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                //Delete 
                Customer.deleteOne({_id:req.body._id})
                .then(data=>{
                    res.json({
                        status:200,
                        success:true,
                        msg:'Record Deleted',
                        data:data
                    })
                })
                .catch(err=>{
                    res.json({
                        status:500,
                        success:false,
                        msg:'Error',
                        error:String(err)
                    })
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg:'Error',
                error:String(err)
            })
        }) 
    }
}
// -----------delete user------------

getallcustomer = (req,res)=>{
    Customer.find(req.body)
    .populate("userId")
    .then(udata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':udata
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





getsinglecustomer = (req,res)=>{
   
    Customer.findOne({userId:req.body.userId})
    .populate("userId")
    .then(udata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':udata
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



const changeStatus = async (req, res) => {
    try {
      const formData = req.body;
  
      if (!formData._id || !formData.status) {
        return res.status(422).json({
          success: false,
          status: 422,
          message: "Both _id and status are required",
        });
      }
  
      const user = await User.findOne({ _id: formData._id });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No User Found",
        });
      }
  
      user.status = formData.status;
      await user.save();
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: "User Status Changed Successfully",
        data: user,
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
    register,
    adduser,
    changepassword,
    login,
    getalluser,
    getsingleuser,
    deleteuser,
    updateuser,
    getallcustomer,
    getsinglecustomer,
    deletecustomer,
    changeStatus,
   
}