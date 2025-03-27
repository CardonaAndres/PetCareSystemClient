import { useEffect, useState } from 'react'
import { Navbar } from '../../../common/Navbar'
import { useUserHook } from '../hooks/useUserHook'
import { LoadingScreen } from '../../../common/LoadingScreen';
import { User, Mail, Phone, Calendar, Copy } from 'lucide-react';
import { successAlert } from '../../../common/Alerts';
import { FormModal } from '../components/FormModal';

export const ProfilePage = () => {

    const [ modal, setModal ] = useState(false);
    const { loading, getUserProfile, user, deleteUser } = useUserHook();

    const handleModal = () => setModal(!modal);

    useEffect(() => { getUserProfile() }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => successAlert('Copiado al portapapeles'));
    };

    if(loading) return <LoadingScreen />

    return (
        <>
            <div className="bg-white p-6 rounded-lg mx-auto">
                <Navbar />
            </div>

            <div className="min-h-screen mx-9 mb-10 bg-black text-white rounded-2xl ">
                <div className="container mx-auto px-5 py-8">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-6">
                        <div className="flex items-center">
                        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <div className="ml-6">
                            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                            <p className="text-purple-200">ID de Usuario: {user.user_ID}</p>
                        </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-gray-800 rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Información de Contacto</h2>
                        
                        <div className="space-y-3">
                            {/* Email */}
                            <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Mail className="text-purple-500 w-6 h-6" />
                                <span>{user.email}</span>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(user.email)}
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Phone className="text-purple-500 w-6 h-6" />
                                <span>{user.phone}</span>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(user.phone)}
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                            </div>
                        </div>
                        </div>

                        {/* Account Information */}
                        <div className="bg-gray-800 rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Información de Cuenta</h2>
                        
                        <div className="flex items-center space-x-3">
                            <Calendar className="text-purple-500 w-6 h-6" />
                            <span>Miembro desde: {formatDate(user.created_at)}</span>
                        </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-t border-gray-800 flex justify-between items-center">
                        <button onClick={handleModal} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                        Editar Perfil
                        </button>
                        <button onClick={deleteUser} className="text-red-500 hover:text-red-600 transition-colors">
                        Eliminar Cuenta
                        </button>
                    </div>
                    </div>
                </div>

                <FormModal 
                    open={modal} 
                    onClose={handleModal}
                    user={user}
                />
            </div>
        </>
    )
}

