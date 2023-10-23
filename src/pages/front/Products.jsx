import { useEffect, useState } from 'react';
import ProductsApi from '../../apis/products';

function Products() {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            console.log(categoryId)
            const res = await ProductsApi.getProducts({
                page: currentPage,
                categoryId
            })
            console.log(res)
            console.log(res.data)
            setCategories([...res.data.categories]);
            setProducts([...res.data.products]);
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchProducts();
    }, [categoryId])


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
                                    <li className={`categories-list-item fw-bold mt-3 ${currentCategory === category.name ? "active" : ""}`}  key={category.id} onClick={() => {
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
                                       <div className="product-card">
                                       <div className="img-wrapper">
                                       <img className="product-card-img" src={product.image} alt="商品圖片" />
                                       </div>
                                           <div className="card-body p-3">
                                                <h5 className="product-card-title fw-bold">{product.name}</h5>
                                                <p className="fw-bold text-danger">NT${product.price}</p>
                                                <a href="#" className="btn btn-primary">加入購物車</a>
                                            </div>
                                       </div>
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