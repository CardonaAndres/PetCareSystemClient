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

export const registerTypePet = async (typePetData) => {
    try {
        const res = await fetch(`${SERVER_URL}/type-pets/`, {
            method : 'POST', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(typePetData)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const updateTypePet = async (typePetData) => {
    try {
        const res = await fetch(`${SERVER_URL}/type-pets/${typePetData.type_pet_ID}`, {
            method : 'PUT', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(typePetData)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const deleteTypePet = async (typePetID) => {
    try {
        const res = await fetch(`${SERVER_URL}/type-pets/${typePetID}`, {
            method : 'DELETE', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}