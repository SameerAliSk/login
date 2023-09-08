import "./fPassword.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmailBlur, setIsEmailBlur] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);
  const [isConfirmPasswordBlur, setIsConfirmPasswordBlur] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState("Show Password");
  const Navigate = useNavigate();

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const passwordBlurHandler = (event) => {
    setIsPasswordBlur(true);
  };
  const confirmPasswordBlurHandler = (event) => {
    setIsConfirmPasswordBlur(true);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const emailBlurHandler = (event) => {
    setIsEmailBlur(true);
  };
  const onClickSignUp = () => {
    Navigate("/sign-up", { relative: true });
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
  const OnSubmitForgotForm = async () => {
    if (password.length > 7 && password === confirmPassword) {
      const userDetails = {
        Email: email,
        Password: password,
      };
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch("https://localhost:7286/api/Login", options);
      if (response.status === 200) {
        alert("Congragulations!! Password Updated successfully");
        Navigate("/", { replace: true });
      } else {
        alert("oops!! User does not Exists!!");
      }
    } else {
      alert(
        "oops!! Password and confirm Password should be same and must contain atleast 8 characters"
      );
    }
  };
  const emailClassName =
    isEmailBlur && email === "" ? "notification" : "noNotification";
  const passwordClassNotification =
    isPasswordBlur && password.length < 8 && password.length > 0
      ? "notification"
      : "noNotification";
  const ConfirmPasswordClassNotification =
    isConfirmPasswordBlur &&
    confirmPassword.length < 8 &&
    confirmPassword.length > 0
      ? "notification"
      : "noNotification";
  const passwordClassName =
    isPasswordBlur && password === "" ? "notification" : "noNotification";
  const confirmPasswordClassName =
    isConfirmPasswordBlur && confirmPassword === ""
      ? "notification"
      : "noNotification";
  return (
    <div className="container">
      <div className="fcard">
        <div id="card-content">
          <div className="heading">
            <h1>Forgot Password?</h1>
            <p className="content">
              Enter the email address associated with your account and we'll
              send you a link to reset your password
            </p>
          </div>
          <form className="forms">
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
            <span className={emailClassName}>*Required</span>
            <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type={passwordType}
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
            <span className={passwordClassName}>*Required</span>
            <span className={passwordClassNotification}>
              password must contain atleast 8 characters
            </span>
            <br></br>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br></br>
            <input
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              type={passwordType}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Your Confirm Password"
            />
            <span className={confirmPasswordClassName}>*Required</span>
            <span className={ConfirmPasswordClassNotification}>
              password must contain atleast 8 characters
            </span>
            <br></br>
          </form>
          <span onClick={togglePassword} className="para">
            {passwordVisibility}
          </span>
          <div className="btnContainer">
            <button type="submit" onClick={OnSubmitForgotForm}>
              Reset password
            </button>
            <p>
              Don't have an account?
              <span onClick={onClickSignUp}> Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
