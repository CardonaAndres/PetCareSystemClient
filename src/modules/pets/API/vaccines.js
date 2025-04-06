import { SERVER_URL } from "../../../configs/server";

export const getAllVaccinesPaginate = async (page = 1, pet_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/vaccines/${pet_ID}/?page=${page}`, {
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

export const createVaccine = async (dataVaccine) => {
    try {
        const res = await fetch(`${SERVER_URL}/vaccines/`, {
            method : 'POST', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(dataVaccine)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }
        
    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const deteVaccine = async (id) => {
    try {
        const res = await fetch(`${SERVER_URL}/vaccines/${id}`, {
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