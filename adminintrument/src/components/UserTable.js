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
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OrderService from '../services/OrderService';
import { toast } from 'react-toastify';
import UserService from '../services/UserService';

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

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [selected, setSelected] = React.useState([]);

  //get all orders
  useEffect(() => {
    UserService.getAllUsers().then(response => {
      setUsers(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error("There was an error fetching the orders!", error);
    });
  }, [])

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };
  const handleViewDetails = () => {
    setDetailsDialogOpen(true);
    handleMenuClose();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((order) => order.id);
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

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value,
    });
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

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) /////ádasdasdasds
  );

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const confirmDelete = () => {
    UserService.deleteUser(selectedUser.id)
      .then(() => {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setDeleteDialogOpen(false);
        setSelectedUser(null);
        toast.success('Xóa tài khoản thành công');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi xóa tài khoản!', error);
        console.error('There was an error deleting the product!', error);
        setDeleteDialogOpen(false);
      });
  };

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

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDialogOpen}
        >
          Thêm khách hàng
        </Button>
      </SearchWrapper>
      <TableWrapper component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < users.length}
                  checked={users.length > 0 && selected.length === users.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Tài khoản</TableCell>
              <TableCell>Sđt</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Số đơn hàng</TableCell>
              <TableCell>Tổng chi tiêu</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((item) => {
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
                  <TableCell>
                    <div style={{ marginLeft: '10px' }}>
                        <Typography>{item.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">{item.email}</Typography>
                    </div>
                  </TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <Status status={item.price}>{item.soDonHang}</Status>
                  </TableCell>
                  <TableCell>
                    <Status status={item.tongTien}>${item.tongTien}</Status>
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
          <MenuItem onClick={handleEdit} >Cập nhật</MenuItem>
          <MenuItem onClick={handleDelete}>Xóa</MenuItem>
        </Menu>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
        >
          <DialogTitle>Xóa tài khoản</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa tài khoản này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Hủy
            </Button>
            <Button onClick={confirmDelete} color="primary">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
        >
          <DialogTitle>Cập nhật thông tin khách hàng</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Họ và tên"
              type="text"
              fullWidth
              value={selectedUser?.fullName || ''}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Số điện thoại"
              type="number"
              fullWidth
              value={selectedUser?.phoneNumber || ''}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Email"
              type="type"
              fullWidth
              value={selectedUser?.email || ''}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Địa chỉ"
              type="type"
              fullWidth
              value={selectedUser?.address || ''}
              onChange={handleEditChange}
            />
           
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
          <DialogTitle>Tạo mới khách hàng</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Họ và tên"
              type="text"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Tài khoản"
              type="text"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Mật khẩu"
              type="password"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Số điện thoại"
              type="text"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Email"
              type="text"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Địa chỉ"
              type="text"
              fullWidth
              onChange={handleEditChange}
            />

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
          <DialogTitle>Chi tiết khách hàng</DialogTitle>
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
                  <TableCell><strong>Họ và tên:</strong></TableCell>
                  <TableCell>{selectedUser?.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Số điện thoại:</strong></TableCell>
                  <TableCell>{selectedUser?.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Tài khoản:</strong></TableCell>
                  <TableCell>{selectedUser?.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email:</strong></TableCell>
                  <TableCell>{selectedUser?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Địa chỉ:</strong></TableCell>
                  <TableCell>{selectedUser?.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Số đơn đã đặt:</strong></TableCell>
                  <TableCell>{selectedUser?.soDonHang}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Tổng chi tiêu:</strong></TableCell>
                  <TableCell>{selectedUser?.tongTien}</TableCell>
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