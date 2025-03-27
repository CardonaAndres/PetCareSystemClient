import { useState } from 'react'
import { errorAlert, successAlert, confirmAlert } from '../../../common/Alerts';
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

    const registerOrUpdatePet = async (data, isEditMode, onClose) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('birth_date', data.birth_date);
            formData.append('type_pet_ID', data.type_pet_ID);

            if (data.photo && data.photo[0]) formData.append('photo_url', data.photo[0]);

            const res = isEditMode ? await PetAPI.updatePet(formData, data.pet_ID) : await PetAPI.registerPet(formData);

            if(!res.status) throw new Error(res.message);

            onClose();
            successAlert(
                isEditMode ? 'Mascota actualizada correctamente' : 'Mascota registrada correctamente'
            );
            
        } catch (err) {
            onClose();
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deletePet = async (pet_ID) => {
        try {
            setLoading(true)
            const confirm = await confirmAlert('¿Estás seguro de eliminar esta mascota?');

            if(!confirm.isConfirmed){
                successAlert('Mascota no eliminada');
                return;
            }

            const res = await PetAPI.deletePet(pet_ID);
            if(!res.status) throw new Error(res.message);
            successAlert('Mascota eliminada correctamente');

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
        paginate,
        registerOrUpdatePet,
        deletePet
    }
}