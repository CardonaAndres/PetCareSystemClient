import { useEffect, useState } from 'react';
import { Navbar } from '../../../common/Navbar';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { Pagination } from '../../../common/Pagination';
import { useVaccinesHook } from '../hooks/useVaccinesHook';
import { useSearchParams } from "react-router-dom";
import { VaccineCard } from '../components/VaccineCard';
import { VaccinesModal } from '../components/VaccinesModal';

export const VaccinesManager = () => {
    const [ searchParams ] = useSearchParams(); 
    const [ modal, setModal ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const handleModal = () => setModal(!modal);
    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1);};
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) }

    const { loading, vaccines, pagination, getVaccines } = useVaccinesHook(searchParams.get("pet_ID"));

    useEffect(() => {
        getVaccines(currentPage);
    }, [currentPage]);

    if(loading) return <LoadingScreen />

    if (vaccines.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg mx-auto">
                <Navbar />

                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-gray-800">
                        No hay vacunas registradas
                    </h2>
                    <p className="text-gray-600 mt-2">La mascota seleccionada no tiene vacunas.</p>
                    <button onClick={handleModal} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                     Registra Nueva Vacunas
                    </button>
                </div>

                <VaccinesModal 
                    open={modal} 
                    onClose={handleModal} 
                    pet_ID={searchParams.get("pet_ID")} 
                />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg mx-auto">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Registro de Vacunas
                    </h1>
                    <button onClick={handleModal}  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center" >
                        <span>Registrar Nueva Vacuna</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {vaccines.map((vaccine) => (
                        <VaccineCard key={vaccine.vaccine_ID} vaccine={vaccine} />
                    ))}
                </div>
            </div>
            <Pagination 
                prevPage={prevPage} 
                nextPage={nextPage}
                currentPage={currentPage}
                totalPages={pagination.totalPages}
            />   

            <VaccinesModal 
                open={modal} 
                onClose={handleModal} 
                pet_ID={searchParams.get("pet_ID")} 
            />        
        </div>
    )
}
