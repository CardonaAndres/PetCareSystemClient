import { SERVER_URL } from "../../../configs/server";

export const getAllTypePets = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/type-pets/`, {
            method : 'GET', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}