import { Calendar, Syringe, ArrowRight } from 'lucide-react';
import { router } from '../../../configs/router';
import { Link } from 'react-router-dom'

export const OptionCards = ({ onClose, pet }) => {
  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Mascotas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de Citas */}
          <Link to={`${router.appointments}?pet_ID=${pet.pet_ID}`} className="bg-white border-2 border-purple-500 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="h-2 bg-purple-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Gestión
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Citas</h3>
              <p className="text-gray-600 mb-6">
                Programa, administra y consulta las citas veterinarias para tus mascotas. Mantén un seguimiento detallado de cada visita.
              </p>
              
              <div className="flex justify-end items-center mt-4">
                <button className="flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                  Administrar
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </Link>
          
          {/* Card de Vacunas */}
          <Link to={`${router.appointments}?pet_ID=${pet.pet_ID}`} className="bg-white border-2 border-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="h-2 bg-black"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Syringe className="h-8 w-8 text-black" />
                </div>
                <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Salud
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Vacunas</h3>
              <p className="text-gray-600 mb-6">
                Controla el historial de vacunación de tus mascotas. Recibe recordatorios para no olvidar las fechas importantes.
              </p>
              
              <div className="flex justify-end items-center mt-4">
                <button className="flex items-center text-black font-semibold hover:text-gray-700 transition-colors">
                  Ver registro
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};