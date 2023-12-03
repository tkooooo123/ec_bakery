import { useState, useRef, useEffect, useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CheckboxRadio, Input, Textarea, Select } from "./FormElements";
import AdminApi from '../apis/admin';
import propTypes from 'prop-types';
import { MessageContext, handleErrorMessage, postSuccessMessage } from "../store/messageStore";
import Loading from "./Loading";

function ProductModal({ type, closeProductModal, initialProduct, getProducts, categories }) {

    const [product, setProduct] = useState({});
    const [state, setState] = useState(false);
    const fileRef = useRef(null);
    const imagesRef = useRef(null);
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

    const errorArr = Object.entries(errors); 
    const watchForm = useWatch({
        control,
        errors
    })
    


    //上傳主要圖片
    const uploadImg = () => {
        const file = fileRef.current.files[0]
        const imageURL = window.URL.createObjectURL(file);
        setProduct({ ...product, image: imageURL })

    }
    //上傳次要圖片
    const uploadImgs = async () => {
        setIsLoading(true);
        const files = imagesRef.current.files;
        const imgs = product?.imagesUrl ? [...product.imagesUrl] : []
        const formData = new FormData();
        // 將 FileList 轉成 Array
        Array.from(files)?.map((file) => {
            formData.append('imagesUrl', file);
            return window.URL.createObjectURL(file);
        });
        const res = await AdminApi.uploadImgs({
            formData
        })
        imgs.push(...res.data.imagesUrl)
        setProduct({ ...product, imagesUrl: [...imgs] });
        setIsLoading(false);
    }

    const imageRemove = (i) => {
        const arr = product.imagesUrl;
        arr.splice(i, 1);
        setProduct({
            ...product,
            imagesUrl: [...arr]
        })

    }
    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            for (let key in data) {
                if (key === 'image') {
                    formData.append(key, fileRef.current.files[0]);
                } else if (key === 'imagesUrl') {
                    const imgs = JSON.stringify(product.imagesUrl);
                    formData.append(key, imgs);

                } else {
                    formData.append(key, data[key]);
                }
            }
            let res
            if (type === 'edit') {
                res = await AdminApi.putProduct({
                    id: product.id,
                    formData
                })
            } else {
                res = await AdminApi.postProduct({
                    formData
                })
            }
            await getProducts();
            postSuccessMessage(dispatch, res.data)
            closeProductModal();
            handleRemove();
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            handleErrorMessage(dispatch, error);
        }
    }
    const handleRemove = () => {
        fileRef.current.value = '';
        imagesRef.current.value = '';
        setState(false);
       
    }
    //打開Modal，載入產品資訊

    useEffect(() => {
        setState(true);
        clearErrors();
        if (type === 'create') {
            const defaultData = {
                name: '',
                categoryId: 1,
                image: '',
                imagesUrl: [],
                quantity: 10,
                price: 50,
                description: '',
                content: '',
                is_enabled: true
            }
            setProduct({
                ...defaultData
            })
            for (let key in defaultData) {
                setValue(key, defaultData[key])
            }
        } else if(type ==='edit'){
            setProduct({ ...initialProduct });
            setValue('image', initialProduct.image);
            setValue('imagesUrl', initialProduct.imagesUrl);
            setValue('categoryId', initialProduct.categoryId)
            setValue('name', initialProduct.name);
            setValue('quantity', initialProduct.quantity);
            setValue('price', initialProduct.price);
            setValue('description', initialProduct.description);
            setValue('content', initialProduct.content);
            setValue('is_enabled', initialProduct.is_enabled)
        }


    }, [initialProduct, type, state])

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
            <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {type === 'create' ? '建立新商品' : `編輯 ${product.name}`}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => {
                                closeProductModal();
                                handleRemove();
                                setState(false);
                            }}></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className='modal-body'>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <div className='form-group mb-2'>
                                                <div className="text-center bg-light mb-2" style={{ height: '250px', width: '230px' }}>
                                                    {product.image !== '' && (
                                                        <img src={product.image} alt={product.name} style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
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
                                            <div className='row'>
                                                <div className='form-group mb-2 col-md-6'>
                                                    <Select
                                                        id='categoryId'
                                                        type='number'
                                                        errors={errors}
                                                        labelText='分類'
                                                        register={register}
                                                        placeholder='請輸入分類'
                                                        rules={{
                                                            required: '分類為必填'
                                                        }}
                                                    >
                                                        {categories.map((category) => {
                                                            return (
                                                                <option value={category.id} key={category.id}>{category.name}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </div>
                                                <div className='form-group mb-2 col-md-6'>
                                                    <Input
                                                        id='quantity'
                                                        type='number'
                                                        errors={errors}
                                                        labelText='數量'
                                                        register={register}
                                                        placeholder='請輸入數量'
                                                        rules={{
                                                            required: '數量為必填'
                                                        }}
                                                    >
                                                    </Input>
                                                </div>

                                            </div>
                                            <div className='row'>

                                                <div className='form-group mb-2 col-md-6'>
                                                    <Input
                                                        id='price'
                                                        type='number'
                                                        errors={errors}
                                                        labelText='售價'
                                                        register={register}
                                                        placeholder='請輸入售價'
                                                        rules={{
                                                            required: '售價為必填'
                                                        }}
                                                    >
                                                    </Input>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='form-group mb-2'>
                                                <Textarea
                                                    id='description'
                                                    type='text'
                                                    errors={errors}
                                                    labelText='產品描述'
                                                    register={register}
                                                    placeholder='請輸入產品描述'
                                                    rules={{
                                                        required: '產品描述為必填',
                                                    }}
                                                >
                                                </Textarea>
                                            </div>

                                            <div className='form-group mb-2'>
                                                <Textarea
                                                    id='content'
                                                    type='text'
                                                    errors={errors}
                                                    labelText='產品內容'
                                                    register={register}
                                                    placeholder='請輸入產品內容'
                                                    rules={{
                                                        required: '產品內容為必填',
                                                    }}
                                                >
                                                </Textarea>
                                            </div>
                                            <div className='form-group mb-2'>
                                                <div className='form-check'>
                                                    <CheckboxRadio
                                                        id="is_enabled"
                                                        type="checkbox"
                                                        name="is_enabled"
                                                        register={register}
                                                        errors={errors}
                                                        labelText="是否啟用"
                                                    >
                                                    </CheckboxRadio>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <label className='w-100' htmlFor='customFile'>
                                            <button type="button" className="btn btn-outline-primary d-flex align-items-center"
                                                onClick={() => imagesRef.current.click()} ><i className="bi bi-cloud-arrow-up fs-4 me-1"></i>上傳其他圖片</button>
                                            <input
                                                type='file'
                                                id='customFile'
                                                className='form-control d-none'
                                                name="imagesUrl"
                                                ref={imagesRef}
                                                onChange={uploadImgs}
                                                multiple
                                            />
                                        </label>
                                        <div className="d-flex" style={{ flexFlow: 'row wrap' }}>
                                            {product?.imagesUrl?.map((item, i) => {
                                                return (
                                                    <div className="d-flex align-items-center mt-3 mx-1" key={i}>
                                                        <div className="position-relative m-auto">
                                                            <img style={{ height: '135px', width: '135px', objectFit: 'cover' }} src={item} alt="商品圖片" />
                                                            <button type="button" className="btn btn-dark fw-bold rounded-circle position-absolute d-flex align-items-center justify-content-center" style={{ top: '0', right: '0', height: '2rem', width: '2rem' }}
                                                                onClick={() => imageRemove(i)}
                                                            ><span className="material-icons">
                                                                    close
                                                                </span></button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark"
                                    onClick={() => {
                                        closeProductModal();
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

export default ProductModal;

ProductModal.propTypes = {
    type: propTypes.string,
    initialProduct: propTypes.object,
    closeProductModal: propTypes.func.isRequired,
    getProducts: propTypes.func.isRequired,
    categories: propTypes.array.isRequired,
    productModal:propTypes.object

}