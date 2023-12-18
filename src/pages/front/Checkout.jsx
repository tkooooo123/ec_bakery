import Stepper from '../../components/Stepper'
import { useEffect, useState, useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { MessageContext, handleErrorMessage, toastErrorMessage } from '../../store/messageStore';
import CartApi from '../../apis/cart';
import OrderApi from '../../apis/order';
import { useForm, useWatch } from 'react-hook-form';
import { Input, Textarea } from '../../components/FormElements';
import { AuthContext } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
function Checkout() {
    const [stepper] = useState(2);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState('');
    const [, dispatch] = useContext(MessageContext);
    const auth = useContext(AuthContext);
    const { userId, token } = auth.user
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsdisabled] = useState(true);
    const [isErrored, setIsErrored] = useState(false);
    const { getCart } = useOutletContext();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });

    const errorArr = Object.entries(errors);
    const watchForm = useWatch({
        control,
        errors
    });


    const fetchCart = async () => {
        try {
            setIsLoading(true);
            const res = await CartApi.getCart();
            setTotal(res.data.totalPrice);
            setCart(res.data.carts);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const { name, phone, email, address, message } = data
            const formData = {
                name,
                phone,
                email,
                address,
                message,
                amount: total,
                shipping_status: 0,
                payment_status: 0,
                userId
            };
            const res = await OrderApi.postOrder(formData);
            await getCart();
            navigate(`/success/${res.data.order.id}`);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    };


    useEffect(() => {
        if(!token) {
            navigate('/login');
            toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！'})
        } else {
            fetchCart();
        }
    }, []);

    useEffect(() => {
        const arr = Object.values(watchForm).map((item) => {
            return item?.typeof === String ? item.trim() : item
        })
        if (arr.length > 0 && !arr.includes('')) {
            setIsdisabled(false)
        }
        if (errorArr.length > 0) {
            setIsErrored(true);
        } else {
            setIsErrored(false);
        }
    }, [watchForm, errorArr]);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className="container pt-66">
                <p className="text-end mt-3"><Link className="text-black" to="/">首頁</Link> / 填寫資料</p>
                <Stepper stepper={stepper}></Stepper>
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between">
                            <h2 className="fw-bold">購物車清單</h2>
                        </div>
                        <div className="cartList overflow-hidden my-3">
                            <table className="table m-0">
                                <thead >
                                    <tr>
                                        <th scope="col" className="py-3">圖片</th>
                                        <th scope="col" className="py-3">名稱</th>
                                        <th scope="col" className="py-3">數量</th>
                                        <th scope="col" className="py-3">金額</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.map((item) => {
                                        return (

                                            <tr key={item.cartProducts.id}>
                                                <td className="py-2" >
                                                    <img src={item.cartProducts.image} alt="商品圖片" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                </td>
                                                <td>
                                                    <div className="d-inline-block  align-middle ">
                                                        <h5 className="fw-bold" >{item.cartProducts.name}</h5>
                                                        <p className="fs-8 text-muted">{item.cartProducts.Category.name}</p>
                                                        <span>NT${item.cartProducts.price}</span>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="item-quantity">
                                                        {item.cartProducts.CartItem.quantity}
                                                    </div></td>
                                                <td className="align-middle">
                                                    <strong>NT$ {item.cartProducts.price * item.cartProducts.CartItem.quantity}</strong>

                                                </td>


                                            </tr>


                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="fw-bold">購買資訊</h3>
                        <form className=" border border-2 border-primary rounded-3 p-3 mb-5" action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-2'>
                                <Input
                                    id='name'
                                    type='name'
                                    errors={errors}
                                    labelText='姓名'
                                    register={register}
                                    placeholder={'請輸入您的姓名'}
                                    rules={{
                                        required: '姓名為必填',

                                    }}
                                >
                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Input
                                    id='phone'
                                    type='number'
                                    errors={errors}
                                    labelText='電話'
                                    register={register}
                                    placeholder={'請輸入您的電話號碼'}
                                    rules={{
                                        required: '電話為必填',
                                        minLength: {
                                            value: 7,
                                            message: '電話號碼長度不少於7碼'
                                        },

                                    }}
                                >
                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Input
                                    id='email'
                                    type='email'
                                    errors={errors}
                                    labelText='Email'
                                    register={register}
                                    placeholder={'e.g. example@gmail.com'}
                                    rules={{
                                        required: 'Email 為必填',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Email 格式不正確'
                                        },
                                    }}
                                >
                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Input
                                    id='address'
                                    type='address'
                                    errors={errors}
                                    labelText='地址'
                                    register={register}
                                    placeholder={'請輸入您的地址'}
                                    rules={{
                                        required: '地址為必填',

                                    }}
                                >
                                </Input>
                            </div>
                            <div className="mb-2">
                                <Textarea
                                    id='message'
                                    type='message'
                                    errors={errors}
                                    labelText='留言'
                                    register={register}
                                    placeholder={'請輸入留言'}
                                    rules={{
                                        required: '留言為必填',

                                    }}
                                >
                                </Textarea>
                            </div>
                            <div className="d-flex justify-content-between my-5">
                                <Link to="/cart" className="btn btn-outline-dark fw-bold">
                                    返回購物車
                                </Link>

                                <button type="submit" className={` btn btn-primary fw-bold form-submit-btn ${(isDisabled || isErrored) ? 'disable' : ''}`}>送出訂單</button>
                            </div>



                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;