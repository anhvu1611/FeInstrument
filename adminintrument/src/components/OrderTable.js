import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OrderService from '../services/OrderService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TableWrapper = styled(TableContainer)({
  minWidth: 1180,
});

const SearchWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const Status = styled('span')(({ theme, status }) => ({
  padding: '0.2em 0.5em',
  borderRadius: '4px',
  display: 'inline-block',
  ...(status === 'Pending' && {
    backgroundColor: '#ffeb3b',
    color: '#000',
  }),
  ...(status === 'Failed' && {
    backgroundColor: '#f44336',
    color: '#fff',
  }),
  ...(status === 'Cancelled' && {
    backgroundColor: '#9e9e9e',
    color: '#fff',
  }),
  ...(status === 'Paid' && {
    backgroundColor: '#4caf50',
    color: '#fff',
  }),
  ...(status === 'Dispatched' && {
    backgroundColor: '#ff9800',
    color: '#fff',
  }),
  ...(status === 'Delivered' && {
    backgroundColor: '#8bc34a',
    color: '#fff',
  }),
  ...(status === 'Out for Delivery' && {
    backgroundColor: '#b39ddb',
    color: '#fff',
  }),
  ...(status === 'Ready to Pickup' && {
    backgroundColor: '#64b5f6',
    color: '#fff',
  }),
}));

export default function OrderTable() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [selected, setSelected] = React.useState([]);

  //get all orders
  useEffect(() => {
    OrderService.getAllOrders().then(response => {
      setOrders(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error("There was an error fetching the orders!", error);
    });
  }, [])

  console.log("Order ne---------", orders);

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };
  const handleViewDetails = () => {
    navigate(`/order-details/${selectedOrder.id}`);
    handleMenuClose();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((order) => order.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) /////ádasdasdasds
  );

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  // const saveNewProduct = () => {
  //   const newProduct = {
  //     name: selectedProduct.name,
  //     description: selectedProduct.description,
  //     price: parseFloat(selectedProduct.price),
  //     stock_quantity: parseInt(selectedProduct.stock_quantity, 10),
  //     categoryName: selectedProduct.category,
  //     image: selectedProduct.image,
  //   };

  //   ProductService.createProduct(newProduct)
  //     .then((response) => {
  //       setProducts([...products, response.data]);
  //       setAddDialogOpen(false);
  //       setSelectedOrder(null);
  //       toast.success('Thêm sản phẩm thành công');
  //     })
  //     .catch((error) => {
  //       toast.error('Có lỗi xảy ra khi thêm sản phẩm!');
  //       console.error('There was an error adding the product!', error);
  //     });
  // };

  return (
    <div>
      <SearchWrapper>
        <TextField
          label="Tìm kiếm theo tên khách hàng"
          style={{ width: '300px' }}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchWrapper>
      <TableWrapper component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < orders.length}
                  checked={orders.length > 0 && selected.length === orders.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Đơn hàng</TableCell>
              <TableCell>Ngày tạo đơn</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tổng bill</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((item) => {
              const isItemSelected = isSelected(item.id);
              return (
                <TableRow
                  key={item.id}
                  hover
                  onClick={(event) => handleClick(event, item.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{`#${item.id}`}</TableCell>
                  <TableCell>{item.createdDate}</TableCell>
                  <TableCell>
                    <div style={{ marginLeft: '10px' }}>
                      <Typography>{item.user.fullName}</Typography>
                      <Typography variant="body2" color="textSecondary">{item.user.username}</Typography>
                    </div>
                  </TableCell>
                  <TableCell>{item.address}</TableCell>

                  <TableCell>
                    <Status status={item.price}>{item.status}</Status>
                  </TableCell>
                  <TableCell>
                    <Status status={item.stock_quantity}>${item.total}</Status>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="actions" onClick={(event) => handleMenuOpen(event, item)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewDetails}>Xem chi tiết</MenuItem>
          <MenuItem onClick={handleDelete}>Xóa</MenuItem>
        </Menu>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
        >
          <DialogTitle>Xóa sản phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa sản phẩm này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Hủy
            </Button>
            <Button color="primary">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
        >
          <DialogTitle>Sửa sản phẩm</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Tên sản phẩm"
              type="text"
              fullWidth
              // value={selectedProduct?.name || ''}
              // onChange={handleEditChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Loại nhạc cụ</InputLabel>
              <Select
                name="category"
                // value={selectedProduct?.category || ''}
                // onChange={handleEditChange}
                label="Loại nhạc cụ"
              >
                {/* {
                  category.map((item) => {
                    return <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                  })
                } */}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="price"
              label="Giá"
              type="number"
              fullWidth
              // value={selectedProduct?.price || ''}
              // onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Số lượng"
              type="number"
              fullWidth
              // value={selectedProduct?.stock_quantity || ''}
              // onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Mô tả"
              multiline
              rows={4}
              fullWidth
              // value={selectedProduct?.description || ''}
              // onChange={handleEditChange}
            />
            {/* <div style={{ marginBottom: '16px' }}>
              {imagePreview ? (
                <Avatar src={imagePreview} alt="Product Image" />
              ) : (
                <Avatar>Không có hình ảnh</Avatar>
              )}
            </div> */}
            <Button
              variant="contained"
              component="label"
            >
              Chọn hình ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                // onChange={handleImageChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Hủy
            </Button>
            <Button  color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={addDialogOpen}
          onClose={handleAddDialogClose}
        >
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Tên sản phẩm"
              type="text"
              fullWidth
              // onChange={handleEditChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Loại nhạc cụ</InputLabel>
              <Select
                name="category"
                // onChange={handleEditChange}
                label="Loại nhạc cụ"
              >
                {/* {
                  category.map((item) => {
                    return <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                  })
                } */}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="price"
              label="Giá"
              type="number"
              fullWidth
              // onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Số lượng"
              type="number"
              fullWidth
              // onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Mô tả"
              multiline
              rows={4}
              fullWidth
              // onChange={handleEditChange}
            />
            {/* <div style={{ marginBottom: '16px' }}>
              {imagePreview ? (
                <Avatar src={imagePreview} alt="Product Image" />
              ) : (
                <Avatar>Không có hình ảnh</Avatar>
              )}
            </div> */}
            <Button
              variant="contained"
              component="label"
            >
              Chọn hình ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                // onChange={handleImageChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="primary">
              Hủy
            </Button>
            <Button  color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
          <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="md" fullWidth>
          <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          <DialogContent>
          <DialogContentText>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '20%' }}><strong>Thông tin</strong></TableCell>
                  <TableCell style={{ width: '80%' }}><strong>Chi tiết</strong></TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                <TableRow>
                  <TableCell><strong>Tên sản phẩm:</strong></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mô tả:</strong></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Giá:</strong></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Số lượng:</strong></TableCell>
                  {/* <TableCell>{selectedProduct?.stock_quantity}</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell><strong>Loại nhạc cụ:</strong></TableCell>
                  {/* <TableCell>{selectedProduct?.category?.name}</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell><strong>Hình ảnh:</strong></TableCell>
                  {/* {selectedProduct?.image && (
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                      <img src={`data:image/jpeg;base64,${selectedProduct.image}`} alt="Product" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    </TableCell>
                  )} */}
                </TableRow>
              </TableBody>
            </Table>
          </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailsDialogClose} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </TableWrapper>
    </div>
  );
}



// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Typography, IconButton } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   status: {
//     padding: '0.2em 0.5em',
//     borderRadius: '4px',
//     display: 'inline-block',
//   },
//   pending: {
//     backgroundColor: '#ffeb3b',
//     color: '#000',
//   },
//   failed: {
//     backgroundColor: '#f44336',
//     color: '#fff',
//   },
//   cancelled: {
//     backgroundColor: '#9e9e9e',
//     color: '#fff',
//   },
//   paid: {
//     backgroundColor: '#4caf50',
//     color: '#fff',
//   },
//   dispatched: {
//     backgroundColor: '#ff9800',
//     color: '#fff',
//   },
//   delivered: {
//     backgroundColor: '#8bc34a',
//     color: '#fff',
//   },
//   outForDelivery: {
//     backgroundColor: '#b39ddb',
//     color: '#fff',
//   },
//   readyToPickup: {
//     backgroundColor: '#64b5f6',
//     color: '#fff',
//   },
//   button: {
//     position: 'fixed',
//     bottom: '20px',
//     right: '20px',
//   },
// });

// const orders = [
//   { id: 6979, date: 'Apr 15, 2023, 10:21', customer: { name: 'Cristine Easom', email: 'ceasomw@theguardian.com', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }, payment: 'Pending', status: 'Delivered', method: 'Mastercard', last4: '2356' },
//   { id: 6624, date: 'Apr 17, 2023, 6:43', customer: { name: 'Fayre Screech', email: 'fscreechs@army.mil', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }, payment: 'Failed', status: 'Delivered', method: 'Mastercard', last4: '2077' },
//   { id: 9305, date: 'Apr 17, 2023, 8:05', customer: { name: 'Pauline Pfaffe', email: 'ppfaffe1i@wikia.com', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' }, payment: 'Cancelled', status: 'Out for Delivery', method: 'Paypal', last4: 'gmail.com' },
//   { id: 8005, date: 'Apr 22, 2023, 3:01', customer: { name: 'Maurits Nealey', email: 'mnealeyf@japanpost.jp', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }, payment: 'Paid', status: 'Dispatched', method: 'Mastercard', last4: '1555' },
//   { id: 5859, date: 'Apr 29, 2023, 9:52', customer: { name: 'Eydie Vogelein', email: 'evogelein2g@forbes.com', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' }, payment: 'Cancelled', status: 'Out for Delivery', method: 'Paypal', last4: 'forbes.com' },
//   { id: 8114, date: 'Apr 8, 2023, 3:39', customer: { name: 'Ulysses Goodlife', email: 'ugoodlife2p@blogger.com', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }, payment: 'Failed', status: 'Out for Delivery', method: 'Mastercard', last4: '4509' },
//   { id: 6890, date: 'Aug 1, 2022, 7:24', customer: { name: 'Etienne Duke', email: 'eduke1z@dell.com', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' }, payment: 'Cancelled', status: 'Ready to Pickup', method: 'Mastercard', last4: '3507' },
// ];

// export default function OrderTable() {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="order table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Order</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Customers</TableCell>
//             <TableCell>Payment</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Method</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {orders.map((order) => (
//             <TableRow key={order.id}>
//               <TableCell>{`#${order.id}`}</TableCell>
//               <TableCell>{order.date}</TableCell>
//               <TableCell>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Avatar src={order.customer.avatar} />
//                   <div style={{ marginLeft: '10px' }}>
//                     <Typography>{order.customer.name}</Typography>
//                     <Typography variant="body2" color="textSecondary">{order.customer.email}</Typography>
//                   </div>
//                 </div>
//               </TableCell>
//               <TableCell>
//                 <span className={`${classes.status} ${classes[order.payment.toLowerCase()]}`}>{order.payment}</span>
//               </TableCell>
//               <TableCell>
//                 <span className={`${classes.status} ${classes[order.status.replace(/ /g, '').toLowerCase()]}`}>{order.status}</span>
//               </TableCell>
//               <TableCell>
//                 <span>{order.method} •••• {order.last4}</span>
//               </TableCell>
//               <TableCell>
//                 <IconButton aria-label="actions">
//                   <MoreVertIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Button variant="contained" color="primary" className={classes.button}>Buy Now</Button>
//     </TableContainer>
//   );
// }
