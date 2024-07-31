
import '../assets/css/nucleo-svg.css';
import '../assets/css/nucleo-icons.css';
import '../assets/css/argon-dashboard.css?v=2.0.4';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4" id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0" href="https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html" target="_blank" rel="noopener noreferrer">
          {/* <img src="../assets/img/Cute-hippo-logo-1024x1024.png" className="navbar-brand-img h-100" alt="main_logo" /> */}
          <span className="ms-1 font-weight-bold h3 text-success" >Hippo Shop</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <div className="collapse navbar-collapse w-auto" style={{height:'75%'}} id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-tv text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Product">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-guitar text-info text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Sản phẩm</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Category">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-list text-info text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Loại</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Order">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-table text-warning text-sm opacity-10"></i>
              </div> 
              <span className="nav-link-text ms-1">Đơn hàng</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/User">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-user text-info text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Khách hàng</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/billing">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-credit-card text-success text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Billing</span>
            </Link>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Tài khoản</h6>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-user text-dark text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Đổi mật khẩu</span>
            </Link>
          </li>
        </ul>
      </div>

    </aside>
  );
};

export default Sidebar;
