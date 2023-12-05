import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthorizationApi from '../apis/authorization';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({});
    const { pathname } = useLocation();
    const authToken = localStorage.getItem('token');
    const user = {
        token: authToken,
        userId,
        isAuthenticated,
        userData,
        
    }
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
 
    }
    const checkTokenIsValid = async () => {
        if (!authToken) {
          setIsAuthenticated(false);
          return;
        }
        const result = await AuthorizationApi.getCurrentUser();
        if (result) {
          user.token = authToken;
          setIsAuthenticated(true);
          setUserData(result.data.currentUser)
          setUserId(result.data.currentUser.id);
        } else {
          setIsAuthenticated(false);
        }
      };
      
    useEffect(() => {

        checkTokenIsValid();
      }, [pathname]);
    return (
        <AuthContext.Provider value={{
          user,
          logout,
          checkTokenIsValid
          }}>
            {children}
        </AuthContext.Provider>
    )
}
