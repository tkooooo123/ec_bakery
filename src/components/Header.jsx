import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from '../store/AuthContext';
import propTypes from 'prop-types';
import { Collapse } from "bootstrap";


function Header({ cartData }) {

    const auth = useContext(AuthContext);
    const { user, logout } = auth;
    const { isAuthenticated } = user;
    const [isToggled, setIsToggled] = useState(false);
    const navCollapse = useRef(null);
    const location = useLocation();

    const openCollapse = () => {
        navCollapse.current.show();
        setIsToggled(true);
    }
    const closeCollapse = () => {
        if (isToggled) {
            setIsToggled(false);
            navCollapse.current.hide();
        }
    }

    useEffect(() => {
        navCollapse.current = new Collapse('#navbarNav', {
            toggle: false,
        });

    }, [])
    useEffect(() => {
        closeCollapse();
    }, [location])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary  w-100">
                <div className="container container-fluid">
                    <div className={`navicon-button ${isToggled ? 'open' : ''} d-lg-none p-3`}
                        onClick={() => {
                            if (isToggled) {
                                closeCollapse();
                            } else {
                                openCollapse();
                            }
                        }}

                    >
                        <div className="navicon"></div>
                    </div>




                    <NavLink to="/" className="navbar-brand d-flex align-items-center"
                    >
                        <img src="./images/logo.png" alt="logo" />
                        <span className="ms-2 fs-4 fw-bold">BAKERY</span>
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3 ms-lg-0 h-100">

                            <li className="nav-item fw-bold fs-5">
                                <NavLink to="/articles"
                                    onClick={closeCollapse}
                                >最新消息</NavLink>
                            </li>
                            <li className="nav-item fw-bold fs-5">
                                <NavLink to="/products"
                                    onClick={closeCollapse}
                                >全部商品</NavLink>
                            </li>
                            <li className="nav-item fw-bold fs-5 d-lg-none">
                                <NavLink to="/account"
                                    onClick={closeCollapse}
                                >帳戶中心</NavLink>
                            </li>

                            {!isAuthenticated && (
                                <li className="nav-item fw-bold fs-5">
                                    <NavLink className=" fw-bold fs-5 d-lg-none" to="/login"
                                        onClick={closeCollapse}
                                    >登入/註冊</NavLink>

                                </li>

                            )}
                            {isAuthenticated && (
                                <li className="nav-item">
                                    <NavLink className=" fw-bold fs-5 d-lg-none d-block" to="/login"
                                        onClick={(logout)}
                                    >登出</NavLink>

                                </li>

                            )}
                        </ul>
                    </div>




                    <ul className="icon-list d-flex justify-content-center mb-0">
                        <NavLink to="/account/profile" className="icon-list-item text-black d-flex align-items-center me-3" >
                            <span className="material-icons fs-2">
                                account_circle
                            </span>
                        </NavLink>

                        <NavLink to="/cart" className="icon-list-item text-black d-flex align-items-center me-3 position-relative">
                            <span className="material-icons fs-2">
                                local_mall
                            </span>
                            {!!cartData?.carts?.length && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartData?.carts?.length}
                                </span>
                            )}
                        </NavLink>
                        {!isAuthenticated && (
                            <NavLink className="text-black fw-bold  d-none d-lg-flex" to="/login">登入/註冊</NavLink>
                        )}
                        {isAuthenticated && (
                            <NavLink className="text-black fw-bold d-none d-lg-flex" to="/login"
                                onClick={(logout)}
                            >登出</NavLink>
                        )}


                    </ul>
                </div>


            </nav>
        </>
    )
}

export default Header;

Header.propTypes = {
    cartData: propTypes.object.isRequired,
}