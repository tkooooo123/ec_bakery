import { useContext, useEffect, useState } from 'react';
import ProductApi from '../../apis/products';
import CartApi from '../../apis/cart';
import { Link, useOutletContext } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view';
import { Input } from '../../components/FormElements';
import { useForm } from 'react-hook-form';
import { MessageContext, handleErrorMessage, postSuccessMessage, authErrorMessage } from '../../store/messageStore';
import Loading from '../../components/Loading';
import { AuthContext } from '../../store/AuthContext';
import Aos from "aos";
import 'aos/dist/aos.css';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


function Home() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [, dispatch] = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(false);
    const { getCart } = useOutletContext();
    const auth = useContext(AuthContext);
    const { isAuthenticated } = auth.user;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });


    const getProducts = async () => {
        try {
            setIsLoading(true);
            const res = await ProductApi.getProducts({
                page: 1,
                categoryId: ""
            })

            const newProducts = res.data.products.splice(0, 3);

            setProducts(newProducts);
            setCategories(res.data.categories);
            setIsLoading(false);

        } catch (error) {
            handleErrorMessage(dispatch, error)
            setIsLoading(false);
        }
    }
    const addToCart = async (id) => {
        try {
            setIsLoading(true);
            if (!isAuthenticated) {
                authErrorMessage(dispatch);
                setIsLoading(false);
                return
            }
            const res = await CartApi.postCart({
                productId: id,
                quantity: 1,
            })
            postSuccessMessage(dispatch, res.data);
            await getCart();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }
    const onSubmit = () => {
        postSuccessMessage(dispatch, {
            message: '訂閱成功！'
        })
    }
    const showAnimation = () => {
        const abooutIntro = document.querySelector('#about-intro');
        const aboutImg = document.querySelector('.about-img')
        const about = document.querySelector('.about')
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.out' } })
        tl.fromTo(abooutIntro,
            {
                autoAlpha: 0, scale: 0, duration: 0.5
            },
            {
                autoAlpha: 1, scale: 1, duration: 0.5
            },
        ).fromTo(
            aboutImg,
            {
                autoAlpha: 0, scale: 0, y: 0, duration: 0.5
            },
            {
                autoAlpha: 1, scale: 1, y: 0, duration: 0.5
            },
        )
        ScrollTrigger.create({
            trigger: about,
            start: 'top 80%',
            end: 'top 10%',
            onEnter: () => tl.restart()
        })



    }

    useEffect(() => {
        getProducts();
        Aos.init();
        gsap.registerPlugin(ScrollTrigger);
        showAnimation();
    }, [])

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className="banner">
                <img className="banner-img" src="./images/home_banner.jpg" alt="banner_img" data-aos="fade-down" data-aos-delay="200" />
                <div className="content">
                    <h1 className="title text-white fw-bold mb-5" data-aos="fade-down" data-aos-delay="300">用「心」製作每一份甜蜜</h1>
                    <Link to="/products" className="fw-bold p-1 px-4 bg-primary text-white fs-2" data-aos="fade-down" data-aos-delay="400">前往品味</Link>
                </div>
                <ScrollIntoView selector="#about">
                    <span className="material-icons scroll-btn text-white fs-1 fw-bold p-2">
                        keyboard_double_arrow_down
                    </span>
                </ScrollIntoView>
            </div>
            <div className="container">
                <div className="row about" id="about">
                    <h2 className="about-title fw-bold text-primary mt-3" data-aos="fade-down" data-aos-delay="100">About Us</h2>
                    <div className="col-md-5 my-auto" id="about-intro">
                        <h3 className="fw-bold fs-1 text-center mt-md-0 mt-3" >營養 健康 無負擔</h3>
                        <p className="about-content text-center fs-3 mt-3">
                            採用歐洲進口食材 <br />
                            搭配台灣在地農特產品 <br />
                            無添加人工香料<br />
                            每日現烤、新鮮出爐<br />
                            感受簡單又幸福的美味<br />
                        </p>
                    </div>
                    <div className="col-md-7 p-3 about-img">
                        <img className="" src="./images/about.jpg" alt="about_us" />
                    </div>

                </div>
            </div>


            <div className="home-categories bg-white pt-3 pb-md-5 pb-3">
                <div className="container">
                    <h2 className="home-categories-title text-primary fw-bold" data-aos="fade-down" data-aos-delay="200">熱門分類</h2>
                    <ul className="home-categories-list row g-3 pt-3">
                        {categories.map((category, i) => {
                            return (
                                <Link className="col-lg-2 col-sm-4 col-6" key={category.id} to={`/products?categoryId=${category.id}&page=1`} data-aos="fade-down" data-aos-delay={i * 100}>
                                    <li className="home-categories-list-item">
                                        <span className="home-categories-list-item-name">{category.name}</span>
                                        <img className="home-categories-list-item-img" src={category.image} alt="手工餅乾" />
                                    </li>
                                </Link>
                            )
                        })}
                        <Link className="col-lg-2 col-sm-4 col-6" to="/products" data-aos="fade-top" data-aos-delay="500">
                            <li className="home-categories-list-item bg-primary">
                                <span className="home-categories-list-item-name">更多</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="home-products row g-3 my-5">
                    <h2 className="home-products-title fw-bold text-center text-primary" data-aos="fade-down" data-aos-delay="200">新品上市</h2>
                    <div className="col-md-6" data-aos="fade-down" data-aos-delay="300">
                        <Link to={`/product/${products[0]?.id}`}>
                            <div className="home-products-card overflow-hidden">
                                <div className="img-wrapper overflow-hidden">
                                    <img className="home-products-card-img" src={products[0]?.image} alt={products[0]?.name} />
                                </div>
                                <div className="card-body p-3 bg-white">
                                    <h5 className="home-products-card-title fw-bold">{products[0]?.name}</h5>
                                    <p className="fw-bold text-danger">NT$ {products[0]?.price} </p>
                                    <button href="#" className="btn btn-primary fw-bold"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(products[0].id);
                                        }}
                                    >加入購物車</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6" data-aos="fade-down" data-aos-delay="400">
                        <Link to={`/product/${products[1]?.id}`}>
                            <div className="home-products-card-sub overflow-hidden d-md-flex ">
                                <div className="img-wrapper overflow-hidden">
                                    <img className="home-products-card-sub-img" src={products[1]?.image} alt={products[1]?.name} />
                                </div>
                                <div className="card-body p-3 bg-white">
                                    <h5 className="home-products-card-sub-title fw-bold">{products[1]?.name}</h5>
                                    <p className="fw-bold text-danger">NT$ {products[1]?.price} </p>
                                    <button href="#" className="btn btn-primary fw-bold"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(products[1].id);
                                        }}
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(products[2].id);
                                        }}
                                    >加入購物車</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="subscribe container my-5 py-3 bg-primary" data-aos="fade-down" data-aos-delay="200">
                <div className="row">
                    <div className="col-md-6 d-md-flex flex-row-reverse">
                        <div>
                            <h3 className="subscribe-title text-white fw-bold text-center ps-2">訂閱電子報</h3>
                            <p className="fw-bold text-white text-center m-0 fs-5">隨時取得最新資訊與活動</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-group m-0 pb-3  mx-md-3 mx-auto position-relative'>
                                <Input
                                    id='email'
                                    type='email'
                                    errors={errors}
                                    labelText=''
                                    register={register}
                                    placeholder={'example@gmail.com'}
                                    rules={{
                                        required: 'Email 為必填',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Email 格式不正確'
                                        },
                                    }}
                                >
                                </Input>
                                <button className="subscribe-btn">
                                    <span className="material-icons text-primary">
                                        near_me
                                    </span>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>


            </div>
        </>
    )
}

export default Home;