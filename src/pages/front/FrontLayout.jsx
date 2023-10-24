import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useContext, useReducer } from 'react';

import Message from "../../components/Message";
import { MessageContext, MessageReducer, initState } from "../../store/messageStore";



function FrontLayout() {

    const reducer = useReducer(MessageReducer, initState);
    
    return (
        <>
            <MessageContext.Provider value={reducer} >
                <Message />
                <Header></Header>
                <Outlet />
                <Footer></Footer>
            </MessageContext.Provider>
        </>
    )
}

export default FrontLayout;