import OrderApi from '../../../apis/order';
import { useEffect, useRef, useState, useContext } from 'react';
import { Modal } from "bootstrap";
import OrderModal from '../../../components/OrderModal';
import { MessageContext, handleErrorMessage } from '../../../store/messageStore';
import Loading from '../../../components/Loading';
import { useSelector } from 'react-redux';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});
    const orderModal = useRef(null);
    const [, dispatch] = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useSelector(state => state.user)
    const getOrders = async () => {
        try {
            setIsLoading(true);
            const res = await OrderApi.getOrders();
            setOrders(res.data.orders);
            setIsLoading(false);
        } catch (error) {
            handleErrorMessage(dispatch, error);
            setIsLoading(false);
        }
    }

    const openOrderModal = (order) => {
        setSelectedOrder(order);
        orderModal.current.show();
    }

    const closeOrderModal = () => {
        orderModal.current.hide()
    }

    useEffect(() => {
       if(isAuthenticated) {
        getOrders();
       }
        
        orderModal.current = new Modal('#orderModal', {
            backdrop: 'static'
        })

    }, [isAuthenticated])

    return (
        <>
            <Loading isLoading={isLoading} />
            {!orders.length && (
                <p className="fs-2 fw-bold text-center">查無任何訂單，請前往購物。</p>
            )}

            {!!orders.length && (
                <div>
                    <h3 className="mt-3 fw-bold">訂單列表</h3>
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th className="bg-light align-middle px-0" scope="col">訂單編號</th>
                                <th className="bg-light align-middle px-0" scope="col">金額</th>
                                <th className="bg-light align-middle px-0" scope="col">訂購日期</th>
                                <th className="bg-light align-middle px-0 w-20 w-md-auto" scope="col">付款</th>
                                <th className="bg-light align-middle px-0 w-10" scope="col">明細</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return (
                                    <tr className="text-center" key={order.id}>
                                        <td className="align-middle" style={{ wordBreak: 'break-all' }}>
                                            {order.osn}
                                        </td>
                                        <td className="align-middle">
                                            NT$ {order.amount}
                                        </td>
                                        <td className="align-middle" >{order.createdAt}</td>
                                        <td className="align-middle">
                                            <p className={`${Number(order.payment_status) ? 'bg-success' : 'bg-danger'} rounded fw-bold text-white py-1 mt-3`}>{Number(order.payment_status) ? '已付款' : '未付款'}</p></td>
                                        <td className="align-middle">
                                            <button className="btn border-0 p-0"
                                                onClick={() => openOrderModal(order)}
                                            ><span className="material-icons fs-2">
                                                    add_box
                                                </span></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <OrderModal selectedOrder={selectedOrder} closeOrderModal={closeOrderModal} getOrders={getOrders} />
        </>
    )
}

export default Orders;