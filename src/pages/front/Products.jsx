import { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams, useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import ProductsApi from '../../apis/products';
import CartApi from '../../apis/cart';
import { MessageContext, handleErrorMessage, postSuccessMessage, authErrorMessage } from "../../store/messageStore";
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';

function Products() {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchParams] = useSearchParams();
    const [categoryId, setCategoryId] = useState();
    const [isLoading, setIsLoading] = useState(true);


    const { getCart } = useOutletContext();
    const [, dispatch] = useContext(MessageContext);
    
    const { isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const searchCategoryId = searchParams.get('categoryId');
    const searchPage = searchParams.get('page');


    const fetchProducts = async (page, categoryId) => {
        try {
            setIsLoading(true);
            const res = await ProductsApi.getProducts({
                page: page,
                categoryId: categoryId || ""
            });
            setCategories([...res.data.categories]);
            setProducts([...res.data.products]);
            setPagination(res.data.pagination);

            if (categoryId) {
                navigate(`/products?categoryId=${categoryId}&page=${page}`);
            } else if (page > 1) {
                navigate(`/products?page=${page}`);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
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


    useEffect(() => {
        setCategoryId(Number(searchCategoryId));
        setCurrentPage(searchPage);
    }, [location])

    useEffect(() => {
        fetchProducts(currentPage, categoryId);
    }, [categoryId, currentCategory, currentPage])

    useEffect(() => {
        const category = categories.filter((item) => item.id === Number(categoryId))[0]
        if (categories.length && category) {
            setCurrentCategory(category.name);
        }
    }, [categories, categoryId]);

    return (
        <>
            <div className="container pt-66 mh">
                <Loading isLoading={isLoading} />
                <div className="row mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fw-bold">本店商品</h1>
                        <p className="text-end"><Link className="text-black" to="/">首頁</Link> / 本店商品 / {currentCategory === "" ? "全部商品" : currentCategory}</p>

                    </div>
                    <div className="col-sm-3">


                        <ul className="d-flex flex-sm-column categories-list">
                            <li className={`categories-list-item fw-bold mt-3 ${currentCategory === "" ? "active" : ""}`} onClick={() => {
                                setCurrentCategory("");
                                setCategoryId(null);
                                setCurrentPage(1);
                                navigate('/products')
                            }}><span>全部商品</span>
                            </li>

                            {categories.map((category) => {
                                return (
                                    <li className={`categories-list-item fw-bold mt-3 ${currentCategory === category.name ? "active" : ""}`} key={category.id} onClick={() => {
                                        setCurrentCategory(category.name);
                                        setCategoryId(category.id);
                                        setCurrentPage(1);
                                        navigate(`/products?categoryId=${category.id}&page=1`)

                                    }} ><span>{category.name}</span></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            {products.map((product) => {
                                return (
                                    <div className="col-lg-4 col-md-6 mb-3" key={product.id}>
                                        <Link to={`/product/${product.id}`}>
                                            <div className="product-card">
                                                <div className="img-wrapper">
                                                    <img className="product-card-img" src={product.image} alt={product.name} />
                                                </div>
                                                <div className="card-body p-3">
                                                    <h5 className="product-card-title fw-bold">{product.name}</h5>
                                                    <p className="fw-bold text-danger">NT${product.price}</p>
                                                    <button className="btn btn-primary fw-bold"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addToCart(product.id);
                                                        }}
                                                    >加入購物車</button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="d-flex justify-content-center">
                            <Pagination pagination={pagination} changePage={fetchProducts} categoryId={categoryId} />
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Products;