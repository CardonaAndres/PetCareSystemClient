import { LoadingScreen } from '../../../common/LoadingScreen';
import { useForm } from 'react-hook-form';
import { Calendar, User, Phone, Mail, FileText } from 'lucide-react';
import { useVaccinesHook } from '../hooks/useVaccinesHook';

export const VaccinesForm = ({ onClose, pet_ID }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, createVaccine } = useVaccinesHook(pet_ID);

  const onSubmit = async (data) => {
    const payload = {
      veterinarian: {
        num_doc_veterinarian: data.num_doc_veterinarian,
        veterinarian_name: data.veterinarian_name,
        phone: data.phone,
        email: data.email || ""
      },
      vaccine: {
        pet_ID,
        next_dose: data.next_dose,
        application_date: data.application_date,
        name : data.name
      }
    };

    await createVaccine(onClose, payload);
  };

  if(loading) return <LoadingScreen />

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar Vacuna</h2>
      
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
            Detalles de la vacuna
          </h3>
          
          <div className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Fecha de aplicación*
              </label>
              <input type="date"
                className={`w-full border ${errors.application_date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                {...register("application_date", { required: true })}
              />
              {errors.application_date && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Proxima docis*
              </label>
              <input
                type="date"
                className={`w-full border ${errors.next_dose ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                {...register("next_dose", { required: true })}
              />
              {errors.next_dose && (
                <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
              )}
            </div>
            
            
            {/* Reason */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                <div className="flex items-center">
                  <FileText size={16} className="mr-1 text-purple-600" />
                  Nombre de la vacuna*
                </div>
              </label>
              <input type='text'
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Nombre de la vacuna"
                {...register("name", { required: true })}
              ></input>
              {errors.name && (
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
