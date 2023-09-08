import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailBlur, setIsEmailBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState("Show Password");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailBlurHandler = (event) => {
    setIsEmailBlur(true);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const passwordBlurHandler = (event) => {
    setIsPasswordBlur(true);
  };

  const Navigate = useNavigate();

  const onClickSignup = () => {
    Navigate("/sign-up", { relative: true });
  };
  const onClickForgotPassword = () => {
    Navigate("/forgot-password", { relative: true });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordVisibility("Hide Password");
      return;
    }
    setPasswordType("password");
    setPasswordVisibility("Show Password");
  };

  const OnSubmittingForm = async () => {
    let userDetails = {
      Email: email,
      Password: password,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    console.log(userDetails);
    const response = await fetch(
      "https://localhost:7286/api/Login/id",
      options
    );
    if (response.status === 200) {
      Navigate("/Home", { replace: true });
    } else {
      alert("Invalid Username or Password. Please try again");
    }
  };

  const emailClassName =
    isEmailBlur && email === "" ? "notification" : "noNotification";
  const passwordClassName =
    isPasswordBlur && password === "" ? "notification" : "noNotification";
  const passwordClassNotification =
    isPasswordBlur && password.length < 8 && password.length > 0
      ? "notification"
      : "noNotification";
  return (
    <div className="lcontainer">
      <div className="Lcard">
        <div id="card-content">
          <div className="heading">
            <h1>Log in</h1>
          </div>
          <form className="forms">
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              className="LoginInput "
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={email}
              name="email"
              placeholder="Enter Your Email"
            />
            <span className={emailClassName}>*Required</span>
            <br></br>
            <label htmlFor="password">Password</label>

            <br></br>
            <input
              className="LoginInput"
              type={passwordType}
              id="password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              name="password"
              placeholder="Enter Your Password"
            />
            <span className={passwordClassName}>*Required</span>
            <span className={passwordClassNotification}>
              password must contain atleast 8 characters
            </span>
            <br></br>
          </form>
          <span onClick={togglePassword} className="para">
            {passwordVisibility}
          </span>

          <div className="btnContainer">
            <p className="fPassword" onClick={onClickForgotPassword}>
              Forgot Password?
            </p>
            <button type="submit" onClick={OnSubmittingForm}>
              Log in
            </button>
            <p>
              New here? <span onClick={onClickSignup}> Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
