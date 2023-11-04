import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthorizationApi from '../apis/authorization'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');
    const { pathname } = useLocation();
    const test = {
        token: "",
        userId,
        isAuthenticated,
    }
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
 
    }
    const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          setIsAuthenticated(false);
          return;
        }
        const result = await AuthorizationApi.getCurrentUser();
        if (result) {
          test.token = authToken;
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
          test,
          logout
          }}>
            {children}
        </AuthContext.Provider>
    )
}
