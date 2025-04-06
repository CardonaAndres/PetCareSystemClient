import Logo from '../../../assets/imgs/PetCareLogo.png';
import { useState } from 'react';
import { Calendar, Clock, Syringe, PawPrint, Menu, X, Send, FileText } from 'lucide-react';
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
      {/* Navigation Bar - Fixed */}
      <nav className="bg-black border-b border-purple-800 px-4 py-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PawPrint className="text-purple-500" size={24} />
            <span className="text-xl font-bold">PetCare</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-purple-400 transition duration-300">Inicio</a>
            <a href="#Services" className="hover:text-purple-400 transition duration-300">Servicios</a>
            <a href="/posts" className="hover:text-purple-400 transition duration-300">Publicaciones</a>
            <a href="#Contact" className="hover:text-purple-400 transition duration-300">Contacto</a>
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
        <div className="md:hidden bg-black border-b border-purple-800 px-4 py-2 fixed top-16 left-0 right-0 z-40">
          <div className="flex flex-col space-y-4 py-2">
            <a href="#" className="hover:text-purple-400 transition duration-300">Inicio</a>
            <a href="#Services" className="hover:text-purple-400 transition duration-300">Servicios</a>
            <a href="#Posts" className="hover:text-purple-400 transition duration-300">Publicaciones</a>
            <a href="#Contact" className="hover:text-purple-400 transition duration-300">Contacto</a>
            <Link to={router.Login} className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md transition duration-300 text-left">
              {isAuth ? 'Bienvenido' : ' Iniciar Sesión' }
            </Link>
          </div>
        </div>
      )}
      
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cuidado de mascotas <span className="text-purple-500">simplificado</span></h1>
            <p className="text-lg mb-8 text-gray-300">Gestiona fácilmente citas veterinarias y lleva un registro de vacunas para mantener a tus mascotas saludables.</p>
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
      <div className="bg-black py-16" id="Services">
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
      
      {/* Posts Section */}
      <div className="bg-black py-16" id="Posts">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras <span className="text-purple-500">Publicaciones</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black p-6 rounded-lg border border-purple-900 hover:border-purple-500 transition duration-300">
              <div className="flex items-center mb-4">
                <FileText className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Cuidados básicos para mascotas</h3>
              </div>
              <p className="text-gray-400 mb-4">Descubre los cuidados esenciales que necesita tu mascota para mantenerse saludable.</p>
            </div>
            
            <div className="bg-black p-6 rounded-lg border border-purple-900 hover:border-purple-500 transition duration-300">
              <div className="flex items-center mb-4">
                <FileText className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Vacunas importantes</h3>
              </div>
              <p className="text-gray-400 mb-4">Guía completa sobre las vacunas que tu mascota necesita según su edad y especie.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/posts" className="inline-block bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-md transition duration-300">
              Ver todas las publicaciones
            </Link>
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
      
      {/* Contact Form Section */}
      <div className="bg-black py-16" id="Contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
          
          <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-8 border border-purple-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Nombre</label>
                <input 
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Correo electrónico</label>
                <input 
                  type="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Asunto</label>
              <input 
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="Asunto de tu mensaje"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Mensaje</label>
              <textarea 
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-purple-500 min-h-32"
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            
            <button className="bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-md transition duration-300 flex items-center justify-center w-full md:w-auto">
              <Send size={18} className="mr-2" />
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">¿Listo para simplificar el cuidado de tus mascotas?</h2>
          <p className="text-lg mb-8 text-gray-300">Registra a tus mascotas hoy y comienza a gestionar su cuidado de salud de manera eficiente.</p>
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