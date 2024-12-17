import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { ToastContainer, toast } from "react-toastify";
import apiServices from "../ApiServices/ApiServices";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
function Login() {
	const SITE_KEY = "6LeHHjspAAAAACljRSIzkBNs7lQa4I8KholcAnlG";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState();
  const captchaRef = useRef();
  useEffect(() => {
    setMessage(sessionStorage.getItem("message"));
    if (message) {
      toast.error(message);
      setTimeout(() => {
        sessionStorage.removeItem("message");
      }, 1000);
    }
  }, [message]);
  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    // captchaRef.current.reset();
    // if (!recaptchaValue) {
    //   toast.error("Please complete the reCAPTCHA verification.");
    //   setLoading(false);
    //   return;
    // }
    let data = {
      email: email,
      password: pass,
    };
    apiServices
      .login(data)
      .then((x) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        if (x.data.success) {
          // console.log("login data",x)
          // console.log(x.data.data._id)

          sessionStorage.setItem("user_type", x.data.data.userType);
          sessionStorage.setItem("token", x.data.token);
          sessionStorage.setItem("_id", x.data.data._id);
          sessionStorage.setItem("authenticate", true);
          sessionStorage.setItem("status", x.data.data.status);
          if (x.data.data.userType === 1 || x.data.data.userType === "1") {
            toast.success(x.data.msg);
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
          } else if (x.data.data.status == true) {
            toast.success(x.data.msg);
            sessionStorage.setItem("user_data", JSON.stringify(x.data.data));
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            sessionStorage.clear();

            navigate("/login");
            toast.error("Your Email Is Not Verify Please Verify First");
            sessionStorage.setItem("message", "You have been blocked by Admin");
          }
        } else {
          toast.error(x.data.msg);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        // console.log(error)
        toast.error("Something went wrong!! try again later");
      });
  };
  const changeEmail = (e) => {
    // console.log(e.target.value)
    setEmail(e.target.value);
  };
  // -------ReCAPTCHA-------
  // const onChange = (value) => {
  //   setRecaptchaValue(value);
  //   setIsButtonDisabled(!value);
  // };
  const cssobj = {
    position: "absolute",
    top: "25%",
    left: "45%",
    color: "#f6f060",
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") {
      navigate("/"); // Redirect to another route if logged out
    }
  }, []);

  return (
    <div className="login-bg">
      <div className="  d-flex justify-content-center ">
        <PropagateLoader
          loading={loading}
          cssOverride={cssobj}
          size={25}
          color="#f6f060"
        />
      </div>
      <div className={loading ? "disabled-screen-full" : "disable"}>
        {/* <div className="banner-top">
	<div className="container">
		<h3 >Sign In</h3>
		<h4 className='d-flex'><Link to="/">Home</Link><label>/</label><Link to="/login">Sign In</Link></h4>
		<div className="clearfix"> </div>
	</div>
</div> */}
        {/* <!--login--> */}

        <div className="login container">
          <div className=" row pt-20">
            <div className="form-w3agile main-agileits col-lg-5">
              <h3>Sign In</h3>
              <form onSubmit={handleForm}>
                <div className="key d-flex">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Email or Number "
                    onChange={changeEmail}
                    required=""
                  />
                  <div className="clearfix"></div>
                </div>
                <div className="key d-flex">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    required=""
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
                <div className=" d-flex mb-3">
                  {/* <ReCAPTCHA
                    className=""
                    sitekey={SITE_KEY}
                    onChange={onChange}
                    ref={captchaRef}
                  /> */}
                  <div className="clearfix"></div>
                </div>

                <div className="d-flex justify-end">
                  <button
                    type="submit"
                    value="Login"
                    // disabled={isButtonDisabled}
                  >
                    Submit<i class="fa-solid fa-right-to-bracket px-1"></i>
                  </button>
                </div>
                {/* <input type="submit" disabled={isButtonDisabled}/> */}
              </form>
              <div className="forg">
                <Link to="/forget-password" className="forg-left">
                  Forgot Password
                </Link>
                <Link to="/register" className="forg-right">
                  Sign Up
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

export default Login