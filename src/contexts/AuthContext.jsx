import Cookie from 'js-cookie';
import * as AuthAPI from '../modules/auth/API/auth';
import { createContext, useState, useContext, useEffect} from "react";
import { errorAlert, successAlert } from '../common/Alerts';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export const AuthProvider = ({ children }) => {
    const [ isAuth, setIsAuth ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState({  });

    const login = async (userData) => {
        try {
            setLoading(true);
            const { email, password } = userData;
            const res = await AuthAPI.login(email, password)
            if(!res.status) throw new Error(res.message);

            setIsAuth(true);
            setUser(res.data.user);

            Cookie.set('token', res.data.token, { expires : 1 / 24 });
            Cookie.set('user', JSON.stringify(res.data.user), { expires : 1 / 24 });
            Cookie.set('isAuth', 'true', { expires : 1 / 24 });
            
            successAlert(res.data.message)
        } catch (err) {
            errorAlert(err.message)
        } finally {
           setLoading(false); 
        }
    }

    const register = async (userData) => {
        try {
            setLoading(true);
            const res = await AuthAPI.register(userData);

            if(!res.status) throw new Error(res.message);

            setIsAuth(true);
            setUser(res.data.user);

            Cookie.set('token', res.data.token, { expires : 1 / 24 });
            Cookie.set('user', JSON.stringify(res.data.user), { expires : 1 / 24 });
            Cookie.set('isAuth', 'true', { expires : 1 / 24 });
            
            successAlert(res.data.message)
         
        } catch (err) { 
            errorAlert(err.message)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            const res = await AuthAPI.logout();
            if(!res.status) throw new Error(res.message);

            successAlert('Sesión cerrada correctamente')

            Cookie.remove('token', { path: '' })
            Cookie.remove('user', { path: '' })
            Cookie.remove('isAuth', { path: '' })

            setIsAuth(false);
            setUser({});
            setLoading(false);

        } catch (err) {
           errorAlert(err.message);
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true)
        const { isAuth, token, user } = Cookie.get();

        if(!isAuth || !token || !user) {
            setIsAuth(false);
            setUser({});
            setLoading(false);
            return;
        } 
        
        const userObj = JSON.parse(Cookie.get('user'));
        setIsAuth(true);
        setUser(userObj);
        setLoading(false);

    }, []);

    return (
        <AuthContext.Provider value = {{    
                isAuth, user, loading, login, register, logout, 
            }}>  

            { children } 
        </AuthContext.Provider>   
    )
}