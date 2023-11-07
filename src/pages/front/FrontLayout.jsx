import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useReducer, useState, useContext } from 'react';
import CartApi from '../../apis/cart';
import Message from "../../components/Message";
import { MessageContext, MessageReducer, handleErrorMessage, handleSuccessMessage, initState } from "../../store/messageStore";
import { AuthContext } from '../../store/AuthContext';



function FrontLayout() {
    const reducer = useReducer(MessageReducer, initState);
    const [cartData, setCartData] = useState({});
    const auth = useContext(AuthContext);
    const { isAuthenticated } = auth.user;
    const [, dispatch] = useContext(MessageContext);
    const getCart = async () => {
        try {
            if(!isAuthenticated) {
                setCartData({});
                return
            }
            const res = await CartApi.getCart();
            setCartData(res.data); 

        } catch (error) {
         handleErrorMessage(dispatch, error)
         console.log('error')
            console.log(error);
        }
    }
    useEffect(() => {
        getCart();
    }, [isAuthenticated])
    
    return (
        <>
            
                <Message />
                <Header cartData={cartData}></Header>
                <Outlet context={{cartData, getCart}}/>
                <Footer></Footer>
           
        </>
    )
}

export default FrontLayout;