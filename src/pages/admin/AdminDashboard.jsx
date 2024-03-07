import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useEffect, useContext } from "react";
import Message from "../../components/Message";
import { useDispatch } from "react-redux";
import { removeUser } from "../../slice/userSlice";
import { MessageContext, handleErrorMessage, toastErrorMessage } from "../../store/messageStore";
import AuthorizationApi from '../../apis/authorization';
import { getCurrentUser } from '../../slice/userSlice';

function AdminDashboard() {
    const userDispatch = useDispatch();
    const navigate= useNavigate();
    const authToken = localStorage.getItem('token');
    const [, dispatch] = useContext(MessageContext);
    const { pathname } = useLocation();

    const logout = () => {
        localStorage.removeItem('token');
        userDispatch(removeUser());
    }

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
    const checkTokenIsValid = async () => {
        try {
            if(!authToken) {
                navigate('/login');
                toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！' });
            } else {
                const res = await AuthorizationApi.getCurrentUser(authToken);
                userDispatch(getCurrentUser({ ...res.data.currentUser, token: authToken }))
            }
           
        } catch (error) {
            if (error.response.status === 401) {
                toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！' });
                navigate('/login');
            } else {
                handleErrorMessage(dispatch, error);
            }
        }
    }
    useEffect(() => {
       
        activeLink();
        if(pathname === '/admin/' || pathname === '/admin') {
            navigate('/admin/orders');
        }
   
    }, [pathname])
    return (

        <div className="admin-dashboard">
            <Message />
            <div className="navigation">
                <ul className="navigation-list mt-5">
                    
                    <li className={`navigation-list-item ${pathname.includes('orders') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/orders">
                            <span className="material-icons fs-3 mx-3">
                                list_alt
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">訂單管理</span>
                        </Link>
                    </li>
                    <li className={`navigation-list-item ${pathname.includes('categories') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/categories">
                            <span className="material-icons fs-3 mx-3">
                                category
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">分類管理</span>
                        </Link>
                    </li>
                    <li className={`navigation-list-item ${pathname.includes('products') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/products">
                            <span className="material-icons fs-3 mx-3">
                                view_in_ar
                            </span>
                            <span className="nav-link-title ps-1 fw-bold">商品管理</span>
                        </Link>
                    </li>
                    <li className={`navigation-list-item ${pathname.includes('articles') ? 'active' : ''}`}>
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
                    
                    <Outlet context={{ checkTokenIsValid }}/>

                </div>

            </main>
        </div>

    )
}

export default AdminDashboard;