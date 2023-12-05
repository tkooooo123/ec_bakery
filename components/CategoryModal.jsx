import propTypes from 'prop-types';
import { useRef, useState, useEffect, useContext } from 'react';
import { useForm, useWatch } from "react-hook-form";
import { Input } from "./FormElements";
import AdminApi from '../apis/admin';
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../store/messageStore";
import Loading from './Loading';


function CategoryModal({ type, initialCategory, closeCategoryModal, getCategories }) {

    const [state, setState] = useState(false);
    const [category, setCategory] = useState({});
    const fileRef = useRef();
    const [, dispatch] = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsdisabled] = useState(true);
    const [isErrored, setIsErrored] = useState(false);

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
                setCategory({ ...category, image: res.data.imageUrl })
                setValue('image', res.data.imageUrl)

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
            let res;
            if (type === 'edit') {
                res = await AdminApi.updateCategory({
                    id: category.id,
                    data
                })
            } else {
                res = await AdminApi.createCategory({
                    data
                })
            }
            postSuccessMessage(dispatch, res.data);
            await getCategories();
            closeCategoryModal();
            handleRemove();
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
        clearErrors();
        if (type === 'create') {
            const defaultData = {
                name: '',
                image: ''
            }

            setCategory({ ...defaultData });
            for (let key in defaultData) {
                setValue(key, defaultData[key])
            }
        } else if (type === 'edit') {
            setCategory({ ...initialCategory });
            setValue('name', initialCategory.name);
            setValue('image', initialCategory.image)
        }
    }, [initialCategory, type, state]);

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
            <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {type === 'create' ? '建立新商品' : `編輯 ${category.name}`}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => {
                                closeCategoryModal();
                                //handleRemove();
                                //setState(false);

                            }}></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className='modal-body'>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <div className='form-group mb-2'>
                                                <div className="text-center bg-light mb-2" style={{ height: '250px', width: '230px' }}>
                                                    {category.image !== '' && (
                                                        <img src={category.image} alt="商品圖片" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
                                                    )}
                                                </div>

                                            </div>
                                            <div className='form-group mb-2'>
                                                <label className='w-100' htmlFor='customFile'>
                                                    上傳圖片
                                                    <input
                                                        type='file'
                                                        id='customFile'
                                                        className='form-control'
                                                        ref={fileRef}
                                                        onChange={uploadImg}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-lg-8'>
                                            <div className='form-group mb-2'>
                                                <Input
                                                    id='name'
                                                    type='text'
                                                    errors={errors}
                                                    labelText='標題'
                                                    register={register}
                                                    placeholder='請輸入標題'
                                                    rules={{
                                                        required: '標題為必填',
                                                    }}
                                                >
                                                </Input>
                                            </div>

                                            <div className='form-group mb-2'>
                                                <Input
                                                    id='image'
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
                                    </div>
                                    <hr />

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark"
                                    onClick={() => {
                                        closeCategoryModal();
                                        handleRemove();
                                        setState(false);
                                    }}>關閉</button>
                                <button type="submit" className={`form-submit-btn btn btn-primary ${(isDisabled || isErrored) ? 'disable' : ''}`}>儲存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryModal;

CategoryModal.propTypes = {
    type: propTypes.string.isRequired,
    closeCategoryModal: propTypes.func.isRequired,
    initialCategory: propTypes.object,
    getCategories: propTypes.func.isRequired,
}