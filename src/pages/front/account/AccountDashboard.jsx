import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

function AccountDashboard() {
    const [text, setText] = useState('帳戶中心');
    const { checkTokenIsValid } = useOutletContext();
    const {  isAuthenticated } = useSelector(state => state.user);
    const location = useLocation();
    const handleClick = (e) => {
        setText(e.target.innerText)
    }

    useEffect(() => {
        if(!isAuthenticated) {
            (async function refreshView() {
                await checkTokenIsValid();
            }())
            return;
        } else if(location.pathname.includes('order')) {
            setText('我的訂單')
         }
    }, [isAuthenticated])

    return (
        <>
            <div className="container pt-66 mh">

                <div className="row">
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <h1 className="fw-bold">{text}</h1>
                        <p className="text-end"><Link className="text-black" to="/">首頁</Link> / {text}</p>
                    </div>
                    <div className="col-md-3">
                        <aside className="account-aside">


                            <ul className="account-aside-list mt-3 d-flex d-md-block">
                                <li className="account-aside-list-item">
                                    <Link className={`fw-bold p-1 ${text === '帳戶中心' ? 'active' : ''}`} to="/account/profile"
                                    onClick={(e) =>handleClick(e)}
                                    >帳戶中心</Link>
                                </li>
                                <li className="account-aside-list-item mt-md-2 ms-3 ms-md-0 ">
                                    <Link className={`fw-bold p-1 ${text === '我的訂單' ? 'active' : ''}`} to="/account/order"
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