import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import DetailsPage from './screens/DetailsPage';
import ShopPage from './screens/ShopPage';
import CartPage from './screens/CartPage';
import Checkout from './screens/Checkout';
import Login from './screens/Login';
import { UserContext } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from './screens/AboutPage';
import ContactPage from './screens/ContactPage';
import MyAccount from './screens/MyAccount';

const App = () => {
  const { user } = useContext(UserContext);
  console.log("User======", user);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/:all" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/category/:categoryName" element={<ShopPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
