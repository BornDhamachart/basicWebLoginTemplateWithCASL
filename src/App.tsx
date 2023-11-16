import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home/HomePage";
import Services from "./Pages/Services/ServicesPage";
import About from "./Pages/About/AboutPage";
import Contact from "./Pages/Contact/ContactPage";
import Register from "./Pages/Register/RegisterPage";
import Login from "./Pages/Login/LoginPage";
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react"

const AdminProtectedRoute = ({ isAuthen, role, redirectPath = "/" }: any) => {
  if (!isAuthen || role !== "Admin") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const UserProtectedRoute = ({ isAuthen, role, redirectPath = "/" }: any) => {
  if (!isAuthen || role !== "User") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const { isAuthen, user } = useAuth();

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <>
      <div className="pt-20">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route element={<AdminProtectedRoute isAuthen={isAuthen} role={user?.role} />}>
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route element={<UserProtectedRoute isAuthen={isAuthen} role={user?.role} />}>
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<>404 Not found</>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
