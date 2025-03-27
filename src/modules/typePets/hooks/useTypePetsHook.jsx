import { useState } from "react"
import { errorAlert } from '../../../common/Alerts';
import * as TypePetAPI from '../API/typePet';

export const useTypePetsHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ typePets, setTypePets ] = useState([]);

    const getTypePets = async () => {
        try {
            setLoading(true);
            const res = await TypePetAPI.getAllTypePets();
            if(!res.status) throw new Error(res.message);
            setTypePets(res.data.typePets);
        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        getTypePets,
        loading,
        typePets
    }
}
