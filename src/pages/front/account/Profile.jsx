import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Modal } from "bootstrap";
import EditUserModal from '../../../components/EditUserModal';
import Loading from '../../../components/Loading';


function Profile() {
    const { avatar, name, email, isAuthenticated } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const userModal = useRef(null);

    const openUserModal = () => {
        userModal.current.show();
    }

    const closeUserModal = () => {
        userModal.current.hide();
    }

    useEffect(() => {
        userModal.current = new Modal('#userModal', {
            backdrop: 'static'
        });
        if (isAuthenticated) {
            setIsLoading(false)
        }
    }, [isAuthenticated])

    return (
        <>
            <Loading isLoading={isLoading} />
            <EditUserModal closeUserModal={closeUserModal} />
            <h3 className="mt-3 fw-bold">Profile</h3>
            <div className="row mb-5">
                <hr className="mx-3 mb-3" />
                <div className="col-md-6 text-center">
                    <img src={avatar} alt="個人頭像" style={{ height: '250px', aspectRatio: '1', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <div className="col-md-6">
                    <ul>
                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5 className="fw-bold">姓名</h5>
                                <span>{name}</span>
                            </div>
                        </li>

                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5 className="fw-bold">Email</h5>
                                <span>{email}</span>
                            </div>
                        </li>

                    </ul>
                    <button className="btn btn-primary fw-bold"
                        onClick={openUserModal}
                    >編輯</button>

                </div>

            </div>
        </>
    )
}

export default Profile;

