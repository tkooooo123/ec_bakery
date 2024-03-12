import { Input } from '../../components/FormElements';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthorizationApi from '../../apis/authorization';
import { useContext } from 'react';
import { MessageContext, handleErrorMessage, postSuccessMessage } from '../../store/messageStore';

function Register() {
    const [, dispatch] = useContext(MessageContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });
    const navigate = useNavigate();

    const registerSubmit = async (data) => {
        try {
            const res = await AuthorizationApi.signUp(data);
            postSuccessMessage(dispatch, res.data)
            navigate('/login');

        } catch (error) {
            handleErrorMessage(dispatch, error)
            console.log(error)
        }
    }
    return (
        <>
            <div className="container pt-66 register">

                <div className="row">
                    <div className="col-md-6 col-sm-7 mx-auto my-5">
                        <h1 className="fw-bold text-center">
                            註冊
                        </h1>
                        <form action="" onSubmit={handleSubmit(registerSubmit)}>
                            <div className='mb-2'>
                                <Input
                                    id='name'
                                    type='text'
                                    errors={errors}
                                    labelText='姓名'
                                    register={register}
                                    placeholder={'請輸入姓名'}
                                    rules={{
                                        required: '姓名為必填',
                                        maxLength: {
                                            value: 20,
                                            message: '姓名長度不超過20'
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
                            <div className='mb-2'>
                                <Input
                                    id='confirmPassword'
                                    type='password'
                                    errors={errors}
                                    labelText='確認密碼'
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
                                        validate: (value) =>
                                        value === watch("password") || "與密碼不相同"
                                    }}
                                >
                                </Input>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3 mb-1 fw-bold ">註冊</button>
                            
                        </form>
                        <Link to="/login" className="fw-bold">已經有帳號了？前往登入</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;