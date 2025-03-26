import { useEffect, useState  } from 'react';
import { Navbar } from '../../../common/Navbar'
import { usePetHook } from '../../pets/hooks/usePetHook'
import { LoadingScreen } from "../../../common/LoadingScreen";
import { ChevronLeft, ChevronRight, Edit, Trash, Eye, PawPrint } from 'lucide-react';
import { Header } from '../components/Header';
import { PetCard } from '../../pets/components/PetCard';

export const Dashboard = () => {

  const { loading, getAllPetsPaginate, paginate, pets } = usePetHook();
  const [ currentPage, setCurrentPage ] = useState(1);
  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1);};
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) };

  useEffect(() => {
    getAllPetsPaginate(currentPage);
  }, [currentPage]);
  console.log(paginate)

  if(loading) return <LoadingScreen />

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto">
      <Navbar />
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.pet_ID} />
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center">
        <div className="flex space-x-2">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className={`p-2 rounded-md flex items-center justify-center ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                : 'text-black hover:bg-purple-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center bg-purple-100 px-3 py-1 rounded-md text-sm font-medium text-purple-800">
            {currentPage} de {paginate.totalPages}
          </div>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === paginate.totalPages}
            className={`p-2 rounded-md flex items-center justify-center ${
              currentPage === paginate.totalPages 
                ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                : 'text-black hover:bg-purple-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
    </div>
  )
}

