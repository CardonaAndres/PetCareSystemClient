import { useState } from 'react'
import * as AdminAPI from '../API/admin';
import { errorAlert, successAlert } from '../../../common/Alerts';

export const useAdminHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ users, setUsers ] = useState([]);
    const [ pagination, setPagination ] = useState({});

    const getAllUsersPaginate = async (page = 1) => {     
        try {
            setLoading(true);
            const res = await AdminAPI.getAllUsersPaginate(page);
            if(!res.status) throw new Error(res.message || 'Internal Server Error');
            setUsers(res.data.users);
            setPagination(res.data.pagination);
        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const changeRole = async (data, onClose) => {
        try {
            setLoading(true);
            const res  = await AdminAPI.changeRole(data);
            if(!res.status) throw new Error(res.message || 'Internal Server Error')
        
        } catch (err) {
            onClose();
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        users,
        getAllUsersPaginate,
        pagination,
        changeRole
    }
}

