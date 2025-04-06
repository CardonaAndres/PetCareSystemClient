import { useEffect, useState } from 'react';
import { Navbar } from '../../../common/Navbar';
import { usePostsHook } from '../hooks/usePostsHook';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { Pagination } from '../../../common/Pagination';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';

export const PostManager = () => {
    const { loading, getAllPosts, posts, pagination } = usePostsHook();
    const [searchTerm, setSearchTerm] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);;

    const nextPage = () => { if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) }

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => { getAllPosts(currentPage) }, [currentPage])

    if(loading) return <LoadingScreen />

    return (
        <div className="bg-white p-6 rounded-lg mx-auto">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
                  <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {filteredPosts.length > 0 ? (
                          filteredPosts.map((post) => (
                            <PostCard key={post.post_ID} post={post} adminMode={true} />
                          ))
                        ) : (
                          <div className="col-span-3 text-center py-8 text-gray-400">
                            No se encontraron publicaciones
                          </div>
                        )}
                    </div>
                </div>
            </div>
            <Pagination 
                prevPage={prevPage} 
                nextPage={nextPage}
                currentPage={currentPage}
                totalPages={pagination.totalPages}
            />   
        </div>
    )
}