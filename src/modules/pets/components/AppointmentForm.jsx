import { LoadingScreen } from '../../../common/LoadingScreen';
import { useForm } from 'react-hook-form';
import { Calendar, User, Phone, Mail, FileText } from 'lucide-react';
import { useAppointmentsHook } from '../hooks/useAppointmentsHook';

export const AppointmentForm = ({ onClose, pet_ID }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, createAppointment } = useAppointmentsHook();
  const onSubmit = async (data) => {
    const payload = {
      veterinarian: {
        num_doc_veterinarian: data.num_doc_veterinarian,
        veterinarian_name: data.veterinarian_name,
        phone: data.phone,
        email: data.email || ""
      },
      appointments: {
        pet_ID,
        appointment_date: data.appointment_date,
        reason: data.reason
      }
    };
    
    await createAppointment(onClose, payload)
  };

  if(loading) return <LoadingScreen />

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agendar Cita Veterinaria</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Veterinarian Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
            <User className="mr-2" size={20} />
            Información del Veterinario
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Document Number */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Número de Documento*
              </label>
              <input
                type="text"
                className={`w-full border ${errors.num_doc_veterinarian ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Ingrese documento del veterinario"
                {...register("num_doc_veterinarian", { required: true })}
              />
              {errors.num_doc_veterinarian && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>
            
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Nombre Completo*
              </label>
              <input
                type="text"
                className={`w-full border ${errors.veterinarian_name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Nombre del veterinario"
                {...register("veterinarian_name", { required: true })}
              />
              {errors.veterinarian_name && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                <div className="flex items-center">
                  <Phone size={16} className="mr-1 text-purple-600" />
                  Teléfono*
                </div>
              </label>
              <input
                type="tel"
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Número de contacto"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                <div className="flex items-center">
                  <Mail size={16} className="mr-1 text-purple-600" />
                  Email
                </div>
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Correo electrónico (opcional)"
                {...register("email")}
              />
            </div>
          </div>
        </div>
        
        {/* Appointment Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
            <Calendar className="mr-2" size={20} />
            Detalles de la Cita
          </h3>
          
          <div className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Fecha y Hora de la Cita*
              </label>
              <input
                type="date"
                className={`w-full border ${errors.appointment_date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                {...register("appointment_date", { required: true })}
              />
              {errors.appointment_date && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>
            
            {/* Reason */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                <div className="flex items-center">
                  <FileText size={16} className="mr-1 text-purple-600" />
                  Motivo de la Cita*
                </div>
              </label>
              <textarea
                className={`w-full border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Describa el motivo de la consulta"
                {...register("reason", { required: true })}
              ></textarea>
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Agendar Cita
          </button>
        </div>
      </form>
    </div>
  );
};
