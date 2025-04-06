import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PostModal } from './PostModal';
import { usePostsHook } from '../hooks/usePostsHook';

export const PostCard = ({ post, adminMode = false }) => {
  const [ modal, setModal ] = useState(false);
  const { deletePost } = usePostsHook();
  const handleModal = () => setModal(!modal);
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-64">

      <div className="bg-gray-700 p-4">
        <h3 className="text-lg font-semibold text-white truncate">{post.title}</h3>
      </div>

      <div className="p-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <p className="text-gray-300 text-sm my-2">
          {post.content}
        </p>
      </div>

      {adminMode && (
        <div className="bg-gray-700 p-3 flex justify-between items-center">
            <span className="text-xs text-gray-400">ID: {post.post_ID}</span>
            <div className="flex space-x-2">
                <button onClick={handleModal} className="p-1 text-yellow-500 hover:text-yellow-400 transition-colors" title="Editar">
                <Edit className="h-5 w-5" />
                </button>
                <button onClick={async () => await deletePost(post.post_ID)} className="p-1 text-red-500 hover:text-red-400 transition-colors" title="Eliminar">
                <Trash2 className="h-5 w-5" />
                </button>
            </div>

            <PostModal open={modal} onClose={handleModal} postData={post} />
        </div>
      )}

    </div>
  );
};