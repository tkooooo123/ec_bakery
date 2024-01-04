import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}`
const apiHelper = axios.create({
    baseURL
});

const getToken = () => localStorage.getItem('token')
export default {
    signIn({ email, password }) {
        return apiHelper.post('/signin', {
            email,
            password
        })
    },
    signUp({ name, email, password, confirmPassword}) {
        return apiHelper.post('/signup', {
            name,
            email,
            password,
            confirmPassword
        })
    },
    getCurrentUser() {
        return apiHelper.get('/users/getCurrentUser', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    postFbSignIn({ name, email }) {
        return apiHelper.post('/facebook', {
            name, email 
        })
    },
    editProfile({ id, formData }) {
        return apiHelper.put(`/users/${id}`, formData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }
}