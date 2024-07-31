import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/styles/ShopBody.css';
import '../../assets/styles/css/bootstrap.min.css';
import '../../lib/lightbox/css/lightbox.min.css'
import '../../lib/owlcarousel/assets/owl.carousel.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ProductsData } from '../../data/products';
import ProductService from '../../services/ProductService';
import CategoriesService from '../../services/CategoriesService';

const ShopBody = () => {
    const [products, setProducts] = useState([]);
    const[category, setCategory] = useState([]);
    const navigate = useNavigate();

    const handleDetailsClick = (itemId) => {
        navigate(`/details/${itemId}`);
    };

    //all products
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

    const getShortDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };
  return (
    <div>
        <div class="container-fluid fruite py-5">
            <div class="container py-5">
                <div class="tab-class text-center">
                    <div class="row g-4">
                        <div class="col-lg-4 text-start">
                            <h1>Nhạc cụ</h1>
                        </div>
                        <div class="col-lg-8 text-end">
                            <ul class="nav nav-pills d-inline-flex text-center mb-5">
                                <li class="nav-item">
                                    <a class="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                        <span class="text-dark" style={w130px}>Tất cả</span>
                                    </a>
                                </li>
                                {
                                    category.map( item => {
                                        return (
                                            <li class="nav-item" key={item.id}>
                                                <a class="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                                    <span class="text-dark" style={w130px}>{item.name}</span>
                                                </a>
                                            </li>
                                        )
                                    })
                                        
                                }
                            
                            </ul>
                        </div>
                    </div>
                    <div class="tab-content">
  <div id="tab-1" class="tab-pane fade show p-0 active">
    <div class="row g-4">
      <div class="col-lg-12">
        <div class="row g-4">
          {products.slice(0, 8).map((item) => (
            <div class="col-md-6 col-lg-4 col-xl-3" key={item.id}>
              <div class="rounded position-relative fruite-item h-100 d-flex flex-column">
                <div class="fruite-img">
                  <img src={`data:image/jpeg;base64,${item.image}`} class="img-fluid w-100 rounded-top" alt="" />
                </div>
                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style={topleft10}>
                  {item.category.name}
                </div>
                <div class="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column flex-grow-1">
                  <h4>{item.name}</h4>
                  <p class="flex-grow-1">{getShortDescription(item.description, 10)}</p>
                  <div class="d-flex justify-content-between mt-auto">
                    <p class="text-dark fs-5 fw-bold mb-0">${item.price}</p>
                    <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary">
                      <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

                    {/* <div class="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="row g-4">
                                        {products.slice(0,8).map( item => (
                                            <div class="col-md-6 col-lg-4 col-xl-3" key={item.id} >
                                                <div class="rounded position-relative fruite-item">
                                                    <div class="fruite-img">
                                                        <img src={`data:image/jpeg;base64,${item.image}`} class="img-fluid w-100 rounded-top" alt="" />
                                                    </div>
                                                    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style={topleft10}>{item.category.name}</div>
                                                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>{item.name}</h4>
                                                        <p>{getShortDescription(item.description, 10)}</p>
                                                        <div class="d-flex justify-content-between flex-lg-wrap">
                                                            <p class="text-dark fs-5 fw-bold mb-0">{item.price}</p>
                                                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}
                </div>      
            </div>
    </div>
    {/* <!-- Featurs Start --> */}
        <div class="container-fluid service py-5">
            <div class="container py-5">
                <div class="row g-4 justify-content-center">
                    {
                        ProductsData.slice(0, 3).map( item => (
                            <div class="col-md-6 col-lg-4">
                                <a href="#">
                                    <div class="service-item bg-secondary rounded border border-secondary">
                                        <img src={item.img} class="img-fluid rounded-top w-100" alt=""/>
                                        <div class="px-4 rounded-bottom">
                                            <div class="service-content bg-primary text-center p-4 rounded">
                                                <h5 class="text-white">{item.name}</h5>
                                                <h3 class="mb-0">20% OFF</h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
        {/* <!-- Featurs End --> */}

        {/* <!-- Banner Section Start--> */}
        <div class="container-fluid banner bg-secondary my-5">
            <div class="container py-5">
                <div class="row g-4 align-items-center">
                    <div class="col-lg-6">
                        <div class="py-4">
                            <h1 class="display-3 text-white">Fresh Exotic Fruits</h1>
                            <p class="fw-normal display-3 text-dark mb-4">in Our Store</p>
                            <p class="mb-4 text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                            <a href="#" class="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="position-relative">
                            <img src="../../assets/images/img/baner-1.png" class="img-fluid w-100 rounded" alt=""/>
                            <div class="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{width: '140px', height: '140px', top: 0, left: 0}}>
                                <h1 style={{fontSize: '100px'}}>1</h1>
                                <div class="d-flex flex-column">
                                    <span class="h2 mb-0">50$</span>
                                    <span class="h4 text-muted mb-0">kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Banner Section End --> */}
        {/* <!-- Bestsaler Product Start --> */}
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="text-center mx-auto mb-5" style={{maxWidth: '700px'}}>
                    <h1 class="display-4">Sản phẩm bán chạy</h1>
                    <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
                </div>
                <div class="row g-4">
                    {
                        products.slice(0, 3).map( item => (
                            <div class="col-lg-6 col-xl-4" key={item.id}>
                                <div class="p-4 rounded bg-light" onClick={()=>handleDetailsClick(item.id)}>
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <img src={`data:image/jpeg;base64,${item.image}`} class="img-fluid rounded-circle w-100" alt="" />
                                        </div>
                                        <div class="col-6">
                                            <a href="#" class="h5">{item.name}</a>
                                            <div class="d-flex my-3">
                                                <i class="fas fa-star text-primary"></i>
                                                <i class="fas fa-star text-primary"></i>
                                                <i class="fas fa-star text-primary"></i>
                                                <i class="fas fa-star text-primary"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <h4 class="mb-3">{item.price}</h4>
                                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        {/* <!-- Bestsaler Product End --> */}
    </div>
  );
};

export default ShopBody;

const w130px = {
    width: '130px'
}

const topleft10 = {
    top: '10px',
    left: '10px'
}
