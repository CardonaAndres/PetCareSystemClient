import { useState } from "react"
import { errorAlert, successAlert, confirmAlert } from '../../../common/Alerts';
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

    const registerOrUpdateTypePet = async (data, onClose, isEditMode) => {
        try {
            setLoading(true);
            
            const res = isEditMode ? await TypePetAPI.updateTypePet(data) : await TypePetAPI.registerTypePet(data);

            if(!res.status) throw new Error(res.message);

            onClose();
            successAlert(
                isEditMode ? 'Tipo de mascota actualizado correctamente' : 'Tipo de mascota registrado correctamente'
            );

        } catch (err) {
            onClose();
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteTypePet = async (typePetID) => {
        try {
            setLoading(true);

            const confirm = await confirmAlert('¿Está seguro de eliminar este tipo de mascota?');
            if(!confirm.isConfirmed){
                successAlert('Eliminación cancelada');
                return;
            }

            const res = await TypePetAPI.deleteTypePet(typePetID);
            if(!res.status) throw new Error(res.message);
            successAlert('Tipo de mascota eliminado correctamente');
            
        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        getTypePets,
        loading,
        typePets,
        registerOrUpdateTypePet,
        deleteTypePet
    }
}
