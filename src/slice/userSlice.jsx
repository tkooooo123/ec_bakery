import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        token: '',
        userId: '',
        name: '',
        email: '',
        avatar: ''
    },
    reducers: {
        createUserLogin(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.user.userId
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.avatar = action.payload.user.avatar
        },
        getCurrentUser(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.id
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar
            console.log(5)
        },
        removeUser() {
            return {
                isAuthenticated: false,
                token: '',
                userId: '',
                name: '',
                email: '',
                avatar: ''
            }
        }
    }
})
export const { createUserLogin, getCurrentUser, removeUser } = userSlice.actions;

export default userSlice.reducer;