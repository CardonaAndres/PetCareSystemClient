import { useState } from 'react'
import { errorAlert } from '../../../common/Alerts';
import * as PetAPI from '../API/pet';

export const usePetHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ pets, setPets ] = useState([]);
    const [ paginate, setPaginate ] = useState({});

    const getAllPetsPaginate = async (page = 1) => {
        try {
            setLoading(true);
            const res = await PetAPI.getAllPetsPaginate(page);
            if(!res.status) throw new Error(res.message)
            setPets(res.data.pets);
            setPaginate(res.data.pagination)
        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        pets,
        getAllPetsPaginate,
        paginate
    }
}