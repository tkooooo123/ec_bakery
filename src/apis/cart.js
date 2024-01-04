import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}`
const apiHelper = axios.create({
    baseURL
});

const getToken = () => localStorage.getItem('token')

export default {
    postCart({ productId, quantity, cartId }) {
        return apiHelper.post('/carts', { productId, quantity, cartId }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getCart () {
        return apiHelper.get(`/carts`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    updateCartItem({id, quantity}) {
        return apiHelper.post(`/carts/cartItem/${id}/update`, { quantity }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteCartItem({id}) {
        return apiHelper.delete(`/carts/cartItem/${id}/delete`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteCart({id}) {
        return apiHelper.delete(`/carts/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
}