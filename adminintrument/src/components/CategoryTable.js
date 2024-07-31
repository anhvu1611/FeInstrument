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
} from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

export default function CategoryTable() {
  const [category, setCategory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

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
      const newSelecteds = category.map((item) => item.id);
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

  const handleMenuOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
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
    CategoriesService.deleteCategory(selectedCategory.id)
      .then(() => {
        setCategory(category.filter(item => item.id !== selectedCategory.id));
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
        toast.success('Xóa loại sản phẩm thành công');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi xóa loại sản phẩm!', error);
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
    setSelectedCategory({
      ...selectedCategory,
      [name]: value,
    });
  };

  console.log(selectedCategory);

//   const saveEdit = () => {
//     const newProduct = {
//       name: selectedProduct.name,
//       description: selectedProduct.description,
//       price: selectedProduct.price,
//       stock_quantity: parseInt(selectedProduct.stock_quantity, 10),
//       categoryName: selectedProduct.category,
//       image: selectedProduct.image,
//     };

//     console.log("newProduct", newProduct);

//     ProductService.updateProduct(selectedProduct.id, newProduct)
//       .then(() => {
//         setProducts(products.map((product) =>
//           product.id === selectedProduct.id ? { ...newProduct, id: product.id } : product
//         ));
//         setEditDialogOpen(false);
//         setSelectedProduct(null);
//         toast.success('Lưu sản phẩm thành công');
//       })
//       .catch((error) => {
//         toast.error('Có lỗi xảy ra khi lưu sản phẩm!');
//         console.error('There was an error saving the product!', error);
//       });
//   };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategory = category.filter((item) => {
    if (!item || !item.name) {
      console.warn('Product or product.name is undefined ', item);
      return false;
    }
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const saveNewCategory = () => {
    const newCategory = {
      name: selectedCategory.name,
      description: selectedCategory.description,
    };

    CategoriesService.createCategory(newCategory)
      .then((response) => {
        setCategory([...category, response.data]);
        setAddDialogOpen(false);
        setSelectedCategory(null);
        toast.success('Thêm loại thành công');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi thêm loại!');
        console.error('There was an error adding the product!', error);
      });
  };

  if (!category || category.length === 0) {
    return <div>No category found</div>;
  }

  return (
    <div>
      <SearchWrapper>
        <TextField
          label="Tìm kiếm theo tên loại"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>
          Thêm loại sản phẩm
        </Button>
      </SearchWrapper>
      <TableWrapper component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < category.length}
                  checked={category.length > 0 && selected.length === category.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Mã loại</TableCell>
              <TableCell>Tên loại</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Số sản phẩm</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategory.map((item) => {
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.productCount}</TableCell>
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
              label="Tên loại"
              type="text"
              fullWidth
              value={selectedCategory?.name || ''}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Mô tả"
              multiline
              rows={4}
              fullWidth
              value={selectedCategory?.description || ''}
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
          <DialogTitle>Thêm loại sản phẩm</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="tenLoai"
              label="Tên loại"
              type="text"
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="primary">
              Hủy
            </Button>
            <Button onClick={saveNewCategory} color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
          <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="md" fullWidth>
          <DialogTitle>Chi tiết loại sản phẩm</DialogTitle>
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
                  <TableCell><strong>Mã Loại:</strong></TableCell>
                  <TableCell>#{selectedCategory?.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Tên Loại:</strong></TableCell>
                  <TableCell>{selectedCategory?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mô tả:</strong></TableCell>
                  <TableCell>{selectedCategory?.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Số sản phẩm:</strong></TableCell>
                  <TableCell>{selectedCategory?.productCount}</TableCell>
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

