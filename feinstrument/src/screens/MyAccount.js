import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import UserService from '../services/UserService';
import OrderService from '../services/OrderService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const MyAccount = () => {
  const { user } = useContext(UserContext);
  const [userLogined, setUserLogined] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserService.getUserByUsername(user.username);
        setUserLogined(response.data);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    const fetchUserOrders = async () => {
      try {
        const response = await OrderService.getOrdersByUsername(user.username);
        setOrders(response.data);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };

    fetchUserData();
    fetchUserOrders();
  }, [user.username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogined((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await UserService.updateUser(userLogined);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error("There was an error updating the user!", error);
      alert('Error updating profile');
    }
  };

  return (
    <>
      <Header />
      <div class="container-fluid page-header py-5">
          <h1 class="text-center text-white display-6">Tài khoản của tôi</h1>
      </div>
      <div className="my-account container" style={{ padding: '100px 0', marginTop: 10 }}>
        <div className="row">
          <div className="col-md-6">
            <div className="account-info">
              <h2>Thông tin cá nhân</h2>
              <div className="form-item">
                <label className="form-label my-3">Họ và tên<sup>*</sup></label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="fullName"
                  value={userLogined.fullName} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-item">
                <label className="form-label my-3">Địa chỉ<sup>*</sup></label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="House Number Street Name" 
                  name="address"
                  value={userLogined.address} 
                  onChange={handleInputChange} 
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-item">
                <label className="form-label my-3">Số điện thoại<sup>*</sup></label>
                <input 
                  type="tel" 
                  className="form-control" 
                  name="phoneNumber"
                  value={userLogined.phoneNumber} 
                  onChange={handleInputChange} 
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-item">
                <label className="form-label my-3">Email<sup>*</sup></label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={userLogined.email} 
                  onChange={handleInputChange} 
                  readOnly={!isEditing}
                />
              </div>
              {isEditing ? (
                <button className="btn btn-primary mt-3" onClick={handleSaveClick}>Lưu</button>
              ) : (
                <button className="btn btn-secondary mt-3" onClick={handleEditClick}>Cập nhật</button>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="order-history">
              <h2>Lịch sử đặt hàng</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID đơn hàng</th>
                    <th scope="col">Thời gian đặt hàng </th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>${order.total}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
