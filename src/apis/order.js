import axios from "axios";

const baseURL = "http://localhost:3000/api";
const apiHelper = axios.create({
    baseURL
});

const getToken = () => localStorage.getItem('token')

export default {
    getOrders() {
        return apiHelper.get('/orders', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    postOrder(formData) {
        return apiHelper.post('/orders', formData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getOrder({orderId}) {
        return apiHelper.get(`/order/${orderId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getPayment({orderId}) {
        return apiHelper.get(`/orders/${orderId}/payment`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    putOrder({orderId, payment, shipment}) {
        return apiHelper.put(`/orders/${orderId}`, { payment, shipment }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }
  
}