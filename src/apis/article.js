import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}`
const apiHelper = axios.create({
    baseURL
});

const getToken = () => localStorage.getItem('token');

export default {
    getArticles() {
        return apiHelper.get('/articles', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getArticle({ id }) {
        return apiHelper.get(`/article/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
}