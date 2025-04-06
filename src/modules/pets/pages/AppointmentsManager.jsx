import { Navbar } from '../../../common/Navbar';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { Pagination } from '../../../common/Pagination';
import { useSearchParams } from "react-router-dom";
import { useAppointmentsHook } from '../hooks/useAppointmentsHook';
import { useEffect, useState } from 'react';
import { AppointmentCard } from '../components/AppointmentCard';
import { AppointmentModal } from '../components/AppointmentModal';

export const AppointmentsManager = () => {
    const [ modal, setModal ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const handleModal = () => setModal(!modal);
    const nextPage = () => { if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) };

    const [searchParams] = useSearchParams();
    const { 
        loading, 
        appointments, 
        getAllAppointmentsPaginate,
        pagination 
    } = useAppointmentsHook(searchParams.get("pet_ID"));

    useEffect(() => {
        getAllAppointmentsPaginate(currentPage);
    }, [currentPage])

    if(loading) return <LoadingScreen />

    if (appointments.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg mx-auto">
                <Navbar />

                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-gray-800">No hay citas registradas</h2>
                    <p className="text-gray-600 mt-2">La mascota seleccionada no tiene citas.</p>
                    <button onClick={handleModal} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                    Registra Nueva Cita
                    </button>
                </div>

                <AppointmentModal 
                    onClose={handleModal} 
                    open={modal} 
                    pet_ID={searchParams.get("pet_ID")} 
                />
            </div>
        );
    }


    return (
        <div className="bg-white p-6 rounded-lg mx-auto">
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Citas de {appointments[0]?.name}
                    </h1>
                    <button onClick={handleModal} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                    Nueva Cita
                    </button>
                </div>

                <div className="space-y-6">
                    {appointments.map((appointment) => (
                        <AppointmentCard key={appointment.pet_ID} appointment={appointment} />
                    ))}
                </div>
            </div>
            <Pagination 
                prevPage={prevPage} 
                nextPage={nextPage}
                currentPage={currentPage}
                totalPages={pagination.totalPages}
            />   

            <AppointmentModal onClose={handleModal} open={modal} pet_ID={searchParams.get("pet_ID")} />
        </div>
    )
}
