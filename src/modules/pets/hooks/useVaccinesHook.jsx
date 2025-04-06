import * as VaccinesAPI from '../API/vaccines';
import { useState } from 'react';
import { errorAlert, successAlert, confirmAlert } from '../../../common/Alerts';

export const useVaccinesHook = (pet_ID) => {
    const [ loading, setLoading ] = useState(false);
    const [ vaccines, setVaccines ] = useState([]);
    const [ pagination, setPagination ] = useState({});

    const getVaccines = async (page = 1) => {
        try {
            setLoading(true);
            const res = await VaccinesAPI.getAllVaccinesPaginate(page, pet_ID);
            if(!res.status) throw new Error(res.message || 'Internal Server Error');
            setVaccines(res.data.vaccines);
            setPagination(res.data.pagination);
        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const createVaccine = async (onClose, data) => {
        try {
            setLoading(true)
            const res = await VaccinesAPI.createVaccine(data);
            if(!res.status) throw new Error(res.message || 'Internal Server Error');
            onClose();
            successAlert('Vacuna registrada correctamente');

        } catch (err){
            onClose();
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteVaccine = async (id) => {
        try {
            setLoading(true)
            const confirm = await confirmAlert('¿Eliminar vacuna?');
            if(!confirm.isConfirmed){
                successAlert('Acción cancelada');
                return;
            }

            const res = await VaccinesAPI.deteVaccine(id);
            if(!res.status) throw new Error(res.message || 'Internal Server Error');
            successAlert('Vacuna eliminada correctamente');

        } catch (err){
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        vaccines,
        loading,
        pagination,
        getVaccines,
        createVaccine,
        deleteVaccine
    }
}
