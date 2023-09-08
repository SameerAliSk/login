import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signUp";
import Login from "./login";
import ForgotPassword from "./fPassword";
import "./App.css";
import Home from "./Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
