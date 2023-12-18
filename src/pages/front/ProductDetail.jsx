import { useParams, Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ProductsApi from '../../apis/products';
import CartApi from '../../apis/cart';
import FsLightbox from "fslightbox-react";
import ProductSwiper from '../../components/ProductSwiper';
import Loading from '../../components/Loading';
import { AuthContext } from '../../store/AuthContext';
import { MessageContext, handleErrorMessage, postSuccessMessage, authErrorMessage } from "../../store/messageStore";

function ProductDetail() {

    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [mainImage, setMainImage] = useState('')
    const [tempImages, setTempImages] = useState([]);
    const [toggler, setToggler] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { getCart } = useOutletContext();
    const [, dispatch] = useContext(MessageContext);
    const auth = useContext(AuthContext);
    const { isAuthenticated } = auth.user;

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const res = await ProductsApi.getProduct({
                productId: id
            })
            setCategory({ ...res.data.product.Category });
            setProduct({ ...res.data.product });
            setMainImage(res.data.product.image);
            setTempImages([res.data.product.image, ...res.data.product.imagesUrl]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false); 
            handleErrorMessage(dispatch, error);
        }
    }
    const getProducts = async () => {
        try {
            setIsLoading(true);
            const res = await ProductsApi.getProducts({
                page: 1,
                categoryId: category.id
            })
            setProducts([...res.data.products])
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false); 
            handleErrorMessage(dispatch, error);
        }
    }
   

    const addToCart = async(id) => {
        try {
            setIsLoading(true);
            if(!isAuthenticated) {
                setIsLoading(false); 
                authErrorMessage(dispatch);
                return
            }
            const res = await CartApi.postCart({
                productId: id,
                quantity
            })
            postSuccessMessage(dispatch,res.data)
            await getCart();   
            setIsLoading(false);     
        } catch (error) {
            setIsLoading(false); 
            handleErrorMessage(dispatch, error);
        }
    }
    const changeMainImage = (img) => {
        setMainImage(img);
    }
    useEffect(() => {
        fetchProduct();
    }, [id])

    useEffect(() => {
        getProducts();
    }, [category])

    return (
        <>
            <div className="container pt-66">
                <Loading isLoading={isLoading}/>
                <div>
                    <FsLightbox
                        toggler={toggler}
                        sources={[
                            ...tempImages
                        ]}
                        types={[
                            ...new Array(tempImages.length).fill('image')
                        ]}
                    /></div>
                <p className="mt-3"><Link className="text-black" to="/">首頁</Link> / <Link className="text-black" to={`/products?categoryId=${category.id}`}> {category.name} </Link> / {product.name}</p>
                <div className="row mb-5">
                    <div className="col-md-7 d-md-flex flex-sm-row-reverse">
                        
                        <div className="product-detail-img-wrapper">
                            <img className="product-detail-img" src={mainImage} alt={product.name}
                                onClick={() => setToggler(!toggler)}
                            />
                        </div>
                        <div className="d-sm-flex flex-md-column text-nowrap me-md-3 me-0 mt-3 mt-md-0">
                            {tempImages?.map((img, i) => {
                                return (
                                    <div className="bg-light m-1 " key={i} style={{width: '100px'}}>
                                        <img src={img} alt="產品其他圖片"
                                            style={{ maxWidth: '100%', height: '100px', objectFit: 'cover' }}
                                            onClick={() => changeMainImage(img)}
                                        />
                                    </div>

                                )
                            })}

                        </div>

                    </div>
                    <div className="col-md-5 mt-md-0 ">
                        <h1 className="fw-bold">{product.name}</h1>
                        <span className="fs-4 mt-3">{category.name}</span>
                        <h4 className="fw-bold mt-3">NT${product.price}</h4>
                        <div className="product-detail-quantity d-flex mt-5">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-dark rounded-0 "
                                    onClick={() => {
                                        setQuantity(pre => pre === 1 ? pre : pre - 1)
                                    }}
                                    > <span className="material-icons">
                                        remove
                                    </span></button>
                                </div>
                                <input type="number" className="form-control text-center fs-5"
                                    value={quantity}
                                    readOnly />
                                <div className="input-group-append">
                                    <button className="btn btn-dark rounded-0"
                                    onClick={() => {
                                        setQuantity(pre => pre === product.quantity ? pre : pre + 1)
                                    }}
                                    > <span className="material-icons">
                                        add
                                    </span></button>
                                </div>
                            </div>
                            <button className="btn btn-primary fw-bold w-50 ms-3 rounded-0"
                            onClick={() => addToCart(product.id)}
                            >加入購物車</button>
                        </div>
                        <hr />
                        <div className="product-detail-description">
                            <h4 className="fw-bold fs-4">商品介紹</h4>
                            <p className="fs-5">{product.description}</p>
                        </div>
                        <div className="product-detail-content">
                            <h4 className="fw-bold fs-4">商品內容</h4>
                            <p className="fs-5">{product.content}</p>
                        </div>
                    </div>

                </div>
                <hr />
                <h3 className="fw-bold text-center mt-5">相關商品</h3>

                <div className="row my-5">
                    <ProductSwiper products={products} addToCart={addToCart}/>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;