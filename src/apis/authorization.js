import axios from "axios";

const baseURL = "https://lit-lowlands-54861.herokuapp.com/api";
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
    }
}