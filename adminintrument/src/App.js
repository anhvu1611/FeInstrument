import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import Tables from './screens/Tables';
import OrderPage from './screens/OrderPage';
import ProductPage from './screens/ProductPage';
import LoginPage from './screens/LoginPage';
import UserPage from './screens/UserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from './screens/OrderDetailsPage';
import CategoryPage from './screens/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/Order" element={<OrderPage />} />
        <Route path="/Product" element={<ProductPage />} />
        <Route path="/Category" element={<CategoryPage />} />
        <Route path="/User" element={<UserPage />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};


export default App;
