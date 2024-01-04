import { Link, Outlet, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useEffect, useContext } from "react";
import { AuthContext } from '../../store/AuthContext';
import Message from "../../components/Message";

function AdminDashboard() {

    const auth = useContext(AuthContext);
    const { logout } = auth;
    const navigate= useNavigate();


    const activeLink = () => {
        $('.navigation li').on('click', function () {
            $('.navigation li').removeClass('active');
            $(this).addClass('active')
        })
    }
    const toggleClick = () => {
        if ($('.toggle').hasClass('active')) {
            $('.toggle').removeClass('active')
            $('.main').removeClass('active')
            $('.navigation').removeClass('active')
        } else {
            $('.toggle').addClass('active')
            $('.main').addClass('active')
            $('.navigation').addClass('active')
        }
    }



    useEffect(() => {
        activeLink();
        navigate('/admin/home');
    }, [])
    return (

        <div className="admin-dashboard">
            <Message />
            <div className="navigation">
                <ul className="navigation-list mt-5">
                    <li className={`navigation-list-item ${location.hash.includes('home') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/home">
                            <span className="material-icons nav-link-icon fs-3 mx-3">
                                home
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">後台首頁</span>
                        </Link>
                    </li>
                    <li className={`navigation-list-item ${location.hash.includes('orders') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/orders">
                            <span className="material-icons fs-3 mx-3">
                                list_alt
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">訂單管理</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/categories">
                            <span className="material-icons fs-3 mx-3">
                                category
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">分類管理</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/products">
                            <span className="material-icons fs-3 mx-3">
                                view_in_ar
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">商品管理</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/articles">
                            <span className="material-icons fs-3 mx-3">
                            article
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">文章管理</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2" to="/"
                            onClick={logout}
                        >
                            <span className="material-icons fs-3 mx-3">
                                logout
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">登出</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <main className="main">
                <header className="d-flex align-items-center p-3">
                    <span className="material-icons fs-1 toggle"
                        onClick={toggleClick}
                    >
                        menu
                    </span>
                </header>
                <div className="admin-container">
                    
                    <Outlet />

                </div>

            </main>
        </div>

    )
}

export default AdminDashboard;