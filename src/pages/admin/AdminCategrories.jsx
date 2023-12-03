import { useEffect, useState, useRef } from 'react';
import AdminApi from '../../apis/admin';
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import CategoryModal from '../../components/CategoryModal';
import { MessageContext, handleErrorMessage, postSuccessMessage } from '../../store/messageStore';
import { useContext } from 'react';
import Loading from '../../components/Loading';

function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [type, setType] = useState('create');
    const [, dispatch] = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(true);
    const categoryModal = useRef(null);
    const deleteModal = useRef(null);

    const getCategories = async () => {
        try {
            const res = await AdminApi.getCategories();
            setCategories(res.data.categories);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    const openCategoryModal = (type, category) => {
        setType(type);
        setSelectedCategory(category);
        categoryModal.current.show();
    }

    const closeCategoryModal = () => {
        categoryModal.current.hide();
    }

    const openDeleteModal = (category) => {
        setSelectedCategory(category);
        deleteModal.current.show();
    }

    const closeDeleteModal = () => {
        deleteModal.current.hide();
    }

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const res = await AdminApi.deleteCategory({
                id
            })
            await getCategories();
            closeDeleteModal();
            postSuccessMessage(dispatch, res.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    useEffect(() => {
        categoryModal.current = new Modal('#categoryModal', {
            backdrop: 'static'
        });
        deleteModal.current = new Modal('#deleteModal', {
            backdrop: 'static'
        });
        getCategories();

    }, [])

    return (
        <>
        <Loading isLoading={isLoading} />
            <CategoryModal initialCategory={selectedCategory} closeCategoryModal={closeCategoryModal} type={type} getCategories={getCategories} />
            <DeleteModal close={closeDeleteModal} id={selectedCategory.id} handleDelete={handleDelete} text={`分類名稱「${selectedCategory.name}」？`} title={'分類'} />
            <div className="admin-categories p-3 m-3">
                <div className="d-flex justify-content-between">
                    <h3 className="text-primary fw-bold my-2">分類列表</h3>
                    <button className="btn btn-primary fw-bold"
                        onClick={() => openCategoryModal('create', {})}
                    >新增分類</button>
                </div>
                <table className="table" >
                    <thead>
                        <tr>
                            <th>排序</th>
                            <th>圖片</th>
                            <th>名稱</th>
                            <th>編輯</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category, i) => {
                            return (
                                <tr key={category.id}>
                                    <td className="align-middle">{i + 1}</td>
                                    <td>
                                        <img src={category.image} alt={category.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    </td>
                                    <td className="align-middle">{category.name}</td>
                                    <td className="align-middle">
                                        <button className="btn btn-outline-primary"
                                            onClick={() => {
                                                openCategoryModal('edit', category)
                                            }}
                                        >編輯</button>
                                    </td>
                                    <td className="align-middle">
                                        <button className="btn btn-danger"
                                            onClick={() => {
                                                openDeleteModal(category)
                                            }}
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

export default AdminCategories;