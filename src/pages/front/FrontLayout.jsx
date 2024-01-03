import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState, useContext } from 'react';
import CartApi from '../../apis/cart';
import Message from "../../components/Message";
import { MessageContext, handleErrorMessage  } from "../../store/messageStore";
import { AuthContext } from '../../store/AuthContext';
import GoTopButton from '../../components/GoTopButton';

function FrontLayout() {
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
                <GoTopButton></GoTopButton>
           
        </>
    )
}

export default FrontLayout;