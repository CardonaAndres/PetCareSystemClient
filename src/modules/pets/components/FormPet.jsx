import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PawPrint, Camera, CalendarDays, X } from 'lucide-react';
import { useTypePetsHook } from '../../typePets/hooks/useTypePetsHook';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { usePetHook } from '../hooks/usePetHook';

export const FormPet = ({ onClose, petData }) => {
  console.log(petData);
  const isEditMode = !!petData.pet_ID; 
  const [imagePreview, setImagePreview] = useState(petData?.photo_url || null);
  const { typePets : petTypes, getTypePets, loading } = useTypePetsHook();
  const { loading : petLoading, registerOrUpdatePet } = usePetHook();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues : {
      ...petData,
    }
  });

  useEffect(() => { getTypePets() }, []);

  const onSubmit = async (data) => await registerOrUpdatePet(data, isEditMode, onClose);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => { setImagePreview(null); setValue('photo', null);};

  if(loading || petLoading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <PawPrint className="mx-auto h-12 w-12 text-purple-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            { isEditMode ? 'Editar Mascota' : 'Registrar Mascota' }
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Nombre de la Mascota */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre de la Mascota
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  {...register('name', { 
                    required: 'El nombre de la mascota es obligatorio',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                  id="name"
                  type="text"
                  className="block w-full pr-10 border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400"
                  placeholder="Nombre de tu mascota"
                />
                {errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-red-500 text-sm">*</span>
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Fecha de Nacimiento */}
            <div className="mb-4">
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  {...register('birth_date', { 
                    required: 'La fecha de nacimiento es obligatoria',
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const currentDate = new Date();
                      return selectedDate <= currentDate || 'La fecha no puede ser futura';
                    }
                  })}
                  id="birth_date"
                  type="date"
                  className="block w-full pr-10 border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-md py-2 px-3 text-gray-900"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarDays className="h-5 w-5 text-purple-500" />
                </div>
              </div>
              {errors.birth_date && (
                <p className="mt-2 text-sm text-red-600">{errors.birth_date.message}</p>
              )}
            </div>

            {/* Tipo de Mascota */}
            <div className="mb-4">
              <label htmlFor="type_pet_ID" className="block text-sm font-medium text-gray-700">
                Tipo de Mascota
              </label>
                  <select 
                    { ...register('type_pet_ID', { required: 'El tipo de mascota es obligatorio' })}
                    className="block w-full border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-md py-2 px-3 text-gray-900"
                  >
                    {petTypes.map((type) => (
                      <option key={type.type_pet_ID} value={type.type_pet_ID}>
                        {type.specie}
                      </option>
                    ))}
                  </select>
              {errors.type_pet_ID && (
                <p className="mt-2 text-sm text-red-600">{errors.type_pet_ID.message}</p>
              )}
            </div>

            {/* Foto de la Mascota */}
            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Foto de la Mascota
              </label>
              <div className="mt-1 flex flex-col items-center">
                <input
                  {...register('photo', {
                    onChange: handleImageChange,
                    validate: {
                      fileSize: (files) => 
                        !files[0] || files[0].size <= 5 * 1024 * 1024 || 'La imagen no debe superar 5MB',
                      fileType: (files) => 
                        !files[0] || 
                        ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type) || 
                        'Solo se permiten imágenes JPG, PNG o GIF'
                    }
                  })}
                  id="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                />
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Vista previa" 
                      className="w-64 h-64 object-cover rounded-lg shadow-md mb-4"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <label 
                    htmlFor="photo" 
                    className="cursor-pointer flex items-center justify-center w-full border-2 border-dashed border-purple-300 rounded-md py-6 px-3 text-center hover:border-purple-500 transition"
                  >
                    <Camera className="h-6 w-6 mr-2 text-purple-600" />
                    <span className="text-gray-600">Subir Foto</span>
                  </label>
                )}
              </div>
              {errors.photo && (
                <p className="mt-2 text-sm text-red-600">{errors.photo.message}</p>
              )}
            </div>
          </div>

          {/* Botón de Registro */}
          <div>
            <button type="submit"className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isEditMode ? 'Actualizar Mascota' : 'Registrar Mascota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};