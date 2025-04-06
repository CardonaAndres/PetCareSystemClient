import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { router } from '../../../configs/router';
import { Link } from 'react-router-dom';

export const Header = ({ searchTerm, filterRole, roles, setSearchTerm, setFilterRole }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-black text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Gestión de Usuarios</h1>
          
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <div className="relative w-full sm:w-auto">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          
        <div className="relative w-full sm:w-auto">
          <Filter 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          <select
            className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none w-full"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Todos los roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Menú desplegable */}
        <div className="relative ml-2">
          <button 
            onClick={toggleDropdown}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <MoreVertical size={20} className="text-purple-400" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 py-1 border border-gray-700">
              <Link to={router.typePets} className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                Tipos de mascotas
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};