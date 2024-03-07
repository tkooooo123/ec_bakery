import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        token: '',
        userId: '',
        name: '',
        email: '',
        avatar: '',
        role: '',
    },
    reducers: {
        createUserLogin(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.user.userId;
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.avatar = action.payload.user.avatar;
            state.role = action.payload.user.role;
        },
        getCurrentUser(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.role = action.payload.role;
        },
        removeUser() {
            return {
                isAuthenticated: false,
                token: '',
                userId: '',
                name: '',
                email: '',
                avatar: '',
                role: ''
            }
        }
    }
})
export const { createUserLogin, getCurrentUser, removeUser } = userSlice.actions;

export default userSlice.reducer;