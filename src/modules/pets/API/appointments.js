import { SERVER_URL } from "../../../configs/server";

export const getAllAppointmentsPaginate = async (page = 1, pet_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/appointments/${pet_ID}/?page=${page}`, {
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
