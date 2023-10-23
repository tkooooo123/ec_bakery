import { NavLink } from "react-router-dom";


function Header() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink to="/" className="navbar-brand d-flex align-items-center">
                        <img src="src/assets/images/logo.png" alt="logo" />
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
                        <a className="icon-list-item text-black d-flex align-items-center me-3" href="#">
                        <span className="material-icons fs-2">
                            account_circle
                        </span>
                        </a>
                        <a className="icon-list-item text-black d-flex align-items-center " href="#">
                        <span className="material-icons fs-2">
                            local_mall
                        </span>
                        </a>
                       

                    </ul>
                </div>

            </nav>
        </>
    )
}

export default Header;