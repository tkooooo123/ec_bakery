import { MessageContext, handleErrorMessage } from "../store/messageStore";
import { useContext, useEffect, useState } from "react";
import OrderApi from '../apis/order';
import propTypes from 'prop-types';


function OrderModal({ selectedOrder, closeOrderModal, isAdmin }) {
    const [, dispatch] = useContext(MessageContext);
    const [tradeInfo, setTradeInfo] = useState({});
    const order = selectedOrder
    const getTradeInfo = async () => {
        try {
            if(isAdmin) {
                return
            }
            const res = await OrderApi.getPayment({
                orderId: order.id
            })

            setTradeInfo(res.data.tradeInfo);
        } catch (error) {
            handleErrorMessage(dispatch, error)
            console.log(error)
        }
    }
 

    useEffect(() => {
        if (!Number(order.payment_status)) {
            getTradeInfo();
        }
    }, [selectedOrder])


    return (
        <>
            <div className="modal fade" id="orderModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                訂單明細
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                               
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <div className='row mb-2'>
                                <div className="col-lg-6">
                                    <div className="mb-5">
                                        <h5 className="fw-bold">訂單資訊</h5>
                                        <ul className="mt-3 p-0">
                                            <li className="d-flex">
                                                <p className="w-25">訂購時間</p>
                                                <p className="w-75 fw-bold">{selectedOrder.createdAt}</p>
                                            </li>
                                            <li className="d-flex">
                                                <p className="w-25">處理狀態</p>
                                                {!selectedOrder.status && (
                                                    <p className="w-75 fw-bold">未確認</p>
                                                )}
                                                {!!(selectedOrder.status === 0) && (
                                                    <p className="w-75 fw-bold">未確認</p>
                                                )}
                                                {!!(selectedOrder.status === 1) && (
                                                    <p className="w-75 fw-bold">已確認</p>
                                                )}
                                                {!!(selectedOrder.status === 2) && (
                                                    <p className="w-75 fw-bold">處理中</p>
                                                )}
                                                {!!(selectedOrder.status === 3) && (
                                                    <p className="w-75 fw-bold">已送達</p>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold">聯絡資訊</h5>

                                        <ul className="mt-3 p-0">
                                            <li className="d-flex">
                                                <p className="w-25">姓名</p>
                                                <p className="w-75 fw-bold">{selectedOrder.name}</p>
                                            </li>
                                            <li className="d-flex">
                                                <p className="w-25">連絡信箱</p>
                                                <p className="w-75 fw-bold">{selectedOrder.email}</p>
                                            </li>
                                            <li className="d-flex">
                                                <p className="w-25">聯絡電話</p>
                                                <p className="w-75 fw-bold">{selectedOrder.phone}</p>
                                            </li>
                                            <li className="d-flex">
                                                <p className="w-25">運送地址</p>
                                                <p className="w-75 fw-bold">{selectedOrder.address}</p>
                                            </li>
                                            <li className="d-flex">
                                                <p className="w-25">留言</p>
                                                <p className="w-75 fw-bold">{selectedOrder.message}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="fw-bold">付款狀態</h5>
                                        <ul className="mt-2 px-0 py-3 bg-light">
                                            <li className="d-flex mt-2">
                                                <p>付款方式 /</p>
                                                <p className="mx-1">信用卡</p>
                                            </li>
                                            <li className="d-flex align-items-center mt-2">
                                                <p>付款狀態 / </p>
                                                <p className={`${Number(selectedOrder.payment_status) ? 'bg-success' : 'bg-danger'} rounded fw-bold text-white p-1 mx-1`}>{Number(selectedOrder.payment_status) ? '已付款' : '未付款'}</p>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-lg-6">

                                    <h5 className="fw-bold">購買項目</h5>
                                    <ul className='card-body'>
                                        {Object.values(selectedOrder?.orderProducts || {}).map((item) => {
                                            return (
                                                <li key={item.id}>
                                                    <div className="d-flex justify-content-between border-bottom py-3">
                                                        <div className="d-flex">
                                                            <img src={item.image} alt="商品圖片" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                            <div className="d-flex justify-content-between">
                                                                <p className="mt-2 px-3">{item.name} x {item.OrderItem.quantity}</p>
                                                                <p className="text-end mt-2 w-50">NT$ {item.price}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="d-flex justify-content-between mt-2">
                                        <p className="h5 fw-bold">總計</p>
                                        <p className="h5 fw-bold">NT$ {selectedOrder.amount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {!isAdmin && (

                                <>
                                    {/*提交藍新金流付款*/}
                                    <form method="POST" action={tradeInfo.PayGateWay} >
                                        <input type="text" name="MerchantID" value={tradeInfo.MerchantID || ''} onChange={() => {}} hidden />
                                        <input type="text" name="TradeInfo" value={tradeInfo.TradeInfo || ''} onChange={() => {}} hidden />
                                        <input type="text" name="TradeSha" value={tradeInfo.TradeSha || ''} onChange={() => {}} hidden />
                                        <input type="text" name="Version" value={Number(tradeInfo.version) || ''} onChange={() => {}} hidden/>
                                        <button type="submit" className={`btn btn-dark rounded-0 px-5 ${Number(selectedOrder.payment_status) ? 'd-none' : ''}`}
                                    >前往付款</button>
                                    </form>
                                    
                                </>

                            )}
                            <button type="button" className="btn btn-outline-danger" onClick={() => {
                                closeOrderModal();
                            }}>關閉</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderModal;

OrderModal.propTypes = {
 selectedOrder: propTypes.object.isRequired,
 closeOrderModal: propTypes.func.isRequired,
 isAdmin: propTypes.bool
}