import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useReducer, useState, useContext } from 'react';
import CartApi from '../../apis/cart';
import Message from "../../components/Message";
import { MessageContext, MessageReducer, initState } from "../../store/messageStore";
import { AuthContext } from '../../store/AuthContext';



function FrontLayout() {
    const reducer = useReducer(MessageReducer, initState);
    const [cartData, setCartData] = useState({});
    const auth = useContext(AuthContext);
    const { isAuthenticated } = auth.user;
    const getCart = async () => {
        try {
            if(!isAuthenticated) {
                setCartData({});
                return
            }
            const res = await CartApi.getCart();
            
            console.log('cart', res.data.carts)
            setCartData(res.data.carts)
            

        } catch (error) {
         
            console.log(error);
        }
    }
    useEffect(() => {
        getCart();
    }, [isAuthenticated])
    
    return (
        <>
            <MessageContext.Provider value={reducer} >
                <Message />
                <Header cartData={cartData}></Header>
                <Outlet context={{cartData, getCart}}/>
                <Footer></Footer>
            </MessageContext.Provider>
        </>
    )
}

export default FrontLayout;