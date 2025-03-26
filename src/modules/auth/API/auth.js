import { SERVER_URL } from '../../../configs/server.js';

export const login = async (email, password) => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/login`, {
            method : 'POST', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const register = async (userData) => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/register`, {
            method : 'POST', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(userData)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const logout = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/logout`, {
            method : 'POST', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}