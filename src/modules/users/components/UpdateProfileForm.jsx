import { useForm } from 'react-hook-form';
import { User, Mail, Phone, Save } from 'lucide-react';
import { useUserHook } from '../hooks/useUserHook';

export const UpdateProfileForm = ({ user, onClose }) => {
  const { updateUserProfile } = useUserHook();  
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      ...user
    }
  });

  const handleFormSubmit = async (data) => await updateUserProfile(data, onClose);

  return (
    <div className=" bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Actualizar Perfil
          </h2>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <User className="mr-2 text-purple-600" size={20} />
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { 
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <Mail className="mr-2 text-purple-600" size={20} />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Phone className="mr-2 text-purple-600" size={20} />
              Número de Teléfono
            </label>
            <input type="tel" id="phone" {...register('phone', { required: 'El número de teléfono es obligatorio',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Número de teléfono inválido (10 dígitos)'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-s text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300 ease-in-out">
              <Save className="mr-2" size={20} />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};