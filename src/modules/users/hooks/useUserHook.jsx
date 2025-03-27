import * as UserAPI from '../API/user.js';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useState } from "react"
import { errorAlert, successAlert, confirmAlert} from '../../../common/Alerts.jsx';

export const useUserHook = () => {
    const [ loading, setLoading ] = useState();
    const [ user, setUser ] = useState({});
    const { logout } = useAuth();

    const getUserProfile = async () => {
        try {
            setLoading(true);
            const res = await UserAPI.profile();
            if(!res.status) throw new Error(res.message);
            setUser(res.data.profile);

        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const updateUserProfile = async (data, onClose) => {
        try {
            setLoading(true);
            const res = await UserAPI.update(data);
            if(!res.status) throw new Error(res.message);
                 
            onClose();
            await logout();
            successAlert('Perfil actualizado correctamente');

        } catch (err) {
            onClose();
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async () => {
        try {
            setLoading(true);

            const confirm = await confirmAlert('¿Estás seguro de eliminar tu cuenta?');
            if(!confirm.isConfirmed) {
                successAlert('Operación cancelada');
                return;
            }

            const res = await UserAPI.deleteUser();
            if(!res.status) throw new Error(res.message);

            await logout();
            successAlert('Usuario eliminado correctamente');

        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        user,
        getUserProfile,
        updateUserProfile,
        deleteUser
    }
}
