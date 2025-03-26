import { Edit, Trash, Eye  } from 'lucide-react';

export const PetCard = ({ pet }) => {
    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
        }
        
        return age;
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
    <div className="flex flex-col md:flex-row">
      {/* Imagen de la mascota */}
      <div className="w-full md:w-1/3 h-40 md:h-auto bg-gray-100 relative">
        <img src={pet.photo_url} 
          alt={`Foto de ${pet.name}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
          {pet.specie}
        </div>
      </div>
      
      {/* Información de la mascota */}
      <div className="w-full md:w-2/3 p-4 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-black">{pet.name}</h3>
          <div className="text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-1">
            {pet.race || 'Sin raza'}
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <p>Edad: {calculateAge(pet.birth_date)} años</p>
          <p>Nacimiento: {formatDate(pet.birth_date)}</p>
          <p className="line-clamp-2 mt-1">{pet.description || 'Sin descripción'}</p>
        </div>
        
        {/* Botones de acción */}
        <div className="mt-3 flex justify-end space-x-2">
          <button className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-full transition-colors duration-200">
            <Eye size={18} />
          </button>
          <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200">
            <Edit size={18} />
          </button>
          <button className="p-1.5 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200">
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}


