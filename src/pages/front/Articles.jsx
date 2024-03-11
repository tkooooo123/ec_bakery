import { useEffect, useState } from 'react';
import ArticleApi from '../../apis/article';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const getArticles = async () => {
        try {
            setIsloading(true);
            const res = await ArticleApi.getArticles();
            setArticles(res.data.articles);
            setIsloading(false);
        } catch (error) {
            console.log(error);
            setIsloading(false);
        }
    }


    useEffect(() => {
        getArticles();
    }, [])

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className="container pt-66 mh">
                <div className="d-flex justify-content-between align-items-center">
                <h1 className="fw-bold mt-3">最新消息</h1>
                <p className="text-end mt-3"><Link className="text-black" to="/">首頁</Link> / <Link className="text-black" to="/articles">最新消息</Link> </p>
                </div>
                <div className="row mb-3">
                    {articles.map((article) => {
                        return (
                            <div className="col-lg-4 g-3 col-md-6 d-flex flex-column" key={article.id}>
                                <Link to={`/article/${article.id}`} style={{ textDecoration: 'none' }} className='flex-grow-1'>
                                    <div className="card mb-3 h-100">
                                        <img src={article.image} className="card-img-top bg-light" alt="文章圖片"
                                            style={{ height: '15rem', objectFit: 'contain' }}
                                        />
                                        <div className="card-body ">
                                            <h5 className="card-title fw-bold ms-1">{article.title}</h5>
                                            <div>
                                                <span className="badge text-dark m-1 py-1 px-1" style={{ backgroundColor: '#cac7c7' }}><i className="bi bi-pencil"></i> {article.author}</span>
                                                <span className="badge text-dark m-1 py-1 px-1" style={{ backgroundColor: '#cac7c7' }}><i className="bi bi-calendar3"></i> {new Date(article.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="card-text fw-bold text-muted ms-1">{article.description}</p>
                                            {article.tag?.map((tag, i) => {
                                                return (
                                                    <span className="bg-primary badge text-dark px-1 py-1 m-1" key={i}><i className="bi bi-tag-fill me-1"></i>{tag}</span>
                                                )
                                            })}
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

export default Articles;