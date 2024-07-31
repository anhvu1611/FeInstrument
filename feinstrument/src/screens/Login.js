import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
  const {user} = useContext(UserContext);
  const {loginContext} = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMessage('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/token', loginData);
      loginContext(loginData.username, response.data);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      setMessage('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.repeatPassword) {
      setMessage('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        fullName: registerData.fullName,
        phoneNumber: '', // add as required
        address: '', // add as required
      });
      toast.success('Đăng ký thành công!');
      navigate('/');
      setMessage('Đăng ký thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng ký!');
      setMessage('Có lỗi xảy ra khi đăng ký');
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/');
  // }});

  return (
    <>
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 500, margin: '50px auto' }}>
          <div style={{ borderStyle: 'solid', borderWidth: '5px', borderColor: '#8bc34a', padding: '20px', borderRadius: 10 }}>
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                  id="tab-login"
                  onClick={() => handleTabClick('login')}
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected={activeTab === 'login'}
                >
                  Đăng nhập
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                  id="tab-register"
                  onClick={() => handleTabClick('register')}
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected={activeTab === 'register'}
                >
                  Đăng ký
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <form onSubmit={handleLoginSubmit}>
                  <div className="text-center mb-3">
                    <p>Đăng nhập với:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>

                  <p className="text-center">hoặc:</p>

                  <div className="form-outline mb-4">
                    <input type="text" id="loginName" className="form-control" name="username" value={loginData.username} onChange={handleLoginChange} />
                    <label className="form-label" htmlFor="loginName">Email hoặc Tài khoản</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" className="form-control" name="password" value={loginData.password} onChange={handleLoginChange} />
                    <label className="form-label" htmlFor="loginPassword">Mật khẩu</label>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center">
                      <div className="form-check mb-3 mb-md-0">
                        <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                        <label className="form-check-label" htmlFor="loginCheck"> Nhớ mật khẩu </label>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                      <a href="#!">Quên mật khẩu?</a>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">Đăng nhập</button>

                  <div className="text-center">
                    <p>Chưa có tài khoản? <a href="#!" onClick={() => handleTabClick('register')}>Đăng ký</a></p>
                  </div>
                </form>
              </div>
              <div
                className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
              >
                <form onSubmit={handleRegisterSubmit}>
                  <div className="text-center mb-3">
                    <p>Đăng nhập với:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>

                  <p className="text-center">hoặc:</p>

                  <div className="form-outline mb-4">
                    <input type="text" id="registerName" className="form-control" name="fullName" value={registerData.fullName} onChange={handleRegisterChange} />
                    <label className="form-label" htmlFor="registerName">Họ và tên</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="registerUsername" className="form-control" name="username" value={registerData.username} onChange={handleRegisterChange} />
                    <label className="form-label" htmlFor="registerUsername">Tên tài khoản</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" id="registerEmail" className="form-control" name="email" value={registerData.email} onChange={handleRegisterChange} />
                    <label className="form-label" htmlFor="registerEmail">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="registerPassword" className="form-control" name="password" value={registerData.password} onChange={handleRegisterChange} />
                    <label className="form-label" htmlFor="registerPassword">Mật khẩu</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="registerRepeatPassword" className="form-control" name="repeatPassword" value={registerData.repeatPassword} onChange={handleRegisterChange} />
                    <label className="form-label" htmlFor="registerRepeatPassword">Nhập lại mật khẩu</label>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" aria-describedby="registerCheckHelpText" />
                    <label className="form-check-label" htmlFor="registerCheck">
                      Tôi đã đọc và đồng ý với các điều khoản
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-3">Đăng ký</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {message && <p className="text-center">{message}</p>}
    </>
  );
};

export default Login;

