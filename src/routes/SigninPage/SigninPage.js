import React, { useState } from "react";
import "./SigninPage.css";
// import img from "../logo/recipe logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../authentication/isAuth";
import Header from "../Header/header";
function SigninPage() {
  const routes = [{ key: "signup", value: "/registration" }];
  const URL = process.env.REACT_APP_Url;
  const Navigate = useNavigate();
  const [userData, setData] = useState({
    email: "",
    password: "",
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
  async function submit(e) {
    e.preventDefault();
    // console.log(userData, URL);
    setLoader(true);
    if (!userData.email || !userData.password) {
      setLoader(false);
      return alert("Both Fields Are Mandatory");
    }
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    await fetch(`${URL}/user/login`, reqOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          setLoader(false);
          setToken("token", data.token);
          toast.success("Logged in Successfully");
          setTimeout(() => {
            Navigate("/images");
          });
        } else {
          setTimeout(() => {
            setLoader(false);
            toast.error("User Does Not Exist");
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err.message);
      });
    //   const res = await axios.post(`${URL}/user/login`, userData);
    //   console.log(res);
  }
  function clickHere() {}
  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <Header />
      <div className="main_container">
        {/* <h2 className="sign_in">Sign In</h2> */}
        <form className="signin_form ">
          <div className="input_field_container">
            <div className="login_email_container">
              <label htmlFor="login_email">Email</label>
              <input
                id="login_email"
                name="email"
                value={userData.email}
                onChange={(e) => {
                  setData({ ...userData, email: e.target.value });
                }}
              />
            </div>
            <div className="login_password_container">
              <label htmlFor="login_password">Password</label>
              <input
                id="login_password"
                name="password"
                value={userData.password}
                type={showPassword}
                onChange={(e) => {
                  setData({ ...userData, password: e.target.value });
                }}
              />{" "}
              <i
                className={`fa fa-eye${Passflag ? "-slash" : ""} openEye`}
                onClick={isPasswordVisible}
              ></i>
            </div>
          </div>
          <div className="remember_container">
            <input
              value={userData.checkbox}
              id="remember"
              type={"checkbox"}
              className="Remember_me"
              onChange={(e) => {
                setData({ ...userData, checkbox: e.target.checked });
              }}
            />
            <label className="remember_label" htmlFor="remember">
              Remeber me
            </label>
          </div>
          <div className="login_btn_container">
            <button className="login_button" onClick={submit}>
              Log-in
            </button>
          </div>
        </form>

        <p className="forgot_password">Forgot Password?</p>

        <div className="reg_container">
          <p className="dont_Account">Dont have account?</p>
          <Link to={routes[0].value}>
            <p className="dont_Account_click_here" onClick={clickHere}>
              Click Here
            </p>
          </Link>
        </div>
        {loader ? (
          <img className="loader" src={"./imgs/loaderImg.gif"} alt="loader" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default SigninPage;
