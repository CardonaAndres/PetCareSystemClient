import { SERVER_URL } from "../../../configs/server";

export const profile = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/users/profile`, {
            method : 'GET', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status: false, message: err.message };
    }
}

export const update = async (userData) => {
    try {
        const res = await fetch(`${SERVER_URL}/users/user`, {
            method : 'PUT', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(userData)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status: false, message: err.message };
    }
}

export const deleteUser = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/users/user`, {
            method : 'DELETE', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status: false, message: err.message };
    }
}