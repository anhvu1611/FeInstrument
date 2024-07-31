import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../assets/styles/css/bootstrap.min.css';
import '../lib/lightbox/css/lightbox.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css';
import CategoriesService from '../services/CategoriesService';
import ProductService from '../services/ProductService';

const ShopPage = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const handleDetailsClick = (itemId) => {
    navigate(`/details/${itemId}`);
  };

  useEffect(() => {
    if (categoryName) {
      ProductService.getProductsByCategory(categoryName).then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("There was an error fetching the products by category!", error);
      });
    } else {
      ProductService.getAllProducts().then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("There was an error fetching the products!", error);
      });
    }
  }, [categoryName]);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  // All products
  useEffect(() => {
    ProductService.getAllProducts().then(response => {
      setProducts(response.data);
    }).catch(error => {
      console.error("There was an error fetching the products!", error);
    });
  }, []);

  useEffect(() => {
    CategoriesService.getAllCategories().then(response => {
      setCategory(response.data);
    }).catch(error => {
      console.error("There was an error fetching the categories!", error);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate the displayed products based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const CurrentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Create pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle pagination button click
  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: 150 }}>
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Sản phẩm</h1>
        </div>
        {/* Fruits Shop Start */}
        <div className="container-fluid fruite py-5">
          <div className="container py-5">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-xl-3">
                    <div className="input-group w-100 mx-auto d-flex">
                      <input type="search" className="form-control p-3" placeholder="Tìm kiếm" aria-describedby="search-icon-1" />
                      <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                    </div>
                  </div>
                  <div className="col-6"></div>
                  <div className="col-xl-3">
                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                      <label htmlFor="fruits">Lọc theo:</label>
                      <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                        <option value="all">Tất cả</option>
                        <option value="priceMax">Giá cao nhất</option>
                        <option value="priceMin">Giá thấp nhất</option>
                        <option value="bestsale">Bán chạy nhất</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-lg-3">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4>Loại nhạc cụ:</h4>
                          <ul className="list-unstyled fruite-categorie">
                            {
                              category.map(item => (
                                <li key={item.id}>
                                  <div className="d-flex justify-content-between fruite-name">
                                    <Link to={`/category/${item.name}`} className="dropdown-item">
                                      <i className="fas fa-apple-alt me-2"></i>{item.name}
                                    </Link>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4 className="mb-2">Giá khoảng: </h4>
                          <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500" value="0" oninput="amount.value=rangeInput.value" />
                          <output id="amount" name="amount" min-value="0" max-value="500" htmlFor="rangeInput">0</output>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <h4 className="mb-3">Sản phẩm nổi bật</h4>
                        {
                          products.slice(0, 3).map(item => (
                            <div key={item.id} onClick={() => handleDetailsClick(item.id)} style={{ cursor: 'pointer' }} className="d-flex align-items-center justify-content-start">
                              <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="img-fluid rounded" alt="" />
                              </div>
                              <div>
                                <h6 className="mb-2">{item.name}</h6>
                                <div className="d-flex mb-2">
                                  <i className="fa fa-star text-secondary"></i>
                                  <i className="fa fa-star text-secondary"></i>
                                  <i className="fa fa-star text-secondary"></i>
                                  <i className="fa fa-star text-secondary"></i>
                                  <i className="fa fa-star"></i>
                                </div>
                                <div className="d-flex mb-2">
                                  <h5 className="fw-bold me-2">{item.price} $</h5>
                                  <h5 className="text-danger text-decoration-line-through">{item.price} $</h5>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                        <div className="d-flex justify-content-center my-4">
                          <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Xem Thêm</a>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                          <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                            {/* <h3 className="text-secondary fw-bold">Fresh <br> Fruits <br> Banner</h3> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="row g-4 justify-content-center">
                      {
                        CurrentItems.map((item) => (
                          <div
                            className="col-md-6 col-lg-6 col-xl-4"
                            key={item.id}
                            onClick={() => handleDetailsClick(item.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="rounded position-relative fruite-item">
                              <div className="fruite-img">
                                <img src={`data:image/jpeg;base64,${item.image}`} className="img-fluid w-100 rounded-top" alt="" />
                              </div>
                              <div
                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, left: 10 }}
                              >
                                {item.category.name}
                              </div>
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>{item.name}</h4>
                                <p>{item.des}</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0">{item.price}$</p>
                                  <a
                                    href="#"
                                    className="btn border border-secondary rounded-pill px-3 text-primary"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Ngăn chặn sự kiện onClick của thẻ div chứa
                                      handleDetailsClick(item.id);
                                    }}
                                  >
                                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Thêm giỏ hàng
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                      {/* Pagination */}
                      <div className="col-12">
                        <div className="pagination d-flex justify-content-center mt-5">
                          <a href="#" className="rounded" onClick={(e) => handleClick(e, currentPage - 1)}>&laquo;</a>
                          {pageNumbers.map((number) => (
                            <a
                              style={{ marginRight: 5, marginLeft: 5 }}
                              href="#"
                              key={number}
                              className={`rounded ${currentPage === number ? 'active' : ''}`}
                              onClick={(e) => handleClick(e, number)}
                            >
                              {number}
                            </a>
                          ))}
                          <a href="#" className="rounded" onClick={(e) => handleClick(e, currentPage + 1)}>&raquo;</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fruits Shop End */}
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;


// import React, {useState,useEffect} from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import '../assets/styles/css/bootstrap.min.css'
// import '../lib/lightbox/css/lightbox.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import '../lib/owlcarousel/assets/owl.carousel.min.css'
// import CategoriesService from '../services/CategoriesService';
// import ProductService from '../services/ProductService';
// import { Link } from 'react-router-dom';


// const ShopPage = () => {

//     const navigate = useNavigate();
//     const { categoryName } = useParams();
//     const handleDetailsClick = (itemId) => {
//         navigate(`/details/${itemId}`);
//     };

//     useEffect(() => {
//         if (categoryName) {
//             ProductService.getProductsByCategory(categoryName).then(response => {
//                 setProducts(response.data);
//             }).catch(error => {
//                 console.error("There was an error fetching the products by category!", error);
//             });
//         } else {
//             ProductService.getAllProducts().then(response => {
//                 setProducts(response.data);
//             }).catch(error => {
//                 console.error("There was an error fetching the products!", error);
//             });
//         }
//     }, [categoryName]);


//     const [products, setProducts] = useState([]);
//     const[category, setCategory] = useState([]);


//     //all products
//     useEffect(() => {
//         ProductService.getAllProducts().then(response => {
//             setProducts(response.data);
//         }).catch(error => {
//             console.error("There was an error fetching the products!", error);
//         });
//     }, []);

//     console.log("Products=========", products);

//     useEffect(() => {
//         CategoriesService.getAllCategories().then(response => {
//             setCategory(response.data);
//         }).catch(error => {
//             console.error("There was an error fetching the categories!", error);
//         });
//     }, []);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   // Tính toán các sản phẩm hiển thị dựa trên trang hiện tại
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const CurrentItems = products.slice(indexOfFirstItem, indexOfLastItem);


//   // Tạo các nút phân trang
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   // Hàm xử lý khi nhấn vào nút phân trang
//   const handleClick = (event, pageNumber) => {
//     event.preventDefault();
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <Header />
//         <div style={{marginTop:150}}>
//         <div class="container-fluid page-header py-5">
//                 <h1 class="text-center text-white display-6">Sản phẩm</h1>
//         </div>
//         {/* <!-- Fruits Shop Start--> */}
//         <div class="container-fluid fruite py-5">
//             <div class="container py-5">
//                 <div class="row g-4">
//                     <div class="col-lg-12">
//                         <div class="row g-4">
//                             <div class="col-xl-3">
//                                 <div class="input-group w-100 mx-auto d-flex">
//                                     <input type="search" class="form-control p-3" placeholder="Tìm kiếm" aria-describedby="search-icon-1" />
//                                     <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
//                                 </div>
//                             </div>
//                             <div class="col-6"></div>
//                             <div class="col-xl-3">
//                                 <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
//                                     <label for="fruits">Lọc theo:</label>
//                                     <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3" form="fruitform">
//                                         <option value="all">Tất cả</option>
//                                         <option value="priceMax">Giá cao nhất</option>
//                                         <option value="priceMin">Giá thấp nhất</option>
//                                         <option value="bestsale">Bán chạy nhất</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="row g-4">
//                             <div class="col-lg-3">
//                                 <div class="row g-4">
//                                     <div class="col-lg-12">
//                                         <div class="mb-3">
//                                             <h4>Loại nhạc cụ:</h4>
//                                             <ul class="list-unstyled fruite-categorie">
//                                                 {
//                                                     category.map(item=>{
//                                                         return <li key={item.id}>
//                                                             <div class="d-flex justify-content-between fruite-name">
//                                                             {/* <a href="/category/`{item.name}`"><i class="fas fa-apple-alt me-2"></i>{item.name}</a> */}
//                                                             <Link to={`/category/${item.name}`} className="dropdown-item ">
//                                                                 <i className="fas fa-apple-alt me-2"></i>{item.name}
//                                                             </Link>
//                                                                 {/* <span>{ite}</span> */}
//                                                             </div>
//                                                         </li>
//                                                     })
//                                                 }
//                                             </ul>
//                                         </div>
//                                     </div>
//                                     <div class="col-lg-12">
//                                         <div class="mb-3">
//                                             <h4 class="mb-2">Giá khoảng: </h4>
//                                             <input type="range" class="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500" value="0" oninput="amount.value=rangeInput.value"/>
//                                             <output id="amount" name="amount" min-velue="0" max-value="500" for="rangeInput">0</output>
//                                         </div>
//                                     </div>
                                    
//                                     <div class="col-lg-12">
//                                         <h4 class="mb-3">Sản phẩm nổi bật</h4>
//                                         {
//                                             products.slice(0,3).map(item=>{
//                                                 return (
//                                                     <div key={item.id} onClick={() => handleDetailsClick(item.id)} style={{ cursor: 'pointer' }} class="d-flex align-items-center justify-content-start">
//                                                         <div class="rounded me-4" style={{width:100, height:100}}>
//                                                             <img src={`data:image/jpeg;base64,${item.image}`}  class="img-fluid rounded" alt=""/>
//                                                         </div>
//                                                         <div>
//                                                             <h6 class="mb-2">{item.name}</h6>
//                                                             <div class="d-flex mb-2">
//                                                                 <i class="fa fa-star text-secondary"></i>
//                                                                 <i class="fa fa-star text-secondary"></i>
//                                                                 <i class="fa fa-star text-secondary"></i>
//                                                                 <i class="fa fa-star text-secondary"></i>
//                                                                 <i class="fa fa-star"></i>
//                                                             </div>
//                                                             <div class="d-flex mb-2">
//                                                                 <h5 class="fw-bold me-2">{item.price} $</h5>
//                                                                 <h5 class="text-danger text-decoration-line-through">{item.price} $</h5>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                         <div class="d-flex justify-content-center my-4">
//                                             <a href="#" class="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Xem Thêm</a>
//                                         </div>
//                                     </div>
//                                     <div class="col-lg-12">
//                                         <div class="position-relative">
//                                             <img src="img/banner-fruits.jpg" class="img-fluid w-100 rounded" alt=""/>
//                                             <div class="position-absolute" style={{top: '50%', right: 10, transform: 'translateY(-50%)'}}>
//                                                 {/* <h3 class="text-secondary fw-bold">Fresh <br> Fruits <br> Banner</h3> */}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="col-lg-9">
//                                 <div class="row g-4 justify-content-center">
//                                 {
//                                     CurrentItems.map((item) => (
//                                     <div
//                                         className="col-md-6 col-lg-6 col-xl-4"
//                                         key={item.id}
//                                         onClick={() => handleDetailsClick(item.id)}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         <div className="rounded position-relative fruite-item">
//                                             <div className="fruite-img">
//                                                 <img src={`data:image/jpeg;base64,${item.image}`} className="img-fluid w-100 rounded-top" alt="" />
//                                             </div>
//                                             <div
//                                                 className="text-white bg-secondary px-3 py-1 rounded position-absolute"
//                                                 style={{ top: 10, left: 10 }}
//                                             >
//                                                 {item.category.name}
//                                             </div>
//                                             <div className="p-4 border border-secondary border-top-0 rounded-bottom">
//                                                 <h4>{item.name}</h4>
//                                                 <p>{item.des}</p>
//                                                 <div className="d-flex justify-content-between flex-lg-wrap">
//                                                     <p className="text-dark fs-5 fw-bold mb-0">{item.price}$</p>
//                                                     <a
//                                                         href="#"
//                                                         className="btn border border-secondary rounded-pill px-3 text-primary"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation(); // Ngăn chặn sự kiện onClick của thẻ div chứa
//                                                             handleDetailsClick(item.id);
//                                                         }}
//                                                     >
//                                                         <i className="fa fa-shopping-bag me-2 text-primary"></i> Thêm giỏ hàng
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
                                
//                                     {/* Pagination */}
//                                     <div className="col-12">
//                                         <div className="pagination d-flex justify-content-center mt-5">
//                                         <a href="#" className="rounded" onClick={(e) => handleClick(e, currentPage - 1)}>&laquo;</a>
//                                         {pageNumbers.map((number) => (
//                                             <a
//                                             style={{marginRight: 5, marginLeft: 5}}
//                                             href="#"
//                                             key={number}
//                                             className={`rounded ${currentPage === number ? 'active' : ''}`}
//                                             onClick={(e) => handleClick(e, number)}
//                                             >
//                                             {number}
//                                             </a>
//                                         ))}
//                                         <a href="#" className="rounded" onClick={(e) => handleClick(e, currentPage + 1)}>&raquo;</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         {/* <!-- Fruits Shop End--> */}
//         </div>
//       <Footer />
//     </>
//   );
// };

// export default ShopPage;



