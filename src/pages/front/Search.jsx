import { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams, useOutletContext, useNavigate } from 'react-router-dom';
import ProductsApi from '../../apis/products';
import CartApi from '../../apis/cart';
import { MessageContext, handleErrorMessage, postSuccessMessage, authErrorMessage } from "../../store/messageStore";
import { AuthContext } from '../../store/AuthContext';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
function Search() {
    const { getCart } = useOutletContext();
    
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [, dispatch] = useContext(MessageContext);
    const auth = useContext(AuthContext);
    const { isAuthenticated } = auth.user;
    const navigate = useNavigate();

    const keyword = searchParams.get('keyword');
    const getProducts = async (page) => {
        try {
            setIsLoading(true);
            const res = await ProductsApi.getProducts({
                page,
                categoryId: "",
                keyword
            })
            if (keyword) {
                setProducts(res.data.products);
            }
            setPagination(res.data.pagination);
            if ( page > res.data.pagination.totalPage ) {
                navigate(`/search?keyword=${keyword}`);
            } else {
                navigate(`/search?keyword=${keyword}&page=${page}`);
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
            await getCart()
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    useEffect(() => {
        getProducts(1);
    }, [keyword]);
    

   

    return (
        <div className="container pt-66 mh">
            <Loading isLoading={isLoading} />
            <div className="row mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="fw-bold">搜尋結果</h1>
                    <p className="text-end"><Link className="text-black" to="/">首頁</Link> / <Link className="text-black" to="/products">本店商品</Link> / 搜尋結果</p>
                </div>
                <div className="col-md-3 d-flex d-md-block">
                    <h4 className="mt-3 mb-3 fw-bold align-self-center">搜尋關鍵字：</h4>
                    <span className="bg-primary text-white py-1 px-3 rounded-3 fw-bold fs-5 mt-lg-0 my-3">{keyword}</span>
                </div>
                <div className="col-md-9">
                    <div className="row mt-3">
                        {!products.length && (
                            <p className="fs-2 fw-bold text-center">沒有符合條件的商品。</p>
                        )}
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
                    {!!products.length && (
                         <div className="d-flex justify-content-center">
                         <Pagination pagination={pagination} changePage={getProducts}/>
                     </div>

                    )}
                   
                </div>
            </div>


        </div>
    )
}

export default Search;