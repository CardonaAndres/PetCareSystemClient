import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { LoadingScreen } from "../../../common/LoadingScreen";
import { router } from '../../../configs/router';
import Cookies from 'js-cookie';

export const ProtectedRoute = () => {
    const { isAuth, loading } = useAuth();

    const cookies = Cookies.get();
    const isAuthCookie = cookies?.isAuth === "true"; 
    const token = cookies?.token;
    const user = cookies?.user ? JSON.parse(cookies.user) : null;

    if (loading) return <LoadingScreen />;
    
    if (!isAuth && !isAuthCookie && !loading) return <Navigate to={router.Login} replace />;
    
    return <Outlet />;
};
