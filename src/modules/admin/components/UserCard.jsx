import { useState } from 'react';
import { User, Mail, Phone, Edit} from 'lucide-react';
import { FormModal } from './FormModal';

export const UserCard = ({ user }) => {
    const [ modal, setModal ] = useState(false);
    const handleModal = () => setModal(!modal);

    return (
        <div className="bg-black rounded-lg shadow-lg overflow-hidden">
            {/* Card Header - Role Badge */}
            <div className="relative">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
                    ${user.role_name === 'Admin' ? 'bg-purple-600 text-white' : 
                    user.role_name === 'Empleado' ? 'bg-blue-600 text-white' : 
                    'bg-green-600 text-white'}`}>
                    {user.role_name}
                </div>
            </div>

            {/* User Info */}
            <div className="p-5">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    </div>
                </div>

                <div className="space-y-3 text-gray-300">
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-sm">{user.phone}</span>
                    </div>
                </div>
            </div>

            <div onClick={handleModal}className="px-5 py-3 bg-gray-900 flex justify-center items-center">
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                    <Edit size={16} className="mr-1" />
                    Editar
                </button>
            </div>
            
            <FormModal onClose={handleModal} open={modal} user={user} />
        </div>
    )
}

