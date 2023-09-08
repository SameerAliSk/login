import { React } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailBlur, setIsEmailBlur] = useState(false);
  const [isFullnameBlur, setIsFullnameBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);
  const [isConfirmPasswordBlur, setIsConfirmPasswordBlur] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState("Show Password");
  const Navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const fullnameChangeHandler = (event) => {
    setFullname(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const emailBlurHandler = (event) => {
    setIsEmailBlur(true);
  };
  const fullnameBlurHandler = (event) => {
    setIsFullnameBlur(true);
  };
  const passwordBlurHandler = (event) => {
    setIsPasswordBlur(true);
  };
  const confirmPasswordBlurHandler = (event) => {
    setIsConfirmPasswordBlur(true);
  };

  const onClickLogin = () => {
    Navigate("/", { relative: true });
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

  const OnSubmittingSignUpForm = async (event) => {
    if (
      password.length >= 8 &&
      confirmPassword === password &&
      fullname.length > 0 &&
      email.length > 0
    ) {
      const userDetails = {
        FullName: fullname,
        Email: email,
        Password: password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      console.log(userDetails);
      const response = await fetch("https://localhost:7286/api/Login", options);
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 201) {
        alert("Congragulations!! User created successfully");
        Navigate("/", { replace: true });
      } else {
        console.log(responseData);
      }
    } else {
      alert(
        "Please ensure your email, fullname and password meet the requirements."
      );
    }
  };

  const emailClassName =
    isEmailBlur && email === "" ? "notification" : "noNotification";
  const fullnameClassName =
    isFullnameBlur && fullname === "" ? "notification" : "noNotification";
  const passwordClassName =
    isPasswordBlur && password === "" ? "notification" : "noNotification";
  const confirmPasswordClassName =
    isConfirmPasswordBlur && confirmPassword === ""
      ? "notification"
      : "noNotification";
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

  return (
    <div className="container">
      <div className="signcard">
        <div id="card-content">
          <div className="heading">
            <h1>Sign Up</h1>
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
            <div className="form-border"></div>
            <label htmlFor="fullName">Full name</label>
            <br></br>
            <input
              value={fullname}
              onChange={fullnameChangeHandler}
              onBlur={fullnameBlurHandler}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Your Full name"
            />
            <span className={fullnameClassName}>*Required</span>
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
            <button type="submit" onClick={OnSubmittingSignUpForm}>
              Sign Up
            </button>
            <p>
              Already have an account<span onClick={onClickLogin}> Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
