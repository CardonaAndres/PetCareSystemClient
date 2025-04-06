import { useEffect, useState  } from 'react';
import { Navbar } from '../../../common/Navbar';
import { useTypePetsHook } from '../hooks/useTypePetsHook';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { Header } from '../components/Header';
import { Tr } from '../components/Tr';

export const TypePetsManager = () => {
    const { loading, typePets, getTypePets } = useTypePetsHook();

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPets = typePets.filter(pet => 
      pet.specie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => { getTypePets() }, []);

    if(loading) return <LoadingScreen />

    return (
        <div className="bg-white p-6 rounded-lg mx-auto">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
                    <Header 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Especie
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Acciones
                                </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredPets.length > 0 ? (
                                    filteredPets.map((pet, index) => (
                                    <Tr key={index} pet={pet} />
                                    ))
                                ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                                    No se encontraron tipos de mascotas
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>   
            </div>
        </div>
    )
}