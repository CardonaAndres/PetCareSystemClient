import { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { LoadingScreen } from '../../../common/LoadingScreen';

export const AccessControl = () => {
  const { user, loading } = useAuth();
  const [ isCheck, setIsCheck ] = useState(false);

    useEffect(() => {
        if(loading || !user) return <LoadingScreen />
        if(user?.role_ID === 1) setIsCheck(true)
    }, [user, loading]);


    return isCheck && !loading ? <Outlet /> : <h1>403</h1>
}

