import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home/HomePage";
import Services from "./Pages/Services/ServicesPage";
import About from "./Pages/About/AboutPage";
import Contact from "./Pages/Contact/ContactPage";
import Register from "./Pages/Register/RegisterPage";
import Login from "./Pages/Login/LoginPage";
import React, { useEffect, useState } from 'react'
import axios from "axios";

const ProtectedRoute = ({ isAuthen, redirectPath = "/" } : any) => {
  if (!isAuthen) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const [isAuthen, setIsAuthen] = useState(false);

  const authentication = () => {
    const token = localStorage.getItem('token');
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: ``,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ token
        },
    })
      .then((res) => {
        console.log("Authentication response", res.data);
        if(res.data.status === "ok" ) {
          console.log("Successfully authenticated");
          setIsAuthen(true);
      } else {
        console.log("Unsuccessfully authenticated");
        localStorage.removeItem('token');
      }
      })
      .catch((error) => {
        console.log("API Error", error);
      });
  };

  useEffect(() => {
    authentication();
  }, []);

  return (
    <>
      <div className="pt-20">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route element={<ProtectedRoute isAuthen={isAuthen} />}>
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<>404 Not found</>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
