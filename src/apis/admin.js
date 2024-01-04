import axios from "axios";


const baseURL = `${import.meta.env.VITE_BASE_URL}`
const apiHelper = axios.create({
    baseURL
});

const getToken = () => localStorage.getItem('token');

export default {
    getProducts({ page, categoryId }) {
        const searchParams = new URLSearchParams({ page, categoryId })
        return apiHelper.get(`/admin/products?${searchParams.toString()}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getProduct({ id }) {
        return apiHelper.get(`/admin/products/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    putProduct({ id, formData }) {
        return apiHelper.put(`/admin/products/${id}`, formData , {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    postProduct({ formData }) {
        return apiHelper.post('/admin/product', formData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })

    },
    deleteProduct({ id }) {
        return apiHelper.delete(`/admin/products/${id}/delete`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getCategories() {
        return apiHelper.get('/admin/categories', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    createCategory({ data }) {
        return apiHelper.post('/admin/categories', data , {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteCategory({ id }) {
        return apiHelper.delete(`/admin/categories/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })

    },
    updateCategory({ id, data }) {
        return apiHelper.put(`/admin/categories/${id}`, data, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })

    },
    getOrders({ page }) {
        const searchParams = new URLSearchParams({ page })
        return apiHelper.get(`/admin/orders?${searchParams.toString()}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    cancelOrder({ id, data }) {
        return apiHelper.put(`/admin/orders/${id}/cancel`, { data }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    updateOrder({ id, payment, shipment }) {
        return apiHelper.put(`/admin/orders/${id}`, { payment, shipment }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getOrder({ id }) {
        return apiHelper.get(`/admin/orders/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteOrder({ id }) {
        return apiHelper.delete(`/admin/orders/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    uploadImgs({ formData }) {
        return apiHelper.post(`/admin/product/upload`, formData,{
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    uploadImg({ formData }) {
        return apiHelper.post(`/admin/upload`, formData,{
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    postAritcle({ formData }) {
        return apiHelper.post(`/admin/article`, formData,{
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getArticles() {
        return apiHelper.get(`/admin/articles`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteArticle({ id }) {
        return apiHelper.delete(`/admin/articles/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    putArticle({ id, formData }) {
        return apiHelper.put(`/admin/articles/${id}`, formData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }

}

