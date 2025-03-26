import { PawPrint } from 'lucide-react'
import { useState } from 'react'
import { FormModal } from '../../pets/components/FormModal';

export const Header = () => {
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <div className='p-6 mt-5 max-w-6xl mx-auto'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black flex items-center">
              <PawPrint className="mr-2 text-purple-600" size={24} />
              Mis Mascotas
          </h2>
          <button onClick={handleModal} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors duration-200">
              + Agregar Mascota
          </button>
        </div>

        <FormModal open={modal} onClose={handleModal} />
  </div>
  )
}