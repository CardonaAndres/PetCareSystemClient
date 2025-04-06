import { useForm } from 'react-hook-form';
import { PawPrint } from 'lucide-react';
import { useTypePetsHook } from '../hooks/useTypePetsHook';
import { LoadingScreen } from '../../../common/LoadingScreen';

export const TypePetForm = ({ onClose, typePetData }) => {

    const { loading, registerOrUpdateTypePet } = useTypePetsHook();
    const isEditMode = typePetData.type_pet_ID !== null;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...typePetData
        }
    });

    const onSubmited = handleSubmit(async data => {
        await registerOrUpdateTypePet(data, onClose, isEditMode)
    });

    if(loading) return <LoadingScreen />
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex items-center mb-6">
                <PawPrint className="h-8 w-8 text-purple-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">
                    {isEditMode ? 'Editar Tipo de Mascota' : 'Nuevo Tipo de Mascota'}
                </h2>
            </div>
            <form onSubmit={onSubmited} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="specie" className="block text-sm font-medium text-gray-700">
                        Especie *
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Canino, Felino, Ave..."
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        errors.specie ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('specie', { required: 'Este campo es obligatorio' })}
                    />
                    {errors.specie && (
                        <p className="text-red-500 text-sm">{errors.specie.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        placeholder="Añade una descripción (opcional)"
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        {...register('description')}
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                <button onClick={onClose} type="button" className="px-4 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    {isEditMode ? 'Actualizar' : 'Guardar'}
                </button>
                </div>
            </form>
        </div>
    )
}

