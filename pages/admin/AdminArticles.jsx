import { useContext, useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import { Modal } from "bootstrap";
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../../store/messageStore";
import ArticleModal from "../../components/ArticleModal";
import DeleteModal from "../../components/DeleteModal";
import AdminApi from "../../apis/admin"

function AdminArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [type, setType] = useState('create');
    const [selectedArticle, setSelectedArticle] = useState({});
    const [, dispatch] = useContext(MessageContext);
    const articleModal = useRef(null);
    const deleteModal = useRef(null);

    const getArticles = async () => {
        try {
            setIsLoading(true);
            const res = await AdminApi.getArticles();
            setArticles(res.data.articles);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    const openArticleModal = async (type, article) => {
        if (type === 'edit') {
            setIsLoading(true)
            setSelectedArticle(article);
            setIsLoading(false)
        }
        setType(type);
        articleModal.current.show();
    }
    const closeArticleModal = () => {
        articleModal.current.hide();
    }
    const openDeleteModal = (article) => {
        setSelectedArticle(article);
        deleteModal.current.show();
    }


    const closeDeleteModal = () => {
        deleteModal.current.hide();
    }
    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const res = await AdminApi.deleteArticle({
                id
            })
            await getArticles();
            closeDeleteModal();
            postSuccessMessage(dispatch, res.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    useEffect(() => {
        articleModal.current = new Modal('#articleModal', {
            backdrop: 'static'
        });
        deleteModal.current = new Modal('#deleteModal', {
            backdrop: 'static'
        });
        getArticles();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <ArticleModal closeArticleModal={closeArticleModal} getArticles={getArticles} type={type} tempArticle={selectedArticle}/>
            <DeleteModal handleDelete={handleDelete} close={closeDeleteModal} id={selectedArticle.id} text={`文章名稱「${selectedArticle.title}」？`} title={'文章'} />
            <div className="admin-articles p-3 m-3">
                <div className="d-flex justify-content-between">
                    <h3 className="text-primary fw-bold my-2">文章列表</h3>
                    <button className="btn btn-primary fw-bold"
                        onClick={() => openArticleModal('create', {})}
                    >新增文章</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>標題</th>
                            <th>作者</th>
                            <th>描述</th>
                            <th>公開狀態</th>
                            <th>編輯 / 刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => {
                            return (
                                <tr key={article.id}>
                                    <td>{article.createdAt.split('T')[0]}</td>
                                    <td>{article.title}</td>
                                    <td>{article.author}</td>
                                    <td>{article.description}</td>
                                    <td>{article.isPublic ? '啟用' : '未啟用'}</td>
                                    <td>
                                        <button type='button' className='btn btn-primary btn-sm'
                                            onClick={() => openArticleModal('edit', article)}
                                        >
                                            編輯
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-outline-danger btn-sm ms-2'
                                            onClick={() => openDeleteModal(article)}
                                        >
                                            刪除
                                        </button>
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

export default AdminArticles;