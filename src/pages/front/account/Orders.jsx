import OrderApi from '../../../apis/order';
import { useEffect, useState } from 'react';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});
    const getOrders = async () => {
        try {
            const res = await OrderApi.getOrders();
            console.log(res.data.orders)
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error);
        }
    }

    const openOrderModal = (order) =>{
        setSelectedOrder(order);
        console.log(order.id)
        //orderModal.current.show()
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            <h1 className="mt-3">訂單列表</h1>
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
                                            {order.id}
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
        </>
    )
}

export default Orders;