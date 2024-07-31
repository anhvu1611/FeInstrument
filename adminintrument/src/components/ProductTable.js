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
} from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProductService from '../services/ProductService';
import CategoriesService from '../services/CategoriesService';
import { toast } from 'react-toastify';

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

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, [products]);


  
  // useEffect(() => {
  //   ProductService.getAllProducts()
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('There was an error fetching the products!', error);
  //     });
  // }, []);

  useEffect(() => {
    CategoriesService.getAllCategories().then(response => {
      setCategory(response.data);
    }).catch(error => {
      console.error("There was an error fetching the categories!", error);
    });
  }, []);

  const [selected, setSelected] = React.useState([]);

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };
  const handleViewDetails = () => {
    setDetailsDialogOpen(true);
    handleMenuClose();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((product) => product.id);
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

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
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

  const confirmDelete = () => {
    ProductService.deleteProductById(selectedProduct.id)
      .then(() => {
        setProducts(products.filter(product => product.id !== selectedProduct.id));
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
        toast.success('Xóa sản phẩm thành công');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi xóa sản phẩm!', error);
        console.error('There was an error deleting the product!', error);
        setDeleteDialogOpen(false);
      });
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  console.log(selectedProduct);

  const saveEdit = () => {
    const newProduct = {
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      stock_quantity: parseInt(selectedProduct.stock_quantity, 10),
      categoryName: selectedProduct.category,
      image: selectedProduct.image,
    };

    console.log("newProduct", newProduct);

    ProductService.updateProduct(selectedProduct.id, newProduct)
      .then(() => {
        setProducts(products.map((product) =>
          product.id === selectedProduct.id ? { ...newProduct, id: product.id } : product
        ));
        setEditDialogOpen(false);
        setSelectedProduct(null);
        toast.success('Lưu sản phẩm thành công');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi lưu sản phẩm!');
        console.error('There was an error saving the product!', error);
      });
  };

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (selectedProduct?.image) {
      setImagePreview(`data:image/jpeg;base64,${selectedProduct.image}`);
    } else {
      setImagePreview('');
    }
  }, [selectedProduct?.image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProduct({
          ...selectedProduct,
          image: reader.result.split(',')[1], // Chỉ giữ phần base64 của dữ liệu hình ảnh
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const saveNewProduct = () => {
    const newProduct = {
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: parseFloat(selectedProduct.price),
      stock_quantity: parseInt(selectedProduct.stock_quantity, 10),
      categoryName: selectedProduct.category,
      image: selectedProduct.image,
    };

    ProductService.createProduct(newProduct)
      .then((response) => {
        setProducts(prev=>[...prev, response.data]);
        setAddDialogOpen(false);
        setSelectedProduct(null);
        toast.success('Thêm sản phẩm thành công');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi thêm sản phẩm!');
        console.error('There was an error adding the product!', error);
      });
  };

  const filteredProducts = products.filter((product) => {
    if (!product || !product.name) {
      console.warn('Product or product.name is undefined ', product);
      return false;
    }
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!products || products.length === 0) {
    return <div>No product found</div>;
  }

  console.log("re render");

  return (
    <div>
      <SearchWrapper>
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>
          Thêm sản phẩm
        </Button>
      </SearchWrapper>
      <TableWrapper component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < products.length}
                  checked={products.length > 0 && selected.length === products.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại nhạc cụ</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((item) => {
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
                  <TableCell><Avatar src={`data:image/jpeg;base64,${item.image}`} /></TableCell>
                  <TableCell>{`#${item.id}`}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>
                    <Status status={item.price}>${item.price}</Status>
                  </TableCell>
                  <TableCell>
                    <Status status={item.stock_quantity}>{item.stock_quantity}</Status>
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
          <MenuItem onClick={handleEdit}>Sửa</MenuItem>
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
            <Button onClick={confirmDelete} color="primary">
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
              value={selectedProduct?.name || ''}
              onChange={handleEditChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Loại nhạc cụ</InputLabel>
              <Select
                name="category"
                value={selectedProduct?.category || ''}
                onChange={handleEditChange}
                label="Loại nhạc cụ"
              >
                {
                  category.map((item) => {
                    return <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="price"
              label="Giá"
              type="number"
              fullWidth
              value={selectedProduct?.price || ''}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Số lượng"
              type="number"
              fullWidth
              value={selectedProduct?.stock_quantity || ''}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Mô tả"
              multiline
              rows={4}
              fullWidth
              value={selectedProduct?.description || ''}
              onChange={handleEditChange}
            />
            <div style={{ marginBottom: '16px' }}>
              {imagePreview ? (
                <Avatar src={imagePreview} alt="Product Image" />
              ) : (
                <Avatar>Không có hình ảnh</Avatar>
              )}
            </div>
            <Button
              variant="contained"
              component="label"
            >
              Chọn hình ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Hủy
            </Button>
            <Button onClick={saveEdit} color="primary">
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
              onChange={handleEditChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Loại nhạc cụ</InputLabel>
              <Select
                name="category"
                onChange={handleEditChange}
                label="Loại nhạc cụ"
              >
                {
                  category.map((item) => {
                    return <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="price"
              label="Giá"
              type="number"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="stock_quantity"
              label="Số lượng"
              type="number"
              fullWidth
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Mô tả"
              multiline
              rows={4}
              fullWidth
              onChange={handleEditChange}
            />
            <div style={{ marginBottom: '16px' }}>
              {imagePreview ? (
                <Avatar src={imagePreview} alt="Product Image" />
              ) : (
                <Avatar>Không có hình ảnh</Avatar>
              )}
            </div>
            <Button
              variant="contained"
              component="label"
            >
              Chọn hình ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="primary">
              Hủy
            </Button>
            <Button onClick={saveNewProduct} color="primary">
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
                  <TableCell>{selectedProduct?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mô tả:</strong></TableCell>
                  <TableCell>{selectedProduct?.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Giá:</strong></TableCell>
                  <TableCell>{selectedProduct?.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Số lượng:</strong></TableCell>
                  <TableCell>{selectedProduct?.stock_quantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Loại nhạc cụ:</strong></TableCell>
                  <TableCell>{selectedProduct?.category?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Hình ảnh:</strong></TableCell>
                  {selectedProduct?.image && (
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                      <img src={`data:image/jpeg;base64,${selectedProduct.image}`} alt="Product" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    </TableCell>
                  )}
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

