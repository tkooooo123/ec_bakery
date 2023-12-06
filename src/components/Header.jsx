import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../store/AuthContext';
import propTypes from 'prop-types';

function Header({cartData}) {

    const auth = useContext(AuthContext);
    const { user, logout } = auth;
    const { isAuthenticated } = user;
 

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary  w-100">
                <div className="container container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink to="/" className="navbar-brand d-flex align-items-center">
                        <img src="./images/logo.png" alt="logo" />
                        <span className="ms-2 fs-4">BAKERY</span>
                    </NavLink>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item fw-bold fs-5">
                                <NavLink to="/" className="nav-link active" aria-current="page">首頁</NavLink>
                            </li>
                            <li className="nav-item fw-bold fs-5">
                                <NavLink to="/products" className="nav-link" 
                                >全部商品</NavLink>
                            </li>
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
                            <NavLink className="text-black fw-bold" to="/login">登入/註冊</NavLink>
                        )}
                         {isAuthenticated && (
                            <NavLink className="text-black fw-bold" to="/login"
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