import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import ArticleApi from '../../apis/article';
import { MessageContext, handleErrorMessage } from "../../store/messageStore";
function ArticleDetail() {
    const [article, setArticle] = useState({});
    const { id } = useParams();
    const path = useLocation();
    const [prevArticle, setPrevArticle] = useState({});
    const [nextArticle, setNextArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [, dispatch] = useContext(MessageContext);

    const getArticle = async () => {
        try {
            setIsLoading(true);
            const res = await ArticleApi.getArticle({
                id
            });
            setArticle(res.data.article)
            await getArticles();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }
    const getArticles = async () => {
        try {
            setIsLoading(true);
            const res = await ArticleApi.getArticles();
            const { articles } = res.data
            console.log(articles);
            articles.forEach((item, i) => {
                if (item.id === Number(id)) {
                    console.log(item)
                    setPrevArticle(articles[i - 1]);
                    setNextArticle(articles[i + 1]);
                }
            })
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    useEffect(() => {

        getArticle();
    }, [path])
    return (
        <>
            <Loading isLoading={isLoading} />
            <div className="container pt-66">
                <p className="text-end mt-3"><Link className="text-black" to="/">首頁</Link> / <Link className="text-black" to="/articles">最新消息</Link> / {article.title}</p>
                <div className="row justify-content-center">
                    <div className="col-md-9 mt-2 mb-5 p-3 bg-white">
                        <h1 className="article-title">《{article.title}》</h1>
                        <img src={article.image} className="card-img-top mt-3 bg-light" alt="文章圖片"
                            style={{ height: '25rem', objectFit: 'contain' }}
                        />
                        <div className="mt-3">
                            <span className="badge text-dark m-1 py-0 px-1" style={{ backgroundColor: '#cac7c7' }}><span className="material-icons align-middle fs-6">
                                drive_file_rename_outline
                            </span> {article.author}</span>
                            <span className="badge text-dark m-1 py-0 px-1" style={{ backgroundColor: '#cac7c7' }}><span className="material-icons align-middle fs-6">
                                calendar_month
                            </span> {new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        {article.tag?.map((tag, i) => {
                            return (
                                <span className="bg-primary badge text-dark px-1 py-0 m-1 " key={i}><span className="material-icons align-middle fs-6">
                                    label_important_outline
                                </span>{tag}</span>
                            )
                        })}
                        <p className="card-text fw-bold text-muted mt-3 fs-4">{article.description}</p>
                        <p className="card-text fw-bold mt-3">{article.content}</p>
                        <div className="row my-5">
                            {!!prevArticle && (
                                <Link className="col-6" to={`/article/${prevArticle.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="bg-light text-black border-bottom border-primary border-4 p-2">
                                        <div className="d-flex">
                                            <span className="material-icons me-2">
                                                keyboard_double_arrow_left
                                            </span>
                                            前一篇
                                        </div>
                                        <span className="fw-bold">{prevArticle.title}</span>
                                    </div>
                                </Link>
                            )}
                            {!!nextArticle && (
                                <Link className="col-6" to={`/article/${nextArticle.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="bg-light text-black border-bottom border-primary border-4 p-2">
                                        <div className="d-flex">
                                            後一篇 <span className="material-icons ms-2">
                                                keyboard_double_arrow_right
                                            </span>
                                        </div>
                                        <span className="fw-bold">{nextArticle.title}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleDetail;