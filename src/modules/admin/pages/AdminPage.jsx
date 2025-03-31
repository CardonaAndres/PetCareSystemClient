import { Navbar } from '../../../common/Navbar';
import { useAdminHook } from '../hooks/useAdminHook';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { useEffect, useState } from 'react';
import { Pagination } from '../../../common/Pagination';
import { Search, UserCheck, Filter, User } from 'lucide-react';
import { UserCard } from '../components/UserCard';

export const AdminPage = () => {
  const { loading, getAllUsersPaginate, users, pagination } = useAdminHook();
  const [ currentPage, setCurrentPage ] = useState(1);
  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1);};
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) }

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const roles = ['Cliente', 'Admin'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === '' || user.role_name === filterRole;
    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    getAllUsersPaginate(currentPage);
  }, [currentPage])

  if(loading) return <LoadingScreen />

  return (
    <div className="bg-white p-6 rounded-lg mx-auto">
        <Navbar />
        <div className="container mx-auto py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Gestión de Usuarios</h1>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="">Todos los roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <UserCheck size={24} />
                <h3 className="ml-2 text-lg font-semibold">Total Usuarios</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{users.length}</p>
            </div>
            
            {roles.slice(0, 2).map((role) => (
              <div key={role} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <User size={24} className="text-purple-400" />
                  <h3 className="ml-2 text-lg font-semibold">{role}s</h3>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {users.filter(user => user.role_name === role).length}
                </p>
              </div>
            ))}
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <UserCard key={index} user={user} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-gray-100 rounded-lg">
                <p className="text-gray-600">No se encontraron usuarios con los filtros actuales.</p>
              </div>
            )}
          </div>
        </div>
        <Pagination 
          prevPage={prevPage} 
          nextPage={nextPage}
          currentPage={currentPage}
          totalPages={pagination.totalPages || 1}
        />   
    </div>
  )
}
