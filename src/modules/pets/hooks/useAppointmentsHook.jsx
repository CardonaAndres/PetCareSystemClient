import * as AppointmentsAPI from '../API/appointments';
import { useState } from 'react'
import { errorAlert, successAlert, confirmAlert } from '../../../common/Alerts';

export const useAppointmentsHook = (pet_ID) => {
    const [ loading, setLoading ] = useState(false);
    const [ appointments, setAppointments ] = useState([]);
    const [ pagination, setPagination ] = useState({});

    const getAllAppointmentsPaginate = async (page = 1) => {
        try {     
            setLoading(true);
            const res = await AppointmentsAPI.getAllAppointmentsPaginate(page, pet_ID);
            if(!res.status) throw new Error(res.message);
            setAppointments(res.data.appointments);
            setPagination(res.data.pagination)
        } catch (err) {
            errorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    const createAppointment = async (onClose, appointmentData) => {
        try {
            
            setLoading(true);
            const res = await AppointmentsAPI.createAppointment(appointmentData);
            if(!res.status) throw new Error(res.message);
            onClose();
            successAlert('Cita registrada correctamente')
           
        } catch (err) {
            onClose();
            errorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    const deleteAppointment = async (appointment_ID) => {
        try {
            
            setLoading(true);

            const confirm = await confirmAlert('¿Estas seguro?')
            if(!confirm.isConfirmed){
                successAlert('Acción cancelada correctamente')
                return
            }

            const res = await AppointmentsAPI.deleteAppointment(appointment_ID)
            if(!res.status) throw new Error(res.message);
            successAlert('Cita eliminada correctamente')
           
        } catch (err) {
            errorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    return {
        loading, 
        appointments, 
        pagination,
        getAllAppointmentsPaginate,
        createAppointment,
        deleteAppointment
    }
}

