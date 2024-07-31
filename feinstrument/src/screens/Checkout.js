import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UserService from '../services/UserService';
import { UserContext } from '../context/UserContext';
import OrderService from '../services/OrderService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);
  const [userLogined, setUserLogined] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUserByUsername(user.username);
        setUserLogined(response.data);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };
    fetchUser();
  }, []);
  console.log("UserExit ===", userLogined);
  console.log("Cart ===", cart);
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
  
  const totalAmount = cart.reduce((total, item) => {
    return total + (item.quantity * item.product.price);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogined((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handlePayment = async () => {
    const orderRequest = {
      username: userLogined.username,
      status: "PENDING", // or any other status
      total: totalAmount,
      address: userLogined.address,
      orderDetailsProductRequests: cart.map(item => ({
        idProduct: item.product.id,
        quantity: item.quantity
      }))
    };

    try {
      const response = await OrderService.createOrder(orderRequest);
      console.log("Order created successfully:", response.data);
      toast.success("Đặt hàng thành công!");
      sessionStorage.removeItem('cart');
      navigate('/')
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: 150 }}>
      {/* <!-- Checkout Page Start --> */}
        <div class="container-fluid py-5">
            <div class="container py-5">
                <h1 class="mb-4">Chi tiết hóa đơn</h1>
                <form action="#">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-6 col-xl-7">
                            <div class="form-item">
                                <label class="form-label my-3">Họ và tên<sup>*</sup></label>
                                <input type="text" class="form-control" name="fullName" value={userLogined.fullName} onChange={handleInputChange} />
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Địa chỉ<sup>*</sup></label>
                                <input type="text" class="form-control" name="address" placeholder="House Number Street Name" value={userLogined.address} onChange={handleInputChange} />
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Sđt<sup>*</sup></label>
                                <input type="tel" class="form-control" name="phoneNumber" value={userLogined.phoneNumber} onChange={handleInputChange} />
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Email<sup>*</sup></label>
                                <input type="email" class="form-control" name="email" value={userLogined.email} onChange={handleInputChange} />
                            </div>
                            <hr/>
                            <div class="form-item">
                                <textarea name="note" class="form-control" spellcheck="false" cols="30" rows="11" placeholder="Ghi chú"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        cart.map((item) => {
                                          return (
                                            <tr>
                                              <th scope="row">
                                                  <div class="d-flex align-items-center mt-2">
                                                      <img src={`data:image/jpeg;base64,${item.product.image}`} class="img-fluid rounded-circle" style={{ width: 90, height: 90 }} alt=""/>
                                                  </div>
                                              </th>
                                              <td class="py-5">{item.product.name}</td>
                                              <td class="py-5">${item.product.price}</td>
                                              <td class="py-5">{item.quantity}</td>
                                              <td class="py-5">${item.quantity * item.product.price}</td>
                                            </tr>
                                          )
                                        })
                                      }
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td class="py-5"></td>
                                            <td class="py-5"></td>
                                            <td class="py-5">
                                                <p class="mb-0 text-dark py-3">Tổng tiền</p>
                                            </td>
                                            <td class="py-5">
                                                <div class="py-3 border-bottom border-top">
                                                    <p class="mb-0 text-dark">${totalAmount}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div class="col-12">
                                    <div class="form-check text-start my-3">
                                        <input type="checkbox" class="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery" checked/>
                                        <label class="form-check-label" for="Delivery-1">Thanh toán khi nhận hàng</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button onClick={handlePayment} type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {/* <!-- Checkout Page End --> */}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
