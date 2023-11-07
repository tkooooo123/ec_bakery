import { Link, Outlet } from "react-router-dom";
function AccountDashboard() {

    return (
        <>
            <div className="container ">
                <div className="row">
                    <div className="col-3">
                        <aside className="account-aside">
                            <h3 className="mt-3"><Link className="text-black" to="/">首頁</Link> / <span>帳戶中心</span></h3>
                            <ul className="account-aside-list">
                                <li className="account-aside-list-item">
                                    <Link className="text-black" to="/account/profile">帳戶中心</Link>
                                </li>
                                <li className="account-aside-list-item">
                                    <Link className="text-black" to="/account/order">我的訂單</Link>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="col-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDashboard;