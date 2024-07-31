import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { user, loginContext } = useContext(UserContext);

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/admin/auth/token', loginData);
            console.log('Token:', response.data);
            loginContext(loginData.username, response.data);
            toast.success('Đăng nhập thành công!');
            navigate('/product');
        } catch (error) {
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
            setMessage('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    return (
        <main className="main-content mt-0">
            <section>
                <div className="page-header min-vh-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                <div className="card card-plain">
                                    <div className="card-header pb-0 text-start">
                                        <h4 className="font-weight-bolder">Sign In</h4>
                                        <p className="mb-0">Enter your email and password to sign in</p>
                                    </div>
                                    <div className="card-body">
                                        <form role="form" onSubmit={handleLoginSubmit}>
                                            <div className="mb-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    name="username" 
                                                    placeholder="Email" 
                                                    aria-label="Email" 
                                                    value={loginData.username} 
                                                    onChange={handleLoginChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input 
                                                    type="password" 
                                                    className="form-control form-control-lg" 
                                                    name="password" 
                                                    placeholder="Password" 
                                                    aria-label="Password" 
                                                    value={loginData.password} 
                                                    onChange={handleLoginChange}
                                                />
                                            </div>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="rememberMe"/>
                                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-4 text-sm mx-auto">
                                            Don't have an account?
                                            <a href="javascript:;" className="text-primary text-gradient font-weight-bold">Sign up</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden">
                                    <span className="mask bg-gradient-primary opacity-6"></span>
                                    <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                                    <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;

