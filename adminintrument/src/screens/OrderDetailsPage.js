import React, {useEffect, useState} from 'react';
import { 
  Grid, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Checkbox, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/system';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import OrderService from '../services/OrderService';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100vh',
});
const MainContent = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: '18rem',
});
const NavbarWrapper = styled('div')({
    width: '100%',
    marginBottom: '1rem',
});

const OrderDetails = () => {
  const [orders, setOrders] = useState();
  const [editingIndex, setEditingIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderService.getOrderById(id);
        if (response.data) {
          setOrders(response.data);
          console.log('Order data:', response.data);
        } else {
          console.error('No data returned from API');
        }
      } catch (error) {
        console.error('There was an error fetching the orders!', error);
      }
    };
    fetchOrder();
  }, [id]);

  const handleEditClick = (index, currentQuantity) => {
    setEditingIndex(index);
    setNewQuantity(currentQuantity);
  };

  const handleQuantityChange = (event) => {
    setNewQuantity(parseInt(event.target.value, 10));
  };

  const handleSaveClick = () => {
    if (editingIndex !== null) {
      const updatedOrders = { ...orders };
      updatedOrders.orderDetailsProducts[editingIndex].quantity = newQuantity;
      setOrders(updatedOrders);
      setEditingIndex(null);
    }
  };

  if (!orders || orders.length === 0) {
    return <div>No orders found</div>;
  }

  const totalAmount = orders.orderDetailsProducts.reduce((sum, product) => sum + product.quantity * product.product.price, 0);

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" width={'100%'} paddingInline={10}>
          <div style={{marginBottom: -10}}>
            <Typography variant="h5">
              Đơn hàng #{id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {orders.order.createdDate}
            </Typography>
          </div>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
            Xóa đơn hàng
          </Button>
        </Box>
        <Grid container spacing={-2} mt={3}>
          <Grid item xs={12} md={8}>
            <Paper>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" paddingLeft={5}>Chi tiết đơn hàng</Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.orderDetailsProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar src={`data:image/jpeg;base64,${product.product.image}`} alt={product.name} style={{ marginRight: 10 }} />
                            <Box>
                              <Typography variant="body1">{product.product.name}</Typography>
                              <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>${product.product.price}</TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <TextField
                              type="number"
                              value={newQuantity}
                              onChange={handleQuantityChange}
                              inputProps={{ min: 1 }}
                            />
                          ) : (
                            product.quantity
                          )}
                        </TableCell>
                        <TableCell>${product.quantity * product.product.price}</TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <IconButton color="primary" onClick={handleSaveClick}>
                              <SaveIcon />
                            </IconButton>
                          ) : (
                            <IconButton color="primary" onClick={() => handleEditClick(index, product.quantity)}>
                              <EditIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body1">{}</Typography>
                </Box>
                <Typography variant="h6">Tổng hóa đơn: ${totalAmount}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Box p={2} display="flex" justifyContent="space-between">
                <Typography variant="h6">Chi tiết khách hàng</Typography>
              </Box>
              <Box display="flex" alignItems="center" p={2}>
                <Avatar alt={orders.order.user.fullName} style={{ marginRight: 10 }} />
                <Box>
                  <Typography variant="body1">{orders.order.user.fullName}</Typography>
                  <Typography variant="body2" color="textSecondary">Tài khoản: {orders.order.user.username}</Typography>
                </Box>
              </Box>
              <Box p={2}>
                <Typography variant="body2" color="textSecondary">Thông tin liên lạc</Typography>
                <Typography variant="body1">Email: {orders.order.user.email}</Typography>
                <Typography variant="body1">Sđt: {orders.order.user.phoneNumber}</Typography>
              </Box>
              <Box p={2}>
                <Typography variant="body2" color="textSecondary">Địa chỉ</Typography>
                <Typography variant="body1">{orders.order.user.address}</Typography>
              </Box>
            </Paper>
            <Paper style={{marginTop: 30}}>
              <Box p={2} display="flex" justifyContent="space-between">
                <Typography variant="h6">Thông tin nhận hàng</Typography>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Box>
              <Box p={2}>
                <Typography variant="body2" color="textSecondary">Địa chỉ nhận hàng</Typography>
                <Typography variant="body1">{orders.order.address}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </MainContent>
    </Container>
  );
};

export default OrderDetails;

// import React, {useEffect, useState} from 'react';
// import { 
//   Grid, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Checkbox
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { styled } from '@mui/system';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import { useParams } from 'react-router-dom';
// import OrderService from '../services/OrderService';

// const Container = styled('div')({
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     height: '100vh',
//   });
// const MainContent = styled('div')({
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     marginLeft: '18rem',
//   });
  
//   const NavbarWrapper = styled('div')({
//     width: '100%',
//     marginBottom: '1rem',
//   });
// const OrderDetails = () => {

//   const [orders, setOrders] = useState();
//   const { id } = useParams();


//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await OrderService.getOrderById(id);
//         if (response.data) {
//           setOrders(response.data);
//           console.log('Order data:', response.data);
//         } else {
//           console.error('No data returned from API');
//         }
//       } catch (error) {
//         console.error('There was an error fetching the orders!', error);
//       }
//     };
  
//     fetchOrder();
//   }, [id]);
  
//   console.log('Order state:', orders);

  
//   if (!orders || orders.length === 0) {
//     return <div>No orders found</div>;
//   }
  
//   const totalAmount = orders.orderDetailsProducts.reduce((sum, product) => sum + product.quantity * product.product.price, 0);

//   return (
    
//     <Container>
//         <Sidebar />
//         <MainContent>
//         <NavbarWrapper>
//           <Navbar />
//         </NavbarWrapper>
//         <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" width={'100%'} paddingInline={10}>
//             <div style={{marginBottom: -10}}>
//                 <Typography variant="h5">
//                     Đơn hàng #{id}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" >
//                     {orders.order.createdDate}
//                 </Typography>
//             </div>
//             <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
//                 Xóa đơn hàng
//             </Button>
//         </Box>
      

//       <Grid container spacing={-2} mt={3}>
//         <Grid item xs={12} md={8}>
//           <Paper>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6" paddingLeft={5}>Chi tiết đơn hàng</Typography>
//               <IconButton color="primary" >
//                 <EditIcon />
//               </IconButton>
//             </Box>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell padding="checkbox">
//                       <Checkbox />
//                     </TableCell>
//                     <TableCell>Sản phẩm</TableCell>
//                     <TableCell>Giá</TableCell>
//                     <TableCell>Số lượng</TableCell>
//                     <TableCell>Tổng tiền</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {orders.orderDetailsProducts.map((product, index) => (
//                     <TableRow key={index}>
//                       <TableCell padding="checkbox">
//                         <Checkbox />
//                       </TableCell>
//                       <TableCell>
//                         <Box display="flex" alignItems="center">
//                           <Avatar src={`data:image/jpeg;base64,${product.product.image}`} alt={product.name} style={{ marginRight: 10 }} />
//                           <Box>
//                             <Typography variant="body1">{product.product.name}</Typography>
//                             <Typography variant="body2" color="textSecondary">{product.description}</Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>${product.product.price}</TableCell>
//                       <TableCell>{product.quantity}</TableCell>
//                       <TableCell>${product.quantity * product.product.price}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box p={2} display="flex" justifyContent="space-between">
//               <Box>
//                 <Typography variant="body1">{}</Typography>
//               </Box>
//               <Typography variant="h6">Tổng hóa đơn: ${totalAmount}</Typography>
//             </Box>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper>
//             <Box p={2} display="flex" justifyContent="space-between">
//               <Typography variant="h6">Chi tiết khách hàng</Typography>
//             </Box>
//             <Box display="flex" alignItems="center" p={2}>
//               <Avatar  alt={orders.order.user.fullName} style={{ marginRight: 10 }} />
//               <Box>
//                 <Typography variant="body1">{orders.order.user.fullName}</Typography>
//                 <Typography variant="body2" color="textSecondary">Tài khoản: {orders.order.user.username}</Typography>
//               </Box>
//             </Box>
//             <Box p={2}>
//               <Typography variant="body2" color="textSecondary">Thông tin liên lạc</Typography>
//               <Typography variant="body1">Email: {orders.order.user.email}</Typography>
//               <Typography variant="body1">Sđt: {orders.order.user.phoneNumber}</Typography>
//             </Box>
//             <Box p={2}>
//               <Typography variant="body2" color="textSecondary">Địa chỉ</Typography>
//               <Typography variant="body1">{orders.order.user.address}</Typography>
//             </Box>
//           </Paper>
//           <Paper style={{marginTop: 30}}>
//             <Box p={2} display="flex" justifyContent="space-between">
//               <Typography variant="h6">Thông tin nhận hàng</Typography>
//               <IconButton color="primary">
//                 <EditIcon />
//               </IconButton>
//             </Box>
//             <Box p={2}>
//               <Typography variant="body2" color="textSecondary">Địa chỉ nhận hàng</Typography>
//               <Typography variant="body1">{orders.order.address}</Typography>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//       </MainContent>

//     </Container>
//   );
// };

// export default OrderDetails;
