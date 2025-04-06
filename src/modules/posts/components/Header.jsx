import { Search, PlusCircle, FileText } from 'lucide-react';
import { useState } from 'react';
import { PostModal } from './PostModal';

export const Header = ({ searchTerm, setSearchTerm }) => {
    const [ modal, setModal ] = useState(false);
    const handleModal = () => setModal(!modal);

  return (
    <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-400 mr-2" />
                <h1 className="text-2xl font-bold text-white">
                    Gestión de Publicaciones
                </h1>
            </div>
            
            <button onClick={handleModal} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
                <PlusCircle className="w-5 h-5 mr-2" />
                Nueva Publicación
            </button>
        </div>

        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
            type="text"
            placeholder="Buscar publicaciones..."
            className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    
        <PostModal open={modal} onClose={handleModal} />
    </>
  )
}
