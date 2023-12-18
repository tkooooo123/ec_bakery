import { useForm, useWatch } from 'react-hook-form';
import { Input, Textarea } from '../../components/FormElements';
import { useContext, useEffect, useState } from 'react';
import { MessageContext, postSuccessMessage } from '../../store/messageStore';
function ContactUs() {
    const [isDisabled, setIsdisabled] = useState(true);
    const [isErrored, setIsErrored] = useState(false);
    const [, dispatch] = useContext(MessageContext);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });

    const errorArr = Object.entries(errors);
    const watchForm = useWatch({
        control,
        errors
    });

    const onSubmit = () => {
        postSuccessMessage(dispatch, {
            message: '送出成功！'
        })
    }
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
       
            <div className="pt-66">
                <div className="contact-us position-relative">
                    <img src="https://plos.org/wp-content/uploads/2020/05/Person-writing-by-laptop_Pixabay_CC0-e1512515354936.jpg" alt="contact-us" />
                    <h1 className="contact-us-title fw-bold position-absolute text-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>聯絡我們</h1>
                </div>
                <div className="container">


                    <div className="row my-5">
                        <div className="col-md-6 col-12 mx-auto">
                            <form className="bg-white border border-2 border-primary rounded-3 p-3" action="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-2">
                                    <Input
                                        id='title'
                                        type='title'
                                        errors={errors}
                                        labelText='主旨'
                                        register={register}
                                        placeholder={'請輸入主旨'}
                                        rules={{
                                            required: '主旨為必填',

                                        }}
                                    >
                                    </Input>
                                </div>
                                <div className="mb-2">
                                    <Textarea
                                        id='content'
                                        type='content'
                                        errors={errors}
                                        labelText='內容'
                                        register={register}
                                        placeholder={'請輸入內容'}
                                        rules={{
                                            required: '內容為必填',

                                        }}
                                    >
                                    </Textarea>
                                </div>
                                <div className="mb-2">
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
                                        placeholder={'0900123456'}
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
                                        placeholder={'example@gmail.com'}
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
                                <div className="d-flex justify-content-end pt-2">
                                    <button type="submit" className={` btn btn-primary form-submit-btn ${(isDisabled || isErrored) ? 'disable' : ''}`}>送出</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>

    )
}

export default ContactUs;