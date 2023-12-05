import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Link } from 'react-router-dom';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import propTypes from 'prop-types'

function ProductSwiper({ products, addToCart }) {

    return (
        <Swiper
            className='swiper'
            // 引入module 
            spaceBetween={50} //Slide之間的距離 

     
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            breakpoints= {{
                1296: {
                    slidesPerView: 4
                },
                768: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 2
                },
                
            }}

        >

{products.map((product) => {
                        return (
                            <SwiperSlide key={product.id}>
                                 
                                <Link to={`/product/${product.id}`}>
                                    <div className="product-card">
                                        <div className="img-wrapper">
                                            <img className="product-card-img" src={product.image} alt={product.name} />
                                        </div>
                                        <div className="card-body p-3">
                                            <h5 className="product-card-title fw-bold">{product.name}</h5>
                                            <p className="fw-bold text-danger">NT${product.price}</p>
                                            <button href="#" className="btn btn-primary"
                                            onClick={() => addToCart(product.id)}
                                            >加入購物車</button>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                           
                        )
                    })}
            



        </Swiper>
    )
}


export default ProductSwiper;

ProductSwiper.propTypes = {
    products: propTypes.array,
    addToCart: propTypes.func,
}

