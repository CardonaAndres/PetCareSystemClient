import { Calendar, Clock, User, FileText, Bookmark } from 'lucide-react';
import { useAppointmentsHook } from '../hooks/useAppointmentsHook';

export const AppointmentCard = ({ appointment }) => {
    const { deleteAppointment } = useAppointmentsHook(appointment.pet_ID);
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{appointment.name}</h3>
            <span className="bg-purple-800 rounded-full px-3 py-1 text-sm">
              ID: {appointment.appointment_ID}
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="text-purple-400 w-5 h-5" />
            <span>Fecha: {formatDate(appointment.appointment_date)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="text-purple-400 w-5 h-5" />
            <span>Hora: {formatTime(appointment.appointment_date)}</span>
          </div>

          <div className="bg-gray-900 rounded-md p-3">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="text-purple-400 w-5 h-5" />
              <span className="font-medium">Motivo de la cita:</span>
            </div>
            <p>{appointment.reason}</p>
          </div>
          
          <div className="bg-gray-900 rounded-md p-3">
            <div className="flex items-center space-x-2 mb-2">
              <User className="text-purple-400 w-5 h-5" />
              <span className="font-medium">Veterinario:</span>
            </div>
            <div className="ml-7 space-y-1">
              <p>{appointment.veterinarian_name}</p>
              <p className="text-sm text-gray-400">Documento: {appointment.num_doc_veterinarian}</p>
              <p className="text-sm text-gray-400">Teléfono: {appointment.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300">
            <Bookmark className="text-purple-400 w-5 h-5" />
            <span>Mascota desde: {formatDate(appointment.birth_date)}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-800 p-4 flex justify-end">
          <button onClick={async () => await deleteAppointment(appointment.appointment_ID)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
            Cancelar Cita
          </button>
        </div>
      </div>
    );
};