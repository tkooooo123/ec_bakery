import { Input } from '../../components/FormElements';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthorizationApi from '../../apis/authorization';
import { useContext, useEffect, } from 'react';
import { AuthContext } from '../../store/AuthContext';

import { MessageContext, handleErrorMessage } from "../../store/messageStore";
function Login() {

    const [, dispatch] = useContext(MessageContext);
    const { token } = useContext(AuthContext).user
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });
    const navigate = useNavigate();

    const loginSubmit = async (data) => {
        try {
            const res = await AuthorizationApi.signIn(data);
            if (res.status === 200) {
                //儲存token
                localStorage.setItem("token", res.data.token);
                if (res.data.user.role === 'admin') {
                    navigate('/admin/home');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            handleErrorMessage(dispatch, error);
        }
    }
    useEffect(() => {
        if(token) {
            navigate('/')
        }
    })
    return (
        <>
            <div className="container pt-66 mh">
                <div className="row my-5">
                    <div className="col-md-6 col-sm-7 mx-auto">
                        <h1 className="fw-bold  text-center" >登入</h1>
                        <form action="" onSubmit={handleSubmit(loginSubmit)}>
                            <div className='mb-2'>
                                <Input
                                    id='email'
                                    type='email'
                                    errors={errors}
                                    labelText='帳號'
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
                                    id='password'
                                    type='password'
                                    errors={errors}
                                    labelText='密碼'
                                    register={register}
                                    placeholder={'請輸入密碼'}
                                    rules={{
                                        required: '密碼為必填',
                                        minLength: {
                                            value: 7,
                                            message: '密碼長度不少於7碼'
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: '密碼長度不超過12碼'
                                        },
                                    }}
                                >
                                </Input>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3 mb-1 fw-bold">登入</button>
                        </form>
                        <Link to="/register" className="fw-bold text-black nav-link">前往註冊</Link>
                    </div>
                </div>
            </div>



        </>
    )
}
export default Login;