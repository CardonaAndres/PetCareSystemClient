import { Calendar, AlertCircle, User, Phone, File, Trash2 } from 'lucide-react';
import { useVaccinesHook } from '../hooks/useVaccinesHook';

export const VaccineCard = ({ vaccine }) => {
  const { deleteVaccine } = useVaccinesHook();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (nextDoseDate) => {
    const today = new Date();
    const nextDose = new Date(nextDoseDate);
    const diffTime = nextDose - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(vaccine.next_dose);
  
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-white">{vaccine.name}</h3>
          <span className="ml-3 bg-purple-800 text-purple-200 text-xs px-2 py-1 rounded">
            {vaccine.specie}
          </span>
        </div>
        <span className="text-sm font-medium text-purple-200">ID: {vaccine.vaccine_ID}</span>
      </div>
      
      {/* Body */}
      <div className="p-4">
        {/* Date information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded">
            <Calendar className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Fecha de aplicación</p>
              <p className="text-white">{formatDate(vaccine.application_date)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded">
            <AlertCircle className={`h-5 w-5 ${daysRemaining < 30 ? 'text-red-400' : 'text-yellow-400'}`} />
            <div>
              <p className="text-sm text-gray-400">Próxima dosis</p>
              <p className="text-white">{formatDate(vaccine.next_dose)}</p>
              <p className={`text-xs ${daysRemaining < 30 ? 'text-red-400' : 'text-yellow-400'}`}>
                {daysRemaining <= 0 
                  ? 'Vacuna vencida' 
                  : `${daysRemaining} días restantes`}
              </p>
            </div>
          </div>
        </div>
        
        {/* Veterinarian information */}
        <div className="bg-gray-800 p-3 rounded mb-4">
          <h4 className="text-purple-400 font-medium text-sm mb-2">Información del veterinario</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Nombre</p>
                <p className="text-white">{vaccine.veterinarian_name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">No. Documento</p>
                <p className="text-white">{vaccine.num_doc_veterinarian}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Teléfono</p>
                <p className="text-white">{vaccine.phone}</p>
              </div>
            </div>
            
            {vaccine.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{vaccine.email || "No disponible"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 px-4 py-3 flex justify-end">
        <button onClick={async () => await deleteVaccine(vaccine.vaccine_ID)} className="flex items-center bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors">
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar Vacuna
        </button>
      </div>
      
    </div>
  );
}