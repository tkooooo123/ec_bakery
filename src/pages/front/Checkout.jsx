import Stepper from '../../components/Stepper'
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MessageContext, handleErrorMessage } from '../../store/messageStore';
import CartApi from '../../apis/cart';
import OrderApi from '../../apis/order';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/FormElements';
import { AuthContext } from '../../store/AuthContext';
function Checkout() {
    const [stepper, setStepper] = useState(2);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState('');
    const [, dispatch] = useContext(MessageContext);
    const auth = useContext(AuthContext);
    const { userId } = auth.test
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });

    const getCart = async () => {
        try {
            const res = await CartApi.getCart()
            console.log('cart', res.data)
            setTotal(res.data.totalPrice)
            setCart(res.data.carts);


        } catch (error) {
            handleErrorMessage(dispatch, error)
            console.log(error);
        }
    }

    const onSubmit = async (data) => {
        try {
            console.log(data, total)
            const { name, phone, email, address } = data
            const formData = {
                name,
                phone,
                email,
                address,
                amount: total,
                shipping_status: 0,
                payment_status: 0,
                userId
            }
            console.log(formData)
            const res = await OrderApi.postOrder(formData);
            console.log(res.data)
            console.log(auth)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCart();
    }, [])
    return (
        <>
            <div className="container">
                <Stepper stepper={stepper}></Stepper>
                <div className="row">
                    <div className="col-8">
                        <div className="d-flex justify-content-between">
                            <h2 className="fw-bold">購物車清單</h2>
                        </div>
                        <div className="cartList overflow-hidden my-3">
                            <table className="table m-0">
                                <thead >
                                    <tr>
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
                                                    <div className="d-inline-block  align-middle ms-md-3">
                                                        <h5 className="fw-bold" >{item.cartProducts.name}</h5>
                                                        <p className="fs-8 text-muted">{item.cartProducts.Category.name}</p>
                                                        <span>NT${item.cartProducts.price}</span>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="item-quantity mt-3 ">
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
                    <div className="col-4">
                        <h3>購買資訊</h3>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
                            <div className="d-flex justify-content-between my-5">
                                <Link to="/cart" className="btn btn-outline-dark ">
                                    返回購物車
                                </Link>

                                <button type="submit" className="btn btn-primary w-50 ">送出訂單</button>
                            </div>



                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;