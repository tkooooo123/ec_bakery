import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}`
const apiHelper = axios.create({
    baseURL
});

export default {
    getProducts({ page, categoryId, keyword }) {
        const searchParams = new URLSearchParams({ page, categoryId, keyword: keyword || ''})
        return apiHelper.get(`/products?${searchParams.toString()}`)
    },
    getProduct({ productId }) {
        return apiHelper.get(`/products/${productId}`)
    }
 
}