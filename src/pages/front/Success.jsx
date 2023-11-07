import { useContext, useEffect, useState } from 'react';
import Stepper from '../../components/Stepper';
import { useParams, Link } from 'react-router-dom';
import OrderApi from '../../apis/order';
import { MessageContext, handleErrorMessage } from '../../store/messageStore';

function Success() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});
    const [tradeInfo, setTradeInfo] = useState({});
    const [, dispatch] = useContext(MessageContext);
    const getOrder = async () => {
        try {

            const res = await OrderApi.getOrder({ orderId });
            const paymentRes = await OrderApi.getPayment({ orderId });
            console.log(res.data.order, res.data.order.amount)
            setOrderData(res.data.order);
            console.log(paymentRes.data.tradeInfo)
            setTradeInfo(paymentRes.data.tradeInfo)
        } catch (error) {
            handleErrorMessage(dispatch, error);
            console.log(error)
        }
    }


    useEffect(() => {
        getOrder();
    }, [])
    return (
        <>
            <div className="container">
                <Stepper stepper={3}></Stepper>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <p className='fs-0 mx-2 my-auto'>
                        <span className="material-icons text-success fs-1">
                            check_circle
                        </span>
                    </p>
                    <div>
                        <h5 className="fw-bold mt-2">感謝您！您的訂單已建立完成</h5>
                        <p className="text-muted">訂單編號：{orderData.id}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-5">
                            <h5 className="fw-bold mt-3">訂單資訊</h5>
                            <ul className="mt-3 p-2 bg-white">
                                <li className="d-flex">
                                    <p className="w-25">訂購時間</p>
                                    <p className="w-75 fw-bold">{new Date(orderData.createdAt).toLocaleDateString()}</p>
                                </li>
                                <li className="d-flex">
                                    <p className="w-25">處理狀態</p>
                                    {!Number(orderData.shipping_status) && (
                                        <p className="w-75 fw-bold">未確認</p>
                                    )}

                                    {!!(Number(orderData.shipping_status) === 1) && (
                                        <p className="w-75 fw-bold">已確認</p>
                                    )}
                                    {!!(Number(orderData.shipping_status) === 2) && (
                                        <p className="w-75 fw-bold">處理中</p>
                                    )}
                                    {!!(Number(orderData.shipping_status) === 3) && (
                                        <p className="w-75 fw-bold">已送達</p>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="fw-bold">聯絡資訊</h5>

                            <ul className="mt-3 p-2 bg-white">
                                <li className="d-flex">
                                    <p className="w-25">姓名</p>
                                    <p className="w-75 fw-bold">{orderData?.name}</p>
                                </li>
                                <li className="d-flex">
                                    <p className="w-25">連絡信箱</p>
                                    <p className="w-75 fw-bold">{orderData?.email}</p>
                                </li>
                                <li className="d-flex">
                                    <p className="w-25">聯絡電話</p>
                                    <p className="w-75 fw-bold">{orderData?.phone}</p>
                                </li>
                                <li className="d-flex">
                                    <p className="w-25">運送地址</p>
                                    <p className="w-75 fw-bold">{orderData?.address}</p>
                                </li>
                                <li className="d-flex">
                                    <p className="w-25">留言</p>
                                    <p className="w-75 fw-bold">{orderData.message}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h5 className="fw-bold">付款狀態</h5>
                            <ul className="mt-2 p-2 bg-white">
                                <li className="d-flex mt-2">
                                    <p>付款方式 /</p>
                                    <p className="mx-1">信用卡</p>
                                </li>
                                <li className="d-flex align-items-center mt-2">
                                    <p>付款狀態 / </p>
                                    <p className={`${Number(orderData.payment_status) ? 'bg-success' : 'bg-danger'} rounded fw-bold text-white p-1 mx-1`}>{orderData.is_paid ? '已付款' : '未付款'}</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h5 className="fw-bold mt-3">購買項目</h5>
                        <div className='card rounded-0 p-4 p-lg-5 mt-3'>
                            <div className='card-body px-1'>
                                {Object.values(orderData?.orderProducts || {}).map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <div className="d-flex justify-content-between border-bottom py-3">
                                                <div className="d-flex">
                                                    <img src={item.image} alt="..." style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mt-2 px-3">{item.name} x {item.quantity}</p>
                                                        <p className="text-end mt-2 w-50">NT${item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </div>
                            <li className="d-flex justify-content-between px-1">
                                <p className="h5 fw-bold">總計</p>
                                <p className="h5 fw-bold">NT$ {orderData.amount}</p>
                            </li>
                        </div>


                    </div>
                </div>
                <div className={`d-flex justify-content-between my-5 ${Number(orderData.payment_status) ? 'd-none' : ''}`}>
                    <Link to="/" className="btn btn-outline-primary rounded-0 py-md-3 px-md-5 p-3 fs-md-5 fw-bold"><i className="bi bi-arrow-left"></i> 繼續購物 </Link>

                    {/*提交藍新金流付款*/}
                    <form method="POST" action={tradeInfo.PayGateWay} >
                        <input type="text" name="MerchantID" value={tradeInfo.MerchantID} hidden />
                        <input type="text" name="TradeInfo" value={tradeInfo.TradeInfo} hidden />
                        <input type="text" name="TradeSha" value={tradeInfo.TradeSha} hidden />
                        <input type="text" name="Version" value={Number(tradeInfo.Version)} hidden />
                        <button type="submit" className="btn btn-dark rounded-0 py-md-3 px-md-5 p-3 fs-md-5 fw-bold">前往付款</button>
                    </form>
                </div>
                <div className={`d-flex justify-content-between my-5 ${Number(orderData.payment_status) ? '' : 'd-none'}`}>
                    <Link to="/" className="btn btn-outline-primary rounded-0 py-md-3 px-md-5 p-3 fs-md-5 fw-bold"><i className="bi bi-arrow-left"></i> 返回首頁</Link>
                    <Link to="/products" className="btn btn-dark rounded-0 py-md-3 px-md-5 p-3 fs-md-5 fw-bold">繼續購物 <i className="bi bi-arrow-right"></i></Link>
                </div>

            </div>
        </>
    )
}

export default Success;