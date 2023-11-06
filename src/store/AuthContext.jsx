import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthorizationApi from '../apis/authorization'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');
    const { pathname } = useLocation();
    const authToken = localStorage.getItem('token');
    const user = {
        token: authToken,
        userId,
        isAuthenticated,
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
          logout
          }}>
            {children}
        </AuthContext.Provider>
    )
}
