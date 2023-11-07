import { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams, useOutletContext  } from 'react-router-dom';
import ProductsApi from '../../apis/products';
import CartApi from '../../apis/cart';
import { MessageContext, handleErrorMessage, postSuccessMessage, authErrorMessage } from "../../store/messageStore";
import { AuthContext } from '../../store/AuthContext';

function Products() {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
   
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();
    const queryCategoryId = searchParams.get('categoryId')
    const [categoryId, setCategoryId] = useState("");
    const { getCart } = useOutletContext();
    const [, dispatch] = useContext(MessageContext);
    const auth = useContext(AuthContext);
    const { isAuthenticated } = auth.user;
  


  

    const fetchProducts = async () => {
        try {
            console.log(categoryId)
            const res = await ProductsApi.getProducts({
                page: currentPage,
                categoryId:  categoryId
            })
            console.log(res)
            console.log(res.data)
            setCategories([...res.data.categories]);
            setProducts([...res.data.products]);
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async(id) => {
        try {
            if(!isAuthenticated) {
                console.log('456')
                authErrorMessage(dispatch);
                setIsLoading(false);
                return
            }
            console.log('add',typeof(id))
            const res = await CartApi.postCart({
                productId: id,
                quantity: 1,
            })
            postSuccessMessage(dispatch,res.data)
            await getCart(dispatch);
            
        console.log(id)
        } catch (error) {
            handleErrorMessage(dispatch, error)
            console.log(error)
        }
    }

    

    useEffect(() => {
        setCategoryId(queryCategoryId)
    }, [queryCategoryId])

  
  
    useEffect(() => {
        fetchProducts();
    }, [categoryId, currentCategory])

    useEffect(() => {
        const category  = categories.filter((item) => item.id === Number(categoryId))[0]
        if(categories.length && category) {
            setCurrentCategory(category.name)         
        }
    }, [categories, categoryId])

   



    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-sm-3">
                        <h1 className="fw-bold">本店商品</h1>
                        <ul className="d-flex flex-column categories-list">
                            <li className={`categories-list-item fw-bold mt-3 ${currentCategory === "" ? "active" : ""}`} onClick={() => {
                                setCurrentCategory("");
                                setCategoryId("");
                            }}><span>全部商品</span>
                            </li>

                            {categories.map((category) => {
                                return (
                                    <li className={`categories-list-item fw-bold mt-3 ${currentCategory === category.name ? "active" : ""}`} key={category.id} onClick={() => {
                                        setCurrentCategory(category.name);
                                        setCategoryId(category.id)
                                    }} ><span>{category.name}</span></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-end">首頁 / 本店商品 / {currentCategory === "" ? "全部商品" : currentCategory}</p>
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
                                                <button href="#" className="btn btn-primary"
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
                    </div>
                </div>


            </div>
        </>
    )
}

export default Products;