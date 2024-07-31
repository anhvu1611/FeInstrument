import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/styles/Header.css';
import {UserContext} from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  const {logout, user} = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const [showTopbar, setShowTopbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowTopbar(scrollTop === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);
  

  return (
    <div>
      <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-grow text-primary" role="status"></div>
      </div>

      {/* Top Bar */}
      {showTopbar && (
        <div className="container-fluid fixed-top">
          <div className="container topbar bg-primary d-lg-block">
            <div className="d-flex justify-content-between">
              <div className="top-info ps-2">
                <small className="me-3">
                  <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                  <a href="#" className="text-white">Nguyễn Văn Bảo, Gò Vấp</a>
                </small>
                <small className="me-3">
                  <i className="fas fa-envelope me-2 text-secondary"></i>
                  <a href="#" className="text-white">hippo@gmail.com</a>
                </small>
              </div>
              <div className="top-link pe-2">
                {user && user.auth === true ? (
                  <a href="#" className="text-white" onClick={handleLogout}><small className="text-white mx-2">Xin chào {user.username} || </small><small className="text-white mx-2">Đăng Xuất</small></a>
                ) : (
                  <Link to="/login" className="text-white"><small className="text-white mx-2">Đăng Nhập</small></Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="container-fluid px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl fixed-top" style={{ top: showTopbar ? '50px' : '0px' }}>
          <div className="container">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">Hippo Shop</h1>
            </Link>
            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">Trang chủ</Link>
                <Link to="/about" className="nav-item nav-link">Giới thiệu</Link>
                <div className="nav-item dropdown">
                  <a href="/all" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Sản phẩm</a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">             
                    <Link to="/category/Piano" className="dropdown-item">Piano</Link>
                    <Link to="/category/Guitar" className="dropdown-item">Guitar</Link>
                    <Link to="/category/Trống" className="dropdown-item">Trống</Link>
                    <Link to="/category/Sáo" className="dropdown-item">Sáo</Link>
                  </div>
                </div>
                <Link to="/contact" className="nav-item nav-link">Liên hệ</Link>
              </div>
              <div className="d-flex m-3 me-0">
                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal">
                  <i className="fas fa-search text-primary"></i>
                </button>
                <Link to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}>{cart.length}</span>
                </Link>
                <Link to="/myaccount" className="my-auto">
                  <i className="fas fa-user fa-2x"></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
