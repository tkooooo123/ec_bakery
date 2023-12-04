import axios from "axios";

const baseURL = "http://localhost:3000/api";
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