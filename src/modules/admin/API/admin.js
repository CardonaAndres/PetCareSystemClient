import { SERVER_URL } from "../../../configs/server";

export const getAllUsersPaginate = async (page = 1) => {
    try {
        const res = await fetch(`${SERVER_URL}/admin/users/?page=${page}`, {
            method : 'GET', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message: err.message };
    }
}

export const changeRole = async (userData) => {
    try {
        const res = await fetch(`${SERVER_URL}/admin/users/change-role`, {
            method : 'PUT', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(userData) 
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message: err.message };
    }
}
