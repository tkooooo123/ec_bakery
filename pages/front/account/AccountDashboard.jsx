import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
function AccountDashboard() {
    const [text, setText] = useState('帳戶中心');
    const handleClick = (e) => {
        setText(e.target.innerText)
    }

    return (
        <>
            <div className="container ">

                <div className="row">
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <h3 className="fw-bold">{text}</h3>
                        <p className="text-end"><Link className="text-black" to="/">首頁</Link> / {text}</p>
                    </div>
                    <div className="col-md-3">
                        <aside className="account-aside">


                            <ul className="account-aside-list mt-3 d-flex d-md-block">
                                <li className="account-aside-list-item">
                                    <Link className="text-black fw-bold" to="/account/profile"
                                    onClick={(e) =>handleClick(e)}
                                    >帳戶中心</Link>
                                </li>
                                <li className="account-aside-list-item mt-md-2 ms-3 ms-md-0 ">
                                    <Link className="text-black fw-bold" to="/account/order"
                                    onClick={(e) =>handleClick(e)}
                                    >我的訂單</Link>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDashboard;