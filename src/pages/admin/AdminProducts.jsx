
import { useEffect, useState, useContext, useRef } from "react";
import AdminApi from '../../apis/admin';
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../../store/messageStore";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";


function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [, dispatch] = useContext(MessageContext);
    const [selecetdProduct, setSelectedProduct] = useState({});
    const [type, setType] = useState('create') 
    const productModal = useRef(null);
    const deleteModal = useRef(null);


    const getProducts = async () => {
        try {
            const res = await AdminApi.getProducts({
                page: 1
            });
            setProducts(res.data.products)
            console.log(res.data.products)
        } catch (error) {
            handleErrorMessage(dispatch, error)
            console.log(error)
        }
    }
    const getCategories = async () => {
        try {
            const res = await AdminApi.getCategories()
            setCategories(res.data.categories)
        } catch (error) {
            console.log(error)
        }
    }

    const openProductModal = (type, product) => {
        setSelectedProduct(product);
        setType(type);
        productModal.current.show();
    }
    const closeProductModal = () => {
        productModal.current.hide();
    }

    const openDeleteModal = (product) => {
        setSelectedProduct(product)
        deleteModal.current.show();
    }

    const closeDeleteModal = () => {
        deleteModal.current.hide();
    }

    const handleDelete = async (id) => {
        try {
            console.log(id)
            const res = await AdminApi.deleteProduct({
                id
            })
            console.log(res)
            await getProducts();
            closeDeleteModal();
            postSuccessMessage(dispatch, res.data);
        } catch (error) {
            handleErrorMessage(dispatch, error)
            console.log(error)
        }
    }

    useEffect(() => {
        productModal.current = new Modal('#productModal', {
            backdrop: 'static'
        });
        deleteModal.current = new Modal('#deleteModal', {
            backdrop: 'static'
        });
        getProducts();
        getCategories();
    }, [])

    return (
        <>
            <ProductModal initialProduct={selecetdProduct} closeProductModal={closeProductModal} getProducts={getProducts} type={type} categories={categories} />
            <DeleteModal close={closeDeleteModal} handleDelete={handleDelete} id={selecetdProduct.id} text={`名為「${selecetdProduct.name}」之產品？`} title={'產品'} />
            <div className="admin-products p-3 m-3">
                <div className="d-flex justify-content-between">
                    <h3 className="text-primary fw-bold my-2">產品列表</h3>
                    <button className="btn btn-primary fw-bold"
                    onClick={() => openProductModal('create', {})}
                    >新增產品</button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>圖片</th>
                            <th>名稱</th>
                            <th>分類</th>
                            <th>價格</th>
                            <th>數量</th>
                            <th>啟用狀態</th>
                            <th>編輯</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.Category.name}</td>
                                    <td>NT$ {product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.is_enabled ? '已啟用' : '未啟用'}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-primary"
                                        onClick={() => openProductModal('edit', product)}
                                        >
                                            編輯
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger fw-bold"
                                            onClick={() => openDeleteModal(product)}
                                        >刪除</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminProducts;