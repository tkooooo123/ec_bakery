import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductsApi from '../../apis/products';
function ProductDetail() {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const fetchProduct = async () => {
        try {
            const res = await ProductsApi.getProduct({
                productId: id
            })
            setCategory({ ...res.data.product.Category });
            setProduct({ ...res.data.product })
        } catch (error) {
            console.log(error)
        }
    }
    const getProducts = async () => {
        try {
            console.log('123', category)
            const res = await ProductsApi.getProducts({
                page: 1,
                categoryId: category.id
            })
            console.log('123', res.data.products);
            setProducts([...res.data.products])
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [id])

    useEffect(() => {
        getProducts();
    }, [category])

    return (
        <>
            <div className="container">
                <h5 className="mt-3">首頁 / <Link to={`/products?categoryId=${category.id}`}> {category.name} </Link> / {product.name}</h5>
                <div className="row">
                    <div className="col-md-6">
                        <img className="product-detail-img" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-md-6">
                        <h1 className="fw-bold">{product.name}</h1>
                        <span>{category.name}</span>
                        <h4 className="fw-bold">NT${product.price}</h4>
                        <p>{product.description}</p>
                        <div className="product-detail-quantity d-flex">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-dark rounded-0 border-0"> <span className="material-icons">
                                        remove
                                    </span></button>
                                </div>
                                <input type="number" className="form-control border-0 text-center fs-5"
                                    value={1}
                                    readOnly />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark rounded-0 border-0"> <span className="material-icons">
                                        add
                                    </span></button>
                                </div>
                            </div>
                            <button className="btn btn-outline-primary fw-bold w-50 ms-3 rounded-0">加入購物車</button>
                        </div>
                        <hr />
                    </div>

                </div>
                <hr />
                <h3 className="fw-bold text-center mt-5">相關商品</h3>

                <div className="row my-5">
                    {products.map((product) => {
                        return (
                            <div className="col-lg-3 col-md-6 mb-3" key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <div className="product-card">
                                        <div className="img-wrapper">
                                            <img className="product-card-img" src={product.image} alt={product.name} />
                                        </div>
                                        <div className="card-body p-3">
                                            <h5 className="product-card-title fw-bold">{product.name}</h5>
                                            <p className="fw-bold text-danger">NT${product.price}</p>
                                            <button href="#" className="btn btn-primary">加入購物車</button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ProductDetail;