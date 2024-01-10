import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function NotFound() {
    const [seconds, setSeconds] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        let time;
        if(seconds > 0) {
            time = setTimeout(() => {
                setSeconds((pre) => pre - 1)
            }, 1000);
        } else if(seconds === 0) {
            navigate('/')
        }
        return () => clearTimeout(time);
    },)
return (
    <div className="contatiner d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="border border-2 border-primary p-5 rounded-3">
                <h1 className="fw-bold">404 此頁面不存在</h1>
                <p className="fw-bold fs-4 text-center pt-1">{seconds} 秒後自動返回首頁</p>
                <p className="fw-bold fs-5 text-center text-secondary">或點擊下方按鈕</p>
                <div className="d-flex justify-content-around mt-3">
                    <Link to="/">
                        <button type="button" className="btn btn-primary fw-bold">
                        <i className="bi bi-arrow-left"></i> 回到首頁
                        </button>
                    </Link>
                   
                </div>
            </div>
        </div>
)
}

export default NotFound;