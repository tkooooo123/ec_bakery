import { createContext } from "react";

export const MessageContext = createContext({});

export const initState = {  
    title: '',
    text: '',
    icon: ''
}

export const MessageReducer = (state, action) => {
    switch (action.type) {
        case "POST_MESSAGE":
            return {
                ...action.payload
            }
        case "CLEAR_MESSAGE":
            return {
                ...initState,
            }
        case "Error_MESSAGE":
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export function handleSuccessMessage(dispatch, data) {
    console.log('text', data)
    dispatch({
        type: 'POST_MESSAGE',
        payload: {
            title: data.message,
            text: "",
            icon: 'success'
        }
        
    });
    setTimeout(() => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    }, 3000) 
}

export function handleErrorMessage(dispatch, res) {
    console.log('text', res)
    dispatch({
        type: 'Error_MESSAGE',
        payload: {
            title: res.response.data.message,
            text: "",
            icon: 'error'
        }
        
    });
    setTimeout(() => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    }, 3000) 
}