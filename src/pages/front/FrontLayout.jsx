import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState, useContext, memo } from 'react';
import CartApi from '../../apis/cart';
import AuthorizationApi from '../../apis/authorization';
import Message from "../../components/Message";
import { MessageContext, handleErrorMessage, toastErrorMessage } from "../../store/messageStore";
import GoTopButton from '../../components/GoTopButton';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../slice/userSlice';

const FrontLayout = memo(function FrontLayout() {
    const [cartData, setCartData] = useState({});
    const authToken = localStorage.getItem('token');
    const [, dispatch] = useContext(MessageContext);
    const currentUser = useSelector(state => state.user);
    const { isAuthenticated } = currentUser;
    const userDispatch = useDispatch();
    const navigate = useNavigate();

    const getCart = async () => {
        try {
            if (!isAuthenticated) {
                setCartData({});
                return
            }
            const res = await CartApi.getCart();
            setCartData(res.data);
        } catch (error) {
            handleErrorMessage(dispatch, error)

        }
    }
    const checkTokenIsValid = async () => {
        try {
            if(!authToken) {
                navigate('/login');
                toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！' });
            } else {
                const res = await AuthorizationApi.getCurrentUser(authToken);
                userDispatch(getCurrentUser({ ...res.data.currentUser, token: authToken }))
            }
           
        } catch (error) {
            if (error.response.status === 401) {
                toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！' });
                navigate('/login');
            } else {
                handleErrorMessage(dispatch, error);
            }
        }
    }
    useEffect(() => {
        if(!isAuthenticated) {
            (async function chechUserState() {
                if(authToken) {
                    await checkTokenIsValid();
                }
            }())
        }
         getCart();
    }, [isAuthenticated])

    return (
        <>

            <Message />
            <Header cartData={cartData}></Header>
            <Outlet context={{ cartData, getCart, checkTokenIsValid }} />
            <Footer></Footer>
            <GoTopButton></GoTopButton>

        </>
    )
})

export default FrontLayout;