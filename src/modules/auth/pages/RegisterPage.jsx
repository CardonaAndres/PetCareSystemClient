import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, PawPrint } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { router } from '../../../configs/router';

export const RegisterPage = () => {

  const navigate = useNavigate();  
  const { isAuth, register : registerFunc, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const onSubmit = async (data) => await registerFunc(data);

  useEffect(() => {
    if(isAuth) return navigate(router.dashboard);
  }, [isAuth, navigate])
  
  if(loading) return <LoadingScreen />
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-purple-800 px-4 py-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <PawPrint className="text-purple-500" size={24} />
              <span className="text-xl font-bold">PetCare</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-purple-900 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Crear una cuenta</h1>
              <p className="text-gray-400">Registrate para gestionar el cuidado de tus mascotas</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nombre completo */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-3 bg-black border ${errors.name ? 'border-red-500' : 'border-purple-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Tu nombre completo"
                  {...register("name", { required: "El nombre es obligatorio" })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`w-full px-4 py-3 bg-black border ${errors.phone ? 'border-red-500' : 'border-purple-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Tu número de teléfono"
                  {...register("phone", { 
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números"
                    }
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-3 bg-black border ${errors.email ? 'border-red-500' : 'border-purple-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="tucorreo@ejemplo.com"
                  {...register("email", { 
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Formato de correo inválido"
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 bg-black border ${errors.password ? 'border-red-500' : 'border-purple-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="********"
                    {...register("password", { 
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 8,
                        message: "La contraseña debe tener al menos 8 caracteres"
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-md transition duration-300 font-medium"
                >
                  Registrarse
                </button>
              </div>
            </form>
            
            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <a href="#" className="text-purple-500 hover:text-purple-400 font-medium">
                  Iniciar sesión
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black border-t border-purple-900 px-4 py-6">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          © 2025 PetCare. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};
