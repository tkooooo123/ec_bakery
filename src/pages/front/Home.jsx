import { useEffect, useState } from 'react';
import ProductApi from '../../apis/products';
import { Link } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view';

function Home() {

    const [products, setProducts] = useState([]);
   


    const getProducts = async () => {
        try {
            const res = await ProductApi.getProducts({
                page: 1,
                categoryId: ""
            })

            const newProducts = res.data.products.splice(0, 3);
      
         
            setProducts(newProducts);
      
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <div className="banner">
                <img className="banner-img" src="./images/home_banner.jpg" alt="banner_img" />
                <div className="content">
                    <h1 className="title text-white fw-bold mb-5">用「心」製作每一份甜蜜</h1>
                    <Link to="/products" className="fw-bold p-1 px-4 bg-primary text-white fs-2">前往品味</Link>
                </div>
                <ScrollIntoView selector="#about">
                <span className="material-icons scroll-btn text-white fs-1 fw-bold p-2">
                            keyboard_double_arrow_down
                        </span>
                </ScrollIntoView>
            </div>
            <div className="container">
                <div className="row about" id="about">
                    <h2 className="about-title fw-bold  text-white">About Us</h2>
                    <div className="col-md-5">
                        <h3 className="fw-bold fs-1 text-center mt-5">營養 健康 無負擔</h3>
                        <p className="about-content text-center fs-3 mt-3">
                            採用歐洲進口食材 <br />
                            搭配台灣在地農特產品 <br />
                            無添加人工香料<br />
                            每日現烤、新鮮出爐<br />
                            感受簡單又幸福的美味<br />
                        </p>
                    </div>
                    <div className="col-md-7">
                        <img src="./images/about.jpg" alt="about_us" />
                    </div>

                </div>
            </div>


            <div className="home-categories bg-white pt-3 pb-md-5 pb-3">
                <div className="container">
                    <h2 className="home-categories-title text-primary fw-bold">Categories</h2>
                    <ul className="home-categories-list row g-3 pt-3">
                        <Link className="col-lg-2 col-4">
                            <li className="home-categories-list-item">
                                <span className="home-categories-list-item-name">手工餅乾</span>
                                <img className="home-categories-list-item-img" src="https://tokyo-kitchen.icook.network/uploads/recipe/cover/81654/ecdf702af6a7b08c.jpg" alt="手工餅乾" />
                            </li>
                        </Link>
                        <Link className="col-lg-2 col-4">
                            <li className="home-categories-list-item">
                                <span className="home-categories-list-item-name">馬卡龍</span>
                                <img className="home-categories-list-item-img" src="https://www.sweet-dumpling.com/media/content/4e6846c86858d8ac69c3e236b4416540/macaron-cover.jpg" alt="馬卡龍" />
                            </li>
                        </Link>
                        <Link className="col-lg-2 col-4">
                            <li className="home-categories-list-item">
                                <span className="home-categories-list-item-name">泡芙</span>
                                <img className="home-categories-list-item-img" src="https://photo.yannick.com.tw/photo/20200815/%E6%89%8B%E5%B7%A5%E6%B3%A1%E8%8A%99-%E5%8E%9F%E5%91%B3.jpg" alt="泡芙" />
                            </li>
                        </Link>
                        <Link className="col-lg-2 col-4">
                            <li className="home-categories-list-item">
                                <span className="home-categories-list-item-name">麵包</span>
                                <img className="home-categories-list-item-img" src="https://s.yimg.com/ny/api/res/1.2/GQuIhEbcmXULpITwRX2DMA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/zh-tw/chinatimes.com.tw/f5bf07315265704aff598c210db13004" alt="麵包" />
                            </li>
                        </Link>
                        <Link className="col-lg-2 col-4">
                            <li className="home-categories-list-item">
                                <span className="home-categories-list-item-name">吐司</span>
                                <img className="home-categories-list-item-img" src="https://as.chdev.tw/web/article/8/6/4/80f1b7cd-6e47-4c71-858e-03cb3ad2882f1614757510.jpg" alt="麵包" />
                            </li>
                        </Link>
                        <Link className="col-lg-2 col-4">
                            <li className="home-categories-list-item bg-primary">
                                <span className="home-categories-list-item-name">更多</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="home-products row g-3 my-5">
                    <h2 className="fw-bold text-center">新品上市</h2>
                    <div className="col-md-6">
                        <Link to={`/product/${products[0]?.id}`}>
                            <div className="home-products-card overflow-hidden">
                                <div className="img-wrapper overflow-hidden">
                                    <img className="home-products-card-img" src={products[0]?.image} alt={products[0]?.name} />
                                </div>
                                <div className="card-body p-3 bg-white">
                                    <h5 className="home-products-card-title fw-bold">{products[0]?.name}</h5>
                                    <p className="fw-bold text-danger">NT$ {products[0]?.price} </p>
                                    <button href="#" className="btn btn-primary fw-bold"
                                    //onClick={() => addToCart(product.id)}
                                    >加入購物車</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to={`/product/${products[1]?.id}`}>
                            <div className="home-products-card-sub overflow-hidden d-md-flex ">
                                <div className="img-wrapper overflow-hidden">
                                    <img className="home-products-card-sub-img" src={products[1]?.image} alt={products[1]?.name} />
                                </div>
                                <div className="card-body p-3 bg-white">
                                    <h5 className="home-products-card-sub-title fw-bold">{products[1]?.name}</h5>
                                    <p className="fw-bold text-danger">NT$ {products[1]?.price} </p>
                                    <button href="#" className="btn btn-primary fw-bold"
                                    //onClick={() => addToCart(product.id)}
                                    >加入購物車</button>
                                </div>
                            </div>
                        </Link>
                        <Link to={`/product/${products[2]?.id}`}>
                            <div className="home-products-card-sub overflow-hidden d-md-flex mt-3">
                                <div className="img-wrapper overflow-hidden">
                                    <img className="home-products-card-sub-img" src={products[2]?.image} alt={products[1]?.name} />
                                </div>
                                <div className="card-body bg-white p-3">
                                    <h5 className="home-products-card-sub-title fw-bold">{products[2]?.name}</h5>
                                    <p className="fw-bold text-danger">NT$ {products[2]?.price} </p>
                                    <button href="#" className="btn btn-primary fw-bold"
                                    //onClick={() => addToCart(product.id)}
                                    >加入購物車</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;