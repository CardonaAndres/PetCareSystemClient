import { PawPrint } from 'lucide-react';
import { useEffect, useState  } from 'react';
import { Navbar } from '../../../common/Navbar'
import { usePetHook } from '../../pets/hooks/usePetHook'
import { LoadingScreen } from "../../../common/LoadingScreen";
import { Header } from '../components/Header';
import { PetCard } from '../../pets/components/PetCard';
import { Pagination } from '../../../common/Pagination';

export const Dashboard = () => {

  const { loading, getAllPetsPaginate, paginate, pets } = usePetHook();
  const [ currentPage, setCurrentPage ] = useState(1);
  const nextPage = () => { if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) };
  useEffect(() => { getAllPetsPaginate(currentPage) }, [currentPage]);

  if(loading) return <LoadingScreen />

  if(!pets || pets.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg mx-auto">
          <Navbar />
          <Header />

          <div className="flex flex-col items-center justify-center py-12 px-4 mt-8">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <PawPrint className="h-16 w-16 text-purple-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                No tienes mascotas registradas
              </h2>

              <p className="text-gray-600 mb-8 text-center max-w-md">
                Parece que aún no has agregado ninguna mascota a tu cuenta. 
                ¡Comienza agregando tu primera mascota para gestionar su cuidado!
              </p>

          </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg mx-auto">
      <Navbar />
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.pet_ID} />
        ))}
      </div>

      <Pagination 
        prevPage={prevPage} 
        nextPage={nextPage}
        currentPage={currentPage}
        totalPages={paginate.totalPages}
      />
      
    </div>
  )
}

