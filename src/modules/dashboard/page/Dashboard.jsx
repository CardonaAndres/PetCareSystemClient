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
  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1);};
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) };
  useEffect(() => { getAllPetsPaginate(currentPage) }, [currentPage]);

  if(loading) return <LoadingScreen />

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

