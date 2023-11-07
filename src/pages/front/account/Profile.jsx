import { AuthContext } from '../../../store/AuthContext';
import { useContext } from 'react';


function Profile() {
    const { userData } = useContext(AuthContext).user;
    console.log(userData)
    return (
        <>
            <h1 className="mt-3">Profile</h1>
            <div className="row">
                <hr className="mx-3" />
                <div className="col-6">
                    <ul>
                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5>Name</h5>
                                <span>{userData.name}</span>
                            </div>
                            <button className="btn btn-outline-primary rounded-0">編輯</button>
                        </li>
                       
                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5>Email</h5>
                                <span>{userData.email}</span>
                            </div>
                            <button className="btn btn-outline-primary rounded-0">編輯</button>
                        </li>
                        <li className="d-flex justify-content-between p-2">
                            <div>
                                <h5>Password</h5>
                                <span>{userData.email}</span>
                            </div>
                            <button className="btn btn-outline-primary rounded-0">變更密碼</button>
                        </li>
                    </ul>

                </div>
                <div className="col-6">
                    Image
                </div>
            </div>
        </>
    )
}

export default Profile;

