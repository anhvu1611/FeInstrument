import React, {useState, useEffect, useContext} from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {UserContext} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const CartPage = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    
    const handleThanhToan = () => {
        if (cart.length === 0) {
            toast.error('Giỏ hàng của bạn đang trống!!!');
            return;
        }
        if (user && user.auth === true) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    }
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

    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    const handleIncrease = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleDecrease = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
            sessionStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const handleRemove = (productId) => {
        const newCart = cart.filter(item => item.product.id !== productId);
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleQuantityChange = (index, newQuantity) => {
        const newCart = [...cart];
        newCart[index].quantity = newQuantity;
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
    };

    const calculateTotalPrice = () => {
        const total = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
        setTotalPrice(total);
    };

    const [totalPrice, setTotalPrice] = useState(0);
  return (
    <>
      <Header />
      <div>
        <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Giỏ hàng</h1>
        </div>
      {/* <!-- Cart Page Start --> */}
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            cart.map((item, index) => (
                                <tr key={item.product.id}>
                                    <th scope="row">
                                        <div className="d-flex align-items-center">
                                        <img src={item.img} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} alt="" />
                                        </div>
                                    </th>
                                    <td>
                                        <p className="mb-0 mt-4">{item.product.name}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 mt-4">{item.product.price} $</p>
                                    </td>
                                    <td>
                                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDecrease(index)}>
                                            <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity}  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)} />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleIncrease(index)}>
                                            <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 mt-4">{item.quantity * item.product.price} $</p>
                                    </td>
                                    <td>
                                        <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleRemove(item.product.id)}>
                                        <i className="fa fa-times text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div class="mt-5">
                    <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code"/>
                    <button class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                </div>
                <div class="row g-4 justify-content-end">
                    <div class="col-8"></div>
                    <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div class="bg-light rounded">
                            <div class="p-4">
                                <h1 class="display-6 mb-4">Tổng tiền</h1>
                                <div class="d-flex justify-content-between mb-4">
                                    <h5 class="mb-0 me-4">Tổng tiền giỏ hàng:</h5>
                                    <p class="mb-0">${totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 class="mb-0 ps-4 me-4">Tổng tiền thanh toán:</h5>
                                <p class="mb-0 pe-4">${totalPrice.toFixed(2)}</p>
                            </div>
                            <button onClick={handleThanhToan} class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Cart Page End --> */}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;



