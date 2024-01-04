import { useEffect, useState, useContext, useRef } from "react";
import AdminApi from '../../apis/admin';
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../../store/messageStore";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});
    const [, dispatch] = useContext(MessageContext);
    const [selecetdProduct, setSelectedProduct] = useState({});
    const [type, setType] = useState('create');
    const [isLoading, setIsLoading] = useState(true);
    const productModal = useRef(null);
    const deleteModal = useRef(null);


    const getProducts = async (page) => {
        try {
            const res = await AdminApi.getProducts({
                page: page
            });
            setProducts(res.data.products);
            setPagination(res.data.pagination);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }
    const getCategories = async () => {
        try {
            setIsLoading(true);
            const res = await AdminApi.getCategories();
            setCategories(res.data.categories);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
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
            const res = await AdminApi.deleteProduct({
                id
            })
            await getProducts();
            closeDeleteModal();
            postSuccessMessage(dispatch, res.data);
        } catch (error) {
            handleErrorMessage(dispatch, error)
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
        <Loading isLoading={isLoading} />
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
                            <th className="d-none d-md-table-cell">分類</th>
                            <th className="d-none d-md-table-cell">價格</th>
                            <th className="d-none d-md-table-cell">數量</th>
                            <th className="d-none d-md-table-cell">啟用狀態</th>
                            <th>編輯</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td className="align-middle"><img src={product.image} alt={product.name} style={{ width: '100px', height: '100px',objectFit: 'contain' }} /></td>
                                    <td className="align-middle">{product.name}</td>
                                    <td className="align-middle d-none d-md-table-cell">{product.Category.name}</td>
                                    <td className="align-middle d-none d-md-table-cell">NT$ {product.price}</td>
                                    <td className="align-middle d-none d-md-table-cell">{product.quantity}</td>
                                    <td className="align-middle d-none d-md-table-cell">{product.isEnabled ? '已啟用' : '未啟用'}</td>
                                    <td className="align-middle">
                                        <button type="button" className="btn btn-primary"
                                        onClick={() => openProductModal('edit', product)}
                                        >
                                            <span className="material-icons fs-4">
                                                edit
                                            </span>
                                        </button>
                                    </td>
                                    <td className="align-middle">
                                        <button type="button" className="btn btn-outline-danger fw-bold"
                                            onClick={() => openDeleteModal(product)}
                                        >
                                            <span className="material-icons fs-4">
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination pagination={pagination} changePage={getProducts}/>
                </div>
            </div>
        </>
    )
}

export default AdminProducts;