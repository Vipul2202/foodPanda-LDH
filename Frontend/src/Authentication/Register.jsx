import React from 'react'
import "./Login.css"
import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../ApiServices/ApiServices";
import ReCAPTCHA from "react-google-recaptcha";
import { PuffLoader } from "react-spinners";
function Register() {
	const SITE_KEY = "6LeHHjspAAAAACljRSIzkBNs7lQa4I8KholcAnlG";
	const nav = useNavigate();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [contact, setContact] = useState();
	const [password, setPassword] = useState();
	// const [recaptchaValue, setRecaptchaValue] = useState();
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const captchaRef = useRef();

	const handleForm = (e) => {
	 
	  e.preventDefault();
	  setLoading(true);
	  captchaRef.current.reset();
  
	  // Validation checks
	  if (!name) {
		toast.error("Full Name is required.");
		setLoading(false);
		return;
	  }
	 
  
	  if (!email.match(/^\S+@\S+\.\S+$/)) {
		toast.error("Please enter a valid email address.");
		setLoading(false);
		return;
	  }
  
	  if (password.length < 8) {
		toast.error('Password must be at least 8 characters long');
		return;
	  }
	
	  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
		toast.error('Password must contain both uppercase and lowercase letters');
		return;
	  }
	
	  if (!/\d/.test(password)) {
		toast.error('Password must contain at least one numerical digit');
		return;
	  }
	
	  if (!/[@#$%^&+=]/.test(password)) {
		toast.error('Password must contain at least one special character (@, #, $, %, ^, &, +, =)');
		return;
	  }
	  if (contact.length < 10) {
		toast.error("Contact must be at least 10 digits long.");
		setLoading(false);
		return;
	  }
  
	//   if (!recaptchaValue) {
	// 	toast.error("Please complete the reCAPTCHA.");
	// 	setLoading(false);
	// 	return;
	//   }
	 
  
	  let data = new FormData();
	  data.append("name", name);
	  data.append("email", email);
	  data.append("contact", contact);
	  data.append("password", password);
	//   data.append("recaptchaValue", recaptchaValue);
  
	  apiServices
		.register(data)
		.then((x) => {
		  setTimeout(() => {
			setLoading(false);
		  }, 1500);
  
		  if (x.data.success) {
			toast.success(x.data.message);
			setTimeout(() => {
				nav("/login");
			  }, 3000);
		  } else {
			toast.error(x.data.message);
			
		  }
		})
		.catch((error) => {
		  toast.error("Something went wrong!! Try again later.");
		  setLoading(false);
		});
	};
  
  
	
  
	// ----------special character restricted------
	const handleKeyPress = (event) => {
	  const charCode = event.which || event.keyCode;
	  // Allow letters, numbers, and underscore
	  if (
		(charCode >= 65 && charCode <= 90) || // A-Z
		(charCode >= 97 && charCode <= 122) || // a-z
		(charCode >= 48 && charCode <= 57) || // 0-9
		charCode === 95 // Underscore
	  ) {
		return true; // Allow the key press
	  }
	  event.preventDefault(); // Prevent the key press
	};
  
	// ---------pass hide show----------
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = (e) => {
	  setShowPassword(!showPassword);
	  e.preventDefault();
	};
  

	// -------ReCAPTCHA-------
	const onChange = (value) => {
		// setRecaptchaValue(value);
		setIsButtonDisabled(!value);
	  };
	  
	const cssobj = {
	
	  position: "absolute",
	  top: "110%",
	  left: "42%",
	  color:"#f6f060",
	  // zIndex:"999",
	};

  return (
    <div>
      {loading && (
        <div className="d-flex justify-content-center">
          <PuffLoader
            color="#f6f060"
            cssOverride={cssobj}
            size={200}
            speedMultiplier={1}
          />
        </div>
      )}
      <div className={loading ? "disabled-screen-full" : "disable"}>
        {/* <!--banner--> */}
        {/* <div className="banner-top">
	<div className="container ">
		<h3 >Sign Up</h3>
		
		<h4 className='d-flex'><Link to="/">Home</Link><label>/</label><Link to="/register">Sign Up</Link></h4>
		<div className="clearfix"> </div>
	</div>
</div> */}

        {/* <!--login--> */}

        <div className="login container">
          <div className="">
            <div className="form-w3agile main-agileits form1 col-lg-5">
              <h3>Sign Up</h3>
              <form action="#" method="post" onSubmit={handleForm}>
                <div className="key d-flex">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    required=""
                  />
                  <div className="clearfix"></div>
                </div>
                <div className="key d-flex">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required=""
                  />
                  <div className="clearfix"></div>
                </div>
                <div className="key d-flex">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required="phone number Is required"
                  />
                  <div className="clearfix"></div>
                </div>
                <div className="key d-flex">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required="password is required"
                  />
                  <a className="passswitch" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </a>
                  <div className="clearfix"></div>
                </div>

                <div className="mb-3 d-flex">
                  <ReCAPTCHA
                    className=""
                    sitekey={SITE_KEY}
                    onChange={onChange}
                    ref={captchaRef}
                  />
                  <div className="clearfix"></div>
                </div>
                <div className='d-flex justify-end'>
                  <button type="submit" >
                    Submit<i class="fa-solid fa-user-plus px-1"></i>
                  </button>
                </div>
              </form>
              <div className="forg mt-3">
                <a href="#" className="forg-left">
                  I have an account
                </a>
                <Link to="/login" className="forg-right">
                  Sign In
                </Link>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register