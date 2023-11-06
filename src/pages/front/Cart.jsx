import { useEffect, useState } from 'react';
import CartApi from '../../apis/cart';
import { useContext, } from 'react';
import { MessageContext, handleErrorMessage } from "../../store/messageStore";
import Stepper from '../../components/Stepper'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';

function Cart() {
    const [total, setTotal] = useState('');
    const [cart, setCart] = useState([]);
    const [stepper, setStepper] = useState(1);
    const [, dispatch] = useContext(MessageContext);
    const auth  = useContext(AuthContext);
    const { token } = auth.user
  
 
    const navigate = useNavigate();


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

    const deleteCart = async (id) => {
        try {
            console.log(id)
            const res = await CartApi.deleteCart({
                id: Number(id)
            })
            console.log(res);
            await getCart();
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCartItem = async (id) => {
        try {

            const res = await CartApi.deleteCartItem({
                id
            })
            await getCart();
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updateCartItem = async (id,quantity) => {
        try {
            const res =  await CartApi.updateCartItem({
                id: Number(id),
                quantity: Number(quantity)
            });
            await getCart();
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {  
     if(!token) {
        navigate('/login')
     } else {
        getCart();
     }    
    }, []);
  
    return (
        <>
            <div className="container">
                <Stepper stepper={stepper}></Stepper>
                <div className="row">
                    <div className="col-8">
                        <div className="d-flex justify-content-between">
                            <h2 className="fw-bold">購物車清單</h2>
                            <button type="button" className="btn btn-outline-primary"
                            onClick={() => deleteCart(cart[0].id)}
                            >全部刪除</button>
                        </div>
                        <div className="cartList overflow-hidden my-3">
                            <table className="table m-0">
                                <thead >
                                    <tr>
                                        <th scope="col" className="py-3">名稱</th>
                                        <th scope="col" className="py-3">數量</th>
                                        <th scope="col" className="py-3">金額</th>
                                        <th scope="col" className="py-3 ">刪除</th>

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
                                                        <div className="input-group align-items-center" style={{ width: '80px' }}>
                                                            <select className="form-select" id=""
                                                                value={item.cartProducts.CartItem.quantity}
                                                                onChange={(e) => updateCartItem( item.cartProducts.CartItem.id, e.target.value)}
                                                            >
                                                                {
                                                                    [...(new Array(item.cartProducts.quantity))].map((i, num) => {
                                                                        return (
                                                                            <option value={num + 1} key={num}>{num + 1}</option>

                                                                        )

                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div></td>
                                                <td className="align-middle">
                                                    <strong>NT$ {item.cartProducts.price * item.cartProducts.CartItem.quantity}</strong>

                                                </td>
                                                <td className="align-middle  p-0">
                                                    <button type="button" className="btn btn-outline-dark border-0"
                                                        onClick={() => deleteCartItem(item.cartProducts.CartItem.id)}
                                                    ><span className="material-icons">
                                                            delete
                                                        </span></button></td>

                                            </tr>


                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-4">
                        <h3>優惠碼</h3>
                        <div className="text-end border-bottom mt-3">

                            <hr />
                            <div className="mb-4">
                                小計： NT$ {total}
                            </div>
                            <div className="mb-4">
                                折扣： NT$
                            </div>
                            <div className="mb-4 fw-bold">
                                總計： NT$
                            </div>
                        </div>
                        <div className="d-flex justify-content-between my-5">
                            <Link to="/products" className="btn btn-outline-dark mb-2">
                                繼續購物
                            </Link>
                            <Link to="/checkout" className="btn btn-primary mb-2"
                            onClick={() => setStepper(2)}
                            >
                                確認結帳
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;