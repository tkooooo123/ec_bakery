import propTypes from 'prop-types';
import { useRef, useState, useEffect, useContext } from 'react';
import { useForm, useWatch } from "react-hook-form";
import { Input } from "./FormElements";
import AuthorizationApi from '../apis/authorization';
import AdminApi from '../apis/admin';
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../store/messageStore";
import Loading from './Loading';
import { AuthContext } from '../store/AuthContext';


function EditUserModal({ closeUserModal }) {
    const [state, setState] = useState(false);
    const fileRef = useRef();
    const [avatar, setAvatar] = useState('');
    const [, dispatch] = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsdisabled] = useState(true);
    const [isErrored, setIsErrored] = useState(false);
    const { userData } = useContext(AuthContext).user;
    const { checkTokenIsValid } = useContext(AuthContext);
   

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        control,
        formState: { errors }
    } = useForm({
        mode: 'all',
    });

    const errorArr = Object.entries(errors)
    const watchForm = useWatch({
        control,
        errors
    })

    const uploadImg = async () => {
        try {
            setIsLoading(true);
            const file = fileRef.current.files[0]
            const formData = new FormData();
            formData.append('image', file);
            const res = await AdminApi.uploadImg({
                formData
            })
            if (res.status === 200) {
                setAvatar(res.data.imageUrl)
                setValue('avatar', res.data.imageUrl)
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const res = await AuthorizationApi.editProfile({
                id: userData.id,
                formData: data
            })
            postSuccessMessage(dispatch, res.data);
            closeUserModal();
            handleRemove();
            checkTokenIsValid();
            setIsLoading(false); 
        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error)
        }
    }

    const handleRemove = () => {
        fileRef.current.value = '';
        setState(false);
    }

    useEffect(() => {
        setState(true);
        setValue('name', userData.name ? userData.name : '');
        setValue('email', userData.email ? userData.email : '');
        setValue('avatar', userData.avatar ? userData.avatar : '');
        setValue('password', '');
        setValue('confirmPassword', '');
        setAvatar(userData.avatar)
        clearErrors();
    }, [userData, state]);

    useEffect(() => {

        setIsdisabled(true)
        const arr = Object.values(watchForm).map((item) => {
            return item.typeof === String ? item.trim() : item
        })
        if (arr.length > 0 && !arr.includes('')) {
            setIsdisabled(false)
        }
        if (errorArr.length > 0) {
            setIsErrored(true)
        } else {
            setIsErrored(false)
        }
    }, [watchForm, errorArr]);


    return (
        <>
            <Loading isLoading={isLoading} />

            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                編輯個人資料
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => {
                                closeUserModal();
                                handleRemove();
                                setState(false);

                            }}></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className='modal-body'>
                                    <div className='row'>
                                        <div className='col-lg-5'>
                                            <div className='form-group mb-2'>
                                                <div className="text-center bg-light mb-2" style={{ height: '250px', width: '230px' }}>
                                                    {avatar !== '' && (
                                                        <img src={avatar} alt="個人頭像" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
                                                    )}
                                                </div>

                                            </div>
                                            <div className='form-group mb-2'>
                                                <label className='w-100' htmlFor='customFile'>
                                                    上傳頭像圖片
                                                    <input
                                                        type='file'
                                                        id='customFile'
                                                        className='form-control'
                                                        ref={fileRef}
                                                        onChange={uploadImg}
                                                    />
                                                </label>
                                            </div>
                                            <div className='form-group mb-2'>
                                                <Input
                                                    id='avatar'
                                                    type='text'
                                                    errors={errors}
                                                    labelText='圖片網址'
                                                    register={register}
                                                    placeholder='請輸入圖片網址'
                                                    rules={{
                                                        required: '圖片網址為必填',
                                                    }}
                                                >
                                                </Input>
                                            </div>
                                        </div>
                                        <div className='col-lg-7'>
                                            <div className='form-group mb-2'>
                                                <Input
                                                    id='name'
                                                    type='text'
                                                    errors={errors}
                                                    labelText='姓名'
                                                    register={register}
                                                    placeholder='請輸入姓名'
                                                    rules={{
                                                        required: '姓名為必填',
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
                                                    }}
                                                >
                                                </Input>
                                            </div>



                                        </div>
                                    </div>
                                    <hr />

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary fw-bold"
                                    onClick={() => {
                                        closeUserModal();
                                        handleRemove();
                                        setState(false);
                                    }}>關閉</button>
                                <button type="submit" className={`form-submit-btn btn btn-primary fw-bold ${(isDisabled || isErrored) ? 'disable' : ''}`}>儲存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUserModal;

EditUserModal.propTypes = {
    closeUserModal: propTypes.func.isRequired,
}

