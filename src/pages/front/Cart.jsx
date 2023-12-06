import { useEffect, useRef, useState } from 'react';
import CartApi from '../../apis/cart';
import { useContext, } from 'react';
import { MessageContext, postSuccessMessage, toastErrorMessage } from "../../store/messageStore";
import Stepper from '../../components/Stepper'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
import Loading from '../../components/Loading';
import DeleteModal from "../../components/DeleteModal"
import { Modal } from "bootstrap";

function Cart() {
    const [stepper, setStepper] = useState(1);
    const [, dispatch] = useContext(MessageContext);
    const auth = useContext(AuthContext);
    const { token } = auth.user;
    const { cartData, getCart } = useOutletContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [itemId, setItemId] =useState('');
    const deleteModal = useRef(null);
    

    const deleteCart = async () => {
        try {
            setIsLoading(true);
            const res = await CartApi.deleteCart({
                id: Number(cartData.carts[0].id)
            })
            postSuccessMessage(dispatch, res.data)
            await getCart();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toastErrorMessage(dispatch, error);
        }
    }

    const deleteCartItem = async () => {
        try {
            setIsLoading(true);
            const res = await CartApi.deleteCartItem({
                id: itemId
            })
            await getCart();

            setIsLoading(false);
            postSuccessMessage(dispatch, res.data);
        } catch (error) {
            setIsLoading(false);
            toastErrorMessage(dispatch, error);
        }
    }
    const updateCartItem = async (id, quantity) => {
        try {
            setIsLoading(true);
            await CartApi.updateCartItem({
                id: Number(id),
                quantity: Number(quantity)
            });

            await getCart();
            setIsLoading(false);
        } catch (error) {
            toastErrorMessage(dispatch, error);
            setIsLoading(false);
        }

    }
    const openDeleteModal = (title, text, id) => {
        deleteModal.current.show();
        setTitle(title);
        setText(text);
        setItemId(id);
    }
    const closeDeleteModal = () => {
        deleteModal.current.hide();
    }
    const handleDelete = () => {
        if(title ==='購物車') {
            deleteCart()
        } else {
            deleteCartItem()
        }
        closeDeleteModal();
    }
    useEffect(() => {
        if (!token) {
            navigate('/login');
            toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！'});
        } else {
            (async function refreshView() {
                await getCart();
                setIsLoading(false);
            }())
        }
        deleteModal.current = new Modal('#deleteModal', {
            backdrop: 'static'
        });
        
    }, []);
  

    return (
        <>
        <Loading isLoading={isLoading}/>
        <DeleteModal close={closeDeleteModal} handleDelete={handleDelete} text={text} title={title} />
            <div className="container" style={{minHeight: 'calc(100vh - 200px)'}}>
                <p className="text-end mt-3"><Link className="text-black" to="/">首頁</Link> / 購物車</p>
                <Stepper stepper={stepper}></Stepper>
                {!cartData?.carts?.length && (
                    <div className="cart-alert text-center pt-5 mt-5" style={{ flexGrow: '1' }}>
                       
                        <h2 className="fw-bold mt-3 text-primary">您的購物車沒有商品！</h2>
                        
                        <Link to="/products" className="fw-bold btn btn-outline-dark my-3 px-3 py-2">
                            前往購物
                        </Link>
                    </div>
                )}
                {!!cartData?.carts?.length && (
                    <div className="row">
                    <div className="col-md-8 col-12">

                        <div className="d-flex justify-content-between">
                            <h2 className="fw-bold">購物車清單</h2>
                            <button type="button" className="btn btn-primary fw-bold"
                                onClick={() => openDeleteModal('購物車', '購物車所有商品？')}
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
                                    {cartData.carts?.map((item) => {
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
                                                                onChange={(e) => updateCartItem(item.cartProducts.CartItem.id, e.target.value)}
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
                                                        onClick={() => openDeleteModal('購物車商品',`名稱為「${item.cartProducts.name}」之商品？`,item.cartProducts.CartItem.id)}
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
                    <div className="col-md-4 col-12">
                        <h3>訂單摘要</h3>
                        <div className="text-end border-bottom mt-3">

                            <hr />
                            <div className="mb-4">
                                小計： NT$ {cartData.totalPrice}
                            </div>
                            <div className="mb-4">
                                運費： NT$ {cartData.totalPrice > 1000 ? '免運' : 'NT$ 80'}
                            </div>
                            <div className="mb-4 fw-bold">
                                總計： NT$ {cartData.totalPrice + (cartData.totalPrice > 1000 ? 0 : 80)}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between my-5">
                            <Link to="/products" className="btn btn-outline-dark mb-2 fw-bold">
                                繼續購物
                            </Link>
                            <Link to="/checkout" className="btn btn-primary mb-2 fw-bold"
                                onClick={() => setStepper(2)}
                            >
                                確認結帳
                            </Link>

                        </div>

                    </div>
                </div>
                )}
                
            </div>
        </>
    )
}

export default Cart;