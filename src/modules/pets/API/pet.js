import { SERVER_URL } from "../../../configs/server";

export const getAllPetsPaginate = async (page = 1) => {
    try {

        const res = await fetch(`${SERVER_URL}/pets/?page=${page}`, {
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

export const registerPet = async (petData) => {
    try {
        const res = await fetch(`${SERVER_URL}/pets/pet`, {
            method : 'POST', credentials : 'include', body : petData
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const updatePet = async (petData, pet_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/pets/pet/${pet_ID}`, {
            method : 'PUT', credentials : 'include', body : petData
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const deletePet = async (pet_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/pets/pet/${pet_ID}`, {
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