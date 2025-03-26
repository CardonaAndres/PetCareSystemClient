import { useState } from 'react';
import Logo from '../../../assets/imgs/PetCareLogo.png';
import { Calendar, Clock, Syringe, PawPrint, Menu, X, ChevronRight } from 'lucide-react';
import { ImageCarousel } from '../components/ImageCarousel'; 
import { Link } from 'react-router-dom';
import { router } from '../../../configs/router';
import { useAuth } from '../../../contexts/AuthContext';

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { isAuth } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="bg-black border-b border-purple-800 px-4 py-4">
        {/* Contenido de la navegación (sin cambios) */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PawPrint className="text-purple-500" size={24} />
            <span className="text-xl font-bold">PetCare</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-purple-400 transition duration-300">Inicio</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Servicios</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Mis Mascotas</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Historial</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Contacto</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Login Button */}
          <Link to={router.Login} className="hidden md:flex bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md transition duration-300">
             {isAuth ? 'Bienvenido' : ' Iniciar Sesión' }
          </Link>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-b border-purple-800 px-4 py-2">
          <div className="flex flex-col space-y-4 py-2">
            <a href="#" className="hover:text-purple-400 transition duration-300">Inicio</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Servicios</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Mis Mascotas</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Historial</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Contacto</a>
            <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md transition duration-300 text-left">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Contenido del Hero (sin cambios) */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cuidado de mascotas <span className="text-purple-500">simplificado</span></h1>
            <p className="text-lg mb-8 text-gray-300">Gestiona fácilmente citas veterinarias y lleva un registro de vacunas para mantener a tus mascotas saludables.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-md transition duration-300 flex items-center justify-center">
                <span>Agendar Cita</span>
                <ChevronRight size={18} className="ml-2" />
              </button>
              <button className="border border-purple-500 hover:bg-purple-900 px-6 py-3 rounded-md transition duration-300">
                Registrar Mascota
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-500 rounded opacity-20 blur-xl"></div>
              <img src={Logo} alt="Mascota feliz" className="relative z-10 rounded-xl max-w-lg" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Características <span className="text-purple-500">Principales</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-6 rounded-lg border border-purple-900 hover:border-purple-500 transition duration-300">
              <div className="bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestión de Citas</h3>
              <p className="text-gray-400">Agenda y administra fácilmente todas las citas veterinarias de tus mascotas.</p>
            </div>
            
            <div className="bg-black p-6 rounded-lg border border-purple-900 hover:border-purple-500 transition duration-300">
              <div className="bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Syringe className="text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Control de Vacunas</h3>
              <p className="text-gray-400">Mantén al día el registro de vacunación de tus mascotas con recordatorios automáticos.</p>
            </div>
            
            <div className="bg-black p-6 rounded-lg border border-purple-900 hover:border-purple-500 transition duration-300">
              <div className="bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recordatorios</h3>
              <p className="text-gray-400">Recibe notificaciones para no olvidar ningún evento importante para la salud de tu mascota.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel Section  */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ImageCarousel />
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">¿Listo para simplificar el cuidado de tus mascotas?</h2>
          <p className="text-lg mb-8 text-gray-300">Registra a tus mascotas hoy y comienza a gestionar su cuidado de salud de manera eficiente.</p>
          <button className="bg-purple-700 hover:bg-purple-600 px-8 py-3 rounded-md transition duration-300 text-lg">
            Comenzar Ahora
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black border-t border-purple-900 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <PawPrint className="text-purple-500" size={20} />
              <span className="text-lg font-bold">PetCare</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">Términos</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">Ayuda</a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 PetCare. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};