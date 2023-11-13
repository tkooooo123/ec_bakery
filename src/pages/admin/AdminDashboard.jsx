import { Link, Outlet } from "react-router-dom";
import $ from "jquery";
import { useEffect, useContext } from "react";
import { AuthContext } from '../../store/AuthContext';
import Message from "../../components/Message";

function AdminDashboard() {

    const auth = useContext(AuthContext);
    const { logout } = auth;


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

    }, [])
    return (

        <div className="admin-dashboard">
            <Message />
            <div className="navigation">
                <ul className="navigation-list mt-5">
                    <li className={`navigation-list-item ${location.hash.includes('home') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/home">
                            <span className="material-icons fs-3 mx-3">
                                home
                            </span>
                            <span className="">Home</span>
                        </Link>
                    </li>
                    <li className={`navigation-list-item ${location.hash.includes('orders') ? 'active' : ''}`}>
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/orders">
                            <span className="material-icons fs-3 mx-3">
                                list_alt
                            </span>
                            <span className="">Orders</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2">
                            <span className="material-icons fs-3 mx-3">
                                category
                            </span>
                            <span className="">Category</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2" to="/admin/products">
                            <span className="material-icons fs-3 mx-3">
                                view_in_ar
                            </span>
                            <span className="">Product</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2">
                            <span className="material-icons fs-3 mx-3">
                                settings
                            </span>
                            <span className="">Settings</span>
                        </Link>
                    </li>
                    <li className="navigation-list-item">
                        <Link className="nav-link d-flex align-items-center py-2" to="/"
                            onClick={logout}
                        >
                            <span className="material-icons fs-3 mx-3">
                                logout
                            </span>
                            <span className="">Logout</span>
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
                    <div className="row">
                        <div className="col-4">1</div>
                        <div className="col-4">2</div>
                        <div className="col-4">3</div>
                    </div>
                    <Outlet />

                </div>

            </main>
        </div>

    )
}

export default AdminDashboard;