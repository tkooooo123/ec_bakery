import { createContext } from "react";

export const MessageContext = createContext({});

export const initState = {  
    title: '',
    text: '',
    type: '',
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
    }, 0) 
}

export function handleErrorMessage(dispatch, res) {
   if (res.code === "ERR_NETWORK") {
    dispatch({
        type: 'Error_MESSAGE',
        payload: {
            title: "網路連線錯誤" ,
            text: "請稍後再試！",
            icon: 'error'
        }   
    });
   } else if(res.response.data.message) {
    dispatch({
        type: 'Error_MESSAGE',

        payload: {
            title: res.response.data.status ,
            text: res.response.data.message,
            icon: 'error'
        }
       
    });
    
   } else {
    dispatch({
        type: 'Error_MESSAGE',
        payload: {
            title:  res.response.status ,
            text: res.message,
            icon: 'error'
        }
    });
   } 
    setTimeout(() => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    }, 0) 
}


export function postSuccessMessage(dispatch, data) {
    dispatch({
        type: 'POST_MESSAGE',
        payload: {
            title: data.message,
            text: "",
            type: 'small',
            icon: 'success'
        }
    });
    setTimeout(() => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    }, 0) 
}

export function toastErrorMessage(dispatch, data) {
    dispatch({
        type: 'POST_MESSAGE',
        payload: {
            title: data.message,
            text: "",
            type: 'small',
            icon: 'error'
        }
    });
    setTimeout(() => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    }, 0) 
}

export function authErrorMessage(dispatch) {
    dispatch({
        type: 'POST_MESSAGE',
        payload: {
            title: '請先登入!',
            text: "",
            type: 'small',
            icon: 'error'
        }
    });
    setTimeout(() => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    }, 0) 
}