import { useForm } from 'react-hook-form';
import { Save, X } from 'lucide-react';
import { usePostsHook } from '../hooks/usePostsHook';

export const PostForm = ({ post, onClose }) => {
  const { createOrUpdatePost } = usePostsHook(); 
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      ...post
    }
  });

  const isEditing = post.post_ID !== null;
  const onSubmited = handleSubmit(async (data) => await createOrUpdatePost(data, onClose, isEditing));

  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        {isEditing ? 'Editar Publicación' : 'Crear Nueva Publicación'}
      </h2>

      <form onSubmit={onSubmited} className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Título
          </label>
          <input
            {...register('title', { 
              required: 'El título es obligatorio',
              maxLength: { value: 100, message: 'El título no debe exceder los 100 caracteres' } 
            })}
            type="text"
            id="title"
            placeholder="Ingrese el título de la publicación"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Content Field */}
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">
            Contenido
          </label>
          <textarea
            {...register('content', { 
              required: 'El contenido es obligatorio'
            })}
            id="content"
            rows="8"
            placeholder="Escriba el contenido de la publicación"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};