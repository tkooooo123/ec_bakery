import { useEffect, useState ,useContext} from "react";
import AdminApi from '../../apis/admin';
import { Link } from "react-router-dom";
import { MessageContext, handleErrorMessage } from "../../store/messageStore";

function AdminHome() {
    const [orders, setOrders] = useState([]);
    const [, dispatch] = useContext(MessageContext);
    const getOrders = async () => {
        try {
            const res = await AdminApi.getOrders({
                page: 1
            });
           
            setOrders(res.data.orders);
            
        } catch (error) {
            handleErrorMessage(dispatch,error);
         
        }
    }
    useEffect(() => {
        getOrders();
    }, [])
    return (
        <>
        <div className="row p-3">
                        <div className="col-md-8">

                            <div className="recent-orders overflow-hidden p-3">
                                <div className="d-flex justify-content-between align-items-center mt-4 w-100">
                                    <h3 className="fs-2 fw-bold">近期訂單</h3>
                                    <h5></h5>
                                    <Link className="bg-primary text-white fw-bold p-1 rounded-2" to="/admin/orders">查看全部</Link>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>訂單編號</th>
                                            <th>購買人</th>
                                            <th>金額</th>
                                            <th className="d-none d-md-table-cell">付款狀態</th>
                                            <th className="d-none d-md-table-cell">處理狀態</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {orders?.map((order) => {
                                            return (
                                                <tr key={order.id}>
                                                    <td>{order.osn}</td>
                                                    <td>{order.name}</td>
                                                    <td>{order.amount} 元</td>
                                                    <td className="d-none d-md-table-cell">{Number(order.payment_status) ? '已付款' : '未付款'}</td>
                                                    <td className="d-none d-md-table-cell">
                                                        <span className={`${!Number(order.payment_status) ? 'd-block' : 'd-none'}`}>未處理</span>
                                                        <span className={`${Number(order.payment_status) === 1 ? 'd-block' : 'd-none'}`}>已處理</span>
                                                        <span className={`${Number(order.payment_status) === 2 ? 'd-block' : 'd-none'}`}>運送中</span>
                                                        <span className={`${Number(order.payment_status) === 3 ? 'd-block' : 'd-none'}`}>已送達</span>
                                                        <span className={`${Number(order.payment_status) === -1 ? 'd-block' : 'd-none'}`}>已取消</span>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="recent-users p-3">
                                <h3 className="fs-2 mt-4 fw-bold">近期註冊</h3>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default AdminHome;