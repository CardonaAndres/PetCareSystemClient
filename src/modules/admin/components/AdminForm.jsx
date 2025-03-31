import { useForm } from 'react-hook-form';
import { Mail, CheckCircle, AlertTriangle } from 'lucide-react'
import { useAdminHook } from '../hooks/useAdminHook';

export const AdminForm = ({ onClose, user }) => {
    const { loading, changeRole } = useAdminHook();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitSuccessful } 
    } = useForm({
        defaultValues : {
            ...user
        }
    });

    const roles = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Cliente' }   
    ];
    
    const onSubmit = async (data) => await changeRole(data, onClose);

    return (
        <div className="max-w-md mx-auto bg-black rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Asignar Rol de Usuario</h2>
        
        {isSubmitSuccessful ? (
          <div className="bg-green-900 border border-green-800 rounded-lg p-4 mb-6 flex items-center">
            <CheckCircle className="text-green-400 mr-3" size={20} />
            <p className="text-green-300">Rol asignado correctamente</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email del Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                className={`bg-gray-900 text-white pl-10 pr-4 py-3 w-full rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                placeholder="usuario@ejemplo.com"
                {...register('email', { 
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
              />
            </div>
            {errors.email && (
              <div className="mt-1 flex items-center text-red-500 text-sm">
                <AlertTriangle size={16} className="mr-1" />
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Role Select Field */}
          <div>
            <label htmlFor="role_ID" className="block text-sm font-medium text-gray-300 mb-2">
              Rol
            </label>
            <select
              id="role_ID"
              className={`bg-gray-900 text-white px-4 py-3 w-full rounded-lg border ${
                errors.role_ID ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              {...register('role_ID', { required: 'Debes seleccionar un rol' })}
            >
              <option value="">Selecciona un rol</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_ID && (
              <div className="mt-1 flex items-center text-red-500 text-sm">
                <AlertTriangle size={16} className="mr-1" />
                {errors.role_ID.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {(isSubmitting || loading) ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              'Asignar Rol'
            )}
          </button>
        </form>
      </div>
    </div>
    )
}
