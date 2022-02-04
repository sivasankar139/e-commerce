import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./Pages/Cartpage";
import Homepage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProductInfo from "./Pages/ProductInfo";
import RegisterPage from "./Pages/RegisterPage";
import "./Stylesheets/layout.css";
import "./Stylesheets/products.css";
import './Stylesheets/auth.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from "./Pages/OrdersPage";
import AdminPage from "./Pages/AdminPage";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<ProtectedRoutes><OrdersPage/></ProtectedRoutes>}/>
          <Route path="/cart" element={<ProtectedRoutes><CartPage /></ProtectedRoutes>} />
          <Route path="/admin" element={<ProtectedRoutes><AdminPage /></ProtectedRoutes>} />
          <Route path="/productinfo/:productId" element={<ProtectedRoutes><ProductInfo /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
export const ProtectedRoutes=({children})=>{
  if(localStorage.getItem('currentUser')){
    return children;
  }
  else{
    return <Navigate to="/login"/>
  }

}
