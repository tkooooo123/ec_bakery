import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../store/AuthContext';
import { useContext, useEffect, useRef } from 'react';
import { Modal } from "bootstrap";
import EditUserModal from '../../../components/EditUserModal';
import { MessageContext, toastErrorMessage } from '../../../store/messageStore';


function Profile() {
    const { userData, token } = useContext(AuthContext).user;
    const navigate = useNavigate();
    const userModal = useRef(null);
    const [,dispatch] = useContext(MessageContext);

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
        if(!token) {
            navigate('/login');
            toastErrorMessage(dispatch, { message: '無法取得權限，請先登入！'});
        }
    }, [userData])

    return (
        <>
        <EditUserModal closeUserModal={closeUserModal}/>
            <h1 className="mt-3">Profile</h1>
            <div className="row mb-5">
                <hr className="mx-3 mb-3" />
                <div className="col-md-6 text-center">
                    <img  src={userData.avatar} alt="個人頭像" style={{height: '250px', borderRadius: '50%'}}/>
                </div>
                <div className="col-md-6">
                    <ul>
                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5 className="fw-bold">姓名</h5>
                                <span>{userData.name}</span>
                            </div>
                        </li>
                       
                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5 className="fw-bold">Email</h5>
                                <span>{userData.email}</span>
                            </div>
                        </li>
                      
                    </ul>
                    <button className="btn btn-primary"
                            onClick={openUserModal}
                            >編輯</button>

                </div>
              
            </div>
        </>
    )
}

export default Profile;

