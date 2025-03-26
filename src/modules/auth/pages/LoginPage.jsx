import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, PawPrint } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { LoadingScreen } from "../../../common/LoadingScreen";
import { useNavigate } from 'react-router-dom';
import { router } from '../../../configs/router';
import { Link } from "react-router-dom";

export const LoginPage = () => {

  const navigate = useNavigate();  
  const { isAuth, loading, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = async (data) => await login(data);

  useEffect(() => {
    if(isAuth) return navigate(router.dashboard);
  }, [isAuth, navigate]);

  if(loading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-purple-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2">
            <PawPrint className="text-purple-500" size={24} />
            <span className="text-xl font-bold">PetCare</span>
          </div>
        </div>
      </div>

      {/* Login Container */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-purple-900">
            {/* Purple Header */}
            <div className="bg-purple-800 py-6 px-8">
              <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
            </div>

            {/* Login Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Correo inválido",
                        },
                      })}
                      className={`block w-full pl-10 pr-3 py-3 bg-black border ${
                        errors.email ? "border-red-500" : "border-gray-700"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="tu@email.com"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: {
                          value: 6,
                          message: "Debe tener al menos 6 caracteres",
                        },
                      })}
                      className={`block w-full pl-10 pr-12 py-3 bg-black border ${
                        errors.password ? "border-red-500" : "border-gray-700"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="••••••••"
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-500 hover:text-white focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-600 py-3 rounded-md transition duration-300 font-medium"
                >
                  Acceder
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center mt-8 mb-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-400">o</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              {/* Registration Link */}
              <div className="text-center">
                <p className="text-gray-400">
                  ¿No tienes una cuenta?{" "}
                  <Link to={router.register} className="text-purple-400 hover:text-purple-300 transition duration-300 font-medium">
                    Regístrate
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 transition duration-300">
              Términos y Condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 transition duration-300">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
