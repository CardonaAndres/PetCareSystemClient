import { useMemo, useState } from 'react';
import { Menu, X, PawPrint, User, LogOut, ShieldUser, BookText } from 'lucide-react';
import { router } from '../configs/router';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Perfil', icon: <User size={20} />, path: router.profile },
  { name: 'Publicaciones', icon: <BookText size={20} />, path: router.posts },
];

export const Navbar = () => {
  
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const filterNavItems = useMemo(() => {
    const items = [...navItems];
    
    if(user?.role_ID === 1) {
      if (!items.some(item => item.name === 'Admin')) {
        items.push({ name: 'Admin', icon: <ShieldUser size={20} />, path: router.admin });
      }
    }

    return items;
  }, [user?.role_ID]);

  return (
    <nav className="bg-black shadow-lg border rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={router.dashboard} className="flex-shrink-0 flex items-center">
              <PawPrint className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">PetCare</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-end md:flex-1">
            <div className="flex space-x-4">
              {filterNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                >
                  <div className="mr-1.5 text-purple-400">{item.icon}</div>
                  {item.name}
                </a>
              ))}
              
              <button onClick={logout} className="flex items-center px-3 py-2 ml-4 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-950 transition-colors duration-200"
              >
                <LogOut size={20} className="mr-1.5" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-purple-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-purple-400"
            >
              <div className="mr-3 text-purple-400">{item.icon}</div>
              {item.name}
            </a>
          ))}
          
          {/* Mobile logout button */}
          <button onClick={logout}
            className="flex items-center px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-950"
          >
            <LogOut size={20} className="mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};