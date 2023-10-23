import axios from "axios";

const baseURL = "https://lit-lowlands-54861.herokuapp.com/api";
const apiHelper = axios.create({
    baseURL
});

export default {
    getProducts({ page, categoryId, keyword }) {
        const searchParams = new URLSearchParams({ page, categoryId, keyword: keyword || ''})
        return apiHelper.get(`/products?${searchParams.toString()}`)
    }
}