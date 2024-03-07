import { Link } from "react-router-dom";
import { memo } from "react";
 const Footer = memo(function Footer() {
    return (
        <>
            <footer className="footer bg-primary">
                <div className="container">
                    <div className="row pt-4 px-md-0 px-3">
                        <div className="col-md-4 col-6">
                            <h4 className="fw-bold">關於我們</h4>
                            <ul className="d-flex flex-column ">
                                <Link to="/brandstory" className="text-black fw-bold">品牌故事</Link>
                                <Link to="/contactus" className="text-black fw-bold">聯絡我們</Link>
                            </ul>
                        </div>
                        <div className="col-md-4 col-6">
                            <h4 className="fw-bold">顧客服務</h4>
                            <ul className="d-flex flex-column ">
                                <Link to="/frequencely_asked_questions" className="text-black fw-bold">常見問題</Link>
                                <Link to="/privacy" className="text-black fw-bold">隱私權政策</Link>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h4 className="fw-bold">BAKERY</h4>
                            <ul className="d-flex flex-column ">
                                <ul className="d-flex align-items-center">
                                 
                                </ul>
                                <span className="fw-bold">營業時間： 10:00 - 20:00</span>
                                <span className="fw-bold">電話：04-2345-6789</span>
                                <span className="fw-bold">Email： bakery_ec@gmail.com</span>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="border-top border-1 border-black mx-3 py-3 text-center">
                    本站僅作為網頁作品練習使用 2023 © All Rights Reserved.
                    </div>
                </div>
            </footer>
        </>
    );

})

export default Footer;