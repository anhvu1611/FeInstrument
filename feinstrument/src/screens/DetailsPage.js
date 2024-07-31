import React,  { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../assets/styles/css/bootstrap.min.css'
import '../lib/lightbox/css/lightbox.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css'
import ProductService from '../services/ProductService';

const DetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [sanPham, setSanPham] = useState([]);
    //all products
    useEffect(() => {
        ProductService.getAllProducts().then(response => {
            setSanPham(response.data);
        }).catch(error => {
            console.error("There was an error fetching the products!", error);
        });
    }, []);

    useEffect(() => {
        ProductService.getProductById(id).then((res) => {
            setProduct(res.data);
        }).catch((err) => {
            console.log("There was an error fetching the products!", err);
        });

    }, [id]);

    const [inputValue, setInputValue] = useState(1);
    const handleDecrease = () => {
      if (inputValue > 1) {
        setInputValue(inputValue - 1);
      }
    };
    const handleIncrease = () => {
      setInputValue(inputValue + 1);
    };
    const handleChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
          setInputValue(Number(value));
        }
    };
    if (!product) return <div>Loading...</div>;


    const handleAddToCart = () => {
        try {
            // Lấy giỏ hàng từ sessionStorage
            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            console.log('Giỏ hàng đã lấy:', cart);

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

            if (existingProductIndex >= 0) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                cart[existingProductIndex].quantity += inputValue;
                console.log(`Cập nhật số lượng cho sản phẩm ID ${product.id}:`, cart[existingProductIndex].quantity);
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm nó vào giỏ hàng
                const newCartItem = {
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                    },
                    quantity: inputValue
                };
                cart.push(newCartItem);
                console.log('Thêm sản phẩm mới vào giỏ hàng:', newCartItem);
            }

            // Lưu giỏ hàng đã cập nhật lại vào sessionStorage
            sessionStorage.setItem('cart', JSON.stringify(cart));
            console.log('Giỏ hàng sau khi cập nhật:', cart);
            navigate('/cart');
        } catch (error) {
            console.error('Lỗi xử lý giỏ hàng:', error);
        }
    };

    const getShortDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };

  return (
    <>
      <Header />
      <div  style={{marginTop: 100}}>
      {/* <!-- Single Page Header start --> */}
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Chi tiết sản phẩm</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li class="breadcrumb-item active text-white">Chi tiết sản phẩm</li>
            </ol>
        </div>
        {/* <!-- Single Page Header End --> */}

        {/* <!-- Single Product Start --> */}
        <div class="container-fluid py-5 mt-5">
            <div class="container py-5">
                <div class="row g-4 mb-5">
                    <div class="col-lg-8 col-xl-9">
                        <div class="row g-4">
                            <div class="col-lg-6">
                                <div class="border rounded">
                                    <a href="#">
                                        <img src={`data:image/jpeg;base64,${product.image}`} class="img-fluid rounded" alt="Image" />
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <h4 class="fw-bold mb-3">{product.name}</h4>
                                <p class="mb-3">Loại nhạc cụ: {product.category.name}</p>
                                <h5 class="fw-bold mb-3">{product.price} $</h5>
                                <div class="d-flex mb-4">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <p class="mb-4">{getShortDescription(product.description, 20)}</p>
                                <div class="input-group quantity mb-5" style={{width: '100px'}}>
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-minus rounded-circle bg-light border" onClick={handleDecrease}>
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm text-center border-0" value={inputValue} onChange={handleChange}/>
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-plus rounded-circle bg-light border" onClick={handleIncrease}>
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <a href="#" onClick={handleAddToCart} class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                            <div class="col-lg-12">
                                <nav>
                                    <div class="nav nav-tabs mb-3">
                                        <button class="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                            aria-controls="nav-about" aria-selected="true">Mô tả</button>
                                        <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                            id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                            aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                    </div>
                                </nav>
                                <div class="tab-content mb-5">
                                    <div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        <p>{product.description}</p>
                                    </div>

                                    <div class="tab-pane" id="nav-vision" role="tabpanel">
                                        <p class="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                            amet diam et eos labore. 3</p>
                                        <p class="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                            Clita erat ipsum et lorem et sit</p>
                                    </div>
                                </div>
                            </div>                     
                        </div>
                    </div>
                    <div class="col-lg-4 col-xl-3">
                        <div class="row g-4 fruite">
                            <div class="col-lg-12">
                                <div class="input-group w-100 mx-auto d-flex mb-4">
                                    <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                </div>
                                <div class="mb-4">
                                    <h4>Loại nhạc cụ</h4>
                                    <ul class="list-unstyled fruite-categorie">
                                        <li>
                                            <div class="d-flex justify-content-between fruite-name">
                                                <a href="#"><i class="fas fa-apple-alt me-2"></i>Guitar</a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex justify-content-between fruite-name">
                                                <a href="#"><i class="fas fa-apple-alt me-2"></i>Piano</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex justify-content-between fruite-name">
                                                <a href="#"><i class="fas fa-apple-alt me-2"></i>Trống</a>
                                                <span>(2)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex justify-content-between fruite-name">
                                                <a href="#"><i class="fas fa-apple-alt me-2"></i>Sáo</a>
                                                <span>(8)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex justify-content-between fruite-name">
                                                <a href="#"><i class="fas fa-apple-alt me-2"></i>Organ</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <h4 class="mb-4">Sản phẩm nổi bật</h4>
                                {
                                    sanPham.slice(0, 4).map(item => (
                                            <div class="d-flex align-items-center justify-content-start">
                                                <div class="rounded" style={{width: 100, height:100}}>
                                                    <img src={`data:image/jpeg;base64,${item.image}`} class="img-fluid rounded" alt="Image"/> 
                                                </div>
                                                <div>
                                                    <h6 class="mb-2">{item.name}</h6>
                                                    <div class="d-flex mb-2">
                                                        <i class="fa fa-star text-secondary"></i>
                                                        <i class="fa fa-star text-secondary"></i>
                                                        <i class="fa fa-star text-secondary"></i>
                                                        <i class="fa fa-star text-secondary"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <div class="d-flex mb-2">
                                                        <h5 class="fw-bold me-2">{item.price}</h5>
                                                        <h5 class="text-danger text-decoration-line-through">{item.price}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            
                                ))}
                                <div class="d-flex justify-content-center my-4">
                                    <a href="#" class="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="position-relative">
                                    <img src='../assets/images/guitardien.jpg' class="img-fluid w-100 rounded" alt=""/> 
                                    <div class="position-absolute" style={{top: '50%', right: '10px', transform: 'translateY(-50%)'}}>
                                        {/* <h3 class="text-secondary fw-bold">Fresh <br> Fruits <br> Banner</h3> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 class="fw-bold mb-0">Sản phẩm liên quan</h1>
                <div class="vesitable">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="row g-4">
                                        {/* {sanPham.slice(0,4).map( item => (
                                            <div class="col-md-6 col-lg-4 col-xl-3" key={item.id}>
                                                <div class="rounded position-relative fruite-item">
                                                    <div class="fruite-img">
                                                        <img src={`data:image/jpeg;base64,${item.image}`} class="img-fluid w-100 rounded-top" alt="" />
                                                    </div>
                                                    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left:10}}>{item.category}</div>
                                                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>{item.name}</h4>
                                                        <p>{item.description}</p>
                                                        <div class="d-flex justify-content-between flex-lg-wrap">
                                                            <p class="text-dark fs-5 fw-bold mb-0">{item.price}</p>
                                                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        {/* <!-- Single Product End --> */}
      </div>
      <Footer />
    </>
  );
};

export default DetailsPage;