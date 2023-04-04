import React, { useState } from "react";
import "./Registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/header";
function SignUpPage() {
  const URL = process.env.REACT_APP_Url;
  const routes = [{ key: "signup", value: "/" }];
  const Navigate = useNavigate();
  const [formError, setFormError] = useState();
  const [errorFlag, setErrorFlg] = useState(false);
  const [userData, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    checkbox: "",
  });
  const [Passflag, setPassFlag] = useState(true);
  const [showPassword, setShowPassword] = useState("password");
  const [loader, setLoader] = useState(false);
  function isPasswordVisible() {
    if (Passflag) {
      setShowPassword("text");
      setPassFlag(false);
    } else {
      setShowPassword("password");
      setPassFlag(true);
    }
  }
  async function Register(e) {
    e.preventDefault();
    setLoader(true);
    console.log(userData, URL);
    if (
      !userData.email ||
      !userData.password ||
      !userData.cPassword ||
      !userData.name
    ) {
      setLoader(false);
      return alert("All Fields Are Mandatory");
    }
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };
    if (!userData.checkbox) {
      setLoader(false);
      alert("Before Registration, Please accept terms & conditions.");
    }
    if (errorFlag && userData.checkbox) {
      await fetch(`${URL}/user/registration`, reqOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success === true) {
            toast.success("Registration Successfull");
            setLoader(false);
            setTimeout(() => {
              Navigate("/");
            }, 0);
          } else {
            setTimeout(() => {
              setLoader(false);
              toast.error("User Already Exist");
            }, 0);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.message);
        });
    }
  }
  function clickHere() {}
  function formValidation() {
    if (userData.password.length < 6 || userData.password.length > 15) {
      setFormError("Password Must Have Min-6 & Max-15 Characters");
      return setErrorFlg(false);
    }
    if (userData.password !== userData.cPassword) {
      setFormError("Password does not matched");
      return setErrorFlg(false);
    }
    if (
      !userData.email.includes("@") ||
      !userData.email.toLowerCase().includes(".com")
    ) {
      setFormError("Enter a valid email address");
      return setErrorFlg(false);
    }
    setErrorFlg(true);
  }
  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <Header />
      <div className="Signup_main_container">
        {/* <h2 className="sign_up">Sign up</h2> */}
        <form className="registration_form">
          <div className="input_field_container">
            <div className="name_container">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) => {
                  setData({ ...userData, name: e.target.value });
                }}
              />
            </div>
            <div className="email_container">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={userData.email}
                onChange={(e) => {
                  setData({ ...userData, email: e.target.value });
                  setFormError("");
                }}
                onBlur={formValidation}
              />
            </div>
            <div className="password_container">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                value={userData.password}
                type={showPassword}
                onChange={(e) => {
                  setData({ ...userData, password: e.target.value });
                  setFormError("");
                }}
                onBlur={formValidation}
              />
              <i
                className={`fa fa-eye${Passflag ? "-slash" : ""} openEye`}
                onClick={isPasswordVisible}
              ></i>
            </div>
            <div className="confirm_password_container">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                name="cPassword"
                value={userData.cPassword}
                type={"text"}
                onChange={(e) => {
                  setData({ ...userData, cPassword: e.target.value });
                  setFormError("");
                }}
                onBlur={formValidation}
              />
            </div>
          </div>

          <p className="passValidError">{formError}</p>
          <div className="tAndC_container">
            <input
              value={userData.checkbox}
              id="TAndC"
              type={"checkbox"}
              className="tAndC_checkbox"
              onChange={(e) => {
                setData({ ...userData, checkbox: e.target.checked });
                errorFlag && setFormError("");
              }}
            />
            <div className="tAndC_line_container">
              <p className="tAndC_line">
                I agree to Termly's
                <span className="tAndC_link">Terms of Use</span> and{" "}
                <span className="tAndC_link">Privacy Policy</span>
              </p>
            </div>
          </div>
          <button className="register_button" onClick={Register}>
            Register
          </button>
          <div className="signin_container">
            <p className="already_Account">Already have an account?</p>
            <Link to={routes[0].value}>
              <p className="already_Account_click_here" onClick={clickHere}>
                Click Here
              </p>
            </Link>
          </div>
        </form>
        {loader ? (
          <img className="loader" src={"./imgs/loaderImg.gif"} alt="loader" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default SignUpPage;
