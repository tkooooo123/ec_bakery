import { useEffect, useState, useContext } from "react"
import AdminApi from '../apis/admin'
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../store/messageStore";
import propTypes from 'prop-types'

function EditOrderModal({ selectedOrder, close, getOrders }) {

    const [paymentStatus, setPaymentStatus] = useState(0);
    const [shipStatus, setShipStatus] = useState(0);
    const [, dispatch] = useContext(MessageContext);
    const handleChange = (e) => {
        if (e.target.name === 'payment_status') {
            setPaymentStatus(Number(e.target.value))
        } else {
            setShipStatus(Number(e.target.value))
        }
    }
    const updateOrder = async () => {
        try {
            const res = await AdminApi.updateOrder({
                id: selectedOrder.id,
                payment: paymentStatus,
                shipment: shipStatus
            })
            await getOrders();
            close();
            postSuccessMessage(dispatch, res.data)
        } catch (error) {
            console.log(error)
            handleErrorMessage(dispatch, error)
        }
    }
    useEffect(() => {

        setPaymentStatus(Number(selectedOrder.payment_status) || 0);
        setShipStatus(Number(selectedOrder.shipping_status) || 0)


    }, [selectedOrder])

    return (
        <div
            className='modal fade'
            tabIndex='-1'
            id='editModal'
            aria-labelledby='editModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header bg-primary'>
                        <h1 className='modal-title text-white fs-5 fw-bolder' id='editModalLabel'>
                            訂單狀態變更
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={close}
                        />
                    </div>
                    <div className='modal-body'>
                        <div>
                            <p>付款狀態： <select name="payment_status" value={paymentStatus}
                                onChange={handleChange}>
                                <option value={0}>未付款</option>
                                <option value={1}>已付款</option>
                                <option value={-1}>已取消</option>
                            </select></p>
                            <p>處理狀態： <select name="shipping_status" value={shipStatus}
                                onChange={handleChange}>
                                <option value={0}>未處理</option>
                                <option value={1}>已處理</option>
                                <option value={2}>配送中</option>
                                <option value={3}>已送達</option>
                                <option value={-1}>已取消</option>
                            </select></p>

                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={close}>
                            取消
                        </button>
                        <button
                            type='button'
                            className='btn btn-primary fw-bold'
                            onClick={() => updateOrder()}
                        >
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrderModal;

EditOrderModal.propTypes = {
    selectedOrder: propTypes.object.isRequired,
    close: propTypes.func.isRequired,
    getOrders: propTypes.func.isRequired

}