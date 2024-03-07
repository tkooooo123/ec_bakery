import { useEffect, useState, useContext, useRef } from "react";
import AdminApi from '../../apis/admin';
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../../store/messageStore";
import { Modal } from "bootstrap";
import OrderModal from '../../components/OrderModal';
import EditOrderModal from "../../components/EditOrderModal";
import DeleteModal from "../../components/DeleteModal";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [, dispatch] = useContext(MessageContext);
    const [selectedOrder, setSelectedOrder] = useState({});
    const { isAuthenticated } = useSelector(state => state.user)
    const orderModal = useRef(null);
    const editModal = useRef(null);
    const deleteModal = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const { checkTokenIsValid } = useOutletContext();

    const getOrders = async () => {
        try {
            setIsLoading(true);
            const res = await AdminApi.getOrders({
                page: 1
            });
            setOrders(res.data.orders);
            setIsLoading(false);

        } catch (error) {
            handleErrorMessage(dispatch, error);
            setIsLoading(false);
        }
    }
    const handleDelete = async (id) => {
        try {
       
            const res = await AdminApi.deleteOrder({
                id
            })
    
            await getOrders();
            closeDeleteModal();
            postSuccessMessage(dispatch, res.data);
        } catch (error) {
            handleErrorMessage(dispatch, error)
      
        }
    }

    const openOrderModal = (order) => {
        setSelectedOrder(order);
        orderModal.current.show();
    }


    const closeOrderModal = () => {
        orderModal.current.hide()
    }

    const openEditModal = (order) => {
        setSelectedOrder(order);
        editModal.current.show();
    }

    const closeEditModal = () => {
        editModal.current.hide();
    }

    const openDeleteModal = (order) => {
        setSelectedOrder(order)
        deleteModal.current.show();
    }
    const closeDeleteModal = () => {
        deleteModal.current.hide();
    }



    useEffect(() => {
        orderModal.current = new Modal('#orderModal', {
            backdrop: 'static'
        });
        editModal.current = new Modal('#editModal', {
            backdrop: 'static'
        });
        deleteModal.current = new Modal('#deleteModal', {
            backdrop: 'static'
        });

        if(!isAuthenticated) {
            (async function refreshView() {
                await checkTokenIsValid();
            }())
            return;
        }
            getOrders();
        
    }, [isAuthenticated])
    return (
        <>
            <Loading isLoading={isLoading} />
            <OrderModal selectedOrder={selectedOrder} closeOrderModal={closeOrderModal} getOrders={getOrders} isAdmin={true} />
            <EditOrderModal selectedOrder={selectedOrder} close={closeEditModal} getOrders={getOrders} />
            <DeleteModal close={closeDeleteModal} id={selectedOrder.id} handleDelete={handleDelete} text={`訂單編號「${selectedOrder.id}」之訂單？`} title={'訂單'} />
            <div className="admin-orders p-3 m-3">
                <h3 className="text-primary fw-bold my-2">訂單列表</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="d-none d-md-table-cell">訂單編號</th>
                            <th>日期</th>
                            <th className="d-none d-md-table-cell">金額</th>
                            <th className="d-none d-md-table-cell">付款狀態</th>
                            <th className="d-none d-md-table-cell">處理狀態</th>
                            <th>明細</th>
                            <th>狀態變更</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders?.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td className="d-none d-md-table-cell align-middle">{order.osn}</td>
                                    <td className="align-middle">{order.createdAt}</td>
                                    <td className="d-none d-md-table-cell align-middle">{order.amount} 元</td>
                                    <td className="d-none d-md-table-cell align-middle">
                                        <span className={`${Number(order.payment_status) === -1 ? 'd-block' : 'd-none'}`}>已取消</span>
                                        <span className={`${Number(order.payment_status) === 0 ? 'd-block' : 'd-none'}`}>未付款</span>
                                        <span className={`${Number(order.payment_status) === 1 ? 'd-block' : 'd-none'}`}>已付款</span>
                                    </td>
                                    <td className="d-none d-md-table-cell align-middle">
                                        <span className={`${Number(order.shipping_status) === 0 ? 'd-block' : 'd-none'}`}>未處理</span>
                                        <span className={`${Number(order.shipping_status) === 1 ? 'd-block' : 'd-none'}`}>已處理</span>
                                        <span className={`${Number(order.shipping_status) === 2 ? 'd-block' : 'd-none'}`}>配送中</span>
                                        <span className={`${Number(order.shipping_status) === 3 ? 'd-block' : 'd-none'}`}>已送達</span>
                                        <span className={`${Number(order.shipping_status) === -1 ? 'd-block' : 'd-none'}`}>已取消</span>
                                    </td>
                                    <td className="align-middle">
                                        <button className="btn border-0 p-0"
                                            onClick={() => openOrderModal(order)}
                                        ><span className="material-icons fs-2 align-middle">
                                                add_box
                                            </span></button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary fw-bold"
                                            onClick={() => openEditModal(order)}
                                        >
                                            <span className="material-icons fs-4">
                                                edit
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-danger fw-bold"
                                            onClick={() => openDeleteModal(order)}
                                        >
                                            <span className="material-icons fs-4">
                                                delete
                                            </span>
                                        </button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default AdminOrders;